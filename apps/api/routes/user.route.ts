import { Router } from "express";
import { createuser } from "../handlers/userHandler/createUserHandler";
import { getUser } from "../handlers/userHandler/getUserHandler";
import { signup } from "../handlers/userHandler/signup";
import { signin } from "../handlers/userHandler/signin";
const router = Router() ;

router.post("/create" , createuser)

router.post("/signup" , signup ) 
router.post("/signin" , signin ) 

router.get("/" , getUser )
export default router 