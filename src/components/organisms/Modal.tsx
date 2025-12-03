"use client";
import React from "react";
import { ImCross } from "react-icons/im";

interface ModalProps {
  title: string;
  isModalOpen: boolean;
  modalType?: "form" | "pdf" | "info";
  isWide?: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({
  title,
  isModalOpen,
  setModalOpen,
  children,
  modalType = "form",
}: ModalProps) => {
  let modalStyle = {};

  switch (modalType) {
    case "pdf":
      modalStyle = { width: "90%" };
      break;

    case "info":
      modalStyle = { width: "600px" };
      break;

    case "form":
    default:
      modalStyle = { width: "fit-content" };
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={() => setModalOpen(false)}>
          <div
            className={`bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-hidden`}
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 py-2">
              <h2 className="text-content-primary text-xl font-bold">
                {title}
              </h2>
              <div
                onClick={() => setModalOpen(false)}
                className="rounded-md cursor-pointer">
                <ImCross className="text-content-primary" />
              </div>
            </div>
            <div className="py-2 px-1 max-h-[80vh] overflow-y-auto scrollbar-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
