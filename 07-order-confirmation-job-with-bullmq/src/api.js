import express from 'express'
import {emailQueue} from "./queue.js"

const app = express()
app.use(express.json())


app.post("/welcom-email" , async (req , res )=>{
   const job = emailQueue.add(
    "send-welcome-email",
    {
        to : req.body.to ,
         name : req.body.name || "Leaner"
    },
    {
        attempts : 3,
        backoff : {
            type : "exponential",
            delay : 1000
        }
    }
   );
   res.json({message : "Welcome Email job added to the queue!" , jobId : job.id})
})




app.listen(3000 , ()=>{
    console.log("Server is listening on port http://localhost:300")
});