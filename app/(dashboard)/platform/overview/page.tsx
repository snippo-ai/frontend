import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  FileText,
  Folder,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import PageHeader from "../_components/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const recentSnippets = [
    {
      id: 1,
      title: "React Hook Patterns",
      language: "JavaScript",
      description: "Common React hook patterns and best practices",
      views: 1234,
      stars: 89,
      updatedAt: "2 hours ago",
    },
    {
      id: 2,
      title: "CSS Grid Layout",
      language: "CSS",
      description: "Complete guide to CSS Grid layout system",
      views: 856,
      stars: 67,
      updatedAt: "1 day ago",
    },
    {
      id: 3,
      title: "TypeScript Generics",
      language: "TypeScript",
      description: "Advanced TypeScript generics examples",
      views: 654,
      stars: 45,
      updatedAt: "3 days ago",
    },
  ];

  const session = await auth();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`👋 Hi ${session?.user?.firstName}, Welcome!`}
        description="Here's what's happening with your snippets."
        actions={[
          <Button
            key="create-new-snippet-button"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Snippet</span>
          </Button>,
        ]}
      />

      {/* Stats Grid */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-fluid-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-fluid-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center space-x-1">
                <span className="text-green-600">{stat.change}</span>
                <span>{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Snippet</span>
            </CardTitle>
            <CardDescription>
              Start a new code snippet with syntax highlighting
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Folder className="h-5 w-5" />
              <span>New Collection</span>
            </CardTitle>
            <CardDescription>
              Organize your snippets into collections
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Invite Team</span>
            </CardTitle>
            <CardDescription>
              Collaborate with your team members
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Snippets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Snippets</span>
          </CardTitle>
          <CardDescription>
            Your most recently updated code snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {recentSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors h-full"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-fluid-base font-medium">
                      {snippet.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {snippet.language}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {snippet.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{snippet.updatedAt}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Search className="h-3 w-3" />
                      <span>{snippet.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{snippet.stars} stars</span>
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
