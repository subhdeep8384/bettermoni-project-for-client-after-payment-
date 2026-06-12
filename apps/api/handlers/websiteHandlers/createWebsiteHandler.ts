import type {Response , Request , NextFunction} from "express"
import {prisma} from "db/prisma"
async function createWebsiteHandler(req : Request , res : Response){
    const {url , user_id } = req.body ;
    const website = await prisma.website.create({
        data:{
            url : url , 
            user_id : user_id 
        }
    })
}

export default createWebsiteHandler 