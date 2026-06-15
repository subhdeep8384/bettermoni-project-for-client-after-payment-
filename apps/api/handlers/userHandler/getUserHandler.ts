import type {Response , Request , NextFunction} from "express"
import {z} from "zod"

const getUserSchema = z.object({
    id : z.string() ,
    name : z.string() ,
})
interface userReq extends Request{
    user? :{
        name : string ,
        email : string
    }
}
export async function getUser(req : userReq  , res :Response ) {
    console.log(req.user)
    return res.json({
        message : "done" ,
    })
}