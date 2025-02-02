import { FormEvent, useState } from "react";

import { User } from "@/interface/user.interface";
import useUserRequest from "@/hooks/user";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import { UpdateSchemaType } from "@/types/api/auth.types";

interface EditProfileProps {
    userData: User | null;
}

const EditProfle: React.FC<EditProfileProps> = ({ userData }) => {
    const [ loading, setLoading ] = useState<boolean>(false)
    const { updateUser } = useUserRequest();
    
    const {
        getValues,
    } = useForm<UpdateSchemaType>()

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        removeToasts();

        try {
            const formData = getValues();
            const responseData = await updateUser(formData);
        
            if (responseData) {
                showToast(responseData?.message || "Registration failed. Please try again.", "error");
             } else {
                showToast(responseData?.message || "Registration failed. Please try again.", "error");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            showToast("An unexpected error occurred. Please try again later.", "error");
        } finally {
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
                            // {...update("confirm_password")}
                            defaultValue={userData?.first_name}
                        />
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Last Name *</label>
                        <input 
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Last Name"
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
                            defaultValue={userData?.middle_name}
                        />
                    </div>
                    <div>
                        <label className="block text-textPrimary font-semibold mb-1">Name Extension</label>
                        <input 
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                            placeholder="Name Extension"
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
                                defaultValue={userData?.standing}
                            />
                        </div>
                    }
                    {userData?.position &&
                        <div>
                            <label className="block text-textPrimary font-semibold mb-1">Position</label>
                            <input 
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                                placeholder="Position"
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
                            defaultValue={userData?.tel_number}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EditProfle;