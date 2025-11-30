"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Thesis } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";

import ThesisCard from "@/components/molecules/ThesisCard";
import ThesisTable from "@/components/templates/Thesis/ThesisTable";

import { getUserInfoFromCookies } from "@/utilities/AuthUtilities";

interface ThesisCardListProps {
  isUpdated: boolean;
  setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisCardList: React.FC<ThesisCardListProps> = ({
  isUpdated,
  setIsUpdated,
}) => {
  const [userThesis, setUserThesis] = useState<Thesis[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllThesis } = useThesisRequest();

  const userData = getUserInfoFromCookies();

  const router = useRouter();

  const fetchAllThesis = async () => {
    setLoading(true);
    const response = await getAllThesis();

    if (response && Array.isArray(response.data)) {
      const filtered = response.data.filter((data: any) => {
        if (userData?.role === "admin") return true;
        if (userData?.role === "adviser")
          return data?.adviser?.user_id === userData.userId;
        if (userData?.role === "student")
          return data?.student?.user_id === userData.userId;
        return false;
      });

      setUserThesis(filtered);
    }

    setLoading(false);
    setIsUpdated(false);
  };

  useEffect(() => {
    fetchAllThesis();
  }, [isUpdated]);

  return (
    <div className="w-full h-24 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
        {loading ? (
          <div className="h-48 col-span-full flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : userThesis && userThesis.length > 0 ? (
          userData?.role === "student" || userData?.role === "adviser" ? (
            userThesis.map((thesis, idx) => (
              <div
                className="cursor-pointer"
                key={thesis.id}
                onClick={() => {
                  router.push(`/thesis/info/?id=${thesis.id}&index=${idx}`);
                }}>
                <ThesisCard thesisData={thesis} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <ThesisTable
                setIsUpdated={setIsUpdated}
                thesisData={userThesis}
              />
            </div>
          )
        ) : (
          <div className="h-48 col-span-full flex justify-center items-center">
            <p>No proposals found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThesisCardList;
