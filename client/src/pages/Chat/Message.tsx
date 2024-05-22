import { IMessage } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
function Message({ message, email }: { message: IMessage; email: string }) {
  return (
    <div className="relative flex flex-col w-full gap-2 p-2 my-1 transition-all rounded-md shadow-sm hover:bg-stone-200 hover:cursor-pointer bg-stone-100">
      {/* upper container */}
      <div className="flex gap-2">
        <UserAvatar email={email} />
        {/* message body */}
        <div>
          {/* username */}
          <h4 className="font-semibold">{email}</h4>
          <p className="font-light opacity-90">{message.message}</p>
        </div>
      </div>
      {/* bottom section */}
      <div className="w-full">
        <span className="flex justify-end w-full text-xs italic opacity-70">
          {message.createdAt !== undefined &&
            moment(message.createdAt).fromNow()}
        </span>
      </div>
      <Badge className="flex aspect-square justify-center items-center rounded-full absolute right-2 top-[25%] shadow-sm">
        3
      </Badge>
    </div>
  );
}

export default Message;
