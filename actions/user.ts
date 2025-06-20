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

  if (!email || !password) {
    return { error: "Please fill out all required fields." };
  }
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log({ response });

    if (response.error) {
      return { error: response.error };
    }

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return { error: "Incorrect email or password" };
    }

    return { error: "Something went wrong" };
  }
};

export { login, signUp };
