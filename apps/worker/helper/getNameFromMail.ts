export function getNameFromMail(email : string) : string{
    const username = email.split("@")[0];

    return username!
        .replace(/[._-]+/g, " ")
        .replace(/\d+/g, "")
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();
}