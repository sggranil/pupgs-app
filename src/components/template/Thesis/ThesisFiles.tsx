import React from "react";
import { Thesis, ThesisReceipt } from "@/interface/thesis.interface";

import FormOne from "@/components/template/forms/1. FormOne";
import FormTwo from "@/components/template/forms/2. FormTwo";
import FormThree from "@/components/template/forms/3. FormThree";
import FormFour from "@/components/template/forms/4. FormFour";
import FormHeader from "@/components/template/forms/component/FormHeader";
import FormFive from "@/components/template/forms/5. FormFive";
import FormSix from "@/components/template/forms/6. FormSix";
import FormSeven from "@/components/template/forms/7. FormSeven";
import FormEight from "@/components/template/forms/8. FormEight";
import FormNine from "@/components/template/forms/9. FormNine";
import FormTen from "@/components/template/forms/10. FormTen";
import FormEleven from "@/components/template/forms/11. FormEleven";
import FormTwelve from "@/components/template/forms/12. FormTwelve";
import FormThirteen from "@/components/template/forms/13. FormThirteen";
import FormDownloadableCard from "@/components/template/FormDownloadableCard";

interface ThesisFilesProps {
  thesisData: Thesis | null;
  thesisReceipt: ThesisReceipt | null;
  programChair: string | null;
  dean: string | null;
}

const ThesisFiles: React.FC<ThesisFilesProps> = ({
  thesisData,
  thesisReceipt,
  programChair,
  dean,
}) => {
  return (
    <div className="w-full">
      <h1 className="font-bold mt-4">TWD Forms</h1>
      <div className="py-2 px-1 flex overflow-x-auto flex-row gap-2">
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
            <FormThree thesisData={thesisData} thesisReceipt={thesisReceipt} />
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
        {thesisData?.defense_schedule && (
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
            {thesisReceipt?.receipt_name === "pre_oral_defense" ? (
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
            ) : thesisReceipt?.receipt_name === "final_defense" ? (
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
              <span className="text-sm text-center text-gray-400"></span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThesisFiles;
