import { Thesis } from "@/interface/thesis.interface";
import { Adviser } from "@/interface/user.interface";
import React from "react";

interface FormTenProps {
    thesisData: Thesis | null;
}

const FormTen: React.FC<FormTenProps> = ({ thesisData }) => {
    const defenseSchedule = thesisData?.defense_date && thesisData?.defense_time
        ? `${new Date(thesisData.defense_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | ${new Date(`${thesisData.defense_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : '_____________________________';

    const getFullAdviserName = (adviser: Adviser | undefined) => {
        return adviser ? `${adviser.user.first_name || ''} ${adviser.user.middle_name ? adviser.user.middle_name + ' ' : ''}${adviser.user.last_name || ''}` : '';
    };

    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="w-full px-16 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
            <div className="text-center mb-6">
                <h1 className="font-bold text-lg uppercase mt-2">Thesis/Dissertation Pre-Final Evaluation Sheet</h1>
            </div>

            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Name of Student/Candidate:</p>
                    <span className="pb-4 border-b border-black flex-grow px-2 pb-0.5">
                        {thesisData?.student?.user.first_name || ''} {thesisData?.student?.user.middle_name ? thesisData.student.user.middle_name + ' ' : ''} {thesisData?.student?.user.last_name || ''}
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Program:</p>
                    <span className="pb-4 border-b border-black flex-grow px-2 pb-0.5">
                        {thesisData?.student?.user.program || ''}
                    </span>
                </div>
                <div className="mb-2 flex items-center">
                    <p className="font-semibold w-1/3">Schedule of Defense:</p>
                    <span className="pb-4 border-b border-black flex-grow px-2 pb-0.5">
                        {defenseSchedule}
                    </span>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Thesis/Dissertation Title:</p>
                    <span className="pb-4 border-b border-black w-full inline-block px-2 pb-0.5 mt-1">
                        {thesisData?.thesis_title || ''}
                    </span>
                    <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</span>
                    <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1 mb-2">&nbsp;</span>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Thesis/Dissertation Evaluation Committee:</p>
                    <div className="ml-4">
                        <p className="mb-1">Adviser: <span className="pb-4 border-b border-black px-2 pb-0.5 min-w-[200px] inline-block">{getFullAdviserName(thesisData?.adviser)}</span></p>
                        <p className="mb-1">Evaluators:<br />
                            {thesisData?.panelists?.map((panelist, index) => (
                                <React.Fragment key={panelist.id || index}>
                                    <span className="pb-4 border-b border-black px-2 pb-0.5 min-w-[200px] inline-block ml-20">{getFullAdviserName(panelist)}</span>
                                    {index < thesisData.panelists.length - 1 && <br />} {/* Add line break for multiple evaluators */}
                                </React.Fragment>
                            ))}
                            {(!thesisData?.panelists || thesisData.panelists.length === 0) && (
                                <>
                                    <span className="border-b border-black px-2 pb-0.5 min-w-[200px] inline-block ml-2">&nbsp;</span>
                                    <span className="border-b border-black px-2 pb-0.5 min-w-[200px] inline-block ml-2">&nbsp;</span>
                                    <span className="border-b border-black px-2 pb-0.5 min-w-[200px] inline-block ml-2">&nbsp;</span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Comments/Suggestions/Recommendations:</p>
                    <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</p>
                    <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</p>
                    <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</p>
                    <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1 mb-2">&nbsp;</p>
                </div>
            </div>

            <p className="font-bold mb-2">General observations for approval/disapproval:</p>
            <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</p>
            <p className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1 mb-4">&nbsp;</p>
            <p className="text-xs italic mb-4">(Please attach additional sheet if necessary)</p>

            <div className="mb-4">
                <p className="font-semibold mb-2">Action Taken:</p>
                <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2 mb-4">Approved</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2 mb-4">Approved with Revisions</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2 mb-4">Disapproved</span>
                    </label>
                </div>
            </div>

            <p className="text-xs italic mb-4">* Final recommendations/suggestions will be based on the agreement of the Thesis/Dissertation Evaluation Committee.</p>

            <div className="mt-8 text-center">
                <p className="border-b border-black w-full inline-block m-0">&nbsp;</p>
                <p className="text-xs mt-1">(Name and Signature of Adviser/Evaluator)</p>
            </div>
            <div className="mt-4 text-center">
                <p className="border-b border-black w-full inline-block">{formattedDate}</p>
                <p className="text-xs mt-1">(Date)</p>
            </div>
        </div>
    );
};

export default FormTen;