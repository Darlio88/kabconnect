import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/types";

export default function UserAvatar({ email }: Partial<IUser>) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{email?.slice(0, 2) || "CN"}</AvatarFallback>
    </Avatar>
  );
}
