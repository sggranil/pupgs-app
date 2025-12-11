"use client";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAllRooms } from "@/hooks/room";

import { Room, Thesis } from "@/interface/thesis.interface";
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
import { useUpdateThesis } from "@/hooks/thesis";
import { useAllAdvisers } from "@/hooks/adviser";
import { Adviser } from "@/interface/user.interface";

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
  const [loading, setLoading] = useState<boolean>(false);

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
      panelists: thesisData?.panelists,
    },
  });

  const { data: roomData } = useAllRooms();
  const { data: adviserData } = useAllAdvisers();
  const { mutateAsync: updateThesis } = useUpdateThesis();

  const listRoomData = roomData?.data || ([] as Room[]);
  const listAdviserData = adviserData?.data || ([] as Adviser[]);

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
        panelists: values.panelists,
      };

      updateThesis(
        { thesis_id: thesisData?.id, payload: payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setIsUpdated(true);
            showToast(
              "You set a schedule for this Proposal.",
              "success",
              "Schedule Updated"
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
        "An error occurred during update. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Room</label>
        <select
          className="w-full p-2 border rounded-md bg-white text-sm"
          {...register("room_id")}>
          <option value={""} disabled>
            -- Select Room --
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

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Thesis Secretary</label>
        <select
          className="w-full p-2 border rounded-md bg-white text-sm"
          {...register("secretary_id")}>
          <option value={""} disabled>
            -- Select Thesis Secretary --
          </option>
          {listAdviserData?.map((adviser: any) => (
            <option key={adviser.id} value={adviser.id}>
              {adviser?.user?.first_name} {adviser?.user?.last_name}
            </option>
          ))}
        </select>

        {errors.panelists && (
          <p className="text-state-danger text-sm mt-1">
            {errors.panelists.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Panelist</label>
        <select
          multiple
          className="w-full p-2 border rounded-md bg-white text-sm"
          {...register("panelists")}>
          <option value={0} disabled>
            -- Select Thesis Panelists --
          </option>
          {listAdviserData?.map((adviser: any) => (
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
        className="w-full mt-2 py-2 bg-brand-primary text-sm text-white font-bold rounded-lg hover:bg-brand-primary-hover disabled:opacity-75">
        {loading ? "Updating..." : "Update Information"}
      </button>
    </form>
  );
};

export default ThesisScheduleModal;
