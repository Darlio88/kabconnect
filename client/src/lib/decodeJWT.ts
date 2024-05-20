import { jwtDecode } from "jwt-decode";
import { IUser } from "./types";

export default function devodeJWT(token: string): Partial<IUser> {
  return jwtDecode(token);
}
