import { Thesis } from "@/interface/thesis.interface";
import { EnrolledSubject } from "@prisma/client";

interface FormThreeProps {
    thesisData: Thesis | null
    enrolledSubject: EnrolledSubject | null
}

const FormThree: React.FC<FormThreeProps> = ({ thesisData, enrolledSubject }) => {
    const isProposalChecked = enrolledSubject?.subject_name === 'Thesis Proposal';
    const isPreFinalChecked = enrolledSubject?.subject_name === 'Pre-Oral Defense';
    const isFinalChecked = enrolledSubject?.subject_name === 'Final Defense';

    return (
        <div className="p-8 font-inter bg-white shadow-lg rounded-lg w-[1344px] mx-auto">
            <div className="mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center mb-4 flex-wrap">
                    <p className="font-bold text-base mr-2 mb-2 md:mb-0">Thesis/Dissertation Title:</p>
                    <span className="pb-2 flex-grow border-b border-black min-h-[1.5em] w-full md:w-auto text-sm">
                        {thesisData?.thesis_title || ''}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-x-8 mb-4 mt-4">
                    <div className="flex flex-col items-start flex-wrap">
                        <p className="font-bold text-base mr-2 mb-2 md:mb-0">Name of Student/Candidate:</p>
                        <span className="pb-2 flex-grow border-b border-black min-h-[1.5em] w-full text-sm">
                            {thesisData?.student?.user.first_name || ''} {thesisData?.student?.user.middle_name ? thesisData.student.user.middle_name + ' ' : ''}{thesisData?.student?.user.last_name || ''}
                        </span>
                    </div>
                    <div className="flex flex-col items-start flex-wrap">
                        <p className="font-bold text-base mr-2 mb-2 md:mb-0">Program:</p>
                        <span className="pb-2 flex-grow border-b border-black min-h-[1.5em] w-full text-sm">
                            {thesisData?.student?.user.program || ''}
                        </span>
                    </div>
                    <div className="flex flex-col items-start flex-wrap">
                        <p className="font-bold text-base mr-2 mb-2 md:mb-0">Name of Adviser:</p>
                        <span className="pb-2 flex-grow border-b border-black min-h-[1.5em] w-full text-sm">
                            {thesisData?.adviser?.user.prefix || ''} {thesisData?.adviser?.user.first_name} {thesisData?.adviser?.user.last_name} {thesisData?.adviser?.user.ext_name || ''}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between mt-6">
                    <p className="font-bold text-base mr-4 mb-2 md:mb-0">Phase of Thesis/Dissertation Writing:</p>
                    <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                checked={isProposalChecked}
                                readOnly
                            />
                            <span className="ml-2 text-gray-700 text-sm">Proposal Stage</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                checked={isPreFinalChecked}
                                readOnly
                            />
                            <span className="ml-2 text-gray-700 text-sm">Pre-Final</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                checked={isFinalChecked}
                                readOnly
                            />
                            <span className="ml-2 text-gray-700 text-sm">Final</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-1/4 border border-gray-300">
                                Contact Details:
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-1/3 border border-gray-300">
                                Student/Candidate
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-1/3 border border-gray-300">
                                Adviser
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white"><tr>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-900 border border-gray-300">Phone Number</td>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500 border border-gray-300">{thesisData?.student?.user?.tel_number}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500 border border-gray-300">{thesisData?.adviser?.user?.tel_number}</td>
                    </tr><tr>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-900 border border-gray-300">E-mail Address</td>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500 border border-gray-300">{thesisData?.student?.user?.email}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500 border border-gray-300">{thesisData?.adviser?.user?.email}</td>
                    </tr></tbody>
                </table>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-[20%] border border-gray-300">
                                Date and Time of Consultation
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-[20%] border border-gray-300">
                                Place / Platform of Consultation
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-[40%] border border-gray-300">
                                Topic/ Issue(s) / Recommendations
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-[11px] font-medium text-gray-700 uppercase tracking-wider w-[20%] border border-gray-300">
                                Signature of Adviser
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-[11px] text-gray-500 h-20 border border-gray-300">&nbsp;</td>
                                <td className="px-6 py-4 whitespace-nowrap text-[11px] text-gray-500 h-20 border border-gray-300">&nbsp;</td>
                                <td className="px-6 py-4 text-[11px] text-gray-500 h-20 border border-gray-300">&nbsp;</td>
                                <td className="px-6 py-4 whitespace-nowrap text-[11px] text-gray-500 h-20 border border-gray-300">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FormThree;