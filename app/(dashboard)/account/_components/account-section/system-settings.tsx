import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLogoutWithConfirm } from "@/hooks/use-logout-with-confirm";
import { ArrowUpRightIcon } from "lucide-react";
import LineItem from "../line-item";
import MainContentHeader from "../main-content-header";

type SystemSettingsProps = {
  userEmail: string;
};

const SystemSettings = ({ userEmail }: SystemSettingsProps) => {
  const handleLogout = useLogoutWithConfirm();

  return (
    <>
      <MainContentHeader title="System" className="mt-12" />
      <Separator className="my-4 mb-6" />

      <div className="grid gap-4" aria-label="system-actions">
        <LineItem
          label="Support"
          action={
            <Button variant="secondary" aria-label="Contact support">
              Contact <ArrowUpRightIcon aria-hidden />
            </Button>
          }
        />
        <LineItem
          label={`You are logged in as ${userEmail}`}
          action={
            <Button
              variant="destructive"
              aria-label="Logout from account"
              onClick={handleLogout}
            >
              Logout
            </Button>
          }
        />
        <LineItem
          label="Delete account"
          subLabel="Permanently delete your account and data"
          action={
            <Button
              variant="secondary"
              aria-label="Learn more about account deletion"
            >
              Learn More
            </Button>
          }
        />
      </div>
    </>
  );
};

export default SystemSettings;
