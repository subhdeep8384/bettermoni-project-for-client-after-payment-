import express from "express"
import cookieParser from "cookie-parser"
import websiteRouter from "./routes/website.route";
import statusRouter from "./routes/status.route"
import userRouter from "./routes/user.route"
import { rateLimiter } from "./middlewares/ratelimiter";
export const app = express() ;


app.use(rateLimiter(100 , 1));
app.use(express.json()) ;
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/user" , userRouter)
app.use("/website" , websiteRouter)
app.use("/status" , statusRouter)