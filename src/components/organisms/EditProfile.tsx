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
import { DEPARTMENTS } from "@/constants/departments";
import { COURSES } from "@/constants/course";

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

            if (payload.start_date === "") {
                payload.start_date = null;
            } else if (typeof payload.start_date === 'string') {
                const parsedStartDate = new Date(payload.start_date);
                payload.start_date = !isNaN(parsedStartDate.getTime()) ? parsedStartDate : null;
            }

            if (payload.pass_date === "") {
                payload.pass_date = null;
            } else if (typeof payload.pass_date === 'string') {
                const parsedPassDate = new Date(payload.pass_date);
                payload.pass_date = !isNaN(parsedPassDate.getTime()) ? parsedPassDate : null;
            }

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
                    <div className="flex justify-between align-center gap-2">
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Prefix</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Dr., Asst. Prof., etc."
                                {...register("prefix")}
                                defaultValue={userData?.prefix}
                            />
                        </div>
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Name Extension</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Jr., Sr., or such titles (MSIT, MSCS, MBA, etc.)"
                                {...register("ext_name")}
                                defaultValue={userData?.ext_name}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Date Started</label>
                        <input
                            type="date"
                            placeholder="YYYY-MM-DD"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            {...register("start_date")}
                            defaultValue={userData?.start_date
                                ? new Date(userData.start_date).toISOString().split('T')[0]
                                : ''
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Comprehensive Exam Pass Date</label>
                        <input
                            type="date"
                            placeholder="YYYY-MM-DD"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            {...register("pass_date")}
                            defaultValue={userData?.pass_date
                                ? new Date(userData.pass_date).toISOString().split('T')[0]
                                : ''
                            }
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
                        <label htmlFor="program" className="block text-textPrimary font-semibold mb-1">Program</label>
                        <select
                            id="program"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white focus:ring-blue-500 focus:border-blue-500" // Added focus styles
                            {...register("program")}
                            defaultValue={userData?.program || ""}
                        >
                            <option value="" disabled>Select a Program</option>
                            {COURSES.map((course) => (
                                <option key={course.id} value={course.name}>
                                    {course.name} ({course.level})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-textPrimary font-semibold mb-1">Department</label>
                        <select
                            id="department"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white focus:ring-blue-500 focus:border-blue-500" // Added focus styles
                            {...register("department")}
                            defaultValue={userData?.department || ""}
                        >
                            <option value="" disabled>Select a Department</option>
                            {DEPARTMENTS.map((department, index) => (
                                <option key={index} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
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
                            {userData?.id != userInfo?.userId && (
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
                            )}
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
