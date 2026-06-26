import express from "express"
import Redis from "ioredis"


const app = express()
app.use(express.json())


const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

app.post("/notification" , async(req , res)=>{
    const payload = {
        title : req.body.title || "Default Title" ,
        CreatedAt : new Date().toISOString
    }

    const receivers = await publisher.publish("notification" , JSON.stringify(payload));
    res.json({message : `Notification sent to ${receivers} subscriber`})
});

app.listen(30000 , ()=>{
    console.log("Server is listeing on port http://localhost:3000 ")
});