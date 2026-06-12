import { Router } from "express";
import type { Response , Request , NextFunction } from "express";
const router = Router() ;

router.get("/" , (req : Request , res : Response) =>{
    res.send("status")
})
router.post("/" , (req : Request  , res : Response) =>{
    res.send("post route")
})
export default router 