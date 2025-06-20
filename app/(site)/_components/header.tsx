import React, { useMemo } from "react";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Navigation links
const useNavLinks = () =>
  useMemo(
    () => [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#demo", label: "Demo" },
    ],
    []
  );

// Reusable desktop/mobile link
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <NavigationMenuItem key={href}>
    <NavigationMenuLink
      href={href}
      className="px-3 py-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </NavigationMenuLink>
  </NavigationMenuItem>
);

// Auth Buttons (Login/Signup)
const AuthButtons = ({ fullWidth = false }: { fullWidth?: boolean }) => (
  <>
    <Button
      variant="ghost"
      size="sm"
      className={`rounded-full px-4 ${fullWidth ? "w-full" : ""}`}
      asChild
    >
      <a href="/login" aria-label="Login to your account">
        Login
      </a>
    </Button>
    <Button
      variant="default"
      size="sm"
      className={`rounded-full px-4 shadow ${fullWidth ? "w-full" : ""}`}
      asChild
    >
      <a href="/sign-up" aria-label="Create a new account">
        Sign Up
      </a>
    </Button>
  </>
);

// Main Header
const Header: React.FC = () => {
  const navLinks = useNavLinks();

  return (
    <header
      className="w-full flex justify-center mt-6 px-4"
      role="banner"
      aria-label="Primary site header"
    >
      <div className="flex items-center gap-6 px-6 py-2.5 bg-white/90 dark:bg-zinc-900/90 shadow-lg rounded-full max-w-2xl w-full mx-auto border border-zinc-200 dark:border-zinc-800 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all">
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
          <AuthButtons />
        </div>

        {/* Mobile Sheet Navigation */}
        <div className="lg:hidden flex items-center ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open mobile menu"
              >
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="p-6 flex flex-col gap-6 w-64"
              aria-label="Mobile navigation panel"
            >
              <div className="flex items-center gap-2 mb-4">
                <Logo iconSize={28} hideLabel />
                <span className="font-bold text-lg">Menu</span>
              </div>

              <nav
                className="flex flex-col gap-4"
                aria-label="Mobile navigation links"
              >
                {navLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-base font-medium rounded-md px-3 py-2 hover:bg-accent focus:bg-accent focus:outline-none transition-colors"
                    aria-label={`Navigate to ${label}`}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-2 mt-6">
                <AuthButtons fullWidth />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
