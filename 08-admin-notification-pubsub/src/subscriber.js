import Redis from "ioredis"

const subscriber = new Redis(process.env.REDIS_URL || "redis://localhost:6379")

subscriber.subscribe("notifucation" , (err)=>{
    if(err){
        console.log("Failed to subscribe : %s" , err.message)
    }
    console.log("Subscriber successfully!")
})

subscriber.on("message" , (channel , message)=>{
    console.log("Received on " , channel ,JSON.parse(message))
});