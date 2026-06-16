import z from "zod";
import type {Request , Response }from "express"
import { sendLoginMail } from "../processes/sendmail";

const mailSchema = z.object({
    email : z.email() ,
    subject : z.string().min(3).max(1000) 
})
export async function mailHandler(req : Request , res : Response ){
    
    try{
        const data = mailSchema.safeParse(req.body) ;
        if(data.error){
            throw new Error("required filed missing")
        }
        const {email , subject} = data.data
        const result = await sendLoginMail(email , subject)
        if(result){
            return res.status(201).json({
                message : "email send" 
            })
        }
        throw  new Error("email server died")
        
    }catch(e){
        res.status(500).json({
            message : "server errror" ,
            data : e 
        })
    }
}
