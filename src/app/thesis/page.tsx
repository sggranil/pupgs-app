"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getUserRoleFromCookies } from '@/utilities/AuthUtilities';

import useThesisRequest from '@/hooks/thesis';
import { Thesis } from '@/interface/thesis.interface';
import FormDownloadableCard from '@/components/molecules/Thesis/FormDownloadableCard';
import ProposalCardList from '@/components/organisms/Proposal/ProposalCardList';

export default function ThesisPage() {
    const [thesisData, setThesisData] = useState<Thesis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const thesisId = searchParams.get('id');
    const userRole = getUserRoleFromCookies();
    const { fetchThesis } = useThesisRequest();

    if (!thesisId) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <p>No Thesis Found!</p>

                <Link className="text-blue-500 underline" href={`/dashboard/${userRole}`}>
                    Go back to dashboard
                </Link>
            </div>
        );
    }

    const fetchThesisData = async () => {
        setLoading(true);
        const response = await fetchThesis(Number(thesisId));
        if (response) {
            setThesisData(response.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchThesisData();
    }, []);

    return (
        <div className='w-full py-4'>
            {loading ? (
                <div className="min-h-screen flex flex-col justify-center items-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className='p-4 border-b-2 border-gray-200'>
                        <h1 className='text-textPrimary text-xl md:text-2xl font-bold'>"{thesisData?.thesis_title}"</h1>
                        <p className='font-semibold'>Adviser: {thesisData?.adviser?.id}</p>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2">
                        <div className="col-span-12 md:col-span-7 p-4">
                            <ProposalCardList thesisId={thesisId} />
                        </div>
                        <div className="col-span-12 md:col-span-5 bg-gray-100 rounded-md p-2 px-4">
                            <h1 className='border-b border-gray-300 py-2 font-semibold'>Downloadables</h1>
                            <div className="py-2 flex overflow-x-auto md:overflow-visible md:flex-col">
                                <FormDownloadableCard itemNo={1} title="Concept Paper Adviser Endorsement Form" link="#" />
                                <FormDownloadableCard itemNo={2} title="Thesis Dissertation Advising Contract" link="#" />
                                <FormDownloadableCard itemNo={3} title="Thesis Dissertation Consultation and Monitoring Form" link="#" />
                                <FormDownloadableCard itemNo={4} title="Thesis Dissertation Adviser Appointment and Acknowledgement Form" link="#" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
