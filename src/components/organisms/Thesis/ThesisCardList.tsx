"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Thesis } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";
import ThesisCard from "@/components/molecules/ThesisCard";
import { getCookie, getUserRoleFromCookies } from "@/utilities/AuthUtilities";
import ThesisTable from "@/components/organisms/Thesis/ThesisTable";

interface ThesisCardListProps {
    isUpdated: boolean;
    setIsUpdated: (isUpdated: boolean) => void;
}

const ThesisCardList: React.FC<ThesisCardListProps> = ({ isUpdated, setIsUpdated }) => {
    const [thesisModal, setThesisModal] = useState<boolean>(false);
    const [selectedThesis, setSelectedThesis] = useState<Thesis | null>(null);
    const [userThesis, setUserThesis] = useState<Thesis[]>([]);
    const [thesis, setThesis] = useState<Thesis[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { getAllThesis, getThesis } = useThesisRequest();

    const userRole = getUserRoleFromCookies();
    const userId = getCookie(null, "id");

    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        if (userRole === "adviser") {
            const response = await getAllThesis();
            setUserThesis(response?.data || []);
        } else if (userRole === "student") {
            const response = await getThesis(Number(userId));
            setThesis(response?.data || []);
        }
        setLoading(false);
        setIsUpdated(false);
    };

    useEffect(() => {
        fetchData();
    }, [isUpdated]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                {loading ? (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : userRole === "adviser" && userThesis.length > 0 ? (
                    <div className="col-span-full">
                        <ThesisTable setIsUpdated={setIsUpdated} userData={userThesis} />
                    </div>
                ) : userRole === "student" && thesis.length > 0 ? (
                    thesis.map((item) => (
                        <div
                            className="cursor-pointer"
                            key={item.id}
                            onClick={() => {
                                if (!item.is_confirmed) {
                                    setSelectedThesis(item);
                                    setThesisModal(true);
                                } else {
                                    router.push(`/thesis/?id=${item.id}`);
                                }
                            }}
                        >
                            <ThesisCard thesisData={item} />
                        </div>
                    ))
                ) : (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>No thesis found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThesisCardList;
