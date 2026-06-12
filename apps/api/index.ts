import express from "express"
import websiteRouter from "./routes/website.route";
import statusRouter from "./routes/status.route"
export const app = express() ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true}))



app.use("/user" , userRouter)
app.use("/website" , websiteRouter)
app.use("/status/:websiteId" , statusRouter )