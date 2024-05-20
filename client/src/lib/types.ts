export interface IUser {
  email: string;
  password: string;
  role: "student" | "admin";
  department: "DOCS" | "DOIT" | "DOLIS";
}
