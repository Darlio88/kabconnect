import mongoose from "mongoose";
import { IChat, IUser, IMessage } from './types';


//schemas
const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const messageSchema = new mongoose.Schema<IMessage>(
    {
        email:{
            type:String,
            required:true
        },
        chatId:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)
const chatSchema = new mongoose.Schema<IChat>(
    {
        email1: {
            type: String,
            required: true
        },
        email2: {
            type: String,
            required: true
        },
        messages:[messageSchema],
        chatId: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
)


//models
export const User = mongoose.model<IUser>("user", userSchema)
export const Chat= mongoose.model<IChat>("chat",chatSchema)
export const message = mongoose.model<IMessage>("message", messageSchema)
