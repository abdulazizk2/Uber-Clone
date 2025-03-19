import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnecttoDB from './db/ConnectDB.js'
import userRoutes from './routes/user.routes.js'
dotenv.config();

ConnecttoDB();
export const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/users',(req,res)=>{
    return res.send("Hello World")
})

app.use('/api/users',userRoutes)