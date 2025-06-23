import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { page } from "@/lib/config";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Snippo AI",
  description:
    "Read the terms of service for Snippo AI, the modern, AI-powered code snippet manager for developers.",
};

const TERMS_LAST_UPDATED = "March 2025";

const TermsPage = () => {
  return (
    <Container maxWidth="6xl" className="pt-32 pb-16 px-4 sm:px-8">
      <SectionHeading as="h1" subtitle={`Last updated: ${TERMS_LAST_UPDATED}`}>
        Terms of Service
      </SectionHeading>
      <Divider />
      <section className="space-y-8">
        <Typography as="p" fluidSize="base" className="text-muted-foreground">
          Welcome to Snippo AI (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;). These Terms of Service (the &quot;Terms&quot;)
          govern your access to and use of the Snippo AI website and services
          (the &quot;Service&quot;). By using Snippo AI, you agree to be bound
          by these Terms. If you do not agree, please do not use our Service.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          1. Use of Service
        </Typography>
        <Typography
          as="ul"
          fluidSize="base"
          className="list-disc list-inside space-y-2"
        >
          <li>You must be at least 13 years old to use Snippo AI.</li>
          <li>
            You agree to provide accurate and complete information when creating
            an account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You may not use the Service for any unlawful or unauthorized
            purpose.
          </li>
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          2. User Content
        </Typography>
        <Typography as="p" fluidSize="base">
          You retain ownership of any code snippets, comments, or other content
          you submit to Snippo AI (&quot;User Content&quot;). By submitting User
          Content, you grant us a non-exclusive, worldwide, royalty-free license
          to use, display, and distribute your content as necessary to operate
          the Service. You are solely responsible for your User Content and must
          ensure it does not violate any laws or third-party rights.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          3. Prohibited Conduct
        </Typography>
        <Typography
          as="ul"
          fluidSize="base"
          className="list-disc list-inside space-y-2"
        >
          <li>
            Do not upload or share content that is illegal, harmful, or
            infringes on others&apos; rights.
          </li>
          <li>
            Do not attempt to gain unauthorized access to our systems or other
            users&apos; accounts.
          </li>
          <li>
            Do not use the Service to distribute spam or malicious software.
          </li>
          <li>
            Do not interfere with or disrupt the integrity or performance of the
            Service.
          </li>
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          4. Intellectual Property
        </Typography>
        <Typography as="p" fluidSize="base">
          All content and materials provided by Snippo AI, including logos,
          branding, and software, are the property of Snippo AI or its
          licensors. You may not copy, modify, or distribute any part of the
          Service without our prior written consent.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          5. Termination
        </Typography>
        <Typography as="p" fluidSize="base">
          We reserve the right to suspend or terminate your access to the
          Service at any time, with or without notice, for conduct that we
          believe violates these Terms or is otherwise harmful to Snippo AI or
          other users.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          6. Disclaimer &amp; Limitation of Liability
        </Typography>
        <Typography as="p" fluidSize="base">
          The Service is provided &quot;as is&quot; and without warranties of
          any kind. Snippo AI is not liable for any indirect, incidental, or
          consequential damages arising from your use of the Service. Your use
          of Snippo AI is at your own risk.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          7. Changes to Terms
        </Typography>
        <Typography as="p" fluidSize="base">
          We may update these Terms from time to time. We will notify users of
          any material changes by updating the date at the top of this page.
          Continued use of Snippo AI after changes means you accept the updated
          Terms.
        </Typography>

        <Typography as="h2" fluidSize="lg" className="font-semibold mt-8">
          8. Contact Us
        </Typography>
        <Typography as="p" fluidSize="base">
          If you have any questions about these Terms, please contact us at{" "}
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

export default TermsPage;
