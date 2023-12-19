import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        connectDB()
        const users = await User.find()
        return NextResponse.json(users)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                }
            );
        }
    }
}
