import React from "react";
import RegistrationFormLayout from "../layout";
import { RegisterSchemaType } from "@/types/api/auth.types";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Student Registration | PUP OGTS",
  };

const StudentRegistratioPage: React.FC = () => {
    const handleRegistration = (formData: RegisterSchemaType) => {
        console.log("Validated Form Data:", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bgPrimary">
            <div className="max-w-md w-full p-4 bg-bgSecondary rounded-2xl shadow-lg">
                <RegistrationFormLayout onSubmit={handleRegistration} />
            </div>
        </div>
    );
};

export default StudentRegistratioPage;
