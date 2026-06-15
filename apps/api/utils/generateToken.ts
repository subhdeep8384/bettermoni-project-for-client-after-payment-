import jwt from "jsonwebtoken"
import { email } from "zod"

export function createToken(data :{
    email : string ,
} ) : string {
    const token = jwt.sign({
        email : data.email 
    } , process.env.JWT! ,
    {
        expiresIn: "7d"
    }
    )

    return token
}

export function verifyToken(token : string )  {
    try{
        const decoded  = jwt.verify(token , process.env.JWT!)
        return decoded as {
            email: string
        };
    }catch(e){
        console.log(e)
    }
}