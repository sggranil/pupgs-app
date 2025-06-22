"use client";

import { Thesis } from "@/interface/thesis.interface";
// import Image from "next/image";

interface ThesisProp {
    thesisData: Thesis
}

const ThesisCard: React.FC<ThesisProp> = ({ thesisData }) => {
    return (
        <div className="w-full">
            <div className="bg-white rounded-md shadow-md">
                <img
                    src="/pup-bg.png"
                    alt="User"
                    className="w-full rounded-md mr-4"
                />
                <div className="items-center py-4 px-3">
                    <p className="text-md truncate font-semibold text-textPrimary">{thesisData.thesis_title}</p>
                    <p className="text-xs text-gray-500">Status: {
                        !thesisData.is_confirmed ? "Pending Review" : "Confirmed" 
                    }</p>
                </div>
            </div>
        </div>
    );
}

export default ThesisCard;