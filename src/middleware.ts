import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Define protected paths
    const isProtectedAdmin = path.startsWith("/admin");
    const isProtectedApi = path.startsWith("/api/posts") ||
        path.startsWith("/api/timeline") ||
        path.startsWith("/api/upload");


    // 2. Allow public GET requests for API (so frontend can fetch posts)
    if (isProtectedApi && request.method === "GET") {
        return NextResponse.next();
    }

    // 3. Allow login endpoint
    if (path.startsWith("/api/auth/login")) {
        return NextResponse.next();
    }

    // 4. Check for session
    const cookie = request.cookies.get("session")?.value;
    const session = cookie ? await decrypt(cookie) : null;


    // 5. If accessing API routes without auth -> 401
    if (isProtectedApi && !session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        "/admin/:path*",
        "/api/:path*",
    ],
};
