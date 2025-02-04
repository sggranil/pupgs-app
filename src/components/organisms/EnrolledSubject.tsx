import { FormEvent, useState } from "react";

import { User } from "@/interface/user.interface";
import { z } from "zod";
import useUserRequest from "@/hooks/user";
import { useForm } from "react-hook-form";

import { removeToasts, showToast } from "@/components/organisms/Toast";
import { updateUserSchema } from "@/types/api/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateSchemaType = z.infer<typeof updateUserSchema>;

const EnrolledSubject: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <form>
            <div className="w-full py-4">
                <div>
                    <label className="block text-textPrimary font-semibold mb-1">Thesis Title *</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
                        placeholder="Thesis Proposal Title"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </form>
    );
}

export default EnrolledSubject;
