"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SquarePen, X } from "lucide-react"

import { getUserInfoFromCookies } from '@/utilities/AuthUtilities';

import ProposalCardList from '@/components/organisms/Proposal/ProposalCardList';
import ThesisInfoCard from '@/components/organisms/Thesis/ThesisInfoCard';


import useAdviserRequest from '@/hooks/adviser';
import useRoomRequest from '@/hooks/room';
import useSubjectRequest from '@/hooks/subject';
import useThesisRequest from '@/hooks/thesis';

import { Adviser } from '@/interface/user.interface';
import { EnrolledSubject, Room, Thesis } from '@/interface/thesis.interface';

import { OFFICIALS } from '@/constants/officials';
import { showToast } from '@/components/organisms/Toast';
import ThesisFiles from '@/components/organisms/Thesis/ThesisFiles';
import DefensePhaseInfo from '@/components/organisms/Subject/DefensePhaseInfo';

export default function ThesisPage() {
    const [thesisData, setThesisData] = useState<Thesis | null>(null);
    const [adviserData, setAdviserData] = useState<Adviser[]>([]);
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [subjectData, setSubjectData] = useState<EnrolledSubject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isSubjectLoaded, setIsSubjectLoaded] = useState<boolean>(false);
    const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
    const [programChair, setProgramChair] = useState<string>("");
    const [editedTitle, setEditedTitle] = useState<string>("");

    const searchParams = useSearchParams();
    const thesisId = searchParams.get('id');
    const index = parseInt(searchParams.get("index") || "0");

    const { fetchThesis, updateThesisInfo } = useThesisRequest();
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
            const allSubjects: EnrolledSubject[] =
                response?.data.filter(
                    (sub: EnrolledSubject) =>
                        sub?.student?.user_id === thesisData?.user_id
                ) || [];

            const phases = ["Thesis Proposal", "Pre-Oral Defense", "Final Defense"];
            const phaseSubjects: Record<string, EnrolledSubject | null> = {};

            phases.forEach((phase) => {
                const subjectsOfPhase = allSubjects
                    .filter((s) => s.subject_name === phase)
                    .sort(
                        (a, b) =>
                            new Date(b.enrolled_at).getTime() -
                            new Date(a.enrolled_at).getTime()
                    );

                phaseSubjects[phase] = subjectsOfPhase[0] || null;
            });

            const latestSubject = Object.values(phaseSubjects).find((s) => s) || null;

            setSubjectData(latestSubject);
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

    const handleUpdateTitle = async () => {
        if (!editedTitle.trim()) {
            showToast("Title cannot be empty.", "error");
            return;
        }

        const data = {
            id: thesisData?.id,
            thesis_title: editedTitle,
        };

        setLoading(true);
        try {
            const res = await updateThesisInfo(data);
            if (res) {
                showToast("Title updated successfully.", "success");
                setIsUpdated(true);
                setIsEditTitle(false);
            } else {
                showToast("Failed to update title.", "error");
            }
        } catch (err) {
            showToast("Something went wrong.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (thesisId) {
            fetchThesisData();
            setIsUpdated(false);
        }
    }, [thesisId, isUpdated]);

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
                        <div className="">

                            {isEditTitle ? (
                                <div className='flex align-center'>
                                    <input
                                        type="text"
                                        defaultValue={thesisData?.thesis_title}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className='text-textPrimary text-xl md:text-2xl font-bold border-b border-gray-400 focus:outline-none'
                                    />
                                    <button
                                        onClick={() => setIsEditTitle(false)}
                                    >
                                        <X className='text-textPrimary mt-1 ml-2' size={24} />
                                    </button>
                                    <button
                                        className='bg-bgPrimary text-white text-sm rounded-md px-2 mt-1 ml-2'
                                        onClick={handleUpdateTitle}
                                    >
                                        Submit
                                    </button>
                                </div>

                            ) : (
                                <div className='flex align-center'>
                                    <h1 className='text-textPrimary text-xl md:text-2xl font-bold'>
                                        "{thesisData?.thesis_title}"
                                    </h1>
                                    <button
                                        onClick={() => setIsEditTitle(true)}
                                    >
                                        <SquarePen className='text-textPrimary mt-1 ml-2' size={24} />
                                    </button>
                                </div>
                            )}
                        </div>
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
                            <DefensePhaseInfo thesisData={thesisData} subjectData={subjectData} isSubjectLoaded={isSubjectLoaded} />
                            <ProposalCardList thesisId={thesisId ?? ""} status={thesisData?.status ?? ""} />
                        </div>
                        <div className="col-span-12 md:col-span-5 pt-4">
                            <ThesisInfoCard setIsUpdated={setIsUpdated} adviserData={adviserData} roomData={roomData} thesisData={thesisData} subjectData={subjectData} />
                            {userData?.role === "student" && thesisData?.status != "pending_review" && (
                                <ThesisFiles thesisData={thesisData} subjectData={subjectData} programChair={programChair} />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
