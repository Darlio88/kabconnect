import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//pages
import Signin from "@/pages/Signin";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Signup from "@/pages/Signup";
import ChatArea from "./pages/Chat/ChatArea";
import PrivateRoutes from "./components/ProtectedRoute";

//query client
const client = new QueryClient();
function App() {
  //routes for the pages
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {

  //     element: <PrivateRoutes />,
  //     children:[
  //       {
  //         path: "/chats",
  //         element: <Chat />,
  //       },
  //       {
  //         path: "/chats/:chatId",
  //         element: <ChatArea />,
  //       }
  //     ]
  //   },
  //   {
  //     path: "signin",
  //     element: <Signin />,
  //   },
  //   {
  //     path: "/chats/:chatId",
  //     element: <ChatArea />,
  //   },
  //   {
  //     path: "signup",
  //     element: <Signup />,
  //   },
  // ]);

  return (
    <QueryClientProvider client={client}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Chat />} path="/chats" />
            <Route element={<ChatArea />} path="/chats/:chatId" />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
