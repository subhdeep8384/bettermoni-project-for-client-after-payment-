import { prisma } from "db/prisma"
import type {Response , Request , NextFunction } from "express"

async function getAllWebsites(req : Request  , res : Response ) {
    const {user_id } = req.body ; 
    const websites = await prisma.website.findMany({
        where:{
            user_id : user_id
        }
    });
}

export default getAllWebsites