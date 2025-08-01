import Typography from "@/components/shared/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BellIcon } from "lucide-react";
import { Fragment } from "react";
import MainContentHeader from "./main-content-header";

const NotificationsSection = () => (
  <Fragment>
    <MainContentHeader
      title="Notifications"
      description="We'll always let you know about important changes, but you pick
        what else you want to hear about."
      icon={BellIcon}
    />
    <div className="space-y-6">
      <div>
        <Typography as="legend" fluidSize="sm" className="font-semibold">
          By email
        </Typography>
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox id="comments" defaultChecked />
            <div>
              <Typography as="label" className="font-medium">
                Comments
              </Typography>
              <Typography
                as="p"
                fluidSize="xs"
                className="text-muted-foreground"
              >
                Get notified when someone posts a comment on a posting.
              </Typography>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="candidates" />
            <div>
              <Typography as="label" className="font-medium">
                Candidates
              </Typography>
              <Typography
                as="p"
                fluidSize="xs"
                className="text-muted-foreground"
              >
                Get notified when a candidate applies for a job.
              </Typography>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="offers" />
            <div>
              <Typography as="label" className="font-medium">
                Offers
              </Typography>
              <Typography
                as="p"
                fluidSize="xs"
                className="text-muted-foreground"
              >
                Get notified when a candidate accepts or rejects an offer.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Typography as="legend" fluidSize="sm" className="font-semibold">
          Push notifications
        </Typography>
        <Typography
          as="p"
          fluidSize="xs"
          className="text-muted-foreground mt-1"
        >
          These are delivered via SMS to your mobile phone.
        </Typography>
        <RadioGroup defaultValue="everything" className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="everything" id="push-everything" />
            <Typography as="label">Everything</Typography>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="email" id="push-email" />
            <Typography as="label">Same as email</Typography>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="nothing" id="push-nothing" />
            <Typography as="label">No push notifications</Typography>
          </div>
        </RadioGroup>
      </div>
    </div>
  </Fragment>
);

export default NotificationsSection;
