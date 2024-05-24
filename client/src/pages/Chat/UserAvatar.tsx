import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/types";

export default function UserAvatar({ email }: Partial<IUser>) {
  return (
    <Avatar>
      <AvatarImage src="https://github.comm/shadcn.png" alt="@shadcn" />
      <AvatarFallback className="border shadow-sm  border-stone-500">
        {email?.slice(0, 2).toLocaleUpperCase() || "CN"}
      </AvatarFallback>
    </Avatar>
  );
}
