import { Thesis } from "@/interface/thesis.interface";
import { User } from "@/interface/user.interface";
import React from "react";

interface FormThirteenProps {
    thesisData: Thesis | null;
    programChair?: string | null; // Added programChair to props
}

const FormThirteen: React.FC<FormThirteenProps> = ({ thesisData, programChair }) => {
    const defenseSchedule = thesisData?.defense_date && thesisData?.defense_time
        ? `${new Date(thesisData.defense_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | ${new Date(`${thesisData.defense_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : '_____________________________';

    const getFullUserName = (user: User | undefined) => {
        return user ? `${user.first_name || ''} ${user.middle_name ? user.middle_name + ' ' : ''}${user.last_name || ''}` : '';
    };

    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="w-full px-16 py-8 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
            <div className="text-center mb-6">
                <p className="text-xs">Republic of the Philippines</p>
                <p className="font-bold text-base">POLYTECHNIC UNIVERSITY OF THE PHILIPPINES</p>
                <p className="text-sm">Office of the Vice President for Academic Affairs</p>
                <p className="font-bold text-base mt-4">TDW Form No. 13</p>
                <h1 className="font-bold text-lg uppercase mt-2">Thesis / Dissertation Final Defense Evaluation Sheet</h1>
            </div>

            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Name of Candidate:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {getFullUserName(thesisData?.student?.user)}
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Program:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {thesisData?.student?.user.program || ''}
                    </span>
                </div>
                <div className="flex items-center mb-2 col-span-2">
                    <p className="font-semibold w-1/6">Schedule of Defense:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {defenseSchedule}
                    </span>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Thesis/Dissertation Title:</p>
                    <span className="border-b border-black w-full inline-block px-2 pb-3 mt-1">
                        {thesisData?.thesis_title || ''}
                    </span>
                    <span className="border-b border-black w-full inline-block px-2 pb-3 mt-1">&nbsp;</span>
                    <span className="border-b border-black w-full inline-block px-2 pb-3 mt-1 mb-2">&nbsp;</span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/6">Adviser:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {getFullUserName(thesisData?.adviser?.user)}
                    </span>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Final Defense Panel:</p>
                    <div className="ml-4">
                        <p className="mb-1">Chair: <span className="border-b border-black px-2 pb-3 min-w-[100px] inline-block">{getFullUserName(thesisData?.panelists?.find(p => p.user.role === 'chair')?.user)}</span></p>
                        <p className="mb-1">Members:
                            {thesisData?.panelists?.filter(p => p.user.role !== 'chair').map((panelist, index) => (
                                <React.Fragment key={panelist.id || index}>
                                    <span className="border-b border-black px-2 pb-3 min-w-[100px] inline-block ml-2">{getFullUserName(panelist.user)}</span>
                                    {index < thesisData.panelists.filter(p => p.user.role !== 'chair').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                            {(!thesisData?.panelists || thesisData.panelists.filter(p => p.user.role !== 'chair').length === 0) && (
                                <>
                                    <span className="border-b border-black px-2 pb-3 min-w-[100px] inline-block ml-2">&nbsp;</span><br />
                                    <span className="border-b border-black px-2 pb-3 min-w-[100px] inline-block ml-2">&nbsp;</span><br />
                                    <span className="border-b border-black px-2 pb-3 min-w-[100px] inline-block ml-2">&nbsp;</span>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-gray-300 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-2/5">Rubric Indicator</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/5">Weight</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-2/5">Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td colSpan={3} className="border border-gray-300 px-3 py-2 font-bold bg-gray-100">MANUSCRIPT (60%)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Contribution to the field of specialization/discipline: Makes a significant impact on the discipline; Demonstrates the ability to bring together concepts and/or results that promote significant advances in the field of study</td>
                            <td className="border border-gray-300 px-3 py-2">10%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Substance and Content: Demonstrates breadth of scientific/knowledge on the body of topic; Supporting evidence is sufficient and well utilized</td>
                            <td className="border border-gray-300 px-3 py-2">20%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Methodology: Demonstrates appropriateness/accuracy of the research methodology /approach</td>
                            <td className="border border-gray-300 px-3 py-2">20%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Form and Writing Style: Demonstrates language clarity and correct application of rules of style and grammar, including proper use of citation.</td>
                            <td className="border border-gray-300 px-3 py-2">10%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="border border-gray-300 px-3 py-2 font-bold bg-gray-100">ORAL DEFENSE (40%)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Organization: Oral presentation was well organized; Confident use of visual aids or other media</td>
                            <td className="border border-gray-300 px-3 py-2">10%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Delivery/ Oral articulation: Speaks in a smooth, clear and confident manner; Clearly articulates his/her views/thoughts</td>
                            <td className="border border-gray-300 px-3 py-2">10%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2">Mastery of the Topic: Effectively answers all questions with explanations and elaboration; Defends, clarifies, and expands upon the manuscript with further evidence and argument</td>
                            <td className="border border-gray-300 px-3 py-2">20%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-3 py-2 font-bold text-right">Total</td>
                            <td className="border border-gray-300 px-3 py-2 font-bold text-right">100%</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <p className="font-semibold mb-2">Comments/Suggestions:</p>
                <p className="border-b border-black w-full h-12 mb-1">&nbsp;</p>
                <p className="border-b border-black w-full h-12 mb-1">&nbsp;</p>
                <p className="border-b border-black w-full h-12 mb-1">&nbsp; </p>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-gray-300 table-auto text-sm">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Score</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Grade</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Thesis</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Dissertation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="border border-gray-300 px-3 py-2">97-100</td><td className="border border-gray-300 px-3 py-2">1.00</td><td className="border border-gray-300 px-3 py-2">Excellent</td><td className="border border-gray-300 px-3 py-2">Excellent</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">94-96</td><td className="border border-gray-300 px-3 py-2">1.25</td><td className="border border-gray-300 px-3 py-2">Very Good</td><td className="border border-gray-300 px-3 py-2">Very Good</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">91-93</td><td className="border border-gray-300 px-3 py-2">1.50</td><td className="border border-gray-300 px-3 py-2">Good</td><td className="border border-gray-300 px-3 py-2">Good</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">88-90</td><td className="border border-gray-300 px-3 py-2">1.75</td><td className="border border-gray-300 px-3 py-2">Fair</td><td className="border border-gray-300 px-3 py-2">Fair/Passed</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">85-87</td><td className="border border-gray-300 px-3 py-2">2.00</td><td className="border border-gray-300 px-3 py-2">Passed</td><td className="border border-gray-300 px-3 py-2">Failed</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2">Below 85</td><td className="border border-gray-300 px-3 py-2">Below 2.00</td><td className="border border-gray-300 px-3 py-2">Failed</td><td className="border border-gray-300 px-3 py-2">-</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <p className="font-semibold mb-2">Action Taken:</p>
                <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2">Approved</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2">Approved with Revisions</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="ml-2">Disapproved</span>
                    </label>
                </div>
            </div>

            <p className="text-xs italic mb-4">* Final recommendations/suggestions will be based on the agreement of the Thesis/Dissertation Evaluation Committee.</p>

            <div className="mt-12 text-center">
                <p className="border-b border-black w-full inline-block pb-3">{programChair || '&nbsp;'}</p> {/* Display programChair */}
                <p className="text-xs mt-1">(Name and Signature of Adviser/Evaluator)</p>
            </div>
            <div className="mt-4 text-center">
                <p className="border-b border-black w-full inline-block pb-3">{formattedDate}</p>
                <p className="text-xs mt-1">(Date)</p>
            </div>
        </div>
    );
};

export default FormThirteen;