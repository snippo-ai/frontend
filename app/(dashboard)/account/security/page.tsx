import type { Metadata } from "next";
import SecuritySection from "./_components/security-section";

export const metadata: Metadata = {
  title: "Account Security",
  description:
    "Manage your account security, update passwords, enable two-factor authentication, and review active sessions for enhanced protection.",
  keywords: [
    "security",
    "password",
    "2FA",
    "account settings",
    "privacy",
    "authentication",
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Account Security",
    description: "Secure your account with advanced security features",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Account Security",
    description: "Manage your account security settings",
  },
};

/**
 * Security Settings Page
 *
 * Provides users with comprehensive security management tools including:
 * - Password updates with validation
 * - Two-factor authentication setup
 * - Active session management
 * - Security preferences configuration
 *
 * @returns JSX element containing the security settings interface
 */
const SecurityPage = () => {
  return (
    <main role="main" aria-labelledby="security-page-title">
      <h1 id="security-page-title" className="sr-only">
        Account Security
      </h1>
      <SecuritySection />
    </main>
  );
};

export default SecurityPage;
