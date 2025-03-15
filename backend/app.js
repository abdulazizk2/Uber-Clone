import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();


export const app = express();
app.use(cors())


app.get('/users',(req,res)=>{
    return res.send("Hello World")
})

app.get('/api/users',(req,res)=>{
    return res.send('<h1>Hello World</h1>')
})