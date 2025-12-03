"use client";

import Link from "next/link";

import { Thesis } from "@/interface/thesis.interface";
import ThesisCard from "@/components/molecules/ThesisCard";

interface ThesisCardListProps {
  thesisData: Thesis[];
}

const ThesisCardList: React.FC<ThesisCardListProps> = ({ thesisData }) => {
  return (
    <div className="w-full mt-2">
      {thesisData.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 py-2">
          {thesisData.map((thesis) => (
            <Link
              className="cursor-pointer"
              key={thesis.id}
              href={`/thesis/${thesis.id}`}>
              <ThesisCard thesisData={thesis} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 py-2">
          <p>No Thesis Data Available</p>
        </div>
      )}
    </div>
  );
};

export default ThesisCardList;
