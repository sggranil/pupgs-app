"use client"

import { useState, useEffect } from "react";
import { useUpdateThesis } from "@/hooks/thesis";
import { SquarePen, X } from "lucide-react"; 
import { showToast } from "@/components/template/Toaster";

interface ThesisTitleProps {
    thesisId: number,
    thesisTitle: string,
    setIsUpdated: (isUpdated: boolean) => void;
}

export const ThesisTitle: React.FC<ThesisTitleProps> = ({ thesisId, thesisTitle, setIsUpdated }) => {
    const [isEditTitle, setIsEditTitle] = useState<boolean>(false); 
    const [editedTitle, setEditedTitle] = useState<string>(thesisTitle); 
    
    useEffect(() => {
        setEditedTitle(thesisTitle);
    }, [thesisTitle]);

    const { mutate: updateThesis, isPending } = useUpdateThesis(); 

    const handleUpdateThesisTitle = () => {
        if (editedTitle === thesisTitle || editedTitle.trim() === "") {
            setIsEditTitle(false); 
            return;
        }

        updateThesis(
            { thesis_id: thesisId, payload: { thesis_title: editedTitle }},
            {
                onSuccess: () => {
                    setIsEditTitle(false); 
                    setIsUpdated(true); 
                    showToast(
                        "You updated the thesis title.",
                        "info",
                        "Thesis Information"
                    )
                },
                onError: (error) => {
                    showToast(
                        error.message,
                        "error",
                    )
                }
            }
        );
    };

    return (
        <div className="p-0">
            {isEditTitle ? (
                <div className="flex items-center">
                    <input
                        type="text"
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="text-content-primary w-48 text-lg md:text-xl font-bold border-b border-gray-400 focus:outline-none"
                        disabled={isPending}
                    />
                    
                    <button 
                        onClick={() => {
                            setEditedTitle(thesisTitle);
                            setIsEditTitle(false);
                        }}
                        className="p-1 ml-2 text-gray-500 hover:text-brand-primary flex flex-row items-center"
                        disabled={isPending}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    
                    <button 
                        onClick={handleUpdateThesisTitle}
                        className="bg-brand-primary text-white font-normal text-sm rounded-md px-2 py-1 ml-2 flex items-center"
                        disabled={isPending}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div className="flex items-center">
                    <h1 className="text-content-primary text-lg md:text-xl font-bold">
                        "{thesisTitle}"
                    </h1>
                    <button 
                        onClick={() => setIsEditTitle(true)}
                        className="p-1 pl-2 text-content-primary hover:text-brand-primary flex flex-row items-center"
                    >
                        <span className="material-symbols-rounded">edit_square</span>
                    </button>
                </div >
            )}
        </div >
    );
}