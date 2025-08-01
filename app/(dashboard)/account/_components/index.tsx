import Typography from "@/components/shared/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SectionIconMap,
  sectionList,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Session } from "next-auth";
import {
  default as AccountSection,
  default as ProfileSection,
} from "./account-section";
import ApiKeysSection from "./api-keys-section";
import { BillingForm } from "./billing-section";
import IntegrationsSection from "./integrations-section";
import NotificationsSection from "./notifications-section";
import PreferencesSection from "./preferences-section";
import SecuritySection from "./security-section";

type SettingsProps = {
  session: Session;
};

const Settings = ({ session }: SettingsProps) => {
  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="w-full flex flex-col md:flex-row h-full"
    >
      <div className="md:w-1/4 w-full md:pr-6 border-r border-border bg-muted/40 dark:bg-muted/20 p-4 md:p-6 rounded-l-xl flex-shrink-0 h-full flex flex-col">
        <div className="shrink-0">
          <Typography as="h2" fluidSize="lg" className="font-semibold">
            Settings
          </Typography>
        </div>
        <div className="flex-1 h-full mt-4">
          {/* Navigation */}
          <TabsList className="block bg-transparent p-0 shadow-none w-full space-y-2">
            {sectionList.map(({ value, label }) => {
              const Icon = SectionIconMap[value];
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="justify-start w-full !hover:text-foreground transition-colors"
                >
                  {Icon && <Icon className="mr-2 h-4 w-4 inline" />} {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>

      {/* Content */}
      <div className="md:w-3/4 w-full bg-background rounded-r-xl flex-1 h-[80dvh] overflow-auto">
        <TabsContent value="profile" className="h-full p-4 md:p-8">
          <ProfileSection session={session} />
        </TabsContent>
        <TabsContent value="account" className="h-full p-4 md:p-8">
          <AccountSection />
        </TabsContent>
        <TabsContent value="security" className="h-full p-4 md:p-8">
          <SecuritySection />
        </TabsContent>
        <TabsContent value="notifications" className="h-full p-4 md:p-8">
          <NotificationsSection />
        </TabsContent>
        <TabsContent value="billing" className="h-full p-4 md:p-8">
          <BillingForm user={session?.user} />
        </TabsContent>
        <TabsContent value="integrations" className="h-full p-4 md:p-8">
          <IntegrationsSection />
        </TabsContent>
        <TabsContent value="api-keys" className="h-full p-4 md:p-8">
          <ApiKeysSection />
        </TabsContent>
        <TabsContent value="preferences" className="h-full p-4 md:p-8">
          <PreferencesSection />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Settings;
