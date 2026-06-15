import rateLimit from "express-rate-limit";
import { success } from "zod";

export  function rateLimiter(numberOfReq : number , InMinutes : number){
    return rateLimit({
        windowMs :InMinutes* 60 * 1000 ,
        max : numberOfReq ,
        standardHeaders : true ,
        legacyHeaders : false, 
        message:{
            success : false ,
            message : "too many request please try again after sometime"
        }
    })
}