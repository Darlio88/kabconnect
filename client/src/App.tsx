import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Signup from "@/pages/Signup";

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
      path: "/chats/:chatID",
      element: <Chat />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
