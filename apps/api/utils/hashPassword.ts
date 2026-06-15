import bcrypt from "bcrypt"

export async function hashPassword(password : string) : Promise<string>{
    const hashedPassord = await bcrypt.hash(password , 10);
    return hashedPassord;
}

export async function matchPassword(password: string , hashedPassword:string) :  Promise<boolean>{
    const ans = await bcrypt.compare(hashedPassword , password) ;
    return ans ;
}