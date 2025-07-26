import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { SVGProps } from "react";

const SocialLogin = ({
  Icon,
  label,
  children,
}: {
  Icon: LucideIcon | React.FC<SVGProps<SVGSVGElement>>;
  label: string;
  children?: React.ReactNode;
}) => (
  <Button
    type="button"
    variant="outline"
    className="h-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group"
    aria-label={`Sign in with ${label}`}
  >
    <Icon className="fill-foreground size-6 mr-1 group-hover:scale-110 transition-200" />
    {children && children}
  </Button>
);

export default SocialLogin;
