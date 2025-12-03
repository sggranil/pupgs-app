"use client";

import { useEffect, useState } from "react";
import useUserRequest from "@/hooks/user";
import Modal from "@/components/organisms/Modal";
import { User } from "@/interface/user.interface";
import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";
import ManageUserModal from "@/components/organisms/Modals/ManageUserModal";
import AddUserModal from "./AddUserModal";

const UsersTable = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAdviserModalOpen, setIsAddAdviserModalOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const { getAllUser } = useUserRequest();
  const userData = getUserInfoFromCookies();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

  const fetchUsersData = async () => {
    const response = await getAllUser();

    if (response.data) {
      const filtered = response.data.filter((user: User) =>
        userData?.role === "admin"
          ? user?.role != "student" && !user?.is_deleted
          : user?.role === "student" && !user?.is_deleted
      );
      setUsersData(filtered);
    } else {
      console.error(response.message || "Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [updateCount, isRefresh]);

  const filteredUsers = usersData.filter((user) =>
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <h1 className="text-textPrimary text-xl font-bold">
          {userData?.role === "admin" ? "Adviser" : "Student"} Management
        </h1>

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
          {userData?.role === "admin" && (
            <button
              onClick={() => setIsAddAdviserModalOpen(true)}
              className="h-9 px-4 py-2 text-sm font-medium rounded-md bg-bgPrimary text-white hover:opacity-90">
              Add Adviser
            </button>
          )}
        </div>
      </div>

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
            {userData?.role === "admin" && (
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Admin
              </th>
            )}
            <th className="p-3 text-left text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
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
                {userData?.role === "admin" && (
                  <td className="p-3 text-sm text-gray-900">
                    {user.role === "admin" ? "Yes" : "No"}
                  </td>
                )}
                {userData?.userId != user?.id && (
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:opacity-80">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-center text-sm text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Next
        </button>
      </div>

      <Modal
        title="Edit User"
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}>
        <ManageUserModal
          userData={selectedUser}
          isShowEdit={setIsModalOpen}
          isUpdated={setIsRefresh}
        />
      </Modal>

      <Modal
        title="Add Adviser"
        isModalOpen={isAddAdviserModalOpen}
        setModalOpen={setIsAddAdviserModalOpen}>
        <AddUserModal
          setIsModalOpen={setIsAddAdviserModalOpen}
          setUpdateCounter={setUpdateCount}
        />
      </Modal>
    </div>
  );
};

export default UsersTable;
