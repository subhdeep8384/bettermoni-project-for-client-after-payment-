import type {Response , Request , NextFunction} from "express"
import {prisma} from "db/prisma"
import { json } from "zod";
async function createWebsiteHandler(req : Request , res : Response){
    const {url , user_id } = req.body ;
    console.log(url , user_id)
    if(!url) return res.status(400).json({
        message : "url required"
    })
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