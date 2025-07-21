import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { Session } from "next-auth";
import { isProduction } from "./config";

/**
 * Universal data fetcher using Axios that works on both server and client.
 * Automatically attaches Bearer token from NextAuth session.
 * @param config Axios request config
 * @param session Optional session object (pass on server side for best performance)
 */
export async function fetcher(
  config: AxiosRequestConfig,
  session: Session | null = null
) {
  let token;

  // If session is provided (server), use it
  if (session && session?.token) {
    token = session.token;
  } else {
    // Try to get session on client
    if (typeof window !== "undefined") {
      const { getSession } = await import("next-auth/react");
      const clientSession = await getSession();
      token = clientSession?.token;
    } else {
      // On server, try to use auth() if available
      try {
        const { auth } = await import("@/auth");
        const serverSession = await auth();
        token = serverSession?.token;
      } catch {
        // Fallback: no token
        token = undefined;
      }
    }
  }

  const axiosConfig = {
    baseURL: isProduction ? "" : "http://localhost:8080",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(config.headers || {}),
    },
    ...config,
  };

  return axios(axiosConfig);
}
