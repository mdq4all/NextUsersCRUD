import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcryptjs from "bcryptjs";


export async function POST(request: NextResponse) {

    const { name, username, password, hierarchy } = await request.json();

    try {
        await connectDB()

        const userFound = await User.findOne({ username });
        if (userFound)
            return NextResponse.json(
                {
                    message: "El username ya esta en uso",
                },
                {
                    status: 400,
                }
            );

        const hashedPassword = await bcryptjs.hash(password, 12);
        // const lastLogin = new Date()
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            hierarchy,
            lastLogin: new Date()
        })
        const savedUser = await newUser.save()
        return NextResponse.json({
            id: savedUser.id,
            name: savedUser.name,
            username: savedUser.username,
            hierarchy: savedUser.hierarchy
        }, { status: 200 })

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