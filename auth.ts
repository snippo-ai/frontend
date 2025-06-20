import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.status <= 301) {
          return {
            ...data.data,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
