// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { SquarePen, X } from "lucide-react";

// import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

// import AttachmentCardList from "@/components/organisms/Attachment/AttachmentCardList";
// import ThesisInfoCard from "@/components/templates/Thesis/ThesisInfoCard";

// import useAdviserRequest from "@/hooks/adviser";
// import useRoomRequest from "@/hooks/room";
// import useThesisRequest from "@/hooks/thesis";

// import { Adviser } from "@/interface/user.interface";
// import { ThesisReceipt, Room, Thesis } from "@/interface/thesis.interface";

// import ThesisFiles from "@/components/templates/Thesis/ThesisFiles";
// import DefensePhaseInfo from "@/components/organisms/Subject/DefensePhaseInfo";

// import { showToast } from "@/components/templates/Toaster";

// export default function ThesisPage() {
//   const [thesisData, setThesisData] = useState<Thesis | null>(null);
//   const [adviserData, setAdviserData] = useState<Adviser[]>([]);
//   const [roomData, setRoomData] = useState<Room[]>([]);
//   const [thesisReceiptData, setThesisReceiptData] =
//     useState<ThesisReceipt | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [isUpdated, setIsUpdated] = useState<boolean>(false);
//   const [isSubjectLoaded, setIsSubjectLoaded] = useState<boolean>(false);
//   const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
//   const [programChair, setProgramChair] = useState<string>("");
//   const [dean, setDean] = useState<string>("");
//   const [editedTitle, setEditedTitle] = useState<string>("");

//   const searchParams = useSearchParams();
//   const thesisId = searchParams.get("id");

//   const { fetchThesis, updateThesisInfo } = useThesisRequest();
//   const { getAllAdviser } = useAdviserRequest();
//   const { getAllRooms } = useRoomRequest();

//   const userData = getUserInfoFromCookies();

//   const fetchThesisData = async () => {
//     setLoading(true);
//     setIsSubjectLoaded(true);
//     const response = await fetchThesis(Number(thesisId));
//     if (response) {
//       setThesisData(response.data);
//     }
//     setLoading(false);
//     setIsSubjectLoaded(false);
//   };

//   const fetchRooms = async () => {
//     try {
//       const response = await getAllRooms();
//       setRoomData(response?.data || []);
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//       setRoomData([]);
//     }
//   };

//   const fetchAdvisers = async () => {
//     try {
//       const response = await getAllAdviser();
//       setAdviserData(response?.data || []);

//       const progChair = response?.data.filter(
//         (data: any) =>
//           data?.user?.position === "Program Chair" &&
//           data?.user?.program === thesisData?.student?.user?.program
//       );

//       const dean = response?.data.filter(
//         (data: any) =>
//           data?.user?.position === "Dean" &&
//           data?.user?.department === thesisData?.student?.user?.department
//       );

//       setProgramChair(
//         `${progChair[0]?.user?.prefix ?? ""} ${
//           progChair[0]?.user?.first_name ?? ""
//         } ${progChair[0]?.user?.last_name ?? ""}`.trim()
//       );

//       setDean(
//         `${dean[0]?.user?.prefix ?? ""} ${dean[0]?.user?.first_name ?? ""} ${
//           dean[0]?.user?.last_name ?? ""
//         }`.trim()
//       );
//     } catch (error) {
//       console.error("Error fetching advisers:", error);
//       setAdviserData([]);
//     }
//   };

//   const handleUpdateTitle = async () => {
//     if (!editedTitle.trim()) {
//       showToast("Title cannot be empty.", "error");
//       return;
//     }

//     const data = {
//       id: thesisData?.id,
//       thesis_title: editedTitle,
//     };

//     setLoading(true);
//     try {
//       const res = await updateThesisInfo(data);
//       if (res) {
//         await fetchThesisData();
//         showToast("Title updated successfully.", "success");
//         setIsEditTitle(false);
//       } else {
//         showToast("Failed to update title.", "error");
//       }
//     } catch (err) {
//       showToast("Something went wrong.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (thesisId) {
//       fetchThesisData();
//     }
//   }, [thesisId]);

//   useEffect(() => {
//     if (thesisData) {
//       fetchAdvisers();
//       fetchRooms();
//     }
//   }, [thesisData, isUpdated]);

//   return (
//     <div className="w-full py-4">
//       {loading ? (
//         <div className="min-h-screen flex flex-col justify-center items-center">
//           <p>Loading...</p>
//         </div>
//       ) : (
//         <>
//           <div className="p-4 border-b-2 border-gray-200">
//             <div className="">
//               {isEditTitle ? (
//                 <div className="flex align-center">
//                   <input
//                     type="text"
//                     defaultValue={thesisData?.thesis_title}
//                     onChange={(e) => setEditedTitle(e.target.value)}
//                     className="text-textPrimary text-xl md:text-2xl font-bold border-b border-gray-400 focus:outline-none"
//                   />
//                   <button onClick={() => setIsEditTitle(false)}>
//                     <X className="text-textPrimary mt-1 ml-2" size={24} />
//                   </button>
//                   <button
//                     className="bg-bgPrimary text-white text-sm rounded-md px-2 mt-1 ml-2"
//                     onClick={handleUpdateTitle}>
//                     Submit
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex align-center">
//                   <h1 className="text-textPrimary text-xl md:text-2xl font-bold">
//                     "{thesisData?.thesis_title}"
//                   </h1>
//                   <button onClick={() => setIsEditTitle(true)}>
//                     <SquarePen
//                       className="text-textPrimary mt-1 ml-2"
//                       size={24}
//                     />
//                   </button>
//                 </div>
//               )}
//             </div>
//             <>
//               <span className="uppercase text-lg font-bold">
//                 {thesisData?.student?.user_id}
//                 {thesisData?.student?.user?.first_name}{" "}
//                 {thesisData?.student?.user?.last_name}
//               </span>{" "}
//               |{" "}
//               <span className="uppercase text-lg font-bold">
//                 {thesisData?.student?.user?.program ?? "Sta. Mesa Campus"}
//               </span>
//             </>
//           </div>

//           <div className="grid grid-cols-12 gap-2 py-2">
//             <div className="col-span-12 md:col-span-7 p-4">
//               <DefensePhaseInfo
//                 thesisData={thesisData}
//                 isSubjectLoaded={isSubjectLoaded}
//               />
//               <AttachmentCardList
//                 thesisId={thesisId ?? ""}
//                 status={thesisData?.status ?? ""}
//               />
//             </div>
//             <div className="col-span-12 md:col-span-5 pt-4">
//               <ThesisInfoCard
//                 setIsUpdated={setIsUpdated}
//                 adviserData={adviserData}
//                 roomData={roomData}
//                 thesisData={thesisData}
//                 subjectData={thesisReceiptData}
//               />
//               {userData?.role === "student" &&
//                 thesisData?.status != "pending_review" && (
//                   <ThesisFiles
//                     thesisData={thesisData}
//                     subjectData={thesisReceiptData}
//                     programChair={programChair}
//                     dean={dean}
//                   />
//                 )}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import React, { use } from "react";

import { useGetThesis } from "@/hooks/thesis";

import { Thesis } from "@/interface/thesis.interface";
import ThesisInfoLoadingState from "@/components/template/SkeletonContainer/ThesisInfoSkeleton";

import { ThesisTitle } from "@/components/organisms/Thesis/ThesisTitle";
import AttachmentCardList from "@/components/organisms/Attachment/AttachmentCardList";

import ThesisInformation from "@/components/organisms/Thesis/ThesisInformation";

export default function ThesisInfoPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  const {
    data: thesisData,
    isLoading: isThesisLoading,
    error,
    refetch,
  } = useGetThesis(id);

  const handleThesisUpdated = () => {
    refetch();
  };

  const thesisInfo = thesisData?.data as Thesis;

  if (isThesisLoading) {
    return <ThesisInfoLoadingState />;
  }

  return (
    <>
      <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pt-2 pb-2 rounded-md">
            <h1 className="text-content-primary text-lg font-bold pb-1 pt-2">
              <ThesisTitle
                thesisId={thesisInfo.id}
                thesisTitle={thesisInfo.thesis_title}
                setIsUpdated={handleThesisUpdated}
              />
            </h1>
            <div className="mb-2">
              <p className="text-content-primary font-semibold text-sm pr-2">
                {thesisInfo.student?.user.last_name},{" "}
                {thesisInfo.student?.user.first_name}
              </p>
              <p className="font-normal text-sm">
                {thesisInfo.student?.user.program}
              </p>
            </div>
          </div>
          <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
            <ThesisInformation
              thesisData={thesisInfo}
              setIsUpdated={handleThesisUpdated}
            />
          </div>
        </div>

        <div className="bg-white w-full md:w-1/2 ring-1 ring-black ring-opacity-10 transition-opacity px-4 pb-2 rounded-md">
          <AttachmentCardList
            thesisId={thesisInfo.id}
            attachments={thesisInfo.attachments}
            setIsUpdated={handleThesisUpdated}
          />
        </div>
      </div>
    </>
  );
}
