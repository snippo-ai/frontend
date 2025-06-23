import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetcher } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const response = await fetcher({
          url: "/auth/login",
          method: "POST",
          data: JSON.stringify({ email, password }),
        });

        const { data } = response;
        const user = { ...data.user, token: data.token };

        if (response.status <= 301) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      return session;
    },
  },
});
