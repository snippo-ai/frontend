import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getImagekitUrl } from "@/lib/utils";
import { User } from "next-auth";

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { userImage } = user;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-12 rounded-full">
        <AvatarImage
          src={
            userImage ||
            getImagekitUrl(
              "/web/icons/portrait_placeholder.png?updatedAt=1754030075591"
            )
          }
          alt="Update User Avatar"
          className="bg-transparent"
        />
      </Avatar>
      <Button size="sm" type="button" variant="secondary">
        Change
      </Button>
    </div>
  );
};

export default UserAvatar;
