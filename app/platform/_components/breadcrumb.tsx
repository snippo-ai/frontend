import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LucideIcon } from "lucide-react";
import { Fragment } from "react";

interface Route {
  label: string;
  icon?: LucideIcon | null;
  href?: string | null;
}

interface DashboardBreadcrumb {
  routes: Route[];
  className?: string;
}

const DashboardBreadcrumb: React.FC<DashboardBreadcrumb> = ({
  routes = [],
  className,
}) => {
  return (
    <Breadcrumb className={className} aria-label="Breadcrumb navigation">
      <BreadcrumbList>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          const hasValidHref = route.href && route.href.trim() !== "";
          const Icon = route.icon;

          return (
            <Fragment key={`${route.label}-${index}`}>
              <BreadcrumbItem>
                {hasValidHref && !isLast ? (
                  <BreadcrumbLink
                    href={route.href!}
                    className="flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    <span>{route.label}</span>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    <span>{route.label}</span>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
