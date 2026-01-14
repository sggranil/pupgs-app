export const DEFENSE_PHASE = {
    CONCEPT_PAPER: 'concept_paper',
    THESIS_PROPOSAL: 'thesis_proposal',
    UREC: 'urec',
    STATISTICAL_ENDORSEMENT: 'statistical_endorsement',
    PRE_ORAL: 'pre_oral_defense',
    FINAL_DEFENSE: 'final_defense'
}

export const CONFIRMATION_STATUSES = [
    { value: 'pending_review', label: 'Concept Paper Pending Review' },
    { value: 'approve_for_proposal_defense', label: 'Approve for Proposal Defense' },
    { value: 'approve_for_urec', label: 'Approve for UREC Endorsement' },
    { value: 'approve_for_statistic', label: 'Approve for Statistical Endorsement' },
    { value: 'approve_for_pre-oral_defense', label: 'Approve for Pre-Oral Defense' },
    { value: 'approve_for_final_defense', label: 'Approve for Final Defense' },
    { value: 'minor_revisions', label: 'Minor Revisions Needed' },
    { value: 'major_revisions', label: 'Major Revisions Needed' },
    { value: 'revise_and_resubmit', label: 'Revise and Resubmit' },
    { value: 'withdrawn', label: 'Withdrawn' },
    { value: 'on_hold', label: 'On Hold' },
];

export const THESIS_MESSAGES = {
    POSITIVE: {
        label: '✅ Positive Confirmations',
        options: [
            'I confirm that I have received the thesis in full and it is complete.',
            'The thesis has been received and reviewed without any issues.',
            'I acknowledge receipt of the thesis and confirm it is properly formatted.',
            'Thesis document has been received and verified for completeness.',
            'I confirm successful submission of the thesis with all required sections included.',
            'I confirm that the thesis has been submitted on time and is accepted.',
        ],
    },
    NEUTRAL: {
        label: '⚠️ Neutral / Needs Attention',
        options: [
            'Thesis has been received, but some sections are unclear.',
            'I acknowledge receipt of the thesis, but formatting needs adjustments.',
        ],
    },
    NEGATIVE: {
        label: '❌ Negative / Issues',
        options: [
            'The thesis file appears to be incomplete or corrupted.',
            'I received the thesis, but the content does not match the submission guidelines.',
        ],
    },
};

// constants/subjectConfirmation.ts

export const CONFIRMATION_OPTIONS = [
    { value: "pending_review", label: "Pending Review" },
    { value: "confirmed", label: "Confirmed" },
    { value: "acknowledged", label: "Acknowledged" },
    { value: "reupload_required", label: "Reupload Required" },
    { value: "invalid", label: "Invalid" },
    { value: "rejected", label: "Rejected" },
];

export const RECEIPT_MESSAGES = {
    POSITIVE: {
        label: '✅ Positive Confirmations',
        options: [
            'I confirm that I have received the receipt and all details are correct.',
            'I acknowledge receipt of the document with no issues found.',
            'Receipt has been received and verified successfully.',
            'I confirm that the receipt is complete and accurate.',
            'I have received and checked the receipt, and it matches the transaction.',
            'Receipt received, reviewed, and confirmed without discrepancies.',
        ],
    },
    NEUTRAL: {
        label: '⚠️ Neutral / Needs Attention',
        options: [
            'I have received the receipt, but some details are unclear.',
            'Receipt was received, but I need clarification on specific items.',
        ],
    },
    NEGATIVE: {
        label: '❌ Negative / Issues',
        options: [
            'I have not received the receipt yet, please resend.',
            'I received the receipt, but the details are incorrect.',
        ],
    },
};

export const FILE_TYPES = [
    { value: 'proposal', label: 'Paper Proposal' },
    { value: 'urec', label: 'UREC Compilation' },
    { value: 'twd', label: 'TWD Compilation' },
    { value: 'grammarian', label: 'Grammarian Certificate' },
    { value: 'statistician', label: 'Statistician Certificate' },
]

export const TIME_BLOCK = [
    { value: '8:00', label: '8:00 AM - 9:00 AM' },
    { value: '9:00', label: '9:00 AM - 10:00 AM' },
    { value: '10:00', label: '10:00 AM - 11:00 AM' },
    { value: '11:00', label: '11:00 AM - 12:00 NN' },
    { value: '12:00', label: '12:00 NN - 1:00 PM' },
    { value: '13:00', label: '1:00 PM - 2:00 PM' },
    { value: '14:00', label: '2:00 PM - 3:00 PM' },
    { value: '15:00', label: '3:00 PM - 4:00 PM' },
    { value: '16:00', label: '4:00 PM - 5:00 PM' },
    { value: '17:00', label: '5:00 PM - 6:00 PM' },
]