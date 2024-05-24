"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//controllers for the various routes
const controllers_1 = require("./controllers");
//all users
router.get("/users", controllers_1.getAllUsers);
// sigin user 
router.post("/signin", controllers_1.signinController);
//signup user
router.post("/signup", controllers_1.signupController);
//chats
router.get("/chats/search", controllers_1.findChat);
// Find one specific chat
router.get("/chats/:chatId", controllers_1.thisChat);
//find my chats
router.get("/users/chats/:email", controllers_1.myChats);
//update chat
router.patch("/chats/:chatId", controllers_1.updateChat);
//export the routes to be used by the application
exports.default = router;
