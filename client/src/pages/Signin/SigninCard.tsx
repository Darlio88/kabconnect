import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { baseUrl } from "@/lib/api";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
export default function SigninCard() {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, isSubmitting } = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const response = await baseUrl.post("/signin", values);
      if (response.data.error) {
        //toast an error
        toast.error("Error" + response.data.error);
        return;
      }

      //save the token in the local storage
      const token = response.data.token;
      console.log("token from server");
      if (!token) {
        toast.error("No token found");
        return;
      }
      localStorage.setItem("token", token);

      //reset the form before leaving page
      resetForm();
      //navigate to the chat pages
      navigate("/chats");
      console.log(response.data.token);
    },
  });
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Sign into your KabConnect account</CardTitle>
        <CardDescription>
          Welcome Back, Use your university email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signin" onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                id="email"
                placeholder="whitney.kanungu@kab.ac.ug"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="•••••••••"
                required
                min={4}
                max={10}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="grid ">
        <Button
          disabled={isSubmitting}
          className=""
          type="submit"
          form="signin"
        >
          Sign In
          {isSubmitting && (
            <span
              className={cn(
                "flex ml-2 p-1 justify-center items-center",
                "animate-spin",
              )}
            >
              <ImSpinner9 />
            </span>
          )}
        </Button>
        <div className="my-1">
          <p className="text-base">
            Do not have an account yet?{" "}
            <Link className="text-sky-800" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
