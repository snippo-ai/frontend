"use server";

import { signIn } from "@/auth";

export type PreviousStateType = {
  success?: boolean;
  error?: string | null;
  values?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

const signUp = async (
  previousState: PreviousStateType,
  formData: FormData
): Promise<PreviousStateType> => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !email || !password) {
    return { error: "Please fill out all required fields." };
  }

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const values = { firstName, lastName, email };
    return { error: data?.message || "Something went wrong", values };
  }

  const loginResponse = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (loginResponse?.error) {
    return { error: loginResponse.error };
  }

  return { success: true };
};

const login = async (
  previousState: {
    success?: boolean;
    error?: string | null;
  } | null,
  formData: FormData
): Promise<{
  success?: boolean;
  error?: string | null;
}> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response.error) {
      return { error: response.error };
    }

    return { success: true };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      (error as { type?: string }).type === "CredentialsSignin"
    ) {
      return { error: "Incorrect email or password" };
    }
    return { error: "Something went wrong" };
  }
};

export { login, signUp };
