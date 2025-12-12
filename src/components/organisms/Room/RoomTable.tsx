"use client";

import React, { useState } from "react";
import { useAllRooms, useDeleteRoom } from "@/hooks/room";
import Modal from "../Modal";
import AddRoomModal from "./AddRoomModal";
import { Room } from "@/interface/thesis.interface";
import { showToast } from "@/components/template/Toaster";

// Renamed for clarity: component prop types are usually not passed to stateless components
// like this, but if it were to receive props, you'd use React.FC<Props>
const RoomTable: React.FC = () => {
  const [roomSelected, setRoomSelected] = useState<Room | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Renamed from isModalOpen for clarity

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { mutateAsync: deleteRoom } = useDeleteRoom();
  const {
    data: roomData,
    isLoading: isAllRoomLoading,
    refetch,
  } = useAllRooms();

  const handleRefetchRooms = () => {
    refetch();
  };

  const listRoom: Room[] = roomData?.data || [];

  const filteredRooms = listRoom.filter((room) => {
    const name = room.name?.toLowerCase() || "";
    const location = room.location?.toLowerCase() || "";

    const matchName = name.includes(searchQuery.toLowerCase());

    const matchLocation =
      locationFilter === "" || location.includes(locationFilter.toLowerCase());

    return matchName && matchLocation;
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedData = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Loading spinner row component for DRY principle
  const LoadingRow = () => (
    <tr>
      <td colSpan={4} className="p-3 text-center text-sm text-gray-500">
        Loading room data...
      </td>
    </tr>
  );

  // New variable for clarity in conditional rendering
  const isDataEmpty = filteredRooms.length === 0 && !isAllRoomLoading;

  return (
    <div className="w-full overflow-x-auto">
      {/* Search and Add Buttons */}
      <div className="mb-4 flex flex-wrap justify-end gap-2">
        {/* Search by Name */}
        <input
          type="text"
          className="p-2 border rounded-md text-sm w-full sm:w-auto"
          placeholder="Search by room name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        {/* Filter by Location */}
        <input
          type="text"
          className="p-2 border rounded-md text-sm w-full sm:w-auto"
          placeholder="Filter by location" // Changed text to "Filter"
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="h-9 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap bg-brand-primary text-white hover:opacity-90">
          Add Room
        </button>
      </div>

      {/* --- Table / Empty State --- */}
      {isDataEmpty ? (
        <div className="text-center py-12 border border-gray-200 rounded-md bg-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Rooms Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {listRoom.length > 0
              ? "Try adjusting your filters or search query."
              : "There are currently no rooms available to display."}
          </p>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Room Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Capacity
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isAllRoomLoading ? (
                <LoadingRow />
              ) : (
                paginatedData.map(
                  (
                    room // Removed redundant type 'any'
                  ) => (
                    <tr key={room.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-900">{room.name}</td>
                      <td className="p-3 text-sm text-gray-900">
                        {room.location || "N/A"}
                      </td>
                      <td className="p-3 text-sm text-gray-900">
                        {room.capacity ?? "N/A"}
                      </td>
                      <td className="p-3 text-sm text-gray-900">
                        <button
                          onClick={() => {
                            setRoomSelected(room);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>

          {/* Pagination (Only render if there are filtered rooms) */}
          {filteredRooms.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0} // Added totalPages === 0 check
                className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50">
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Add Room Modal */}
      <Modal
        title="Add Room"
        isModalOpen={isAddModalOpen}
        modalType="info"
        setModalOpen={setIsAddModalOpen}>
        <AddRoomModal
          setIsModalOpen={setIsAddModalOpen}
          // Pass handleRefetchRooms to trigger data refresh after successful add
          setUpdateCounter={handleRefetchRooms}
        />
      </Modal>

      {/* Delete Room Modal */}
      <Modal
        title="Delete Room"
        modalType="info"
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}>
        <div className="mt-4">
          <p className="pb-6 text-black">
            Are you sure you want to delete{" "}
            <strong>{roomSelected?.name}</strong>?
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:opacity-80">
              Cancel
            </button>
            <button
              onClick={async () => {
                if (roomSelected?.id !== undefined) {
                  await deleteRoom(roomSelected.id, {
                    onSuccess: () => {
                      setIsDeleteModalOpen(false);
                      handleRefetchRooms();
                      showToast(
                        "You deleted a room.",
                        "success",
                        "Room Deleted"
                      );
                    },
                    onError: (error) => {
                      setIsDeleteModalOpen(false);
                      showToast(error.message, "error");
                    },
                  });
                }
              }}
              className="px-4 py-2 bg-brand-primary text-white rounded hover:opacity-90">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomTable;
