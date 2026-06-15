import {email, z} from "zod"
export  const userSchema = z.object({
    name : z.string().min(3).max(20) ,
    email : z.email(),
    password : z.string().min(6).max(20) 
})


export const signUpSchema = z.object({
    name : z.string().min(3).max(20) ,
    email : z.email(),
    password : z.string().min(6).max(20)  
})

export const signInSchema = z.object({
    email : z.email(),
    password : z.string()
})

export type User = z.infer<typeof userSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
 