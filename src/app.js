import express from 'express'
import cookiePareser from 'cookie-parser'
import cors from "cors"


const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//inhe middleware khte hai ye jab user data bhejta hai to express ko batati hai ki aisa aisa data ayaa hai 
app.use(express.json({limit:"16kb"}))//ye batata hai jo data json ki format mein aati hai
app.use(express.urlencoded({extended:true ,limit:"16k b"}))//ye url se jo data hai uske baare me batata hai 
app.use(express.static("public"))
app.use(cookiePareser());





export {app}