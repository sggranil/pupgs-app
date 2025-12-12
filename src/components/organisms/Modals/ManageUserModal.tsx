import { useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/interface/user.interface";
import { useUpdateUser } from "@/hooks/user";
import { useForm } from "react-hook-form";

import { updateUserSchema, UpdateUserSchemaType } from "@/types/api/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEPARTMENTS } from "@/constants/departments";
import { COURSES } from "@/constants/course";
import { POSITIONS } from "@/constants/positions";

import { showToast } from "@/components/template/Toaster";
import { useUserContext } from "@/providers/UserProvider";

interface ManageUserProps {
  userData: User | null;
  fromUserProfile?: boolean | null;
  isShowEdit: (showEdit: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
}

const ManageUserModal: React.FC<ManageUserProps> = ({
  userData,
  isShowEdit,
  setIsUpdated,
  setIsModalOpen,
  fromUserProfile,
}) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(userData?.role === "admin");
  const { mutateAsync: updateUser } = useUpdateUser();

  let newRole;

  const isoDateTime = (dateOnly: string | undefined) =>
    dateOnly + "T00:00:00.000Z";
  const splitIsoDateTime = (dateOnly: string | undefined) =>
    dateOnly?.split("T")[0];

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      first_name: userData?.first_name ?? "",
      middle_name: userData?.middle_name ?? "",
      last_name: userData?.last_name ?? "",
      ext_name: userData?.ext_name ?? "",
      prefix: userData?.prefix ?? "",
      standing: userData?.standing ?? "",
      position: userData?.position ?? "",
      start_date: splitIsoDateTime(userData?.start_date) ?? "",
      pass_date: splitIsoDateTime(userData?.pass_date) ?? "",
      is_archived: userData?.is_archived,
      role: userData?.role ?? "",
      program: userData?.program ?? "",
      department: userData?.department ?? "",
      tel_number: userData?.tel_number ?? "",
    },
  });

  async function handleFormSubmit(values: UpdateUserSchemaType) {
    try {
      let finalRole: string;
      const currentPosition = getValues("position");

      if (isAdmin) {
        finalRole = "admin";
      } else if (currentPosition) {
        if (
          currentPosition === "Program Coordinator" ||
          currentPosition === "Academic Program Head" ||
          currentPosition === "Program Chair"
        ) {
          finalRole = "chairperson";
        } else if (currentPosition === "Dean") {
          finalRole = "dean";
        } else {
          finalRole = "adviser";
        }
      } else {
        finalRole = userData?.role || "student";
      }

      updateUser(
        {
          user_id: userData?.id,
          payload: {
            ...values,
            role: newRole,
            start_date: values?.start_date
              ? isoDateTime(values?.start_date)
              : "",
            pass_date: values?.pass_date ? isoDateTime(values?.pass_date) : "",
          },
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsUpdated(true);
            showToast(
              "You updated your profile.",
              "success",
              "Profile Updated"
            );
          },
          onError: (error) => {
            setIsModalOpen(false);
            showToast(error.message, "error");
          },
        }
      );
    } catch (error) {
      const errorMessage =
        (error as any)?.message ||
        "An error occurred during updated. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full py-4">
        <div className="grid grid-cols-1 mb-3 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              placeholder="First Name"
              {...register("first_name")}
            />
          </div>
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              placeholder="Last Name"
              {...register("last_name")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-3 gap-3">
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              Middle Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              placeholder="Middle Name"
              {...register("middle_name")}
            />
          </div>
          <div className="flex justify-between align-center gap-2">
            <div>
              <label className="text-sm text-context-primary font-semibold mb-1">
                Prefix
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
                placeholder="Dr., Asst. Prof., etc."
                {...register("prefix")}
              />
            </div>
            <div>
              <label className="text-sm text-context-primary font-semibold mb-1">
                Extension
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
                placeholder="Jr., Sr., or such titles (MSIT, MSCS, MBA, etc.)"
                {...register("ext_name")}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              Date Started
            </label>
            <input
              type="date"
              placeholder="YYYY-MM-DD (ISO-8601)"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              {...register("start_date")}
            />
          </div>
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              Comprehensive Exam
            </label>
            <input
              type="date"
              placeholder="YYYY-MM-DD (ISO-8601)"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              {...register("pass_date")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-3 gap-3">
          {userData?.standing && (
            <div>
              <label className="text-sm text-context-primary font-semibold mb-1">
                Standing
              </label>
              <input
                disabled={userData?.role === "student"}
                type="text"
                className={`w-full p-2 border text-sm border-gray-300 rounded-md bg-white ${
                  userData?.role === "student"
                    ? "text-gray-400"
                    : "text-context-primary"
                }`}
                placeholder="Position"
                {...register("standing")}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="program"
              className="text-sm text-context-primary font-semibold mb-1">
              Program
            </label>
            <select
              id="program"
              className="w-full p-2 border text-sm border-gray-300 rounded-md text-context-primary bg-white focus:ring-blue-500 focus:border-blue-500" // Added focus styles
              {...register("program")}>
              <option value="" disabled>
                Select a Program
              </option>
              {COURSES.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name} ({course.level})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="department"
              className="text-sm text-context-primary font-semibold mb-1">
              Department
            </label>
            <select
              id="department"
              className="w-full p-2 border text-sm border-gray-300 rounded-md text-context-primary bg-white focus:ring-blue-500 focus:border-blue-500"
              {...register("department")}>
              <option value="" disabled>
                Select a Department
              </option>
              {DEPARTMENTS.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          {userData?.position && (
            <div>
              <label
                htmlFor="position"
                className="block text-sma text-context-primary font-semibold mb-1">
                Position
              </label>
              <select
                id="position"
                className="w-full text-sm p-2 border border-gray-300 rounded-md text-context-primary bg-white focus:ring-blue-500 focus:border-blue-500" // Added focus styles
                {...register("position")}>
                <option value="" disabled>
                  Position
                </option>
                {POSITIONS.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="text-sm text-context-primary font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-context-primary bg-white text-sm"
              placeholder="Phone Number"
              {...register("tel_number")}
            />
          </div>
          {user?.role === "admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-4">
              {/* Archive User */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_deleted"
                  {...register("is_archived")}
                  defaultChecked={userData?.is_archived}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="is_deleted"
                  className="text-context-primary font-medium">
                  Archive User
                </label>
              </div>

              {/* Make Admin FIX */}
              {userData?.id != user?.id ||
                (userData?.role != "student" && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_admin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="is_admin"
                      className="text-context-primary font-medium">
                      Make Admin
                    </label>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          type="button"
          // onClick={() => router.push("/profile/change-password")}
          className="w-full py-2 bg-white border border-red-700 text-context-primary font-bold rounded-md">
          Change Password
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-brand-primary text-white font-bold rounded-md hover:bg-brand-primary-hover disabled:opacity-75">
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ManageUserModal;
