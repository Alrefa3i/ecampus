"use server";

import { getServerAuthStatus } from "@/lib/api";
import { redirect } from "next/navigation";

/**
 * Verifies if the user is authenticated. If not, redirects to login page.
 * Use this in server components that require authentication.
 * @param redirectPath Optional path to redirect to if not authenticated (defaults to login)
 * @returns The authenticated user data if authenticated
 * @example
 * // In a server component:
 * export default async function ProtectedPage() {
 *   const user = await requireAuth();
 *   return <div>Hello, {user.userId}</div>;
 * }
 */
export async function requireAuth(redirectPath = "/login") {
  const { isAuthenticated, user, token } = await getServerAuthStatus();

  if (!isAuthenticated) {
    redirect(redirectPath);
  }

  return { user, token };
}

/**
 * Checks if the user is authenticated. Does not redirect.
 * Use this when you want to conditionally render content based on auth state.
 * @returns Authentication status and user data
 * @example
 * // In a server component:
 * export default async function Page() {
 *   const { isAuthenticated, user } = await checkAuth();
 *   return (
 *     <div>
 *       {isAuthenticated ? `Hello, ${user.userId}` : 'Please log in'}
 *     </div>
 *   );
 * }
 */
export async function checkAuth() {
  return await getServerAuthStatus();
}
