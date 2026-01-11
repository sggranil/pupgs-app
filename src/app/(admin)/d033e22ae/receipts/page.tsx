"use client";

import { User } from "@/interface/user.interface";
import { useAllReceipts } from "@/hooks/receipts";
import ThesisReceiptsTable from "@/components/organisms/ThesisReceipt/ThesisReceiptsTable";
import { useUserContext } from "@/providers/UserProvider";

export default function ReceiptsPage() {
  const { user, isLoading: isUserContextLoading } = useUserContext();

  const {
    data: receiptsData,
    isLoading: isReceiptLoading,
    error,
    refetch,
  } = useAllReceipts();

  const handleReceiptsUpdated = () => {
    refetch();
  };

  const listData = receiptsData?.data || ([] as User[]);

  return (
    <div>
      <div
        className="w-full h-24 rounded-md"
        style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
        <div className="flex items-end justify-between h-full">
          <h1 className="text-white text-xl font-bold p-2 pl-4">
            Receipts Management
          </h1>
        </div>
      </div>

      <div className="mt-4">
        <ThesisReceiptsTable
          user={user}
          receiptData={listData}
          setIsUpdated={handleReceiptsUpdated}
        />
      </div>

      {/* <UsersTable
        isUserLoading={isUserLoading}
        userData={listData}
        setIsUpdated={handleReceiptsUpdated}
      /> */}
    </div>
  );
}
