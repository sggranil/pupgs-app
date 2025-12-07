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

import React, { useEffect } from "react";
import { useState } from "react";

import useThesisRequest from "@/hooks/thesis";
import { useUserContext } from "@/context/UserContext";

import { Thesis } from "@/interface/thesis.interface";

import { showToast } from "@/components/template/Toaster";

export default function ThesisInfoPage({ params }: { params: { id: number } }) {
  const { id } = params;
  const { user, isLoading: isUserContextLoading } = useUserContext();
  const { getThesis } = useThesisRequest();

  const [thesisData, setThesisData] = useState<Thesis>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function onGetThesisFetch(studentId: number) {
    try {
      const request = await getThesis(studentId);
      setThesisData(request.data);
    } catch (err: any) {
      showToast(
        "Unable to process your request. " + err.message,
        "error",
        "Server Error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isUserContextLoading) {
      setIsLoading(true);
      return;
    }

    if (user) {
      const studentId = Number(user.id);

      if (isNaN(studentId)) {
        setIsLoading(false);
        showToast("Invalid User ID.", "error", "Authentication Error");
        return;
      }

      onGetThesisFetch(studentId);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>Title: {id}</h1>
      <p>Data: {thesisData?.thesis_title}</p>
    </div>
  );
}
