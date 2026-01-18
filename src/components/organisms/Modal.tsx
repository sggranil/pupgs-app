"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  isModalOpen: boolean;
  modalType?: "form" | "pdf" | "info" | "doc";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling of background when modal is open
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const widthMap = {
    pdf: "100%",
    info: "600px",
    doc: "900px",
    form: "1100px",
  };

  const modalStyle = {
    width: widthMap[modalType] || "1100px",
    maxWidth: "95vw",
  };

  if (!isModalOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      style={{ zIndex: 9999 }}
      onClick={() => setModalOpen(false)}>
      <div
        className="bg-white p-4 rounded-lg shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row items-center justify-between border-b border-gray-100 pb-3 mb-2">
          <h2 className="text-content-primary text-xl font-bold">{title}</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close modal">
            <span className="material-symbols-outlined text-gray-500">
              close
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
