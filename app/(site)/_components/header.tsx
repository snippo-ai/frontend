import { signOut } from "@/auth";
import Logo from "@/components/shared/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useMemo } from "react";

// Navigation links
const useNavLinks = () =>
  useMemo(
    () => [
      { href: "/#demo", label: "Demo" },
      { href: "/pricing", label: "Pricing" },
    ],
    []
  );

// Reusable desktop/mobile link
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <NavigationMenuItem key={href}>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="px-3 py-1.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
        aria-label={`Navigate to ${label}`}
      >
        {label}
      </Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
);

// Auth Buttons (Login/Signup)
const AuthButtons = ({
  session,
  fullWidth = false,
}: {
  session: Session | null;
  fullWidth?: boolean;
}) =>
  session ? (
    <>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "sm",
            className: `px-4 ${fullWidth ? "w-full" : ""}`,
          })
        )}
        aria-label="Go to your dashboard"
      >
        Dashboard
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          type="submit"
          variant="default"
          size="sm"
          className={`px-4 ${fullWidth ? "w-full" : ""}`}
          aria-label="Logout from your account"
        >
          Sign Out
        </Button>
      </form>
    </>
  ) : (
    <Link
      href="/login?redirectUrl=%2Fdashboard"
      className={cn(
        buttonVariants({
          variant: "default",
          size: "sm",
          className: `px-4 ${fullWidth ? "w-full" : ""}`,
        })
      )}
      aria-label="Login to your account"
    >
      Login
    </Link>
  );

// Main Header
const Header: React.FC<{ session: Session | null }> = ({ session }) => {
  const navLinks = useNavLinks();

  return (
    <header
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-2.5 bg-background backdrop-blur-xl shadow-xl rounded-full max-w-2xl w-full mx-auto border border-border"
      role="banner"
      aria-label="Primary site header"
    >
      <Logo iconSize={32} hideLabel className="ml-2" />

      {/* Desktop Navigation */}
      <nav className="flex-1 hidden lg:block" aria-label="Primary navigation">
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex gap-2 mr-2">
        <AuthButtons session={session} />
      </div>

      {/* Mobile Sheet Navigation */}
      <div className="lg:hidden flex items-center ml-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/20"
              aria-label="Open mobile menu"
            >
              <Menu className="size-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="p-6 flex flex-col gap-6 w-64 bg-[var(--background)] border-l border-[var(--border)]"
            aria-label="Mobile navigation panel"
          >
            <div className="flex items-center gap-2 mb-4">
              <Logo iconSize={28} hideLabel />
              <span className="font-bold text-lg text-[var(--foreground)]">
                Menu
              </span>
            </div>

            <nav
              className="flex flex-col gap-4"
              aria-label="Mobile navigation links"
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-base font-medium rounded-md px-3 py-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/20 focus:bg-[var(--primary)]/20 focus:outline-none transition-colors"
                  aria-label={`Navigate to ${label}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 mt-6">
              <AuthButtons session={session} fullWidth />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
