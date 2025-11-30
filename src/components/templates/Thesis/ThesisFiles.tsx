import React from "react";

import FormOne from "@/components/templates/Forms/1. FormOne";
import FormTwo from "@/components/templates/Forms/2. FormTwo";
import FormThree from "@/components/templates/Forms/3. FormThree";
import FormFour from "@/components/templates/Forms/4. FormFour";
import FormHeader from "@/components/templates/Forms/component/FormHeader";
import FormFive from "@/components/templates/Forms/5. FormFive";
import FormSix from "@/components/templates/Forms/6. FormSix";
import FormSeven from "@/components/templates/Forms/7. FormSeven";
import FormEight from "@/components/templates/Forms/8. FormEight";
import FormNine from "@/components/templates/Forms/9. FormNine";
import FormTen from "@/components/templates/Forms/10. FormTen";
import FormEleven from "@/components/templates/Forms/11. FormEleven";
import FormTwelve from "@/components/templates/Forms/12. FormTwelve";
import FormThirteen from "@/components/templates/Forms/13. FormThirteen";
import FormDownloadableCard from "@/components/molecules/Thesis/FormDownloadableCard";
import { EnrolledSubject, Thesis } from "@/interface/thesis.interface";

interface ThesisFilesProps {
  thesisData: Thesis | null;
  subjectData: EnrolledSubject | null;
  programChair: string | null;
  dean: string | null;
}

const ThesisFiles: React.FC<ThesisFilesProps> = ({
  thesisData,
  subjectData,
  programChair,
  dean,
}) => {
  return (
    <div className="border border-gray-200 rounded-md p-2 px-4">
      <h1 className="border-b border-gray-300 py-2 font-bold">Thesis Files</h1>
      <div className="py-2 flex overflow-x-auto md:overflow-visible md:flex-col">
        <FormDownloadableCard
          itemNo={1}
          title="Concept Paper Adviser Endorsement Form"
          document={<FormOne thesisData={thesisData} dean={dean} />}
          header={<FormHeader title="TDW Form No. 1" />}
        />
        <FormDownloadableCard
          itemNo={2}
          title="Thesis Dissertation Advising Contract"
          document={
            <FormTwo programChair={programChair} thesisData={thesisData} />
          }
          header={<FormHeader title="TDW Form No. 2" />}
        />
        <FormDownloadableCard
          itemNo={3}
          title="Thesis Dissertation Consultation and Monitoring Form"
          document={
            <FormThree thesisData={thesisData} enrolledSubject={subjectData} />
          }
          header={<FormHeader title="TDW Form No. 3" />}
          isLandscape={true}
        />
        <FormDownloadableCard
          itemNo={4}
          title="Thesis Dissertation Adviser Appointment and Acknowledgement Form"
          document={<FormFour thesisData={thesisData} dean={dean} />}
          header={<FormHeader title="TDW Form No. 4" />}
        />
        <FormDownloadableCard
          itemNo={5}
          title="Thesis/Dissertation Confidentiality Non-Disclosure Agreement"
          document={<FormFive thesisData={thesisData} />}
          header={<FormHeader title="TDW Form No. 5" />}
        />
        <FormDownloadableCard
          itemNo={6}
          title="Thesis/Dissertation Committee Appointment and Acceptance Form"
          document={
            <FormSix
              programChair={programChair}
              thesisData={thesisData}
              dean={dean}
            />
          }
          header={<FormHeader title="TDW Form No. 6" />}
        />
        {thesisData?.defense_date && thesisData.defense_time && (
          <>
            <FormDownloadableCard
              itemNo={7}
              title="Thesis/Dissertation Proposal Defense Endorsement Form"
              document={
                <FormSeven
                  programChair={programChair}
                  thesisData={thesisData}
                  dean={dean}
                />
              }
              header={<FormHeader title="TDW Form No. 7" />}
            />
            <FormDownloadableCard
              itemNo={8}
              title="Thesis/Dissertation Proposal Defense Evaluation Sheet"
              document={<FormEight thesisData={thesisData} />}
              header={<FormHeader title="TDW Form No. 8" />}
            />
            {subjectData?.subject_name === "Pre-Oral Defense" ? (
              <>
                <FormDownloadableCard
                  itemNo={9}
                  title="Thesis/Dissertation Pre-Final Endorsement Form"
                  document={
                    <FormNine
                      programChair={programChair}
                      thesisData={thesisData}
                      dean={dean}
                    />
                  }
                  header={<FormHeader title="TDW Form No. 9" />}
                />
                <FormDownloadableCard
                  itemNo={10}
                  title="Thesis/Dissertation Pre-Final Evaluation Sheet"
                  document={<FormTen thesisData={thesisData} />}
                  header={<FormHeader title="TDW Form No. 10" />}
                />
                <FormDownloadableCard
                  itemNo={11}
                  title="Thesis/Dissertation Panel on Oral Defense Appointment and Acceptance Form"
                  document={
                    <FormEleven
                      programChair={programChair}
                      thesisData={thesisData}
                      dean={dean}
                    />
                  }
                  header={<FormHeader title="TDW Form No. 11" />}
                />
              </>
            ) : subjectData?.subject_name === "Final Defense" ? (
              <>
                <FormDownloadableCard
                  itemNo={12}
                  title="Thesis/Dissertation Final Endorsement Form"
                  document={
                    <FormTwelve
                      programChair={programChair}
                      thesisData={thesisData}
                      dean={dean}
                    />
                  }
                  header={<FormHeader title="TDW Form No. 12" />}
                />
                <FormDownloadableCard
                  itemNo={13}
                  title="Thesis/Dissertation Final Defense Evaluation Sheet"
                  document={
                    <FormThirteen
                      // programChair={programChair}
                      thesisData={thesisData}
                    />
                  }
                  header={<FormHeader title="TDW Form No. 13" />}
                />
                //{" "}
              </>
            ) : (
              //{" "}
              <span className="text-sm text-center text-gray-400">
                // Forms will appear below on Pre-Final and Final Defense //{" "}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThesisFiles;
