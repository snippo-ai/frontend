import Logo from "@/components/shared/logo";
import Typography from "@/components/shared/typography";
import React from "react";

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  {
    href: "https://github.com/snippoai",
    label: "GitHub Repository",
    external: true,
  },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full bg-muted border-t border-zinc-200 dark:border-zinc-800 rounded-t-2xl mt-16 px-4 sm:px-8 py-10 sm:py-12 flex flex-col items-center gap-6 text-center overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Visually hidden heading for screen readers */}
      <h2 className="sr-only">Site Footer</h2>
      {/* SVG Accent */}
      <span
        className="pointer-events-none absolute -top-8 -right-8 opacity-10 w-32 h-32 sm:w-40 sm:h-40 select-none hidden xs:block"
        aria-hidden="true"
        tabIndex={-1}
      >
        <img src="/globe.svg" alt="" className="w-full h-full" loading="lazy" />
      </span>
      {/* Logo and Tagline */}
      <div className="flex flex-col items-center gap-2 z-10">
        <Logo
          iconSize={32}
          label="Snippo AI"
          hideLabel={false}
          className="mb-1"
          textClassName="text-fluid-lg font-bold text-chart-2"
        />
        <Typography
          as="p"
          fluidSize="sm"
          className="text-muted-foreground max-w-xs"
        >
          &quot;Empowering developers to save, search, and share code
          effortlessly.&quot;
        </Typography>
      </div>
      {/* Links */}
      <nav
        className="flex flex-wrap justify-center gap-4 z-10"
        aria-label="Footer links"
      >
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-xs text-muted-foreground hover:text-primary transition-colors px-2"
            aria-label={link.label}
          >
            {link.label}
          </a>
        ))}
      </nav>
      {/* Copyright */}
      <div className="text-xs text-muted-foreground z-10">
        &copy; {new Date().getFullYear()} Snippo AI. All rights reserved.
      </div>
    </footer>
  );
};

export default React.memo(Footer);
