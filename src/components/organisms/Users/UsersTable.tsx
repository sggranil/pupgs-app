"use client";
import { useState } from "react";

import { User } from "@/interface/user.interface";
import Modal from "../Modal";
import ManageUserModal from "../Modals/ManageUserModal";
import AddUserModal from "./AddUserModal";

interface UserTableProps {
  userData: User[];
  isUserLoading: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  userData,
  isUserLoading,
  setIsUpdated,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAdviserModalOpen, setIsAdviserModalOpen] = useState(false);

  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [updateCount, setUpdateCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

  const filteredUsers = userData?.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  // Check for the empty state
  const isDataEmpty = filteredUsers.length === 0 && !isUserLoading;

  return (
    <div className="w-full">
      <div className="flex items-center justify-end py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Search by name or email"
            className="p-2 border border-gray-300 rounded-md text-sm w-full sm:w-auto flex-grow sm:flex-grow-0"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* --- Empty State / Table Rendering --- */}
      {isUserLoading ? (
        <table className="min-w-full mt-2 bg-white border border-gray-200 rounded-md shadow-md">
          <tbody>
            <tr>
              <td colSpan={7} className="p-3 text-center text-sm text-gray-500">
                Loading user data...
              </td>
            </tr>
          </tbody>
        </table>
      ) : isDataEmpty ? (
        <div className="text-center py-12 border border-gray-200 rounded-md bg-white shadow-md mt-2">
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2a3 3 0 00-5.356-1.857M9 20V8m3-2v12m-3-4h6m-6 4h6m-3-4V8m0 12V8"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No Users Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {userData.length > 0
              ? "Try adjusting your search query to find users."
              : "There are currently no users in the system."}
          </p>
        </div>
      ) : (
        <>
          <table className="min-w-full mt-2 bg-white border border-gray-200 rounded-md shadow-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Position
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Program
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Admin
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user: User) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-900">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="p-3 text-sm text-gray-900">{user.email}</td>
                  <td className="p-3 text-sm text-gray-900">
                    {user.position ?? user.standing ?? "N/A"}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {user.program ?? "No Program"}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {user.department ?? "No Department"}
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {user.role === "admin" ? "Yes" : "No"}
                  </td>
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:opacity-80">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </>
      )}

      {userToEdit && (
        <Modal
          title={`Edit User: ${userToEdit.first_name}`}
          isModalOpen={isEditModalOpen}
          modalType="info"
          setModalOpen={setIsEditModalOpen}>
          <ManageUserModal
            userData={userToEdit}
            isShowEdit={setIsEditModalOpen}
            setIsUpdated={setIsUpdated}
            setIsModalOpen={setIsEditModalOpen}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
