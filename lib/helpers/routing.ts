import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "../../routes";

/**
 * Checks if a given pathname is a protected route.
 * @param pathname The pathname to check.
 * @returns {boolean} True if the pathname is a protected route, false otherwise.
 */
export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((prefix) => pathname.startsWith(prefix));
};

/**
 * Checks if a given pathname is a public route.
 * @param pathname The pathname to check.
 * @returns {boolean} True if the pathname is a public route, false otherwise.
 */
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(
    (prefix) =>
      pathname === prefix || (prefix !== "/" && pathname.startsWith(prefix))
  );
};

/**
 * Checks if a given pathname is an auth route.
 * @param pathname The pathname to check.
 * @returns {boolean} True if the pathname is an auth route, false otherwise.
 */
export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(
    pathname as (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES]
  );
};
