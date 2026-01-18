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

  // Sync state if thesisTitle changes from parent
  useEffect(() => {
    setEditedTitle(thesisTitle);
  }, [thesisTitle]);

  const { mutate: updateThesis, isPending } = useUpdateThesis();

  const handleUpdateThesisTitle = () => {
    if (editedTitle.trim() === "" || editedTitle === thesisTitle) {
      setIsEditTitle(false);
      setEditedTitle(thesisTitle);
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
        <div
          className={`flex items-center ${
            isPending ? "opacity-50" : "opacity-100"
          }`}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-content-primary w-full text-lg md:text-xl font-bold border-b border-gray-400 focus:outline-none"
            disabled={isPending}
            autoFocus
          />
          {user?.role === "student" && (
            <div className="flex items-center">
              <button
                onClick={handleUpdateThesisTitle}
                className="pl-3 text-green-600 hover:text-green-500 disabled:text-gray-400"
                disabled={isPending}>
                <span
                  className={`material-symbols-rounded ${
                    isPending ? "animate-spin" : ""
                  }`}>
                  {isPending ? "progress_activity" : "check"}
                </span>
              </button>
              <button
                onClick={() => {
                  setEditedTitle(thesisTitle);
                  setIsEditTitle(false);
                }}
                className="pl-3 text-content-primary hover:text-content-secondary"
                disabled={isPending}>
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
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
