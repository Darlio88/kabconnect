import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen lg:flex-row">
      <section>
        <div>
          <img src="logo.png" alt="University logo" />
        </div>
      </section>
      <section className="w-[300px] space-y-2 text-center">
        <h1 className="text-lg font-bold lg:text-xl text-stone-900">
          Welcome to KabConnect Platform
        </h1>
        <p className="text-sm capitalize text-stone-700 opacity-80">
          communicate with Kabale University heads of departments effectively
        </p>
        <Button onClick={() => navigate("/chats")} className="capitalize">
          Click here to continue
        </Button>
      </section>
    </div>
  );
}

export default Index;
