import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateThesisSchema,
  UpdateThesisSchemaType,
} from "@/types/api/thesis.types";
import { showToast, removeToasts } from "@/components/template/Toaster";

import useThesisRequest from "@/hooks/thesis";
import useAdviserRequest from "@/hooks/adviser";
import { Adviser } from "@/interface/user.interface";
import { CONFIRMATION_STATUSES, THESIS_MESSAGES } from "@/constants/filters";

interface ThesisConfirmationProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setIsUpdated: (isUpdated: boolean) => void;
  thesisData?: any;
}

const ThesisConfirmationModal: React.FC<ThesisConfirmationProps> = ({
  thesisData,
  setIsModalOpen,
  setIsUpdated,
}) => {
  const [adviserData, setAdviserData] = useState<Adviser[]>([]);
  const [filteredAdvisers, setFilteredAdvisers] = useState<Adviser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { confirmedThesis } = useThesisRequest();
  const { getAllAdviser } = useAdviserRequest();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateThesisSchemaType>({
    resolver: zodResolver(updateThesisSchema),
    defaultValues: {
      status: thesisData?.status ?? "pending_review",
      message: thesisData?.message ?? "",
      adviser_id: thesisData?.adviser_id ?? undefined,
    },
  });

  const isConfirmed = watch("status");

  useEffect(() => {
    fetchAdvisers();
  }, []);

  const fetchAdvisers = async () => {
    try {
      const response = await getAllAdviser();
      const advisers = response?.data || [];
      setAdviserData(advisers);
      setFilteredAdvisers(advisers);
    } catch (error) {
      console.error("Error fetching advisers:", error);
      setAdviserData([]);
      setFilteredAdvisers([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAdvisers(adviserData);
    } else {
      const filtered = adviserData.filter((adviser) =>
        `${adviser.user.first_name} ${adviser.user.last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredAdvisers(filtered);
    }
  }, [searchQuery, adviserData]);

  useEffect(() => {
    if (thesisData?.adviser_id && adviserData.length > 0) {
      const adviser = adviserData.find((a) => a.id === thesisData.adviser_id);
      if (adviser) {
        setSearchQuery(`${adviser.user.first_name} ${adviser.user.last_name}`);
        setValue("adviser_id", adviser.id, { shouldValidate: true });
      }
    }
  }, [thesisData, adviserData, setValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".adviser-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onThesisConfirmation = async (data: UpdateThesisSchemaType) => {
    removeToasts();
    setLoading(true);

    try {
      await confirmedThesis({
        id: thesisData?.id,
        status: data.status,
        user_id: thesisData?.student?.user_id,
        adviser_id: data.adviser_id,
        message: data.message,
      });
      showToast("Thesis updated successfully!", "success");
      setIsUpdated(true);
      setIsModalOpen(false);
    } catch (error: any) {
      showToast(
        `An error occurred. Please try again. ${error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onThesisConfirmation)}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Confirmation
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("status")}>
            <option value="" disabled>
              Confirmation
            </option>
            {Object.entries(CONFIRMATION_STATUSES).map(([key, value]) => (
              <option key={key} value={value.value}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Message *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("message")}>
            <option value="" disabled>
              Choose a message
            </option>
            {Object.entries(THESIS_MESSAGES).map(([groupKey, group]) => (
              <optgroup key={groupKey} label={group.label}>
                {group.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {isConfirmed !== "pending_review" && (
          <div className="mb-4 relative adviser-dropdown">
            <label className="block text-textPrimary font-semibold mb-1">
              Select Thesis Adviser *
            </label>

            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
              placeholder="Search adviser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
            />
            {errors.adviser_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adviser_id.message}
              </p>
            )}

            {dropdownOpen && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
                {filteredAdvisers.length > 0 ? (
                  filteredAdvisers.map((adviser) => (
                    <li
                      key={adviser.id}
                      onClick={() => {
                        setValue("adviser_id", adviser.id, {
                          shouldValidate: true,
                        });
                        setSearchQuery(
                          `${adviser.user.first_name} ${adviser.user.last_name}`
                        );
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100">
                      {adviser.user.first_name} {adviser.user.last_name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No advisers found</li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2">
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-bgPrimary text-textWhite font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
          disabled={loading}>
          {loading ? "Uploading..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default ThesisConfirmationModal;
