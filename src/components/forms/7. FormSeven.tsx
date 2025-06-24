import { Thesis } from "@/interface/thesis.interface";

interface FormSevenProps {
    thesisData: Thesis | null;
    programChair: string | null;
}

const FormSeven: React.FC<FormSevenProps> = ({ thesisData, programChair }) => {
    const defenseSchedule = thesisData?.defense_date && thesisData?.defense_time
        ? `${new Date(thesisData.defense_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | ${new Date(`${thesisData.defense_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : '_____________________________';

    return (
        <div className="w-full px-16 py-8 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
            <div className="text-center mb-6">
                <h1 className="font-bold text-lg uppercase mt-2">Thesis/Dissertation Proposal Defense Endorsement Form</h1>
            </div>
            
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Name of Student/Candidate:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {thesisData?.student?.user.first_name || ''} {thesisData?.student?.user.middle_name ? thesisData.student.user.middle_name + ' ' : ''} {thesisData?.student?.user.last_name || ''}
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <p className="font-semibold w-1/3">Program:</p>
                    <span className="border-b border-black flex-grow px-2 pb-3">
                        {thesisData?.student?.user.program || ''}
                    </span>
                </div>
                <div className="mb-2">
                    <p className="font-semibold">Thesis/Dissertation Title:</p>
                    <span className="border-b border-black w-full inline-block px-2 pb-3 mt-1">
                        {thesisData?.thesis_title || ''}
                    </span>
                    <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">&nbsp;</span>
                    <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1 mb-2">&nbsp;</span>
                </div>
            </div>

            <p className="text-justify mb-4">
                Upon review of the Thesis/Dissertation Evaluation Committee, the aforementioned thesis/
                dissertation is now recommended for Proposal Defense.
            </p>

            <div className="flex items-center mb-8">
                <p className="font-semibold w-1/3">Schedule of Defense:</p>
                <span className="border-b border-black flex-grow px-2 pb-3">
                    {defenseSchedule}
                </span>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-gray-300 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/4">Committee Members</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/3">Name</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-[20%]">Signature</th>
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

            <div className="mb-8">
                <p className="font-semibold mb-2">Attachments:</p>
                <div className="flex items-center mb-1 ml-4">
                    <span className="border border-black w-4 h-4 flex-shrink-0 mr-2 flex items-center justify-center text-xs pb-0.5">&nbsp;</span>
                    <p>Proposal Defense Manuscript</p>
                </div>
                <div className="flex items-center mb-1 ml-4">
                    <span className="border border-black w-4 h-4 flex-shrink-0 mr-2 flex items-center justify-center text-xs pb-0.5">&nbsp;</span>
                    <p>Certification of GSREB/CREB/OUREB/UREB</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-16">
                <div>
                    <p className="font-bold mb-4">Noted:</p>
                    <div className="text-center pb-4 w-full h-6 mb-1">
                        {programChair} ({new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })})
                    </div>
                    <p className="text-center text-xs mt-1">(Program Chairperson/Date of Signing)</p>
                </div>
                <div>
                    <p className="font-bold mb-4">Approved:</p>
                    <div className="text-center w-full h-6 mb-1">
                        Dr. Carmencita L. Castolo ({new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })})
                    </div>
                    <p className="text-center text-xs mt-1">(Dean/Director & Date of Signing)</p>
                </div>
            </div>
        </div>
    );
};

export default FormSeven;