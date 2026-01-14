"use client";

import { useState, useEffect } from "react";
import { useUpdateThesis } from "@/hooks/thesis";

import { showToast } from "@/components/template/Toaster";
import ActionButton from "@/components/molecules/ActionButton";
import { UserData } from "@/interface/user.interface";

interface ThesisTitleProps {
  user?: UserData | null;
  thesisId: number;
  thesisTitle: string;
  setIsUpdated: (isUpdated: boolean) => void;
}

export const ThesisTitle: React.FC<ThesisTitleProps> = ({
  user,
  thesisId,
  thesisTitle,
  setIsUpdated,
}) => {
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
      { thesis_id: thesisId, payload: { thesis_title: editedTitle } },
      {
        onSuccess: () => {
          setIsEditTitle(false);
          setIsUpdated(true);
          showToast(
            "You updated the thesis title.",
            "info",
            "Thesis Information"
          );
        },
        onError: (error) => {
          showToast(error.message, "error");
        },
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
            className="text-content-primary w-full text-lg md:text-xl font-bold border-b border-gray-400 focus:outline-none"
            disabled={isPending}
          />
          {user?.role === "student" && (
            <>
              <button
                onClick={handleUpdateThesisTitle}
                className="pl-3 text-green-600 hover:text-green-500 flex flex-row items-center"
                disabled={isPending}>
                <span className="material-symbols-rounded">check</span>
              </button>
              <button
                onClick={() => {
                  setEditedTitle(thesisTitle);
                  setIsEditTitle(false);
                }}
                className="pl-3 text-content-primary hover:text-content-secondary flex flex-row items-center"
                disabled={isPending}>
                <span className="material-symbols-rounded">close</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center text-wrap">
          <h1 className="text-content-primary text-lg md:text-xl font-bold">
            "{thesisTitle}"
          </h1>
          {user?.role === "student" && (
            <ActionButton icon="edit" onClick={() => setIsEditTitle(true)} />
          )}
        </div>
      )}
    </div>
  );
};
