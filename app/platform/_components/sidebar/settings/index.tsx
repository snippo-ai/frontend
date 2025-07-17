import Typography from "@/components/shared/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingForm } from "./billing-section";
import NotificationsSection from "./notifications-section";
import ProfileSection from "./profile-section";

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  isEmailVerified: false,
  additionalDetails: {
    onboardingStep: 2,
    onboardingComplete: true,
    preferredTools: ["VSCode", "GitHub"],
    areasOfInterest: ["AI", "Web Development"],
  },
  _id: "mock-id",
  passwordHash: "",
  phoneNumber: "",
  createdAt: "",
  updatedAt: "",
  userImage: "",
  subscription: {
    plan: "Free",
    status: "active",
    razorpaySubscriptionId: "mock-sub-id",
    razorpayCustomerId: "mock-cust-id",
  },
  Address: [],
  orderHistory: [],
  loginMethod: "email",
};

const mockSession = {
  user: mockUser,
  expires: "2099-12-31T23:59:59.999Z",
  customSessionProperty: "mock-value",
};

const Settings = () => {
  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="w-full flex flex-col md:flex-row"
    >
      {/* Navigation */}
      <div className="md:w-1/4 w-full md:pr-6 border-r border-border bg-muted/40 dark:bg-muted/20 p-4 md:p-6 rounded-l-xl flex-shrink-0">
        <Typography as="h2" fluidSize="lg" className="font-semibold">
          Settings
        </Typography>
        <TabsList className="flex flex-col gap-2 bg-transparent p-0 shadow-none w-full mt-12">
          <TabsTrigger
            value="profile"
            className="justify-start w-full !hover:text-foreground transition-colors"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="justify-start w-full !hover:text-foreground transition-colors"
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="justify-start w-full !hover:text-foreground transition-colors"
          >
            Notifications
          </TabsTrigger>
        </TabsList>
      </div>
      {/* Content */}
      <div className="md:w-3/4 w-full bg-background rounded-r-xl flex-1 h-[80dvh] overflow-auto">
        <TabsContent value="profile" className="h-full p-4 md:p-8">
          <ProfileSection session={mockSession} />
        </TabsContent>
        <TabsContent value="notifications" className="h-full p-4 md:p-8">
          <NotificationsSection />
        </TabsContent>
        <TabsContent value="billing" className="h-full p-4 md:p-8">
          <BillingForm user={mockUser} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Settings;
