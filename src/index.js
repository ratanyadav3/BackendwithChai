import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./db/index.js";


connectDB();




























// iife function using for writting this code
//This is one method to connect with dataase we have use proper error handeling.using Async Await for database connection is a very good approach when you connecting with mongodb atlas.But i have installed mongodb locally in my laptop then there is no need of async await
// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error",(error)=>{
//             console.log("Application is unable to talk with DataBase ",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("Error: ",error)
//         throw err
//     }
// })()