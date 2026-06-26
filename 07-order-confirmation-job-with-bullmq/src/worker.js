import {Woker} from "bullmq"
import {connection} from "./queue.js"

const worker = new Woker(
   async (job) => {
     "emails",
    console.log("Processing email job" , job.id , job.name , job.data)
    await new Promise.resolve((resolve)=> setTimeout(resolve , 1500))
    console.log("Email job completed" , job.id , job.name , job.data)
   },
   {connection}
)

worker.on("completed" , (job)=> {
    console.log("Job completed" , job.id , job.name , job.data)
});

worker.on("Failed" , (job)=>{
    console.log("Job Failed" , job.id , job.name , job.data)
})