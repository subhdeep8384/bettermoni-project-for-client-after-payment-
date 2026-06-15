import type { Response , Request  } from "express";
import { signUpSchema } from "../../types/user.type";
import { prisma } from "db/prisma";
export async function signup (req : Request , res : Response){
    try{
        const data = signUpSchema.safeParse(req.body) ;
        if(data.error){
            throw new TypeError("required field missing") ;
        }
        const {name , email , password } = data.data;
        const user = await prisma.user.create({
            data:{
                name : name ,
                password : password ,
                email : email 
            }
        })

        if(!user){
            throw new Error("cannot create user");
        }
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