import SearchUser from "./SearchUser";
import Messages from "./Messages";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Admins from "./Admins";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import decodeJWT from "@/lib/decodeJWT";
import Broadcast from "./Broadcast";
function Index() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("No token");
      navigate("/home");
    }
    const { role } = decodeJWT(token as string);
    if (role !== undefined && role === "admin") {
      setIsAdmin(true);
    }
  }, []);
  return (
    <div className="grid px-2 py-3">
      {/* wrapper */}
      <div className="grid mx-2 md:mx-auto w-[400px] ">
        {/*title area  */}
        <section className="flex items-center justify-between">
          <h6 className="text-lg font-semibold capitalize">My Messages</h6>
          <Button
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
          {isAdmin ? (
            <>
             <Broadcast />
            <SearchUser />
            </>
            
          ) : (
            <>
             
              <Admins />
            </>
          )}
        </section>
        {/* messages list*/}
        <Messages />
      </div>
    </div>
  );
}

export default Index;
