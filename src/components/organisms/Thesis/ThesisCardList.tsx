"use client";

import { useEffect, useState } from "react";

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
                    <p>Loading...</p>
                ) : userThesis && userThesis.length > 0 ? (
                    userThesis.map((thesis) => (
                        <div
                            key={thesis.id}
                            onClick={() => {
                                setSelectedThesis(thesis);
                                setThesisModal(true);
                            }}
                        >
                            <ThesisCard thesisData={thesis} />
                        </div>
                    ))
                ) : (
                    <p>No thesis found.</p>
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
