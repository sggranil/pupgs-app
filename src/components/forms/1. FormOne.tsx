import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";

interface FormOneProps {
    thesisData: Thesis | null
}

const FormOne: React.FC<FormOneProps> = ({ thesisData }) => {
    return (
        <div className="w-full">
            <h1 className="text-md font-bold mb-4 text-center">
                THESIS/DISSERTATION CONCEPT PAPER ADVISER ENDORSEMENT FORM
            </h1>

            <div className="flex justify-between items-center mb-8 px-28">
                <p className="mt-12 font-bold">{thesisData?.adviser?.user.first_name} {thesisData?.adviser?.user.last_name}</p>
                <p className="text-base">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="mb-8 px-28">
                <p className="p-0 pb-6">Sir/Madam:</p>
                <p className="">This is to inform you that you have been requested to provide guidance and supervision in the enhancement of the Concept Paper of:</p>
                <div className="px-12 py-4">
                    <p className="py-2">Name of Candidate: <span className="font-bold pl-[120px]">{thesisData?.student?.user.first_name} {thesisData?.student?.user.middle_name} {thesisData?.student?.user.last_name}</span></p>
                    <p className="py-2">Program: <span className="font-bold pl-[195px]">{thesisData?.student?.user.program}</span></p>
                    <p className="py-2">Tentative Concept Paper Title: <span className="font-bold pl-10">{thesisData?.thesis_title}</span></p>
                </div>
                <p className="py-4">Please sign below if you accept the above-mentioned concept paper supervision.</p>
                <p className="py-4">Thank you very much for your cooperation.</p>
                <div className="mr-0 mt-8">
                    <div className="text-right">
                        <div className="inline-block  m-0 p-0 w-64 border-b border-black mb-1"></div>
                        <p className="text-sm m-0 p-0 mb-1 mr-[84px]">Dean/Director</p>
                    </div>
                </div>
                <p className="py-4 pt-8">This confirms my acceptance to supervise the development of a concept paper:</p>
                <div className="px-0 py-4">
                    <p className="py-2">Faculty: <span className="font-bold pl-[200px]">{thesisData?.adviser?.user.first_name} {thesisData?.adviser?.user.last_name}</span></p>
                    <p className="py-2">Signature: <span className="inline-block m-0 p-0 w-[350px] border-b border-black mb-1 ml-[180px]" /></p>
                    <p className="py-2">Date: <span className="font-bold pl-[220px]">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                </div>
            </div>
        </div>
    );
};

export default FormOne;
