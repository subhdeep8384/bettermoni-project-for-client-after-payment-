import express from "express"
import { mailHandler } from "./handler/mail.handler";
export  const app = express() ;

app.get("/sendMail" ,mailHandler )
const port = process.env.PORT || 8000

app.listen(port , () =>{
    console.log("worker is working on port")
})