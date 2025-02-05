"use client"
import { ImCross } from "react-icons/im";

interface ModalProps {
    title: string;
    isModalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    children: React.ReactNode;
}

const Modal = ({ title, isModalOpen, setModalOpen, children }: ModalProps) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 py-2">
                            <h2 className="text-textPrimary text-xl font-bold">
                                {title}
                            </h2>
                            <div
                                onClick={() => setModalOpen(false)}
                                className="rounded-md cursor-pointer"
                            >
                                <ImCross className='text-textPrimary' />
                            </div>
                        </div> 
                        <div className="py-2">
                            {children}
                        </div>    
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;