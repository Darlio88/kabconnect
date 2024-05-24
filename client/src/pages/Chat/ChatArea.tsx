import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { IoSendSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { baseUrl } from "@/lib/api";
import { Link, useParams } from "react-router-dom";
import { IChat, IMessage } from "@/lib/types";
import ChatItem from "./ChatItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import decodeJWT from "@/lib/decodeJWT";
import UserAvatar from "./UserAvatar";
function ChatArea() {
  const params = useParams();
  const token = localStorage.getItem("token");
  const { email } = decodeJWT(token as string);
  const chatId = params.chatId;
  const [textMessage, setTextMessage] = useState("");
  console.log(params);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await baseUrl.get(`chats/${chatId}`);
      if (response.data.error) {
        toast.error("Error:", response.data.error);
        console.log("Error:", response.data.error);
      }
      const { chat } = response.data;
      console.log(chat);
      return chat as IChat;
    },
    refetchInterval: 60000,
  });

  //send message
  async function sendMessage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    if (textMessage.length < 3) {
      toast.error("Message too short");
      return;
    }

    //get the user's email

    if (!email) {
      toast.error("No email found");
      return;
    }
    //send the message to the server
    const message: IMessage = {
      chatId: chatId as string,
      email: email,
      message: textMessage,
    };
    const response = await baseUrl.patch(`/chats/${chatId}`, message);

    if (response.data.error) {
      toast.error("Error sending the message");
      return;
    }
    if (response.data.msg) {
      toast.success("Message sent");
      queryClient.invalidateQueries(["messages"]);
      setTextMessage(() => "");
      return;
    }
  }
  //incase of error
  if (error) {
    console.log(error);
    return <div>Error fetching messages</div>;
  }
  //incase of loading
  if (isLoading) {
    return <div>Loading</div>;
  }
  //incase of an error
  if (data == undefined) {
    return <div>No messages, Error fetching messages</div>;
  }
  return (
    <div className="grid px-2 py-3">
      {/* container */}
      <div className="w-[400px] mx-auto">
        <section className="flex items-start justify-between mb-2">
          {/* left */}
          <div className="flex ">
            <Link
              // onClick={() => navigate("/chats")}
              to="/chats"
              className="flex items-center justify-center mr-1 rounded-full shadow-sm"
            >
              <FaArrowLeft />
            </Link>
            <span>{data.email1 === email ? data.email2 : data.email1}</span>
          </div>
          {/* right */}
          <div>
            <UserAvatar
              email={data.email1 === email ? data.email2 : data.email1}
            />
          </div>
        </section>
        <section className="grid gap-2">
          {data.messages && data.messages.length < 1 && (
            <div>No Messages...</div>
          )}
          {data.messages &&
            data.messages.map((message, idx) => (
              <ChatItem key={idx} message={message} />
            ))}
        </section>
        <span className="flex gap-2 my-2">
          <Input
            onChange={(e) => setTextMessage(e.target.value)}
            value={textMessage}
            placeholder="Enter message here..."
          />
          <Button
            disabled={textMessage.length < 2}
            onClick={sendMessage}
            type="button"
          >
            <IoSendSharp />
          </Button>
        </span>
      </div>
    </div>
  );
}

export default ChatArea;
