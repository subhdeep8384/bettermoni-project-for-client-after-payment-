import type {Response , Request , NextFunction} from "express"
import {prisma} from "db/prisma"
import { json } from "zod";
interface userReq  extends Request{
    user?:{
        name : string ,
        email : string, 
        id : string
    }
}
async function createWebsiteHandler(req : userReq , res : Response){

    const { url  } = req.body ;
    const user_id  = req.user?.id
    if(!url) throw new Error("not found URL")
        
    const website = await prisma.website.create({
        data:{
            url : url , 
            user_id : user_id as string
        }
    })
    if(!website) return res.status(500).json({
        message : "something went wrong"
    })

    return res.status(201).json({
        message : "created",
        data : website
    })
}

export default createWebsiteHandler 