"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  MOCK_USAGE_METRICS,
  formatUsagePercentage,
  getUsageColor,
} from "@/lib/mocks/billing-data";
import { AlertTriangle, BarChart3, FolderOpen, TrendingUp } from "lucide-react";
import { useCallback, useMemo } from "react";
import MainContentHeader from "../../_components/main-content-header";

export const UsageMetricsSection = () => {
  // Memoize data to prevent unnecessary re-renders
  const usage = useMemo(() => MOCK_USAGE_METRICS, []);
  // const subscription = useMemo(() => MOCK_SUBSCRIPTION, []);
  // const currentPlan = useMemo(() => subscription.plan, [subscription]);

  // Memoize utility functions for performance
  const getUsageStatus = useCallback((current: number, limit: number) => {
    if (limit === -1) return "unlimited";
    const percentage = formatUsagePercentage(current, limit);
    if (percentage >= 90) return "critical";
    if (percentage >= 75) return "warning";
    return "normal";
  }, []);

  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge
            variant="destructive"
            className="text-xs"
            aria-label="Usage is critically high"
          >
            <AlertTriangle className="mr-1 h-3 w-3" aria-hidden="true" />
            Critical
          </Badge>
        );
      case "warning":
        return (
          <Badge
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs"
            aria-label="Usage is high"
          >
            <TrendingUp className="mr-1 h-3 w-3" aria-hidden="true" />
            High Usage
          </Badge>
        );
      case "unlimited":
        return (
          <Badge
            variant="secondary"
            className="text-xs"
            aria-label="Unlimited usage available"
          >
            Unlimited
          </Badge>
        );
      default:
        return null;
    }
  }, []);

  return (
    <section aria-labelledby="usage-metrics-heading" className="mt-4">
      <MainContentHeader
        title="Usage Metrics"
        description="Monitor your current usage and limits for this billing period."
        icon={BarChart3}
      />
      <Separator className="my-4 mb-6" />

      <div
        className="grid gap-4 md:grid-cols-2"
        role="region"
        aria-label="Usage metrics dashboard"
      >
        {/* Projects Usage */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <FolderOpen className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Projects</CardTitle>
                  <CardDescription className="text-xs">
                    Active projects
                  </CardDescription>
                </div>
              </div>
              {getStatusBadge(
                getUsageStatus(usage.projects.current, usage.projects.limit)
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active projects</span>
                <span className="font-medium">
                  {usage.projects.current}
                  {usage.projects.limit !== -1 && ` / ${usage.projects.limit}`}
                </span>
              </div>
              {usage.projects.limit !== -1 && (
                <div className="space-y-2">
                  <Progress
                    value={formatUsagePercentage(
                      usage.projects.current,
                      usage.projects.limit
                    )}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span
                      className={getUsageColor(
                        formatUsagePercentage(
                          usage.projects.current,
                          usage.projects.limit
                        )
                      )}
                    >
                      {formatUsagePercentage(
                        usage.projects.current,
                        usage.projects.limit
                      ).toFixed(1)}
                      % used
                    </span>
                    <span>{usage.projects.limit}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team Members Usage */}
        {/* <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Team Members</CardTitle>
                  <CardDescription className="text-xs">
                    Active team members
                  </CardDescription>
                </div>
              </div>
              {getStatusBadge(
                getUsageStatus(
                  usage.teamMembers.current,
                  usage.teamMembers.limit
                )
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Team members</span>
                <span className="font-medium">
                  {usage.teamMembers.current}
                  {usage.teamMembers.limit !== -1 &&
                    ` / ${usage.teamMembers.limit}`}
                </span>
              </div>
              {usage.teamMembers.limit !== -1 && (
                <div className="space-y-2">
                  <Progress
                    value={formatUsagePercentage(
                      usage.teamMembers.current,
                      usage.teamMembers.limit
                    )}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span
                      className={getUsageColor(
                        formatUsagePercentage(
                          usage.teamMembers.current,
                          usage.teamMembers.limit
                        )
                      )}
                    >
                      {formatUsagePercentage(
                        usage.teamMembers.current,
                        usage.teamMembers.limit
                      ).toFixed(1)}
                      % used
                    </span>
                    <span>{usage.teamMembers.limit}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
};
