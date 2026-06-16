export function welcomeMail(
name: string,
appName: string
): string {
    return `
        <h1 style="color:#111;"> Welcome to ${appName} 🎉 </h1>

        <p>Hello <strong>${name}</strong>,</p>

        <p> Your account has been created successfully. </p>

        <p> You can now log in and start using all features. </p>

        <div style=" margin:20px 0; padding:15px; background:#f5f5f5; border-radius:8px; "> <p style="margin:0;"> Account Status: <strong>Active</strong> </p> </div>

        <p> If you did not create this account, please contact support immediately. </p><br>

        <p> Thanks,<br> Team ${appName} </p>
    `
}