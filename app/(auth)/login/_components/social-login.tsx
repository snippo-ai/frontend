import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { SVGProps } from "react";

const SocialLogin = ({
  Icon,
  label,
  onClick,
  children,
  loading = false,
}: {
  Icon: LucideIcon | React.FC<SVGProps<SVGSVGElement>>;
  label: string;
  onClick?: () => void;
  children?: React.ReactNode;
  loading?: boolean;
}) => (
  <Button
    type="button"
    variant="outline"
    className="h-12 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group"
    aria-label={`Sign in with ${label}`}
    onClick={onClick}
  >
    {loading ? (
      <Spinner />
    ) : (
      <>
        <Icon className="fill-foreground size-6 mr-1 group-hover:scale-110 transition-200" />
        {children && children}
      </>
    )}
  </Button>
);

export default SocialLogin;
