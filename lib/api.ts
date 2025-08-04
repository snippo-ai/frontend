import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { Session } from "next-auth";
import { getClientToken } from "./client-token";
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

  if (session && session?.token) {
    token = session.token;
  } else {
    if (typeof window !== "undefined") {
      token = await getClientToken();
    } else {
      try {
        const { auth } = await import("@/auth");
        const serverSession = await auth();
        token = serverSession?.token;
      } catch {
        token = undefined;
      }
    }
  }

  const axiosConfig = {
    baseURL: isProduction ? "" : "http://localhost:8080",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(config.headers || {}),
    },
    ...config,
  };

  return axios(axiosConfig);
}
