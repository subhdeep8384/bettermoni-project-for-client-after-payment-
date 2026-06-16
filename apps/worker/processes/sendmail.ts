import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
import { Resend } from "resend";
import { welcomeMail } from "../templates/authemails/welcomeMail";
import { getNameFromMail } from "../helper/getNameFromMail";

const resend = new Resend(
    process.env.RESEND_API_KEY
);

export async function sendLoginMail(email : string , subject : string ) : Promise<boolean>{

    try{
        const name : string =  getNameFromMail(email)
        const res =  await resend.emails.send({
            from: "onboarding@resend.dev", 
            to: email,
            subject: subject,
            html: welcomeMail(name , "betterstack")
        })
        if(res.error){
            throw new Error("email error")
        }
        return true ;
    }catch(e){
        return false ;
    }
}


