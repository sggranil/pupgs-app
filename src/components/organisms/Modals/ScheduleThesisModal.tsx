"use client";
import React, { useState } from "react"; // Added React import

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAllRooms } from "@/hooks/room";
import { useAllAdvisers } from "@/hooks/adviser";
import { useUpdateThesis } from "@/hooks/thesis";

import { Room, Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import { showToast } from "@/components/template/Toaster";

import {
  updateThesisScheduleSchema,
  UpdateThesisScheduleSchemaType,
} from "@/types/api/thesis.types";
import {
  getLocalDateString,
  getLocalTimeStringFormatted,
  getTodayDate,
  makeIsoUTCDateTime,
} from "@/utilities/DateUtilities";
import { TIME_BLOCK } from "@/constants/filters";

interface ThesisScheduleProps {
  thesisData: Thesis;
  setIsModalOpen: (open: boolean) => void;
  setIsUpdated: (updated: boolean) => void;
}

const ThesisScheduleModal: React.FC<ThesisScheduleProps> = ({
  thesisData,
  setIsModalOpen,
  setIsUpdated,
}) => {
  const [loading, setLoading] = useState<boolean>(false); // For form submission

  const { data: roomData, isLoading: isRoomLoading } = useAllRooms();
  const { data: adviserData, isLoading: isAdviserLoading } = useAllAdvisers();
  const { mutateAsync: updateThesis } = useUpdateThesis();

  const listRoomData = roomData?.data || ([] as Room[]);
  const listAdviserData = adviserData?.data || ([] as Adviser[]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateThesisScheduleSchemaType>({
    resolver: zodResolver(updateThesisScheduleSchema),
    defaultValues: {
      defense_date: getLocalDateString(thesisData?.defense_schedule),
      defense_time: getLocalTimeStringFormatted(thesisData?.defense_schedule),
      room_id: thesisData?.room_id,
      panelists: thesisData?.panelists?.map((p) => p.id.toString()),
      secretary_id: thesisData?.secretary_id,
    },
  });

  async function handleFormSubmit(values: UpdateThesisScheduleSchemaType) {
    setLoading(true);

    try {
      const payload = {
        defense_schedule: makeIsoUTCDateTime(
          values.defense_date,
          values.defense_time
        ),
        room_id: Number(values.room_id),
        secretary_id: Number(values.secretary_id),
        panelists: (values.panelists || []).map(Number),
      };

      await updateThesis({ thesis_id: thesisData?.id, payload: payload });

      setIsModalOpen(false);
      setIsUpdated(true);
      showToast(
        "You set a schedule for this Proposal.",
        "success",
        "Schedule Updated"
      );
    } catch (error: any) {
      setIsModalOpen(false);
      const errorMessage =
        error.message || "An error occurred during update. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  const secretaryPlaceholder = isAdviserLoading
    ? "-- Loading Secretaries --"
    : "-- Select Thesis Secretary --";
  const panelistsPlaceholder = isAdviserLoading
    ? "-- Loading Panelists --"
    : "-- Select Thesis Panelists --";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 py-2">
      {/* Room Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Room</label>
        <select
          className="w-full p-2 border rounded-md bg-white text-sm disabled:bg-gray-100"
          {...register("room_id")}
          disabled={isRoomLoading}>
          <option value={""} disabled>
            {isRoomLoading ? "-- Loading Rooms --" : "-- Select Room --"}
          </option>
          {listRoomData?.map((room: any) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        {errors.room_id && (
          <p className="text-state-danger text-sm mt-1">
            {errors.room_id.message}
          </p>
        )}
      </div>

      {/* Date and Time (omitted for brevity, they remain unchanged) */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Defense Date</label>
        <input
          className="w-full p-2 border rounded-md bg-white text-sm"
          type="date"
          min={getTodayDate()}
          {...register("defense_date")}></input>
        {errors.defense_date && (
          <p className="text-state-danger text-sm mt-1">
            {errors.defense_date.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Defense Time</label>
        <select
          className="w-full p-2 border rounded-md bg-white text-sm"
          {...register("defense_time")}>
          <option value="" disabled>
            -- Select Time --
          </option>
          {TIME_BLOCK?.map((time: any, idx: number) => (
            <option key={idx} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>

        {errors.defense_time && (
          <p className="text-state-danger text-sm mt-1">
            {errors.defense_time.message}
          </p>
        )}
      </div>

      {/* Thesis Secretary Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Thesis Secretary</label>
        <select
          className="w-full p-2 border rounded-md bg-white text-sm disabled:bg-gray-100"
          {...register("secretary_id")}
          disabled={isAdviserLoading}>
          {" "}
          {/* Disable while loading */}
          <option value={""} disabled>
            {secretaryPlaceholder}
          </option>
          {listAdviserData?.map((adviser: Adviser) => (
            <option key={adviser.id} value={adviser.id}>
              {adviser?.user?.first_name} {adviser?.user?.last_name}
            </option>
          ))}
        </select>

        {errors.secretary_id && (
          <p className="text-state-danger text-sm mt-1">
            {errors.secretary_id.message}
          </p>
        )}
      </div>

      {/* Panelist Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Panelist</label>
        <select
          multiple
          className="w-full p-2 border rounded-md bg-white text-sm disabled:bg-gray-100"
          {...register("panelists")}
          disabled={isAdviserLoading}>
          {" "}
          {/* Disable while loading */}
          <option value={0} disabled>
            {panelistsPlaceholder}
          </option>
          {listAdviserData?.map((adviser: Adviser) => (
            <option key={adviser.id} value={adviser.id}>
              {adviser?.user?.first_name} {adviser?.user?.last_name}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-500">
          Hold Ctrl (Win) or Cmd (Mac) to select multiple advisers
        </span>
        {errors.panelists && (
          <p className="text-state-danger text-sm mt-1">
            {errors.panelists.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-2 py-2 bg-brand-primary text-sm text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75"
        disabled={loading || isAdviserLoading || isRoomLoading}>
        {" "}
        {/* Disable if anything is loading */}
        {loading ? "Updating..." : "Update Information"}
      </button>
    </form>
  );
};

export default ThesisScheduleModal;
