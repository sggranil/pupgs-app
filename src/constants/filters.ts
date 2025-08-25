export const DEFENSE_PHASE = {
    CONCEPT_PAPER: 'concept_paper',
    THESIS_PROPOSAL: 'thesis_proposal',
    UREC: 'urec',
    STATISTICAL_ENDORSEMENT: 'statistical_endorsement',
    PRE_ORAL: 'pre_oral_defense',
    FINAL_DEFENSE: 'final_defense'
}

export const CONFIRMATION_STATUSES = [
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'approve_for_proposal_defense', label: 'Approve for Proposal Defense' },
  { value: 'approve_for_pre_oral', label: 'Approve for Pre-Oral Defense' },
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