"use client";

import { useEffect, useState } from "react";
import useRoomRequest from "@/hooks/room";
import Modal from "../Modal"
import AddRoomModal from "./AddRoomModal";
import { Room } from "@/interface/thesis.interface";

const RoomTable: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomSelected, setRoomSelected] = useState<Room | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);

    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { getAllRooms, deleteRoom } = useRoomRequest();

    async function fetchRooms() {
        const response = await getAllRooms();
        if (response.data) setRooms(response.data);
        else console.error(response.message || "Failed to fetch rooms.");
    }

    async function removeRoom(id: number) {
        const response = await deleteRoom(id);
        if (response.message) {
            setUpdateCount((prev) => prev + 1);
        } else {
            alert(response.message || "Failed to delete room.");
        }
    }

    useEffect(() => {
        fetchRooms();
    }, [updateCount]);

    const filteredRooms = rooms.filter((room) => {
        const matchName = room.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchLocation =
            locationFilter === "" || (room.location ?? "").toLowerCase().includes(locationFilter.toLowerCase());
        return matchName && matchLocation;
    });

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const paginatedData = filteredRooms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-4 flex justify-end space-x-2">
                <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="Search by room name"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <input
                    type="text"
                    className="p-2 border rounded-md"
                    placeholder="Search by location"
                    value={locationFilter}
                    onChange={(e) => {
                        setLocationFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                />


                <button
                    onClick={() => setIsModalOpen(true)}
                    className="h-9 px-3 py-2 text-sm font-normal rounded-md whitespace-nowrap bg-bgPrimary text-white"
                >
                    Add Room
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Room Name</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Location</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Capacity</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((room) => (
                            <tr key={room.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 text-sm text-gray-900">{room.name}</td>
                                <td className="p-3 text-sm text-gray-900">{room.location || "N/A"}</td>
                                <td className="p-3 text-sm text-gray-900">{room.capacity ?? "N/A"}</td>
                                <td className="p-3 text-sm text-gray-900">
                                    <button
                                        onClick={() => {
                                            setRoomSelected(room)
                                            setIsDeleteModalOpen(true)
                                        }}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-3 text-center text-sm text-gray-500">
                                No rooms found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <Modal title="Add Room" isModalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
                <AddRoomModal setIsModalOpen={setIsModalOpen} setUpdateCounter={setUpdateCount} />
            </Modal>

            <Modal title="Delete Room" isModalOpen={isDeleteModalOpen} setModalOpen={setIsDeleteModalOpen}>
                <div className="mt-4">
                    <p className="pb-6 text-black">
                        Are you sure you want to delete <strong>{roomSelected?.name}</strong>?
                    </p>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:opacity-80"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                if (roomSelected?.id !== undefined) {
                                    removeRoom(roomSelected.id);
                                    setIsDeleteModalOpen(false);
                                }
                            }}
                            className="px-4 py-2 bg-bgPrimary text-white rounded hover:opacity-90"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            </Modal>
        </div>
    );
};

export default RoomTable;
