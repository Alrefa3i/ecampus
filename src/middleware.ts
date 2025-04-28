import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// Create a function to get the auth status from the cookie
export function getAuthStatus(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const decoded = jwtDecode(token);
    return {
      isAuthenticated: true,
      user: decoded,
    };
  } catch (error) {
    // If token is invalid, clear it
    return { isAuthenticated: false, user: null };
  }
}

// Combine the intl middleware with our auth middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Check if the current path requires authentication
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // For paths that require authentication
  if (pathname.includes("/profile")) {
    const authStatus = getAuthStatus(request);

    if (!authStatus.isAuthenticated) {
      // Get the locale from the pathname
      const locale = pathnameIsMissingLocale
        ? routing.defaultLocale
        : pathname.split("/")[1];

      // Redirect to login page with the same locale
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Process intl middleware
  const response = intlMiddleware(request);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
