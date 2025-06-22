import { FormEvent, useState } from "react";

import { User } from "@/interface/user.interface";
import { z } from "zod";
import useUserRequest from "@/hooks/user";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import { updateUserSchema } from "@/types/api/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface EditProfileProps {
    userData: User | null;
    fromUserProfile?: boolean | null;
    isShowEdit: (showEdit: boolean) => void;
    isUpdated: (showUpdate: boolean) => void;
}

type UpdateSchemaType = z.infer<typeof updateUserSchema>;

const EditProfle: React.FC<EditProfileProps> = ({ userData, isShowEdit, isUpdated, fromUserProfile }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { updateUser } = useUserRequest();
    const router = useRouter();

    const userInfo = getUserInfoFromCookies();

    const {
        register,
        getValues,
        formState: { errors },
    } = useForm<UpdateSchemaType>({
        resolver: zodResolver(updateUserSchema),
    })

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        removeToasts();
        isUpdated(false);
        setLoading(true);

        try {
            const formData = getValues();

            const targetUserId = fromUserProfile
                ? userInfo?.userId
                : userData?.id;

            if (!targetUserId) {
                throw new Error("User ID is missing.");
            }

            const payload: any = {
                ...formData,
                id: targetUserId,
            };

            if (!fromUserProfile && userInfo?.role === "admin") {
                payload.role = formData.role ? "admin" : "adviser";
            }

            const responseData = await updateUser(payload);

            if (!responseData) {
                throw new Error("No response received from the server.");
            }

            if (responseData.error) {
                throw new Error(responseData.error);
            }

            showToast(responseData.message || "Updated Successfully", "success");
            isShowEdit(false);
        } catch (error) {
            if (error instanceof Error) {
                showToast(error.message, "error");
            } else {
                showToast("An unexpected error occurred. Please try again later.", "error");
            }
        } finally {
            isShowEdit(false);
            isUpdated(true);
            setLoading(false);
        }
    }



    return (
        <form
            onSubmit={handleFormSubmit}
        >
            <div className="w-full py-4">
                <div className="grid grid-cols-1 mb-3 gap-3 sm:grid-cols-2">
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">First Name *</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="First Name"
                            {...register("first_name")}
                            defaultValue={userData?.first_name}
                        />
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Last Name *</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Last Name"
                            {...register("last_name")}
                            defaultValue={userData?.last_name}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-3 gap-3">
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Middle Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Middle Name"
                            {...register("middle_name")}
                            defaultValue={userData?.middle_name}
                        />
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Name Extension</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Name Extension"
                            {...register("ext_name")}
                            defaultValue={userData?.ext_name}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-3 gap-3">
                    {userData?.standing &&
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Standing</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Position"
                                {...register("standing")}
                                defaultValue={userData?.standing}
                            />
                        </div>
                    }

                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Program</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Program"
                            {...register("program")}
                            defaultValue={userData?.program}
                        />
                    </div>
                    {userData?.position &&
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Position</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Position"
                                {...register("position")}
                                defaultValue={userData?.position}
                            />
                        </div>
                    }
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Phone Number</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Phone Number"
                            {...register("tel_number")}
                            defaultValue={userData?.tel_number}
                        />
                    </div>
                    {userInfo?.role === "admin" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-4">
                            {/* Archive User */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_deleted"
                                    {...register("is_deleted")}
                                    defaultChecked={userData?.is_deleted}
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <label htmlFor="is_deleted" className="text-textPrimary font-medium">
                                    Archive User
                                </label>
                            </div>

                            {/* Make Admin */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_admin"
                                    {...register("role")}
                                    defaultChecked={userData?.role === "admin"}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="is_admin" className="text-textPrimary font-medium">
                                    Make Admin
                                </label>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={() => router.push("/profile/change-password")}
                className="w-full mt-6 py-2 bg-white border border-red-700 text-textPrimary font-bold rounded-lg"
            >
                Change Password
            </button>
            <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}

export default EditProfle;
