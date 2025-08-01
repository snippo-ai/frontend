import { auth } from "@/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AccountSection from "./_components/account-section";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings.",
};

const AccountPage = async () => {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  return <AccountSection session={session} />;
};

export default AccountPage;
