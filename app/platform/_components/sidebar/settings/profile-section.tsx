import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, InfoIcon, User, UserCircle } from "lucide-react";
import { Session } from "next-auth";
import { Fragment } from "react";
import MainContentHeader from "./main-content-header";

type ProfileSectionProps = {
  session: Session;
};

const ProfileSection = ({ session }: ProfileSectionProps) => (
  <Fragment>
    <MainContentHeader
      title="Profile"
      description="Manage your account settings and profile information."
      icon={User}
    />
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Typography as="label" fluidSize="xs" className="block font-medium">
            First name
          </Typography>
          <Input
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            className="mt-2"
            value={session.user.firstName}
          />
        </div>
        <div>
          <Typography as="label" fluidSize="xs" className="block font-medium">
            Last name
          </Typography>
          <Input
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            className="mt-2"
            value={session.user.lastName}
          />
        </div>
        <div className="md:col-span-2">
          <Typography as="label" fluidSize="xs" className="block font-medium">
            Email address
          </Typography>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2"
            value={session.user.email}
            disabled
          />
          {!session.user.isEmailVerified && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-center gap-3 mt-2 p-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/30 shadow-sm"
            >
              <InfoIcon
                className="size-5 text-amber-500 shrink-0"
                aria-hidden
              />
              <Typography
                as="p"
                fluidSize="sm"
                className="!text-amber-700 dark:!text-amber-300 font-medium"
              >
                This email is not verified.
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div>
        <Typography as="label" fluidSize="xs" className="block font-medium">
          About
        </Typography>
        <Textarea
          id="about"
          name="about"
          rows={3}
          placeholder="Write a few sentences about yourself."
          className="mt-2"
        />
      </div>
      <div className="flex items-center gap-4">
        <UserCircle aria-hidden className="size-12 text-muted-foreground" />
        <Button type="button" variant="secondary">
          Change
        </Button>
      </div>
      <div>
        <Typography as="label" fluidSize="xs" className="block font-medium">
          Cover photo
        </Typography>
        <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6">
          <ImageIcon
            aria-hidden
            className="size-12 text-muted-foreground mb-2"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-primary font-semibold"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
          <Typography
            as="p"
            fluidSize="xs"
            className="text-muted-foreground mt-2"
          >
            PNG, JPG, GIF up to 10MB
          </Typography>
        </div>
      </div>
    </div>
  </Fragment>
);

export default ProfileSection;
