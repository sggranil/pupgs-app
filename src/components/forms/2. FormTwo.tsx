import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";

interface FormTwoProps {
    thesisData: Thesis | null
}

const FormTwo: React.FC<FormTwoProps> = ({ thesisData }) => {
    return (
        <div className="w-full">
            <h1 className="text-md font-bold mb-4 text-center">
                THESIS/DISSERTATION ADVISING CONTRACT
            </h1>

            <div className="block mb-8 px-24" >
                <p className="mt-12 font-bold pb-8">KNOW ALL MEN BY THESE PRESENTS:</p>
                <p className="indent-24">This agreement is made and entered into this {new Date().toLocaleDateString('en-US', { day: 'numeric' })} day of, {new Date().toLocaleDateString('en-US', { month: 'long' })} {new Date().toLocaleDateString('en-US', { year: 'numeric' })} , in Manila, Philippines by and between:</p>
            </div>

            <div className="block mb-8 px-24" >
                <p className="indent-24"><span className="font-bold">{thesisData?.adviser?.user.first_name} {thesisData?.adviser?.user.last_name}</span>, from the <span className="font-bold">{thesisData?.adviser?.user.program}</span>, hereinafter referred to as <strong>“Adviser”</strong></p>
                <p className="text-center py-4">- and -</p>
                <p className="indent-24"><span className="font-bold">{thesisData?.student?.user.first_name} {thesisData?.student?.user.last_name}</span>, a bonafide student of the <span className="font-bold">{thesisData?.student?.user.program}</span> of the <span className="font-bold">{thesisData?.student?.user.program}</span> hereinafter referred to as <strong>“Advisee”</strong></p>
            </div>

            <div className="block mb-8 px-24" >
                <p className="text-center py-4 font-bold">WITNESSETH:</p>
                <p className="indent-24 py-3"><strong>WHEREAS</strong>, the Adviser is preferably a faculty/employee of the Polytechnic University of the Philippines, with a masters/doctorate degree in the field relevant to the topic or program specialization of the thesis/dissertation, with research experience (evidenced by research publications), and an expert in the field of study conducted by her/his Advisee;</p>
                <p className="indent-24 py-3"><strong>WHEREAS</strong>, the Advisee is a bonafide student in the University who is writing his/her thesis/dissertation in partial fulfillment of the degree he/she is enrolled in;;</p>
                <p className="indent-24 py-3"><strong>NOW, THEREFORE,</strong>, the two parties hereby agree to enter into this Agreement under the following terms and conditions;</p>
            </div>

            <div className="text-justify space-y-4 leading-relaxed px-24">
                <p className="font-semibold">Adviser shall:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
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

                <p className="font-semibold">Advisee shall:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
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

                <p className="indent-12">
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

                <p>
                    <span className="italic font-bold">In WITNESS WHEREOF</span>, the parties have hereunto set their hands on the date and place above-written.
                </p>

                {/* Signature section */}
                <div className="grid grid-cols-2 gap-8 mt-6">
                    <div className="space-y-1 text-center">
                        <div className="border-b border-black w-full h-6"></div>
                        <p className="text-sm">Advisee</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="border-b border-black w-full h-6"></div>
                        <p className="text-sm">Adviser</p>
                    </div>
                </div>

                <p className="mt-6 font-semibold text-center">Witnesses:</p>
                <div className="grid grid-cols-2 gap-8 mt-2">
                    <div className="space-y-1 text-center">
                        <div className="border-b border-black w-full h-6"></div>
                        <p className="text-sm">Program Chair</p>
                    </div>
                    <div className="space-y-1 text-center">
                        <div className="border-b border-black w-full h-6"></div>
                        <p className="text-sm">Graduate School Secretary</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormTwo;
