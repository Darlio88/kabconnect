import jwt from "jsonwebtoken"
import { IUser } from "./types"
import { v4 as uuidv4 } from 'uuid';
export const createJWT = (data:Partial<IUser>) =>{
    const secret = process.env.JWT_SECRET
    return jwt.sign(data,secret as string,{expiresIn:"1h"})
}

export function createID(){
  return uuidv4()
}