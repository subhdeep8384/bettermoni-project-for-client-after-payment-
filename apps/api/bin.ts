import {app} from "./index"
const port = process.env.PORT || 3000 ;

app.listen(port , (e)=>{
    console.log(`server started on port ${port}`)
})