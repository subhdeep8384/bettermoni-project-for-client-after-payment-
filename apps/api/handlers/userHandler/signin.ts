import type { Response , Request  } from "express";
import { signInSchema } from "../../types/user.type";
import { prisma } from "db/prisma";
import { matchPassword } from "../../utils/hashPassword";
import { createToken } from "../../utils/generateToken";
export async function signin (req : Request , res :Response){
    try{
        const data = signInSchema.safeParse(req.body) ;
        if(data.error){
            throw new TypeError("required felid missing ")
        }
        const {password , email } = data.data ;

        const userFound = await prisma.user.findFirst({
            where:{
                email : email ,
            }, 
            select:{
                password : true ,
                email : true
            }
        })

        if (!userFound) {
            throw new Error("user not found")
        }

        const passwordMatched = await matchPassword(userFound.password , password) ;

        if(passwordMatched){
            const token = createToken({email}) ;
            return res.cookie("token" , token).json({
                message : "user found" ,
                data : userFound.email
            })
        }
        throw new Error("user not found")
        
    }catch(e){
        res.status(500).json({
            message : "something went wrong" ,
            data : e
        })
    }
}