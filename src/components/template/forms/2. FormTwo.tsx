import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";

interface FormTwoProps {
    thesisData: Thesis | null
    programChair: string | null;
}

const FormTwo: React.FC<FormTwoProps> = ({ thesisData, programChair }) => {
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('en-US', { day: 'numeric' });
    const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const year = currentDate.toLocaleDateString('en-US', { year: 'numeric' });

    return (
        <div className="w-full p-8 font-inter bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-extrabold mb-6 text-center text-gray-800">
                THESIS/DISSERTATION ADVISING CONTRACT
            </h1>

            <div className="mb-8 px-8">
                <p className="mt-8 font-bold pb-4 text-gray-700">KNOW ALL MEN BY THESE PRESENTS:</p>
                <p className="indent-12 text-gray-700 leading-relaxed">
                    This agreement is made and entered into this <span className="font-semibold">{day}</span> day of, <span className="font-semibold">{month}</span> <span className="font-semibold">{year}</span>, in Manila, Philippines by and between:
                </p>
            </div>

            <div className="mb-8 px-8">
                <p className="indent-12 text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">{thesisData?.adviser?.user.prefix || ''} {thesisData?.adviser?.user.first_name || '[Adviser First Name]'} {thesisData?.adviser?.user.last_name || '[Adviser Last Name]'} {thesisData?.adviser?.user.ext_name || ''}</span>, from the <span className="font-bold text-gray-900">{thesisData?.adviser?.user.program || '[Adviser Program]'}</span>, hereinafter referred to as <strong className="text-gray-900">“Adviser”</strong>
                </p>
                <p className="text-center py-4 font-bold text-gray-800">- and -</p>
                <p className="indent-12 text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">{thesisData?.student?.user.first_name || '[Student First Name]'} {thesisData?.student?.user.last_name || '[Student Last Name]'}</span>, a bonafide student of the <span className="font-bold text-gray-900">{thesisData?.student?.user.program || '[Student Program]'}</span> of the <span className="font-bold text-gray-900">{thesisData?.student?.user.department || '[Student Department]'}</span> hereinafter referred to as <strong className="text-gray-900">“Advisee”</strong>
                </p>
            </div>

            <div className="mb-8 px-8">
                <p className="text-center py-4 font-bold text-gray-800">WITNESSETH:</p>
                <p className="indent-12 py-3 text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">WHEREAS</strong>, the Adviser is preferably a faculty/employee of the Polytechnic University of the Philippines, with a masters/doctorate degree in the field relevant to the topic or program specialization of the thesis/dissertation, with research experience (evidenced by research publications), and an expert in the field of study conducted by her/his Advisee;
                </p>
                <p className="indent-12 py-3 text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">WHEREAS</strong>, the Advisee is a bonafide student in the University who is writing his/her thesis/dissertation in partial fulfillment of the degree he/she is enrolled in;
                </p>
                <p className="indent-12 py-3 text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">NOW, THEREFORE,</strong> the two parties hereby agree to enter into this Agreement under the following terms and conditions;
                </p>
            </div>

            <div className="text-justify space-y-6 leading-relaxed px-8 text-gray-700">
                <p className="font-semibold text-gray-800">Adviser shall:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                        Help the student in the proper conduct (through regular and close monitoring) of research
                        work according to the set timetable to ensure integrity and high-quality output.
                    </li>
                    <li>
                        Review/check submitted proposal, questionnaires, and other chapters/aspects of the research
                        paper.
                    </li>
                    <li>
                        Provide not only technical expertise but moral guidance as well to students while the latter is
                        working on his/her research project.
                    </li>
                    <li>Conduct mock defense prior to the oral defense, when necessary.</li>
                    <li>
                        Monitor the research progress by accomplishing the thesis/dissertation consultation form and
                        submit the same to the Program Chairperson prior to the schedule of defense.
                    </li>
                    <li>Provide expert support during the defense of his/her Advisee.</li>
                </ol>

                <p className="font-semibold text-gray-800">Advisee shall:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>
                        Fulfill the requirements of the thesis/dissertation writing under the supervision of his/her
                        Adviser;
                    </li>
                    <li>
                        Satisfy the expectations of the Adviser and follow the work schedule stipulated in the plan of
                        activities as agreed upon with the Adviser.
                    </li>
                    <li>
                        Meet regularly with the Adviser and provide him/her with updates on the progress of the
                        research activities and writing.
                    </li>
                    <li>
                        Follow stringent quality assurance measures such as professional editing, plagiarism check,
                        grammar and readability tests, reference, and literature sources checking;
                    </li>
                    <li>
                        Pay appropriate honoraria during the proposal, pre-final, and final oral defense stages through
                        the University.
                    </li>
                </ol>

                <p className="indent-12 pt-4">
                    The Advisee and Adviser shall agree to discuss in advance issues of authorship and intellectual
                    property related to the thesis/dissertation of the Advisee being supervised by the Adviser, in
                    accordance with the University Policy on Co-authorship in Paper Presentation and Publication,
                    and other relevant Intellectual Property policies of the University.
                </p>

                <p className="indent-12">
                    The Advisee and Adviser commit to openly and honestly communicate in connection with the
                    thesis/dissertation project and will attempt to resolve any conflict that may arise.
                </p>

                <p className="indent-12">
                    If any of the Advisee or Adviser needs to terminate this Advising Contract for any justifiable reason,
                    he/she shall write a letter addressed to the Dean/OU Executive Director, through the Program Chairperson,
                    to formally express and explain his/her request to terminate the Advisee-Adviser relationship. The Dean/Executive
                    Director, together with the Program Chairperson, shall carefully peruse and evaluate the petition and may decide
                    to approve the request and grant a No-Fault Termination of the Contract. Both parties agree to abide by the
                    decision of the Office of the Dean/Executive Director. The Program Chair will work with the Advisee to identify
                    another Adviser.
                </p>

                <p className="mt-8 text-gray-800">
                    <span className="italic font-bold">In WITNESS WHEREOF</span>, the parties have hereunto set their hands on the date and place above-written.
                </p>

                <div className="grid grid-cols-2 gap-12 mt-10">
                    <div className="space-y-1 text-center">
                        <div className="border-b-2 border-gray-400 w-full h-8 mb-2">
                            {thesisData?.student?.user.first_name || ''} {thesisData?.student?.user.middle_name || ''} {thesisData?.student?.user.last_name || ''}
                        </div>
                        <p className="text-sm text-gray-600">Advisee</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="border-b-2 border-gray-400 w-full h-8 mb-2">
                            {thesisData?.adviser?.user.prefix || ''} {thesisData?.adviser?.user.first_name || '' } {thesisData?.adviser?.user.last_name || '' } {thesisData?.adviser?.user.ext_name || ''}
                        </div>
                        <p className="text-sm text-gray-600">Adviser</p>
                    </div>
                </div>

                <p className="mt-8 font-semibold text-center text-gray-800">Witnesses:</p>
                <div className="grid grid-cols-2 gap-12 mt-4 pb-8">
                    <div className="space-y-1 text-center">
                        <div className="border-b-2 border-gray-400 w-full h-8 mb-2">
                            {programChair}
                        </div>
                        <p className="text-sm text-gray-600">Program Chair</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="border-b-2 border-gray-400 w-full h-8 mb-2"></div>
                        <p className="text-sm text-gray-600">Graduate School Secretary</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormTwo;
