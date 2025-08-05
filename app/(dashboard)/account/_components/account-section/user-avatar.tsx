"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getImagekitUrl } from "@/lib/utils";
import { User } from "next-auth";

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const fallbackImage = getImagekitUrl(
    "/web/icons/portrait_placeholder.png?updatedAt=1754030075591"
  );

  const imageSrc = user?.userImage || fallbackImage;

  return (
    <section
      className="flex items-center gap-4"
      aria-labelledby="user-avatar-heading"
    >
      <h2 id="user-avatar-heading" className="sr-only">
        User Avatar
      </h2>
      <Avatar className="size-12 rounded-full">
        <AvatarImage
          src={imageSrc}
          alt="User avatar"
          className="bg-transparent"
        />
      </Avatar>
      <Button
        size="sm"
        type="button"
        variant="secondary"
        aria-label="Change your avatar"
      >
        Change Avatar
      </Button>
    </section>
  );
};

export default UserAvatar;
