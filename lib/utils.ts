import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { VISIBLE_CHARACTERS_IN_MASKING } from "./constants";

/**
 * Utility function to combine class names conditionally and merge Tailwind classes.
 * Uses clsx for conditional logic and tailwind-merge to resolve conflicting Tailwind classes.
 * @param {...ClassValue[]} inputs - List of class values (strings, arrays, objects)
 * @returns {string} - The resulting merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Masks the initial characters of an email address, leaving a specified number of characters visible before the '@'.
 * If the local part is shorter than or equal to the number of visible characters, the entire local part is masked.
 * Handles edge cases such as empty strings, missing '@', and non-positive visibleCharacters.
 *
 * @param {string} email - The email address to mask
 * @param {number} [visibleCharacters] - Number of characters to leave visible before the '@'. Default = VISIBLE_CHARACTERS_IN_MASKING
 * @returns {string} - The masked email address, or the original string if not a valid email
 *
 * @example maskEmail('johndoe@example.com')           // '***ndoe@example.com'
 * @example maskEmail('johndoe@example.com', 2)        // '*****oe@example.com'
 * @example maskEmail('joe@example.com', 4)            // '***@example.com'
 * @example maskEmail('a@b.com', 2)                    // '*@b.com'
 * @example maskEmail('invalidemail', 4)               // 'invalidemail'
 *
 */
export function maskEmail(
  email: string,
  visibleCharacters: number = VISIBLE_CHARACTERS_IN_MASKING
): string {
  if (typeof email !== "string" || !email.includes("@")) return email;
  if (typeof visibleCharacters !== "number" || visibleCharacters < 1)
    visibleCharacters = 1;
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  if (local.length <= visibleCharacters)
    return "*".repeat(local.length) + "@" + domain;
  const visible = local.slice(-visibleCharacters);
  const masked = "*".repeat(local.length - visibleCharacters) + visible;
  return masked + "@" + domain;
}

/**
 * Generates a properly formatted URL string with query parameters.
 *
 * @param {string} path - The base path of the URL (e.g., "/signup").
 * @param {Record<string, string | number | boolean>} params - An object containing query parameters as key-value pairs.
 * @returns {string} - A properly formatted URL with encoded query parameters.
 *
 * @example
 * const redirectUrl = "https://example.com/dashboard";
 * const signupLink = generateLink("/signup", { redirect: redirectUrl });
 * console.log(signupLink);
 * Output: "/signup?redirect=https%3A%2F%2Fexample.com%2Fdashboard"
 */
export function generateLink(
  path: string,
  params: Record<string, string | number | boolean>
): string {
  const searchParams = new URLSearchParams(); // Creates an instance to handle query parameters

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return `${path}?${searchParams.toString()}`;
}

/**
 * Checks if a string is a valid email address.
 *
 * @param email - The email address to validate.
 * @returns Returns true if the email is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Returns the initial letters from a name string.
 *
 * @param name - A full name (one or more words).
 * @returns The concatenated initials in uppercase.
 */
export function getInitials(name: string): string {
  if (!name) return "";

  const initials = name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase())
    .join("");

  return initials;
}
