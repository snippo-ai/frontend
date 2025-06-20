import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // Add custom properties to the User object here
    token: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    // Add custom properties directly to the Session object here
    customSessionProperty: string;
  }
}
