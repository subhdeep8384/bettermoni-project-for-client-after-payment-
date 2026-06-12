import { Router } from "express";
import createWebsiteHandler from "../handlers/websiteHandlers/createWebsiteHandler";
import getAllWebsites from "../handlers/websiteHandlers/getAllWebsites";
const router = Router() ;

router.get("/" , getAllWebsites)

router.post("/" , createWebsiteHandler )
export default router 