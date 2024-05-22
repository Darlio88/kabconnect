import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//pages
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Signup from "@/pages/Signup";
import ChatArea from "./pages/Chat/ChatArea";

//query client
const client = new QueryClient();
function App() {
  //routes for the pages
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/chats",
      element: <Chat />,
    },
    {
      path: "signin",
      element: <Signin />,
    },
    {
      path: "/chats/:chatId",
      element: <ChatArea />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
