import { auth } from "@/auth";
import OnBoarding from "./_components/onboarding";

const OnboardingPage = async () => {
  const session = await auth();
  console.log({ session });

  return <OnBoarding session={session} />;
};

export default OnboardingPage;
