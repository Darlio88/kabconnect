import { IMessage } from "@/lib/types";
import moment from "moment";
import decodeJWT from "@/lib/decodeJWT";
import { cn } from "@/lib/utils";

function ChatItem({ message }: { message: IMessage }) {
  const token = localStorage.getItem("token");
  const { email: myemail } = decodeJWT(token as string);
  return (
    <div className={cn("flex", message.email === myemail && " justify-end")}>
      {/* message */}
      <div
        className={cn(
          "p-2 my-1 rounded shadow max-w-[50%] bg-stone-100",
          message.email === myemail && "bg-stone-500",
        )}
      >
        <div className="text-xs ">
          {message.email === myemail ? "You" : message.email}
        </div>
        <div>{message.message}</div>
        {/* time of creation */}
        <div className="flex justify-end text-xs">
          {message.createdAt !== undefined &&
            moment(message.createdAt).fromNow()}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
