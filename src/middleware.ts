import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routeAccessMap } from "@/lib/settings";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("🔑 Middleware token:", token); // debug

  // Allow NextAuth API & login page
  if (pathname.startsWith("/api/auth") || pathname === "/sign-in") {
    return NextResponse.next();
  }

  // Root path ("/")
  if (pathname === "/") {
    if (token?.role) {
      const url = req.nextUrl.clone();
      url.pathname = `/dashboard/${token.role}`;
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next(); // show homepage (or redirect manually from homepage if you want)
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // not logged in → login page
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    const role = token.role as string;
    console.log("🛡️ User role:", role, "Path:", pathname);

    // Check role access map
    for (const [pattern, allowedRoles] of Object.entries(routeAccessMap)) {
      const regex = new RegExp(`^/dashboard${pattern}$`);
      if (regex.test(pathname)) {
        if (!allowedRoles.includes(role)) {
          const url = req.nextUrl.clone();
          url.pathname = `/dashboard/${role}`;
          return NextResponse.redirect(url);
        }
        return NextResponse.next();
      }
    }

    // Default: only allow their own dashboard
    if (pathname.startsWith(`/dashboard/${role}`)) {
      return NextResponse.next();
    }

    // If no match → redirect to user’s role dashboard
    const url = req.nextUrl.clone();
    url.pathname = `/dashboard/${role}`;
    return NextResponse.redirect(url);
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/dashboard/:path*", "/api/auth/:path*"],
};
