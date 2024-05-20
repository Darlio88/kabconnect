import { IUser } from "@/lib/types";
import Message from "./Message";
import SearchUser from "./SearchUser";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/api";
import toast from "react-hot-toast";
function index() {
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
  return (
    <div className="grid w-[380px] py-3 px-2">
      {/* wrapper */}
      <div className="grid mx-2 md:mx-auto w-[400px] ">
        {/*title area  */}
        <section className="flex justify-between items-center">
          <h6>My Messages</h6>
          <SearchUser users={users} />
        </section>
        {/* messages list*/}
        <section className="grid gap-1">
          {Array(15)
            .fill(0)
            .map((_, idx) => (
              <Message key={idx} />
            ))}
        </section>
      </div>
    </div>
  );
}

export default index;
