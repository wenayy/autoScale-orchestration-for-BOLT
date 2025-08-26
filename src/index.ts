import { AutoScalingClient, SetDesiredCapacityCommand } from "@aws-sdk/client-auto-scaling";
import dotenv from "dotenv";
dotenv.config();

import express from"express"
const app =express();

app.get("/:userid",async(req,res)=>{
    const userId = req.params.userid;
    // Use the userId to perform actions
    res.send(`User ID is: ${userId}`);
}
)



const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY; 

// for the typesafety otherwise it could have been undefined
if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials are not set in environment variables.");
}

const client = new AutoScalingClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
 
 
const command = new SetDesiredCapacityCommand({
    AutoScalingGroupName:"orchestration-bolt",
    DesiredCapacity:2
})
const data = await client.send(command);
console.log(data);

console.log("Desired capacity updated successfully.");

