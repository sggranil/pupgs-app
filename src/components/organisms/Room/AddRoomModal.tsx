"use client";

import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addRoomSchema, AddRoomSchemaType } from "@/types/api/thesis.types";

import { showToast, removeToasts } from "@/components/template/Toaster";

interface AddRoomModalProps {
  setIsModalOpen: (modalOpen: boolean) => void;
  setUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  setIsModalOpen,
  setUpdateCounter,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<AddRoomSchemaType>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      name: "",
      location: "",
      capacity: "",
    },
  });

  async function onAddRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    removeToasts();
    setLoading(true);

    try {
      const values = getValues();

      const payload = {
        name: values.name,
        location: values.location || null,
        capacity: values.capacity ? Number(values.capacity) : null,
      };

      const res = await fetch("/api/room/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to add room");

      showToast("Room added successfully!", "success");
      setUpdateCounter((prev) => prev + 1);
      setIsModalOpen(false);
    } catch (error: any) {
      showToast(`An error occurred: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onAddRoom}>
      <div className="w-full py-4">
        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Room Name *
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("name")}
            placeholder="Room Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("location")}
            placeholder="Location"
          />
        </div>

        <div className="mb-4">
          <label className="block text-textPrimary font-semibold mb-1">
            Capacity
          </label>
          <input
            type="number"
            min="0"
            className="w-full p-2 border border-gray-300 rounded-md text-textPrimary bg-white"
            {...register("capacity")}
            placeholder="Capacity"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-bgPrimary text-white font-bold rounded-lg hover:opacity-75 disabled:opacity-50"
          disabled={loading}>
          {loading ? "Adding..." : "Add Room"}
        </button>
      </div>
    </form>
  );
};

export default AddRoomModal;
