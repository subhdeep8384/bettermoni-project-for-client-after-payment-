import Docker from "dockerode";


const docker = new Docker({
    host: "127.0.0.1",
    port: 2375
});

type Language = "cpp" | "java" | "python";

const IMAGE_MAP: Record<Language, string> = {
    cpp: "gcc:latest",
    java: "openjdk:21",
    python: "python:3.12"
};

export async function runContainer(
    language: Language,
    code: string
) {
    const image = IMAGE_MAP[language];

    const container = await docker.createContainer({
        Image: image,

        Cmd: ["sleep", "60"],

        AttachStdout: true,
        AttachStderr: true,

        HostConfig: {
            Memory: 256 * 1024 * 1024,
            NanoCpus: 1_000_000_000,

            NetworkMode: "none",

            AutoRemove: true,

            ReadonlyRootfs: true
        }
    });

    try {
        await container.start();

        const exec = await container.exec({
            AttachStdout: true,
            AttachStderr: true,
            Cmd: [
                "sh",
                "-c",
                `
                echo '${escape(code)}' > main &&
                ${
                    language === "cpp"
                        ? "g++ main -o app && ./app"
                        : language === "java"
                        ? "javac main && java main"
                        : "python main"
                }
                `
            ]
        });

        const stream = await exec.start({});

        let output = "";

        stream.on("data", (chunk) => {
            output += chunk.toString();
        });

        await new Promise((r) => stream.on("end", r));

        return output;

    } finally {
        await container.stop().catch(() => {});
    }
}

function escape(text: string) {
    return text.replace(/'/g, "'\\''");
}

(async () => {
    const result = await runContainer(
        "cpp",
        `
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`
    );

    console.log(result);
})();