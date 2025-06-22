"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getUserInfoFromCookies } from '@/utilities/AuthUtilities';

import useThesisRequest from '@/hooks/thesis';
import FormDownloadableCard from '@/components/molecules/Thesis/FormDownloadableCard';
import ProposalCardList from '@/components/organisms/Proposal/ProposalCardList';
import { Thesis } from '@/interface/thesis.interface';
import ThesisInfoCard from '@/components/organisms/Thesis/ThesisInfoCard';
import FormOne from '@/components/forms/1. FormOne';
import FormTwo from '@/components/forms/2. FormTwo';
import FormThree from '@/components/forms/3. FormThree';
import FormFour from '@/components/forms/4. FormFour';

export default function ThesisPage() {
    const [thesisData, setThesisData] = useState<Thesis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const thesisId = searchParams.get('id');

    const { fetchThesis } = useThesisRequest();
    const userData = getUserInfoFromCookies();

    const fetchThesisData = async () => {
        setLoading(true);
        const response = await fetchThesis(Number(thesisId));
        if (response) {
            setThesisData(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (thesisId) {
            fetchThesisData();
            setIsUpdated(false);
        }
    }, [thesisId, isUpdated]);

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
                            <ThesisInfoCard setIsUpdated={setIsUpdated} thesisData={thesisData} />
                            {userData?.role === "student" && (
                                <div className='border border-gray-200 rounded-md p-2 px-4'>
                                    <h1 className='border-b border-gray-300 py-2 font-bold'>Thesis Files</h1>
                                    <div className="py-2 flex overflow-x-auto md:overflow-visible md:flex-col"><FormDownloadableCard
                                        itemNo={1}
                                        title="Concept Paper Adviser Endorsement Form"
                                        document={<FormOne />}
                                    />
                                    <FormDownloadableCard 
                                        itemNo={2} 
                                        title="Thesis Dissertation Advising Contract" 
                                        document={<FormTwo />} 
                                    />
                                    <FormDownloadableCard 
                                        itemNo={3} 
                                        title="Thesis Dissertation Consultation and Monitoring Form" 
                                        document={<FormThree />} 
                                    />
                                    <FormDownloadableCard 
                                        itemNo={4} 
                                        title="Thesis Dissertation Adviser Appointment and Acknowledgement Form" 
                                        document={<FormFour />} 
                                    />
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
