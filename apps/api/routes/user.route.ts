import { Router } from "express";
import { createuser } from "../handlers/userHandler/createUserHandler";
import { getUser } from "../handlers/userHandler/getUserHandler";
const router = Router() ;

router.post("/create" , createuser)

router.get("/" , getUser )
export default router 