"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { hierarchyValues, userSchema } from "@/app/validations/userSchema";
import { Button, Divider } from "@tremor/react";
import { Inputs } from "@/types";
import axios, { AxiosError } from "axios";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";



const SignupForm = () => {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post('/api/register', data)
            toast.success(`Bienvenido ${response.data.name}`)
            router.push(`/dashboard/:${response.data.id}`)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid text-black w-full">
            <Divider>Name</Divider>
            <input type="text" id='name' {...register("name")} className="py-1 px-2 rounded-md" />
            {errors.name?.message && <p className="text-red-600 text-sm pt-1">{errors.name?.message}</p>}

            <Divider>Username</Divider>
            <input type="text" id='username' {...register("username")} className="py-1 px-2 rounded-md" />
            {errors.username?.message && <p className="text-red-600 text-sm pt-1">{errors.username?.message}</p>}

            <Divider>Password</Divider>
            <input type="password" id='password' {...register("password")} className="py-1 px-2 rounded-md" />
            {errors.password?.message && <p className="text-red-600 text-sm pt-1">{errors.password?.message}</p>}

            <Divider>Confirm Password</Divider>
            <input type="password" id='confirmPassword' {...register("confirmPassword")} className="py-1 px-2 rounded-md" />
            {errors.confirmPassword?.message && <p className="text-red-600 text-sm pt-1">{errors.confirmPassword?.message}</p>}

            <Divider>Hierarchy</Divider>
            <select id="hierarchy" {...register("hierarchy")} className="capitalize py-1 px-2 rounded-md">
                {hierarchyValues.map((hierarchy) => (
                    <option value={hierarchy} key={hierarchy}>{hierarchy}</option>
                ))}
            </select>
            {errors.hierarchy?.message && <p className="text-red-600 text-sm pt-1">{errors.hierarchy?.message}</p>}

            <Button size="xs" className="my-4 w-20" type="submit">Confirm</Button>
            <Toaster />
        </form>
    )
}

export default SignupForm
