import { prisma } from "db/prisma"
import type {Response , Request , NextFunction} from "express"
import {z} from "zod"

const userSchema = z.object({
    id : z.string() ,
    name : z.string() ,
})
async function getUser(req :Request  , res :Response ) {
    const data = userSchema.safeParse(req.body);

    if(data.error){
        return res.status(500).json({
            mesasge : "server error"
        })
    }

    const {id , name } = data.data 
    const user = await prisma.user.findFirst({
        where: {
            name : name ,
            id : id 
        }
    })
    if(!user){
        return res.status(400).json({
            message : "user not found" 
        })
    }

    return res.status(201).json({
        message : "user found" ,
        data : user
    })
}