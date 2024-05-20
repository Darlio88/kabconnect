import { Response, Request } from "express";
import bcrypt from "bcryptjs"
import { IMessage, IUser } from "./types";
import { Chat, User } from "./models";
import { createID, createJWT } from "./utils";


export const signinController = async (req: Request, res: Response) => {
    try {
        const { email, password }: Partial<IUser> = req.body;
        // check if user exists in the database
        const checkUser = await User.findOne({ email: email });
        console.log("this is the checked user", checkUser)
        // if user doesn't exist
        if (!checkUser) return res.status(404).send({ error: "incorrect password or email" })

        //check if the passwords are correct
        if (!password || (password && !bcrypt.compareSync(password, checkUser.password))) return res.status(401).send({ error: "incorrect password or email" })

        //return  the signed token, should contain email, role, department
        const tokenPayload = { email: checkUser.email, role: checkUser.role, department: checkUser.department }
        const token = createJWT(tokenPayload)
        return res.status(200).send({ token })
    } catch (error) {
        return res.status(500).send({ error: "Server error" })
    }
}

export const signupController = async (req: Request, res: Response) => {
    try {
        const { email, password, department, role }: IUser = req.body;

        //check if user with that email already exists
        const checkUser = await User.findOne({ email: email });

        //if user exists then rejct sign up
        if (checkUser) return res.status(409).send({ error: "User already exists" })
        //create password hash
        const passwordHash = await bcrypt.hash(password, 10)

        //save the user information in the database
        const newUser = await User.create({ email, department, role, password: passwordHash })
        await newUser.save()
        //return  the signed token, should contain email, role, department
        const tokenPayload = { email: newUser.email, role: newUser.role, department: newUser.department }
        const token = createJWT(tokenPayload)
        return res.status(200).send({ token })
    } catch (error) {
        return res.status(500).send({ error: "Server error" })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({})
        return res.status(200).send({ users: users })
    } catch (error) {
        console.log("Server error", error)
        return res.status(500).send({ error: "Server error" })
    }
}


export const findChat = async (req: Request, res: Response) => {
    try {
        const { email1, email2 } = req.query;
        if (!email1 || !email2) return res.status(403).send({ error: "invalid emails" })

        if (email1 && email2) {
            const checkChat = await Chat.findOne({ email1, email2 })
            if (checkChat) return res.status(200).send({ chat: checkChat })
            //if there is none, create a new chat room;
            const chatId = createID()
            const newChat = await Chat.create({ chatId, email1, email2 })
            await newChat.save()
            return res.status(201).send({ chat: newChat })
        }
    } catch (error) {
        console.log("Server error", error)
        return res.status(500).send({ error: "Server error" })
    }
}

export const thisChat = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const checkChat = await Chat.findOne({ chatId })
        if (!checkChat) return res.status(404).send({ "error": "Chat not found" })

        return res.status(200).send({ chat: checkChat })
    } catch (error) {
        console.log("Server error", error)
        return res.status(500).send({ error: "Server error" })
    }
}


export const myChats = async (req: Request, res: Response) => {
    try {
      const {email} = req.params;
      if(!email) return res.status(403).send({error:"Error, no email available"})
      const chats = await Chat.find({
        $or:[
            {email1:email},
            {email2:email}
        ]
      })

      return res.status(200).send({chats})
    } catch (error) {
        console.log("Server error", error)
        return res.status(500).send({ error: "Server error" })
    }
}

export const updateChat = async (req: Request, res: Response) => {
    try {
    const {chatId} = req.params
    const message:IMessage= req.body
    const checkChat = await Chat.findOne({chatId})

    // if there is no chat
    if(!checkChat) return res.status(404).send({error:"No chat found with that Id:"+chatId})
     
    if(!message.chatId || !message.email || !message.message) return res.status(403).send({error:"Corrupt message"})



    checkChat.messages.push(message)

    await checkChat.save()
    return res.status(201).send({msg:"OK"})
    } catch (error) {
        console.log("Server error", error)
        return res.status(500).send({ error: "Server error" })
    }
}