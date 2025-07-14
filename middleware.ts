import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/platform"];

const AUTH_ROUTES = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("redirectUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
