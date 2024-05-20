import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
function Message() {
  return (
    <div className="w-full relative flex flex-col gap-2 transition-all hover:bg-stone-200 hover:cursor-pointer bg-stone-100 my-1 p-2 rounded-md shadow-sm">
      {/* upper container */}
      <div className="flex gap-2">
        <UserAvatar />
        {/* message body */}
        <div>
          {/* username */}
          <h4 className="font-semibold">Darlio 46</h4>
          <p className="font-light opacity-90">
            Yooo, will you be there at the events today
          </p>
        </div>
      </div>
      {/* bottom section */}
      <div className="w-full">
        <span className="w-full flex justify-end text-xs italic opacity-70">
          3 min ago
        </span>
      </div>
      <Badge className="flex aspect-square justify-center items-center rounded-full absolute right-2 top-[25%] shadow-sm">
        3
      </Badge>
    </div>
  );
}

export default Message;
