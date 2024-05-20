export interface IUser{
    email:string,
    password:string,
    role:"student" | "admin",
    department: "DOCS" |"DOIT" |"DOLIS"
}

export interface IChat{
    chatId:string,
    email1:string,
    email2:string,
    updatedAt:string,
    createdAt:string,
    messages:IMessage[]
}

export interface IMessage{
    chatId:string,
    email:string,
    message:string,
    createdAt:string
}
// [9:19 PM, 5/15/2024] Whitney: Department of computer science
// [9:19 PM, 5/15/2024] Whitney: Department of information technology
// [9:19 PM, 5/15/2024] Whitney: Department of library and information science