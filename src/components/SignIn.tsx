"use client"

import { SigninInput } from "@/types"
import { Button, Divider } from "@tremor/react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

const SignIn = () => {

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninInput>()

    const onSubmit: SubmitHandler<SigninInput> = async (data) => {
        const toastId = toast('Loading...');
        try {
            toast.loading(toastId)
            const response = await axios.post("/api/signin", data)
            toast.dismiss(toastId);
            toast.success(`Bienvenido ${response.data.name}`)
            router.push(`/dashboard/:${response.data.id}`)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.dismiss(toastId);
                toast.error(error.response?.data.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid text-black w-full">
            <Divider>Username</Divider>
            <input type="text" id='username' {...register("username", { required: true })} className="py-1 px-2 rounded-md" />
            {errors.username?.message && <p className="text-red-600 text-sm pt-1">El username es requerido</p>}

            <Divider>Password</Divider>
            <input type="password" id='password' {...register("password", { required: true })} className="py-1 px-2 rounded-md" />
            {errors.password?.message && <p className="text-red-600 text-sm pt-1">El password es requerido</p>}

            <Button size="xs" className="my-4 w-20" type="submit">Confirm</Button>
        </form>
    )
}

export default SignIn
