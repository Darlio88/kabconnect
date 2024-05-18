import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SigninCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign into your KabConnect account</CardTitle>
        <CardDescription>Welcome Back, Use your university email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input required type="email" id="email" placeholder="whitney.kanungu@kab.ac.ug" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="•••••••••" required min={4} max={10} />
            </div>
          </div>
        </form>
      </CardContent >
      <CardFooter className=" grid">
        <Button>Sign In</Button>
      </CardFooter>
    </Card>
  )
}
