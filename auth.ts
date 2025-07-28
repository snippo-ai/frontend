/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
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
            data: { email, password },
          });

          const { data } = response;
          if (response.status <= 301) {
            return data.data;
          }
          return null;
        } catch (error: any) {
          console.error(`Auth Error ----> ${error?.response?.data}`);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Forces account selection every time
        },
      },
      profile: async (profile, tokens) => {
        const { id_token = "" } = tokens;
        const response = await axios.post(
          "http://localhost:8080/auth/login/oauth",
          {
            provider: "google",
            token: id_token,
          }
        );
        const { data } = response;
        if (response.status <= 301) {
          return data.data;
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Forces account selection every time
        },
      },
      profile: async (profile, tokens) => {
        const { access_token = "" } = tokens;
        const response = await axios.post(
          "http://localhost:8080/auth/login/oauth",
          {
            provider: "github",
            token: access_token,
          }
        );
        const { data } = response;
        if (response.status <= 301) {
          return data.data;
        }
        return null;
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
