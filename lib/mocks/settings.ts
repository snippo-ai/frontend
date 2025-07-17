import {
  Bell,
  CreditCard,
  Key,
  LucideIcon,
  Plug,
  Shield,
  Sliders,
  UserCogIcon,
  UserIcon,
} from "lucide-react";

export enum SECTIONS_ENUM {
  PROFILE = "profile",
  ACCOUNT = "account",
  SECURITY = "security",
  BILLING = "billing",
  NOTIFICATIONS = "notifications",
  INTEGRATIONS = "integrations",
  API_KEYS = "api-keys",
  PREFERENCES = "preferences",
}

export const SectionIconMap: Record<SECTIONS_ENUM, LucideIcon> = {
  [SECTIONS_ENUM.PROFILE]: UserIcon,
  [SECTIONS_ENUM.ACCOUNT]: UserCogIcon,
  [SECTIONS_ENUM.SECURITY]: Shield,
  [SECTIONS_ENUM.BILLING]: CreditCard,
  [SECTIONS_ENUM.NOTIFICATIONS]: Bell,
  [SECTIONS_ENUM.INTEGRATIONS]: Plug,
  [SECTIONS_ENUM.API_KEYS]: Key,
  [SECTIONS_ENUM.PREFERENCES]: Sliders,
};

export const sectionList = [
  { value: SECTIONS_ENUM.PROFILE, label: "Profile" },
  { value: SECTIONS_ENUM.ACCOUNT, label: "Account" },
  { value: SECTIONS_ENUM.SECURITY, label: "Security" },
  { value: SECTIONS_ENUM.BILLING, label: "Billing" },
  { value: SECTIONS_ENUM.NOTIFICATIONS, label: "Notifications" },
  { value: SECTIONS_ENUM.INTEGRATIONS, label: "Integrations" },
  { value: SECTIONS_ENUM.API_KEYS, label: "API Keys" },
  { value: SECTIONS_ENUM.PREFERENCES, label: "Preferences" },
] as const;
