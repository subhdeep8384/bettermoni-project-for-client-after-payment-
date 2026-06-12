import type {Response , Request } from "express"
import {prisma } from "db/prisma"

import  {type User , userSchema} from "../../types/user.type" 

export async function createuser( res : Response , req : Request){
    const data = userSchema.safeParse(req.body) ;
    
    if(data.error){
        return res.status(500).json({
            message : "server error" 
        })
    }

    const {name , email , password} = data.data 
    
    const user : User = await prisma.user.create({
        data :{
            name : name ,
            password : password ,
            email : email 
        }
    })
    

    if( !user ){
        return res.status(500).json({
            message : "server error"
        })
    }
    return res.status(201).json({
        message : "User created successfully", 
        data : user.email
    })
} 