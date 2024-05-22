import SearchUser from "./SearchUser";
import Messages from "./Messages";

function Index() {
  return (
    <div className="grid w-[380px] py-3 px-2">
      {/* wrapper */}
      <div className="grid mx-2 md:mx-auto w-[400px] ">
        {/*title area  */}
        <section className="flex items-center justify-between">
          <h6>My Messages</h6>
          <SearchUser />
        </section>
        {/* messages list*/}
        <Messages />
      </div>
    </div>
  );
}

export default Index;
