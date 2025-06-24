import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";

interface ThesisHonorariumProps {
    thesisData: Thesis | null
    enrolledSubject: EnrolledSubject | null
}

const ThesisHonorarium: React.FC<ThesisHonorariumProps> = ({ thesisData, enrolledSubject }) => {
    return (
        <div className="w-full h-full px-16">
            <div className="px-10 py-2 leading-relaxed">
                <p className="mb-8 text-base">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                <div className="text-base space-y-0">
                    <p className="m-0 py-[3px] leading-none font-bold">MANUEL M. MUHI, D. Tech.</p>
                    <p className="m-0 py-[3px] leading-none">University President</p>
                    <p className="m-0 py-[3px] leading-none">This University</p>
                </div>

                <div className="py-4">
                    <div className="flex align-top justify-start">
                        <p>Through:</p>
                        <div className="block ml-16">
                            <div className="text-base space-y-0">
                                <p className="m-0 py-[3px] leading-none font-bold">DR. EMANUEL C. DE GUZMAN</p>
                                <p className="m-0 py-[3px] leading-none">Vice President for Academic Affairs</p>
                            </div>
                            <div className="text-base space-y-0 pt-6">
                                <p className="m-0 py-[3px] leading-none font-bold">Prof. ALBERTO C. GUILLO</p>
                                <p className="m-0 py-[3px] leading-none">Vice President for Planning and Finance</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="leading-none py-4">Dear President Muhi:</p>
                    <p className="text-justify leading-tight mb-4">May I respectfully request the release of payment for the following faculty members who
                        served as panelists during the oral defense activities held on <span className="font-bold">{thesisData?.defense_date
                            ? new Date(thesisData.defense_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                            : 'No date set'}
                        </span> at <span className="font-bold">{thesisData?.room?.name}, {thesisData?.room?.location}</span>, outside of their official time:</p>

                    <div className="w-full flex justify-center">
                        <table className="border border-gray-400 w-[400px]">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2 pt-0 text-center align-middle">
                                        List of Faculty Members
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ...(thesisData?.adviser ? [thesisData.adviser] : []),
                                    ...(thesisData?.panelists || []),
                                    ...(thesisData?.secretary ? [thesisData.secretary] : []),
                                ].map((member, index) => (
                                    <tr key={`faculty-${index}`}>
                                        <td className="border border-gray-400 px-4 py-2 pt-0 align-middle">
                                            {index + 1}. {member.user?.first_name} {member.user?.last_name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-justify leading-tight py-2">
                        The dedication and effort of these faculty members in supporting our students’ academic progress are highly commendable. I certify that they performed their duties as panelists diligently and outside their official time.
                    </p>

                    <p className="text-justify leading-tight py-2">
                        Thank you for your attention and usual support. Should you require any further information or documentation, please do not hesitate to contact us through local 203.
                    </p>

                    <p className="text-justify leading-tight py-2">
                        Respectfully yours,
                    </p>

                    <div className="text-base space-y-0 py-6">
                        <p className="m-0 py-[3px] leading-none font-bold">DR. BENILDA ELEONOR V. COMENDADOR</p>
                        <p className="m-0 py-[3px] leading-none">Chairperson</p>
                    </div>

                    <p className="text-justify leading-tight py-2">
                        Noted by:
                    </p>

                    <div className="text-base space-y-0 py-6">
                        <p className="m-0 py-[3px] leading-none font-bold">ASSOC. MARIANNE C. ORTIZ</p>
                        <p className="m-0 py-[3px] leading-none">IODE Director</p>
                    </div>

                    <div className="text-base space-y-0 py-6">
                        <p className="m-0 py-[3px] leading-none font-bold">DR. RUDOLF ANTHONY A. LACERNA</p>
                        <p className="m-0 py-[3px] leading-none">Executive Director</p>
                    </div>
                </div>
            </div>
            <div className="block">
                <div className="w-full flex justify-center">
                    <h3 className="underline uppercase font-semibold mb-4">{enrolledSubject?.subject_name}</h3>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full table-auto border border-gray-300">
                        <tbody>
                            <tr className="border-b border-gray-300">
                                <td className="px-4 py-2 pt-0 font-semibold text-right w-1/3">Program:</td>
                                <td className="px-4 py-2 pt-0">{thesisData?.student?.user.program}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="px-4 py-2 pt-0 font-semibold text-right">Name of Proponent:</td>
                                <td className="px-4 py-2 pt-0">
                                    {thesisData?.student?.user.first_name} {thesisData?.student?.user.middle_name} {thesisData?.student?.user.last_name}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="px-4 py-2 pt-0 font-semibold text-right">Title of Thesis:</td>
                                <td className="px-4 py-2 pt-0">{thesisData?.thesis_title}</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <td className="px-4 py-2 pt-0 font-semibold text-right">Date and Time:</td>
                                <td className="px-4 py-2 pt-0">
                                    {thesisData?.defense_date && thesisData?.defense_time ? (
                                        (() => {
                                            const date = new Date(
                                                new Date(thesisData.defense_date).toLocaleString("en-US", { timeZone: "Asia/Manila" })
                                            );
                                            const start = new Date(
                                                new Date(thesisData.defense_time).toLocaleString("en-US", { timeZone: "Asia/Manila" })
                                            );
                                            const end = new Date(start.getTime() + 60 * 60 * 1000);
                                            return `${date.toDateString()} | ${start.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })} - ${end.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}`;
                                        })()
                                    ) : (
                                        "To be Announced"
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 pt-0 font-semibold text-right">Proof of Payment:</td>
                                <td className="px-4 py-2 pt-0">OR #{enrolledSubject?.or_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center my-2">
                    <div className="w-full border p-4 flex items-center justify-center">
                        {enrolledSubject?.attachment && enrolledSubject.attachment.endsWith(".pdf") ? (
                            <p className="text-center text-gray-500">
                                PDF preview not supported in capture. Please download or view separately.
                            </p>
                        ) : (
                            <img
                                src={enrolledSubject?.attachment}
                                alt="Attachment"
                                className="w-1/2"
                                crossOrigin="anonymous"
                            />
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-gray-300 table-auto">
                        <thead>
                            <tr>
                                <th
                                    colSpan={3}
                                    className="border border-gray-300 text-center text-base font-semibold bg-gray-200 pt-0 pb-2"
                                >
                                    EVALUATION COMMITTEE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Adviser */}
                            <tr>
                                <th className="border border-gray-300 text-left pt-0 pb-2">Adviser</th>
                                <td className="border border-gray-300 pt-0 pb-2">
                                    {thesisData?.adviser?.user.first_name} {thesisData?.adviser?.user.last_name}
                                </td>
                                <td className="border border-gray-300 pt-0 pb-2">
                                    {enrolledSubject?.subject_name !== "Final Defense" ? "Php 3,750.00" : "Php 5,000.00"}
                                </td>
                            </tr>

                            {/* Panelists loop */}
                            {thesisData?.panelists?.map((panel, index) => (
                                <tr key={panel.id || index}>
                                    <th className="border border-gray-300 text-left pt-0 pb-2">Panelist {index + 1}</th>
                                    <td className="border border-gray-300 pt-0 pb-2">
                                        {panel.user.first_name} {panel.user.last_name}
                                    </td>
                                    <td className="border border-gray-300 pt-0 pb-2">Php 2,500.00</td>
                                </tr>
                            ))}

                            {/* Secretary */}
                            <tr>
                                <th className="border border-gray-300 text-left pt-0 pb-2">Secretary</th>
                                <td className="border border-gray-300 pt-0 pb-2">
                                    {thesisData?.secretary?.user.first_name} {thesisData?.secretary?.user.last_name}
                                </td>
                                <td className="border border-gray-300 pt-0 pb-2">
                                    {enrolledSubject?.subject_name !== "Final Defense" ? "Php 625.00" : "Php 1,250.00"}
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ThesisHonorarium;
