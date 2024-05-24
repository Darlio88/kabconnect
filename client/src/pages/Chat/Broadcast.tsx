import { Button } from "@/components/ui/button";
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
import { LiaBroadcastTowerSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { IChat, IMessage, IUser } from "@/lib/types";
import { baseUrl } from "@/lib/api";
import decodeJWT from "@/lib/decodeJWT";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImSpinner9 } from "react-icons/im";
export default function Broadcast() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [users, setUsers] = useState<IUser[] | null>([]);
  // search for chat with the email above and email of the current logged in user
  //the current user's email is in the local storage
  const token = localStorage.getItem("token") || "";
  const [message, setMessage] = useState("");
  const {
    email: currentEmail,
    role: currentRole,
    department: currentDepartment,
  } = decodeJWT(token);
  useEffect(() => {
    async function fetchUsers() {
      const response = await baseUrl.get("/users");
      if (response.data.error) {
        toast.error("Error:", response.data.error);
        console.log("Error:", response.data.error);
      }
      const { users: fetchedUsers }: { users: IUser[] } = response.data;

      //filter users by the current head of department
      const filteredUsers = fetchedUsers.filter(
        (user) =>
          user.department === currentDepartment && user.role === "student",
      );
      setUsers(filteredUsers);
    }

    fetchUsers();
  }, []);

  async function broadcastMessage(
    email1: string,
    email2: string,
    broadcast: string,
  ) {
    //fetch the chat id from the server
    const response1 = await baseUrl.get(
      `/chats/search?email1=${email1}&email2=${email2}`,
    );

    //check if there is an error
    if (response1.data.error) {
      console.log("Error:", response1.data.error);
      toast.error("Error:", response1.data.error);
      return;
    }
    const chat: IChat = response1.data.chat;

    const broadcastPayload:IMessage={
           message:broadcast,
           email:currentEmail as string,
           chatId:chat.chatId
    }
    //use the chatId to send a message to the user
    const response2 = await baseUrl.patch(`/chats/${chat.chatId}`, broadcastPayload);

    if (response2.data.error) {
      toast.error("Error sending the message");
      return;
    }
  }
  async function handleBroadcastMessage(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) {
    e.preventDefault();

    try {
      setIsBroadcasting(() => true);
      // make sure the person is an admin
      if (currentRole !== "admin") {
        toast.error("Only Admin can broadcast messages");
        return;
      }

      // loop over all the users and send the message
      users?.forEach((user) => {
        broadcastMessage(currentEmail as string, user.email, message);
      });
      toast.success(`Successfully broadcasted message to ${currentDepartment}`)
    } catch (error) {
      console.log("Error broadcasting messages", error);
      toast.error("Error broadcasting messages");
    } finally {
      setIsBroadcasting(() => false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2 text-lg font-bold">
          <LiaBroadcastTowerSolid />
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
        <Input
          name="message"
          placeholder="Enter message to broadcast..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button
          disabled={isBroadcasting || message.length < 3}
          onClick={(e) => handleBroadcastMessage(e)}
          className="shadow-sm hover:cursor-pointer"
        >
          Broadcast Message{" "}
          {isBroadcasting && (
            <span
              className={cn(
                "flex ml-2 p-1 justify-center items-center",
                "animate-spin",
              )}
            >
              <ImSpinner9 />
            </span>
          )}
        </Button>

        <DialogFooter>
          <Button asChild type="submit">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
