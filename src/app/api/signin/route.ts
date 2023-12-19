import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { createAccessToken } from "@/libs/jwt";
import { cookies } from 'next/headers'


export async function POST(request: NextResponse) {
    const { username, password } = await request.json();

    try {
        await connectDB()
        const foundUser = await User.findOne({ username })
        if (!foundUser) return NextResponse.json({
            message: "Usuario no encontrado"
        }, {
            status: 400
        })

        const isMatch = await bcrypt.compare(password, foundUser.password)
        if (!isMatch) return NextResponse.json({
            message: "Credenciales inválidas"
        }, {
            status: 400
        })
        const token = await createAccessToken({ id: foundUser._id })

        cookies().set('Cookie', token)
        await User.updateOne(
            { _id: foundUser._id },
            { $set: { lastLogin: new Date() } }
        );

        return NextResponse.json({
            id: foundUser._id,
            name: foundUser.name,
            username: foundUser.username,
            lastLogin: foundUser.lastLogin,
            hierarchy: foundUser.hierarchy
        })
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