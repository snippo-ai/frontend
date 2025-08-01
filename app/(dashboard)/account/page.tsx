import { Metadata } from "next";
import AccountSection from "./_components/account-section";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings.",
};

const AccountPage = () => {
  return <AccountSection />;
};

export default AccountPage;
