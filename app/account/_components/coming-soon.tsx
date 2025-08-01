import Typography from "@/components/shared/typography";
import { AlertCircle } from "lucide-react";

const ComingSoon = () => (
  <div className="flex flex-col items-center justify-center h-full py-6">
    <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
    <Typography as="h3" fluidSize="lg" className="font-semibold">
      Coming Soon
    </Typography>
    <Typography as="p" fluidSize="xs" className="text-muted-foreground">
      This section is under development and will be available soon.
    </Typography>
  </div>
);

export default ComingSoon;
