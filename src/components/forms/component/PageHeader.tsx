import React from "react";

const PageHeader: React.FC = () => {
    return (
        <div className="p-2">
            <div className="flex items-center justify-between border-b-2 border-gray-300 px-16">
                <img src="/pup.png" className="w-28 object-contain" alt="PUP Logo" />

                <div className="font-serif text-start flex-1 py-4 pl-6">
                    <h5 className="font-light text-sm">Republic of the Philippines</h5>
                    <h3 className="font-semibold text-base">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</h3>
                    <h5 className="font-light text-sm">OFFICE OF THE VICE PRESIDENT FOR ACADEMIC AFFAIRS</h5>
                    <h2 className="font-semibold text-base">OPEN UNIVERSITY SYSTEMS</h2>
                    <h3 className="font-semibold text-base">INSTITUTE OF OPEN AND DISTANCE EDUCATION</h3>
                </div>

                <img src="/bagong-pilipinas.png" className="w-28 object-contain" alt="Bagong Pilipinas Logo" />
            </div>
        </div>
    )
}

export default PageHeader;