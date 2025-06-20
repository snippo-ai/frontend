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
        const { data } = await response.json();
        const user = { ...data.user, token: data.token };
        console.log({ user });

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
      console.log("jwt :: ", { user });
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      console.log("session :: ", { session, token });
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      return session;
    },
  },
});
