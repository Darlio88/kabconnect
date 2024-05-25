import express from "express"
import mongoose from "mongoose";
import routes from "./routes";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
//app instance
const app = express();

//app middleware
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({
}))


//configure the routes to be used by the application
app.use("/api", routes)


//port
const port = parseInt(process.env.PORT as string) || 5000

console.log("Typeof port", typeof port)
console.log("Connection string", process.env.MONGO_URI)
//connect to the database
mongoose.set('debug', true);
     
    //listen on port
    app.listen(port, () => {
        mongoose.connect(process.env.MONGO_URI as string).then(() => {
        console.log("Connected to database")
        }).catch(error => {
            console.log("Failed to connect to the database", error)
        })
        console.log("App is running on port", port)
    })

