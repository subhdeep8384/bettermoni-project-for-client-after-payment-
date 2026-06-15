import Docker from "dockerode";

const docker = new Docker({
    host: "127.0.0.1",
    port: 2375
});

type Language = "cpp" | "java" | "python";

const IMAGE_MAP = {
    cpp: "gcc:latest",
    java: "openjdk:21",
    python: "python:3.12"
};

async function ensureImage(image: string) {
    try {
        await docker.getImage(image).inspect();
        console.log(`${image} already exists`);
    } catch {
        console.log(`Downloading ${image}...`);

        const stream = await new Promise<any>((resolve, reject) => {
            docker.pull(image, (err, stream) => {
                if (err) return reject(err);
                resolve(stream);
            });
        });

        await new Promise<void>((resolve, reject) => {
            docker.modem.followProgress(
                stream,
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        console.log(`${image} downloaded`);
    }
}

function fileName(language: Language) {
    if (language === "cpp") return "main.cpp";
    if (language === "java") return "Main.java";
    return "main.py";
}

function runCmd(language: Language) {
    if (language === "cpp")
        return "g++ main.cpp -o app && ./app";

    if (language === "java")
        return "javac Main.java && java Main";

    return "python main.py";
}

function escape(text: string) {
    return text.replace(/'/g, "'\\''");
}

async function runContainer(
    language: Language,
    code: string
) {
    const image = IMAGE_MAP[language];

    // auto download
    await ensureImage(image);

    const container = await docker.createContainer({
        Image: image,

        Cmd: ["sleep", "60"],

        HostConfig: {
            Memory: 256 * 1024 * 1024,
            NanoCpus: 1_000_000_000,
            NetworkMode: "none",
            AutoRemove: true
        }
    });

    try {
        await container.start();

        const file = fileName(language);

        const exec = await container.exec({
            AttachStdout: true,
            AttachStderr: true,

            Cmd: [
                "sh",
                "-c",
                `
echo '${escape(code)}' > ${file}
${runCmd(language)}
`
            ]
        });

        const stream = await exec.start({});

        let output = "";

        stream.on("data", (chunk) => {
            output += chunk.toString();
        });

        await new Promise((r) =>
            stream.on("end", r)
        );

        return output;

    } finally {
        await container.stop().catch(() => {});
    }
}

(async () => {
    const result = await runContainer(
        "cpp",
`
#include <iostream>

int main(){
    std::cout<< "teri ma ki chut";
    std::cout << "Hello World";
}
`
    );

    console.log(result);
})();