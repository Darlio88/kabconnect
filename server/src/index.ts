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
const PORT = process.env.PORT || 5000


//connect to the database
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    //listen on port
    app.listen(PORT, () => {
        console.log("App is running on port", PORT)
    })
}).catch(error => {
    console.log("Failed to connect to the database", error)
})
