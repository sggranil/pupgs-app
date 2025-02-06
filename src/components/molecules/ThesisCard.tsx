"use client";

import { Thesis } from "@/interface/thesis.interface";

interface ThesisProp {
    thesisData: Thesis
}

const ThesisCard: React.FC<ThesisProp> = ({ thesisData }) => {
    return (
        <div className="w-full cursor-pointer">
            <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-md font-semibold text-textPrimary">{thesisData.thesis_title}</h2>
                    <p className="text-xs text-gray-500">Status: {
                        !thesisData.is_confirmed ? "Pending Review" : "Confirmed" 
                    }</p>
                </div>
            </div>
        </div>
    );
}

export default ThesisCard;