import { auth } from "@/auth";
import ProfileSection from "../_components/profile-section";
import { notFound } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  return <ProfileSection session={session} />;
};

export default ProfilePage;
