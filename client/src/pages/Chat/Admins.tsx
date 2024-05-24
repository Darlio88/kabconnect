import { Button } from "@/components/ui/button";
import { PiWechatLogo } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { IChat, IUser } from "@/lib/types";
import { baseUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import decodeJWT from "@/lib/decodeJWT";
import { useNavigate } from "react-router-dom";
import { departments } from "../../lib/mappings";
export default function Admins() {
  const [users, setUsers] = useState<IUser[] | null>([]);
  // search for chat with the email above and email of the current logged in user
  //the current user's email is in the local storage
  const token = localStorage.getItem("token") || "";
  const { email: currentEmail } = decodeJWT(token);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      const response = await baseUrl.get("/users");
      if (response.data.error) {
        toast.error("Error:", response.data.error);
        console.log("Error:", response.data.error);
      }
      const { users: fetchedUsers } = response.data;
      setUsers(fetchedUsers as IUser[]);
    }

    fetchUsers();
  }, []);

  async function handleChatNavigation(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    email: string,
  ) {
    e.preventDefault();

    //fetch the chat id from the server
    const response = await baseUrl.get(
      `/chats/search?email1=${currentEmail}&email2=${email}`,
    );

    //check if there is an error
    if (response.data.error) {
      console.log("Error:", response.data.error);
      toast.error("Error:", response.data.error);
      return;
    }
    const chat: IChat = response.data.chat;
    // navigate to the chat area fetched server;
    navigate(`/chats/${chat.chatId}`);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2 text-lg font-bold">
          <PiWechatLogo />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Admins</DialogTitle>
          <DialogDescription>Send messages directly to admin</DialogDescription>
        </DialogHeader>
        {/* doit */}
        {/* docs */}
        {/* doitcs */}
        {users !== null &&
          users.slice(0, 3).map((user, idx) =>
            user.email !== currentEmail && user.role === "admin" ? (
              <div>
                <span>{departments[user.department]}</span>
                <Badge
                  onClick={(e) => handleChatNavigation(e, user.email)}
                  className="shadow-sm hover:cursor-pointer"
                  key={idx}
                >
                  {user.email}
                </Badge>
              </div>
            ) : null,
          )}
        <DialogFooter>
          <Button asChild type="submit">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
