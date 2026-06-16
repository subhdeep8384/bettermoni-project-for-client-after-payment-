import { Kafka } from "kafkajs";
import fs from "fs"
export const kafka = new Kafka({
    clientId: process.env.APP_NAME as string,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    ssl: {
        ca:[
            fs.readFileSync("./certificates/ca.pem","utf-8"), 
        ]
    } ,
    sasl:{
        mechanism:  "plain" ,
        username: process.env.KAFKA_USER! ,
        password: process.env.KAFKA_PASSWORD!   
    },
    retry :{
        retries:5
    },
    connectionTimeout : 5000
})

