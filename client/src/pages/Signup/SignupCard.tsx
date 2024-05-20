import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/lib/types";
import { baseUrl } from "@/lib/api";
export default function SignupCard() {
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormik<IUser>({
      initialValues: {
        email: "",
        department: "DOCS",
        password: "",
        role: "student",
      },
      onSubmit: async (values, { resetForm }) => {
        console.log(values);
        const response = await baseUrl.post("/signup", values);
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

        //reset the forms before leaving
        resetForm();
        //navigate to the chat pages
        navigate("/chats");
        console.log(response.data.token);
      },
    });
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Create a kabConnect account</CardTitle>
        <CardDescription>Welcome, Use your university email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="signup">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                onChange={handleChange}
                name="email"
                value={values.email}
                required
                type="email"
                id="email"
                placeholder="whitney.kanungu@kab.ac.ug"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="department">Department</Label>
              <Select
                name="department"
                value={values.department}
                onValueChange={(value) => {
                  setFieldValue("department", value);
                }}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="DOCS">
                    Department of computer science
                  </SelectItem>
                  <SelectItem value="DOIT" className="truncate">
                    Department of information technology
                  </SelectItem>
                  <SelectItem value="DOLIS" className="truncate">
                    Department of library and information science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RadioGroup
              defaultValue={"student"}
              name="role"
              value={values.role}
              onValueChange={(value) => {
                setFieldValue("role", value);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                placeholder="•••••••••"
                required
                min={4}
                max={10}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className=" grid">
        <Button type="submit" form="signup">
          Sign Up
        </Button>
        <div className="my-1">
          <p className="text-base">
            Do not have an account yet?{" "}
            <Link className="text-sky-800" to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
