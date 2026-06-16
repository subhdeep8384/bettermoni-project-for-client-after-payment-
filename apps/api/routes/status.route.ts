import { Router } from "express";
import type { Response , Request , NextFunction } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import z from "zod";
import { prisma } from "db/prisma";
const router = Router() ;

interface Reqparams extends Request{
    user? :{
        name : string ,
        email : string,
    }
    params :{
        website : string
    }
}

const webSiteSchema = z.object({
    url : z.string() ,
})

router.get("/:website" ,authMiddleware ,async (req : Reqparams, res : Response) =>{
    const website = req.params.website ;
    try{
        const {name : username , email} = req.user!;
        const user = await prisma.user.findFirst({
            where:{
                name : username ,
                email : email
            }, 
            select:{
                id : true 
            }
        })
        if(!user) throw new Error("user not found") ;
        const website = await prisma.website.findFirst({
            where:{
                user_id : user.id
            } ,
            include:{
                tick:{
                    select:{
                        status : true ,
                        regionId : true ,
                        websiteId : true ,
                        responseTime_ms : true 
                    },
                    take : 1 ,
                    orderBy : [{
                        created_At : "desc",
                    }]
                }
            }
        })
        if(!website){
            return res.status(409).json({
                message : "No website available for "+ username +" create first"
            })
        }

        return res.status(201).json({
            message : "webssite found" ,
            data : website
        })
        
    }catch(e){
        res.status(500).json({
            message : "server error",
            data : e
        })
    }
    
   
})

export default router 