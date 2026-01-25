import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Verify credentials
        // Force username to be "sorohere"
        // In production, force a strong password.
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (username !== "sorohere" || password !== adminPassword) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
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
