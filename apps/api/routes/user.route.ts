import { Router } from "express";
import { createuser } from "../handlers/userHandler/createUserHandler";
const router = Router() ;

router.get("/create" , createuser)

router.post("/" , getUser )
export default router 