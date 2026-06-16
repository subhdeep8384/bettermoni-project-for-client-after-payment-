import type { Response , Request  } from "express";
import { signUpSchema } from "../../types/user.type";
import { prisma } from "db/prisma";
import { hashPassword } from "../../utils/hashPassword";
import axios from "axios";
export async function signup (req : Request , res : Response){
    try{
        const data = signUpSchema.safeParse(req.body) ;
        if(data.error){
            throw new TypeError("required field missing") ;
        }
        const {name , email , password } = data.data;
        const hashedPassword = await hashPassword(password) ;
        const user = await prisma.user.create({
            data:{
                name : name ,
                password : hashedPassword ,
                email : email 
            },
            select:{
                id : true,
                email : true,
                name : true 
            }
        })

        if(!user){
            throw new Error("cannot create user");
        }

        const result =  await axios.post(`${process.env.MAIL_SERVER}/sendMail`,{
            email : email , 
            subject : "Welcome"
        })
        console.log(result)

        return res.status(201).json({
            message : "User created",
            data : user 
        })
    }catch(e){
        res.status(500).send({
            message : "something went wrong" ,
            data : e 
        })
    }
}