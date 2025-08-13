"use client";

import UserAvatarUploader from "@/components/ui/user-avatar-uploader";
import { getImagekitUrl } from "@/lib/utils";
import { User } from "next-auth";

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { firstName = "", lastName = "", userImage = "" } = user;
  const imageSrc =
    userImage ||
    getImagekitUrl(
      "/web/icons/portrait_placeholder.png?updatedAt=1754030075591"
    );
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

  return (
    <section
      className="flex items-center gap-4"
      aria-labelledby="user-avatar-heading"
    >
      <h2 id="user-avatar-heading" className="sr-only">
        User Avatar
      </h2>
      <UserAvatarUploader initialUserImage={imageSrc} fullName={fullName} />
      {/* <Avatar className="size-12 rounded-lg">
        <AvatarImage
          src={imageSrc}
          alt="User avatar"
          className="bg-transparent"
        />
        <AvatarFallback className="rounded-lg">
          {getInitials(fullName)}
        </AvatarFallback>
      </Avatar> */}
      {/* <Button
        size="sm"
        type="button"
        variant="secondary"
        aria-label="Change your avatar"
      >
        Change Avatar
      </Button> */}
    </section>
  );
};

export default UserAvatar;
