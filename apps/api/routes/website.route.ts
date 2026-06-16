import { Router } from "express";
import createWebsiteHandler from "../handlers/websiteHandlers/createWebsiteHandler";
import getAllWebsites from "../handlers/websiteHandlers/getAllWebsites";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router() ;

router.get("/" , authMiddleware ,getAllWebsites)

router.post("/" , authMiddleware ,createWebsiteHandler )
export default router 