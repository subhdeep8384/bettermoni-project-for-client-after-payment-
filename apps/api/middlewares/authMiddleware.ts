import type { Response , Request , NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";
import { prisma } from "db/prisma";


interface userReq extends Request {
    user? :{
        email : string,
        name : string 
    }
}

export async function authMiddleware(req : userReq , res : Response , next : NextFunction){
    const token = req.cookies.token ;
    try{
        const data = verifyToken(token) ;
        if(!data ){
            throw new Error("token is wrong please signup again")
        }
        const user = await prisma.user.findFirst({
            where:{
                email : data?.email 
            }, 
            select:{
                name : true ,
                email : true ,
            }
        })
        if( !user ) throw new Error("middleware stoped execution")
            
            req.user = user! ;
            
            next() ;
        }catch(e){
            res.status(500).json({
                message : "middleware stopped execution",
                data : e
            })
        }
}