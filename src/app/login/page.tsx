"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { decodeToken } from "@/utilities/TokenUtilities";

import { loginSchema } from "@/types/api/auth.types";
import { removeToasts, showToast } from "@/components/organisms/Toast";

import useAuthRequest from "@/hooks/auth";
import Layout from "./layout"

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { loginUser } = useAuthRequest();

    const {
        register,
        getValues,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        removeToasts();

        setLoading(true);

        try {
            const formData = getValues();
            const responseData = await loginUser(formData);

            if (responseData && responseData.access_token) {
                const userData = decodeToken(responseData.access_token);
                if (userData?.role == "student") {
                    router.push(`/student/thesis`);
                } else {
                    router.push(`/dashboard`);
                }
            } else {
                showToast(responseData?.message || "Login failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            showToast("An unexpected error occurred. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://emabini.pup.edu.ph/pluginfile.php/2/theme_moove/loginbgimg/1729145478/Pylon%20white%20with%20trees.png')",
                }}
            >
                <form
                    onSubmit={handleFormSubmit}
                    className="w-full max-w-2xl p-6 bg-bgWhite rounded-2xl shadow-lg"
                >
                    <div className="h-20 flex items-center justify-start border-b border-gray-200 mb-4">
                        <img
                            src="/pup.png"
                            alt="Logo"
                            className="w-10 h-10 mr-2"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-textPrimary">PUP Graduate Thesis Monitoring System</span>
                            <span className="text-sm font-normal text-textPrimary">LOGIN FORM</span>
                        </div>
                    </div>

                    <div className="grid grid-row-1 gap-2 mt-2">
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Email *</label>
                            <input
                                type="text"
                                {...register("email")}
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Same with your PUP email used"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Password *</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
                    >
                        {loading ? "Loggin in..." : "Log in"}
                    </button>
                </form>
            </div>
        </Layout>
    );
};