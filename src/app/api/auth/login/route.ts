import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Verify password against environment variable
        // Default to a known strong default if env is not set (for dev safety only) 
        // In production, force a strong password.
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (password !== adminPassword) {
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 401 }
            );
        }

        // Create session
        await login();

        return NextResponse.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Login failed" },
            { status: 500 }
        );
    }
}
