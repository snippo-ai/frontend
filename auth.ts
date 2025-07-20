/* eslint-disable @typescript-eslint/no-explicit-any */
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
        try {
          const response = await fetcher({
            url: "/auth/login",
            method: "POST",
            data: JSON.stringify({ email, password }),
          });

          const { data } = response;
          if (response.status <= 301) {
            return data.data;
          }

          return null;
        } catch (error: any) {
          console.log(`Auth Error ----> ${error?.response?.data}`);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
        token.token = user.token;
        if (trigger === "update" && session) {
          if (token.user && typeof token.user === "object") {
            Object.assign(token.user, session);
          }
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
        session.token = token.token as string;
        session.id = (token.user as any).id;
        delete (session.user as any).token;
        delete (session.user as any).id;
      }
      return session;
    },
  },
});
