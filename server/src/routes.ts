import express from "express"

const router = express.Router()

//controllers for the various routes
import { findChat, getAllUsers, myChats, signinController, signupController, thisChat, updateChat } from "./controllers"

//all users
router.get("/users",getAllUsers )
// sigin user 
router.post("/signin",signinController)



//signup user
router.post("/signup",signupController)

//chats
router.get("/chats/search",findChat)

// Find one specific chat
router.get("/chats/:chatId",thisChat)

//find my chats
router.get("/users/chats/:email", myChats)

//update chat
router.patch("/chats/:chatId",updateChat)
//export the routes to be used by the application
export default router