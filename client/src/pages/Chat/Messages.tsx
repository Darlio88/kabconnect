import Message from "./Message";
import { baseUrl } from "@/lib/api";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { IChat } from "@/lib/types";
import decodeJWT from "@/lib/decodeJWT";
function Messages() {
  const token = localStorage.getItem("token");
  const { email } = decodeJWT(token as string);
  const { data, error, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await baseUrl.get(`users/chats/${email}`);
      if (response.data.error) {
        toast.error("Error:", response.data.error);
        console.log("Error:", response.data.error);
      }
      const { chats } = response.data;
      console.log(chats);
      return chats as IChat[];
    },
    refetchInterval: 60000,
  });

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
    <section className="grid gap-1">
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((chat, idx) =>
          chat.messages.length > 0 ? (
            <Message
              chatId={chat.chatId}
              email={chat.email1 === email ? chat.email2 : chat.email1}
              key={idx}
              message={chat.messages[chat.messages.length - 1]}
            />
          ) : null,
        )}
    </section>
  );
}

export default Messages;
