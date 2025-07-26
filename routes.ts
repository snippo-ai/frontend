/**
 * Default route constants for the application
 */

// Authentication routes
export const DEFAULT_LOGIN_ROUTE = "/login";
export const DEFAULT_SIGNUP_ROUTE = "/sign-up";
export const DEFAULT_FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const DEFAULT_RESET_PASSWORD_ROUTE = "/reset-password";
export const DEFAULT_REDIRECT_AFTER_LOGOUT = "/";

// Dashboard and main app routes
export const DEFAULT_DASHBOARD_ROUTE = "/platform";
export const DEFAULT_ONBOARDING_ROUTE = "/onboarding";

// Protected route prefixes
export const PROTECTED_ROUTES = ["/platform", "/onboarding"];

// Public route prefixes
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

// Route groups
export const AUTH_ROUTES = {
  LOGIN: DEFAULT_LOGIN_ROUTE,
  SIGNUP: DEFAULT_SIGNUP_ROUTE,
  FORGOT_PASSWORD: DEFAULT_FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD: DEFAULT_RESET_PASSWORD_ROUTE,
} as const;

export const APP_ROUTES = {
  DASHBOARD: DEFAULT_DASHBOARD_ROUTE,
  ONBOARDING: DEFAULT_ONBOARDING_ROUTE,
} as const;

export const REDIRECT_ROUTES = {
  AFTER_LOGIN: DEFAULT_DASHBOARD_ROUTE,
  AFTER_SIGNUP: DEFAULT_ONBOARDING_ROUTE,
  AFTER_LOGOUT: DEFAULT_REDIRECT_AFTER_LOGOUT,
} as const;
