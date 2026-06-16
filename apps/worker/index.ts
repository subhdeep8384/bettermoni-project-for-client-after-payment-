import express from "express"
import cors from "cors"
import { mailHandler } from "./handler/mail.handler";
export  const app = express() ;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
        origin: process.env.PRIMARY_BACKEND_URL!,
        credentials: true
    })
);
app.post("/sendMail" ,mailHandler )
const port = process.env.PORT || 8000

app.listen(port , () =>{
    console.log("worker is working on port")
})