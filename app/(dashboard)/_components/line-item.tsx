import Typography from "@/components/shared/typography";

type LineItemProps = {
  label: string;
  subLabel?: string;
  action?: React.ReactNode;
};

const LineItem = ({ label, subLabel = "", action = null }: LineItemProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Typography fluidSize="sm">{label}</Typography>
        {subLabel && (
          <Typography fluidSize="xs" className="text-muted-foreground/75">
            {subLabel}
          </Typography>
        )}
      </div>
      {action && action}
    </div>
  );
};

export default LineItem;
