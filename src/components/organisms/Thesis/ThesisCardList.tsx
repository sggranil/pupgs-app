"use client";

import Link from "next/link";

import { Thesis } from "@/interface/thesis.interface";
import ThesisCard from "@/components/molecules/ThesisCard";
import { UserData } from "@/interface/user.interface";

interface ThesisCardListProps {
  users?: UserData | null;
  thesisData: Thesis[];
}

const ThesisCardList: React.FC<ThesisCardListProps> = ({
  users,
  thesisData,
}) => {
  return (
    <div className="w-full mt-2">
      {thesisData.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 py-2">
          {thesisData.map((thesis) => (
            <Link
              className="cursor-pointer"
              key={thesis.id}
              href={
                users?.role === "student"
                  ? `/thesis/${thesis.id}`
                  : `/d033e22ae/thesis/${thesis.id}`
              }>
              <ThesisCard thesisData={thesis} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-24">
          No thesis proposals found.
        </p>
      )}
    </div>
  );
};

export default ThesisCardList;
