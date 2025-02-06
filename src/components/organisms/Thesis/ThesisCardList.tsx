"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import Modal from "../Modal";
import AddThesisModal from "./AddThesisModal";
import { Thesis } from "@/interface/thesis.interface";
import useThesisRequest from "@/hooks/thesis";
import ThesisCard from "@/components/molecules/ThesisCard";

interface ThesisardListProps {
    isUpdated: boolean;
    setIsUpdated: (isUpdated: boolean) => void;
}

const ThesistCardList: React.FC<ThesisardListProps> = ({ isUpdated, setIsUpdated }) => {
    const [ thesistModal, setThesisModal ] = useState<boolean>(false);
    const [ selectedThesis, setSelectedThesis ] = useState<Thesis | null>(null);
    const [ userThesis, setUserThesis ] = useState<Thesis[] | null>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const { getThesis } = useThesisRequest();
    const userId = Cookies.get("id");

    const router = useRouter();

    const fetchThesis = async () => {
        setLoading(true);
        const response = await getThesis(Number(userId));
        if (response) {
            setUserThesis(response.data);
        }
        setLoading(false);
        setIsUpdated(false);
    };

    useEffect(() => {
        fetchThesis();
    }, [isUpdated]);

    return (
        <div className="w-full h-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                {loading ? (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : userThesis && userThesis.length > 0 ? (
                    userThesis.map((thesis) => (
                        <div
                            className="cursor-pointer"
                            key={thesis.id}
                            onClick={() => {
                                if (!thesis.is_confirmed) {
                                    setSelectedThesis(thesis);
                                    setThesisModal(true);
                                } else {
                                    router.push(`/thesis/?id=${thesis.id}`)
                                }
                            }}
                        >
                            <ThesisCard thesisData={thesis} />
                        </div>
                    ))
                ) : (
                    <div className="h-48 col-span-full flex justify-center items-center">
                        <p>No thesis found.</p>
                    </div>
                )}
            </div>
            <Modal title="Edit Thesis" isModalOpen={thesistModal} setModalOpen={setThesisModal}>
                {selectedThesis && (
                    <AddThesisModal
                        thesisData={selectedThesis}
                        setIsUpdated={setIsUpdated}
                        setIsModalOpen={setThesisModal}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ThesistCardList;
