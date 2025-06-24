import React from "react";

interface FormHeaderProps {
    title?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
    return (
        <div className="p-4 pt-4 px-12">
            <div className="flex items-center justify-between border-b-2 border-black px-16">
                <img src="/pup.png" className="w-28 object-contain" alt="PUP Logo" />

                <div className="font-serif text-start flex-1 py-4 pl-6 pb-8">
                    <h5 className="font-light text-base">Republic of the Philippines</h5>
                    <h3 className="font-semibold text-md">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</h3>
                    <h5 className="font-light text-md">Office of the Vice President for Academic Affairs</h5>
                </div>

                <div className="border border-black p-0 pb-4 px-2">
                    <span className="text-black text-sm font-semibold m-0 mb-4">{title}</span>
                </div>
            </div>
        </div>
    )
}

export default FormHeader;