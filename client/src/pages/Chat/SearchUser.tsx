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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { baseUrl } from "@/lib/api";
import decodeJWT from "@/lib/decodeJWT";
import { IChat, IUser } from "@/lib/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SearchUser() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[] | null>([]);

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
  useEffect(() => {
    console.log("input:", input, "users here", users);
    if (input.length < 5) {
      setFilteredUsers(() => []);
    } else {
      //filter the users
      const filtered = users.filter((user) => user.email.indexOf(input) !== -1);
      console.log("filtered", filtered);
      setFilteredUsers(() => filtered);
    }
  }, [input]);

  //handle the change in serach input
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInput(e.target.value);
  }

  //handle the clicking the users email
  async function handleChatNavigation(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    email: string,
  ) {
    e.preventDefault();
    // search for chat with the email above and email of the current logged in user
    //the current user's email is in the local storage
    const token = localStorage.getItem("token") || "";
    const { email: currentEmail } = decodeJWT(token);

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
        <Button variant="outline">Search for user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search for user</DialogTitle>
          <DialogDescription>
            Search for the user using their email and search chat.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={input}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid">
            <h6 className="">Filtered chats</h6>
            <div>
              {filteredUsers.length > 0
                ? filteredUsers.slice(0, 3).map((user, idx) => (
                    <span
                      onClick={(e) => handleChatNavigation(e, user.email)}
                      className="shadow-sm hover:cursor-pointer"
                      key={idx}
                    >
                      {user.email}
                    </span>
                  ))
                : "No matches"}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
