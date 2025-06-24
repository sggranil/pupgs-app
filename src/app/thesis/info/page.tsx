"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getUserInfoFromCookies } from '@/utilities/AuthUtilities';

import FormDownloadableCard from '@/components/molecules/Thesis/FormDownloadableCard';
import ProposalCardList from '@/components/organisms/Proposal/ProposalCardList';
import ThesisInfoCard from '@/components/organisms/Thesis/ThesisInfoCard';

import PDFDownloadWrapper from "@/components/wrapper/PDFExportWrapper";
import ThesisHonorarium from "@/components/forms/ThesisHonorarium";
import PageHeader from "@/components/forms/component/PageHeader";
import PageFooter from "@/components/forms/component/PageFooter";
import FormOne from '@/components/forms/1. FormOne';
import FormTwo from '@/components/forms/2. FormTwo';
import FormThree from '@/components/forms/3. FormThree';
import FormFour from '@/components/forms/4. FormFour';
import FormHeader from '@/components/forms/component/FormHeader';
import FormFive from '@/components/forms/5. FormFive';
import FormSix from '@/components/forms/6. FormSix';
import FormSeven from '@/components/forms/7. FormSeven';
import FormEight from '@/components/forms/8. FormEight';
import FormNine from '@/components/forms/9. FormNine';
import FormTen from '@/components/forms/10. FormTen';
import FormEleven from '@/components/forms/11. FormEleven';
import FormTwelve from '@/components/forms/12. FormTwelve';
import FormThirteen from '@/components/forms/13. FormThirteen';

import useAdviserRequest from '@/hooks/adviser';
import useRoomRequest from '@/hooks/room';
import useSubjectRequest from '@/hooks/subject';
import useThesisRequest from '@/hooks/thesis';

import { Adviser } from '@/interface/user.interface';
import { EnrolledSubject, Room, Thesis } from '@/interface/thesis.interface';

import { OFFICIALS } from '@/constants/officials';

export default function ThesisPage() {
    const [thesisData, setThesisData] = useState<Thesis | null>(null);
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [subjectData, setSubjectData] = useState<EnrolledSubject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isSubjectLoaded, setIsSubjectLoaded] = useState<boolean>(false);
    const [programChair, setProgramChair] = useState<string>("");

    const searchParams = useSearchParams();
    const thesisId = searchParams.get('id');
    const index = parseInt(searchParams.get("index") || "0");

    const { fetchThesis } = useThesisRequest();
    const { getAllAdviser } = useAdviserRequest();
    const { getAllRooms } = useRoomRequest();
    const { getAllSubject } = useSubjectRequest();

    const userData = getUserInfoFromCookies();

    const fetchThesisData = async () => {
        setLoading(true);
        const response = await fetchThesis(Number(thesisId));
        if (response) {
            setThesisData(response.data);
        }
        setLoading(false);
    };

    const fetchRooms = async () => {
        try {
            const response = await getAllRooms();
            setRoomData(response?.data || []);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setRoomData([]);
        }
    };

    const fetchAdvisers = async () => {
        try {
            const response = await getAllAdviser();
            setAdviserData(response?.data || []);
        } catch (error) {
            console.error("Error fetching advisers:", error);
            setAdviserData([]);
        }
    };

    const fetchSubject = async () => {
        setIsSubjectLoaded(true);
        try {
            const response = await getAllSubject();
            const allSubjects = response?.data.filter(
                (sub: EnrolledSubject) => sub.is_confirmed == true && sub?.student?.user_id === thesisData?.user_id
            ) || [];

            const types = ["Thesis Proposal", "Pre-Oral Defense", "Final Defense"];

            const selectedSubjects = types.map(type => {
                const subjectsOfType = allSubjects
                    .filter((subject: EnrolledSubject) => subject.subject_name === type)
                    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

                return subjectsOfType[index];
            });

            const latestSubject = [...selectedSubjects]
                .reverse()
                .find(subject => subject?.is_confirmed === true);

            setSubjectData(latestSubject || null);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setSubjectData(null);
        }
        setIsSubjectLoaded(false);
    };

    const getProgramChair = async () => {
        const progChair = OFFICIALS.find(
            (off) => off.program === thesisData?.student?.user.program
        );

        if (progChair) {
            setProgramChair(progChair.name);
        } else {
            setProgramChair("Not Found");
        }
    };


    useEffect(() => {
        if (thesisId) {
            fetchThesisData();
            setIsUpdated(false);
        }
    }, [thesisId]);

    useEffect(() => {
        if (thesisData) {
            fetchAdvisers();
            fetchRooms();
            fetchSubject();
            getProgramChair();
        }
    }, [thesisData, isUpdated]);


    return (
        <div className='w-full py-4'>
            {loading ? (
                <div className="min-h-screen flex flex-col justify-center items-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className='p-4 border-b-2 border-gray-200'>
                        <h1 className='text-textPrimary text-xl md:text-2xl font-bold'>
                            "{thesisData?.thesis_title}"
                        </h1>
                        <>
                            <span className='uppercase text-lg font-bold'>
                                {thesisData?.student?.user_id}
                                {thesisData?.student?.user?.first_name} {thesisData?.student?.user?.last_name}
                            </span>{" "}
                            |{" "}
                            <span className='uppercase text-lg font-bold'>
                                {thesisData?.student?.user?.program ?? "Sta. Mesa Campus"}
                            </span>
                        </>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2">
                        <div className="col-span-12 md:col-span-7 p-4">
                            <ProposalCardList thesisId={thesisId ?? ""} />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <div className='border border-gray-200 rounded-md p-2 px-4 mb-4'>
                                <div className='flex items-center justify-between border-b border-gray-300 py-2'>
                                    <h4 className='font-bold text-lg'>Phase Status</h4>
                                    {userData?.role === "adviser" && (
                                        <PDFDownloadWrapper
                                            header={<PageHeader />}
                                            footer={<PageFooter />}
                                            content={<ThesisHonorarium thesisData={thesisData} enrolledSubject={subjectData} />}
                                            fileName="thesis-honorarium"
                                            buttonLabel="Export Honorarium"
                                        />
                                    )}
                                </div>
                                <div className='py-4 space-y-3'>
                                    {/* Adviser */}
                                    <div>
                                        <span className="font-semibold text-sm text-gray-600">OR Number</span>
                                        <p className="ml-4 text-lg font-semibold text-textPrimary">
                                            {isSubjectLoaded ? (<span>Loading...</span>) : (<span>#{subjectData?.or_number}</span>)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm text-gray-600">Current Phase</span>
                                        <p className="ml-4 text-lg font-semibold text-textPrimary">
                                            {isSubjectLoaded ? (<span>Loading...</span>) : (<span>{subjectData?.subject_name}</span>)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ThesisInfoCard setIsUpdated={setIsUpdated} adviserData={adviserData} roomData={roomData} thesisData={thesisData} subjectData={subjectData} />
                            {userData?.role === "student" && (
                                <div className='border border-gray-200 rounded-md p-2 px-4'>
                                    <h1 className='border-b border-gray-300 py-2 font-bold'>Thesis Files</h1>
                                        <div className="py-2 flex overflow-x-auto md:overflow-visible md:flex-col">
                                        <FormDownloadableCard
                                            itemNo={1}
                                            title="Concept Paper Adviser Endorsement Form"
                                            document={<FormOne thesisData={thesisData} />}
                                            header={<FormHeader title='TDW Form No. 1'/>}
                                        />
                                        <FormDownloadableCard
                                            itemNo={2}
                                            title="Thesis Dissertation Advising Contract"
                                            document={<FormTwo programChair={programChair} thesisData={thesisData} />}
                                            header={<FormHeader title='TDW Form No. 2'/>}
                                        />
                                        <FormDownloadableCard
                                            itemNo={3}
                                            title="Thesis Dissertation Consultation and Monitoring Form"
                                            document={<FormThree thesisData={thesisData} enrolledSubject={subjectData} />}
                                            header={<FormHeader title='TDW Form No. 3'/>}
                                            isLandscape={true}
                                        />
                                        <FormDownloadableCard
                                            itemNo={4}
                                            title="Thesis Dissertation Adviser Appointment and Acknowledgement Form"
                                            document={<FormFour thesisData={thesisData} />}
                                            header={<FormHeader title='TDW Form No. 4'/>}
                                        />
                                        <FormDownloadableCard
                                            itemNo={5}
                                            title="Thesis/Dissertation Confidentiality Non-Disclosure Agreement"
                                            document={<FormFive thesisData={thesisData} />}
                                            header={<FormHeader title='TDW Form No. 5'/>}
                                        />
                                        <FormDownloadableCard
                                            itemNo={6}
                                            title="Thesis/Dissertation Committee Appointment and Acceptance Form"
                                            document={<FormSix programChair={programChair} thesisData={thesisData} />}
                                            header={<FormHeader title='TDW Form No. 6'/>}
                                        />
                                        {thesisData?.defense_date && thesisData.defense_time && (
                                            <>
                                                <FormDownloadableCard
                                                    itemNo={7}
                                                    title="Thesis/Dissertation Proposal Defense Endorsement Form"
                                                    document={<FormSeven programChair={programChair} thesisData={thesisData} />}
                                                    header={<FormHeader title='TDW Form No. 7'/>}
                                                />
                                                <FormDownloadableCard
                                                    itemNo={8}
                                                    title="Thesis/Dissertation Proposal Defense Evaluation Sheet"
                                                    document={<FormEight thesisData={thesisData} />}
                                                    header={<FormHeader title='TDW Form No. 8'/>}
                                                />
                                                {subjectData?.subject_name === "Pre-Oral Defense" ? (
                                                    <>
                                                        <FormDownloadableCard
                                                            itemNo={9}
                                                            title="Thesis/Dissertation Pre-Final Endorsement Form"
                                                            document={<FormNine programChair={programChair} thesisData={thesisData} />}
                                                            header={<FormHeader title='TDW Form No. 9'/>}
                                                        />
                                                        <FormDownloadableCard
                                                            itemNo={10}
                                                            title="Thesis/Dissertation Pre-Final Evaluation Sheet"
                                                            document={<FormTen thesisData={thesisData} />}
                                                            header={<FormHeader title='TDW Form No. 10'/>}
                                                        />
                                                        <FormDownloadableCard
                                                            itemNo={11}
                                                            title="Thesis/Dissertation Panel on Oral Defense Appointment and Acceptance Form"
                                                            document={<FormEleven programChair={programChair} thesisData={thesisData} />}
                                                            header={<FormHeader title='TDW Form No. 11'/>}
                                                        />
                                                    </>
                                                ) : subjectData?.subject_name === "Final Defense" ? (
                                                    <>
                                                        <FormDownloadableCard
                                                            itemNo={12}
                                                            title="Thesis/Dissertation Final Endorsement Form"
                                                            document={<FormTwelve programChair={programChair} thesisData={thesisData} />}
                                                            header={<FormHeader title='TDW Form No. 12'/>}
                                                        />
                                                        <FormDownloadableCard
                                                            itemNo={13}
                                                            title="Thesis/Dissertation Final Defense Evaluation Sheet"
                                                            document={<FormThirteen programChair={programChair} thesisData={thesisData} />}
                                                            header={<FormHeader title='TDW Form No. 13'/>}
                                                        />
                                                    </>
                                                ) : (
                                                    <span className='text-sm text-center text-gray-400'>Forms will appear below on Pre-Final and Final Defense</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
