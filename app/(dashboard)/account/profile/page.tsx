import { auth } from "@/auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileSection from "../_components/profile-section";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile information.",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  return <ProfileSection session={session} />;
};

export default ProfilePage;
