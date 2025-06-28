import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // Add custom properties to the User object here
    token?: string;
    additionalDetails: {
      onboardingStep: number;
      onboardingComplete: boolean;
      preferredTools: string[];
      areasOfInterest: string[];
    };
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    Address: string[];
    orderHistory: string[];
    isEmailVerified: boolean;
    userImage: string;
    loginMethod: string;
    createdAt: string;
    updatedAt: string;
    subscription: {
      plan: string;
      status: string;
      razorpaySubscriptionId: string;
      razorpayCustomerId: string;
    };
    id?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    token?: string;
    id?: string;
    // Add custom properties directly to the Session object here
    customSessionProperty: string;
  }
}
