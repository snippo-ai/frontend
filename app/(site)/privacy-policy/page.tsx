import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { page } from "@/lib/config";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Snippo AI",
  description:
    "Read the privacy policy for Snippo AI, the modern, AI-powered code snippet manager for developers.",
};

const PRIVACY_POLICY_LAST_UPDATED = "March 2025";

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="6xl" className="pt-32 pb-16 px-4 sm:px-8">
      <SectionHeading
        as="h1"
        subtitle={`Last updated: ${PRIVACY_POLICY_LAST_UPDATED}`}
      >
        Privacy Policy
      </SectionHeading>
      <Divider />
      <section className="space-y-8">
        <Typography as="p" fluidSize="base" className="text-muted-foreground">
          Welcome to Snippo AI (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;). This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our website and
          services (the &quot;Service&quot;). By using Snippo AI, you agree to
          the practices described in this policy.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          1. Information We Collect
        </Typography>
        <Typography as="p" fluidSize="base">
          <strong className="font-medium">Account Information:</strong> When you
          sign up, we collect your email address and authentication details.{" "}
          <br />
          <strong className="font-medium">Usage Data:</strong> We collect
          information about how you use Snippo AI, such as saved snippets,
          search queries, and feature usage.
          <br />
          <strong className="font-medium">Device & Log Data:</strong> We may
          collect information about your device, browser, IP address, and access
          times for security and analytics.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          2. How We Use Your Information
        </Typography>
        <Typography
          as="ul"
          fluidSize="base"
          className="list-disc list-inside space-y-2"
        >
          <li>To provide, operate, and maintain the Service</li>
          <li>To improve, personalize, and expand our features</li>
          <li>To communicate with you, including support and updates</li>
          <li>To monitor and analyze usage and trends</li>
          <li>To detect, prevent, and address technical issues or abuse</li>
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          3. How We Share Your Information
        </Typography>
        <Typography as="p" fluidSize="base">
          We do <strong className="font-medium">not</strong> sell your personal
          information. We may share data with trusted third-party service
          providers (such as cloud hosting, analytics, or authentication) only
          as necessary to operate Snippo AI. All providers are required to
          protect your data and use it solely for the intended purpose.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          4. Data Security
        </Typography>
        <Typography as="p" fluidSize="base">
          We use industry-standard security measures to protect your data,
          including encryption, secure storage, and access controls. However, no
          method of transmission over the Internet or electronic storage is 100%
          secure, so we cannot guarantee absolute security.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          5. Your Rights & Choices
        </Typography>
        <Typography
          as="ul"
          fluidSize="base"
          className="list-disc list-inside space-y-2"
        >
          <li>
            You can access, update, or delete your account information at any
            time from your dashboard.
          </li>
          <li>
            You may contact us to request deletion of your data or to ask
            questions about your privacy.
          </li>
          <li>You can opt out of non-essential communications at any time.</li>
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          6. Children&apos;s Privacy
        </Typography>
        <Typography as="p" fluidSize="base">
          Snippo AI is not intended for children under 13. We do not knowingly
          collect personal information from children. If you believe a child has
          provided us with personal data, please contact us for removal.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          7. Changes to This Policy
        </Typography>
        <Typography as="p" fluidSize="base">
          We may update this Privacy Policy from time to time. We will notify
          users of any material changes by updating the date at the top of this
          page. Continued use of Snippo AI after changes means you accept the
          updated policy.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          8. Contact Us
        </Typography>
        <Typography as="p" fluidSize="base">
          If you have any questions or concerns about this Privacy Policy or
          your data, please contact us at{" "}
          <Link
            href={`mailto:${page.email}`}
            className="text-chart-2 hover:text-chart-3 transition-200 underline"
          >
            {page.email}
          </Link>
          .
        </Typography>
      </section>
    </Container>
  );
};

export default PrivacyPolicyPage;
