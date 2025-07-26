import { auth } from "@/auth";
import { isAuthRoute, isProtectedRoute } from "@/lib/helpers/routing";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const { pathname, origin } = nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtectedRouteBool = isProtectedRoute(pathname);
  const isAuthRouteBool = isAuthRoute(pathname);

  if (isProtectedRouteBool && !isLoggedIn) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("redirectUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRouteBool && isLoggedIn) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
