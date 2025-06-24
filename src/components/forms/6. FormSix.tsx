import { Thesis } from "@/interface/thesis.interface";

interface FormSixProps {
    thesisData: Thesis | null;
    programChair: string | null;
}

const FormSix: React.FC<FormSixProps> = ({ thesisData, programChair }) => {

    return (
        <div className="w-full px-16 py-8 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
            <div className="text-center mb-6">
                <h1 className="font-bold text-lg uppercase mt-2">Thesis/Dissertation Committee Appointment and Acceptance Form</h1>
            </div>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Name of Student/Candidate:</p>
                    <span className="pb-2 border-b border-black flex-grow px-2">
                        {thesisData?.student?.user.first_name || ''} {thesisData?.student?.user.middle_name ? thesisData.student.user.middle_name + ' ' : ''} {thesisData?.student?.user.last_name || ''}
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">School Year & Semester Started in the Program:</p>
                    <span className="pb-2 border-b border-black flex-grow px-2">
                        {thesisData?.student?.user?.start_date
                            ? new Date(thesisData.student.user.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            : 'No Date Available'
                        }
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Date of Passing the Comprehensive Examination:</p>
                    <span className="pb-2 border-b border-black flex-grow px-2">
                        {thesisData?.student?.user?.pass_date
                            ? new Date(thesisData.student.user.pass_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            : 'No Date Available'
                        }
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Program:</p>
                    <span className="pb-2 border-b border-black flex-grow px-2">
                        {thesisData?.student?.user.program || ''}
                    </span>
                </div>
                <div className="flex items-center">
                    <p className="font-semibold w-1/3">Thesis/Dissertation Title:</p>
                    <span className="pb-2 border-b border-black flex-grow px-2">
                        {thesisData?.thesis_title || ''}
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-gray-300 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/4">Committee Members</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/3">Name</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/3">Signature (Signifying Acceptance of Appointment)</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-[15%]">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {/* Adviser */}
                        <tr>
                            <td className="border border-gray-300 px-3 py-2 font-semibold">Adviser</td>
                            <td className="border border-gray-300 px-3 py-2">
                                {thesisData?.adviser?.user.first_name || ''} {thesisData?.adviser?.user.last_name || ''}
                            </td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                        </tr>
                        {/* Evaluators/Panelists */}
                        {Array.from({ length: 3 }).map((_, index) => { // Assuming up to 3 evaluators for dissertation, 2 for thesis
                            const panelist = thesisData?.panelists?.[index];
                            return (
                                <tr key={`evaluator-${index}`}>
                                    <td className="border border-gray-300 px-3 py-2 font-semibold">Evaluators ({index + 1})</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        {panelist?.user.first_name || ''} {panelist?.user.last_name || ''}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                                    <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-16">
                <div>
                    <p className="font-bold mb-6">Recommending Approval:</p>
                    <div className="text-center border-b border-black w-full h-6 mb-1">
                        {programChair}
                    </div>
                    <p className="text-center text-xs mt-1">Program Chair</p>
                </div>
                <div>
                    <p className="font-bold mb-1 mb-6">Approved by:</p>
                    <div className="text-center border-b border-black w-full h-6 mb-1">
                        Dr. Carmencita L. Castolo
                    </div>
                    <p className="text-center text-xs mt-1">Dean/Director</p>
                </div>
            </div>
        </div>
    );
};

export default FormSix;