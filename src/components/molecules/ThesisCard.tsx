"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Thesis } from "@/interface/thesis.interface";
import { formatStatus } from "@/utilities/StringFormatter";

interface ThesisProp {
  thesisData: Thesis;
}

const brandColors = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-rose-200",
  "bg-teal-200",
  "bg-sky-200",
  "bg-emerald-200",
  "bg-amber-200",
];

const ThesisCard: React.FC<ThesisProp> = ({ thesisData }) => {
  const [randomColorClass, setRandomColorClass] = useState("");

  useEffect(() => {
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * brandColors.length);
      return brandColors[randomIndex];
    };

    setRandomColorClass(getRandomColor());
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white ring-1 ring-black ring-opacity-10 transition-opacity rounded-sm overflow-hidden">
        <div className="relative w-full h-32 rounded-sm bg-gray-50">
          <div
            className={`absolute inset-0 ${randomColorClass} opacity-50 rounded-md`}></div>
          <Image
            alt="A sample descriptive alt text"
            width={500}
            height={300}
            src="/pup-bg.png"
            className="w-full h-32 rounded-sm"
          />
        </div>
        <div className="items-center py-4 px-3">
          <p className="text-md truncate font-semibold text-textPrimary">
            {thesisData.thesis_title}
          </p>
          <p className="text-xs text-gray-500">
            Status: {formatStatus(thesisData.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThesisCard;
