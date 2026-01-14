import { Thesis } from "@/interface/thesis.interface";

interface FormFiveProps {
  thesisData: Thesis | null;
}

const FormFive: React.FC<FormFiveProps> = ({ thesisData }) => {
  const thesisSubmissionDate = thesisData?.defense_schedule
    ? new Date(thesisData.defense_schedule).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "______________"; // Placeholder if no date

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full px-16 py-8 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
      <h1 className="text-center font-bold text-base mb-2 uppercase">
        TDW Form No. 5
      </h1>
      <h1 className="text-center font-bold text-base mb-6 uppercase">
        Thesis/Dissertation Confidentiality Non-Disclosure Agreement
      </h1>

      <div className="mb-4">
        <p className="inline-block font-bold">EFFECTIVE DATE:</p>
        <span className="border-b border-black inline-block ml-2 px-2 pb-0.5 text-center flex-grow">
          {thesisSubmissionDate}
        </span>
        <p className="text-xs text-left mt-1 ml-[110px]">
          (thesis submission date)
        </p>
      </div>

      <p className="text-justify mb-4">
        This Agreement sets forth the terms and conditions under which
        confidential, proprietary, and other private information shall be
        disclosed between the Polytechnic University of the Philippines and
        <span className="py-4 text-center border-b border-black px-2 pb-0.5 min-w-[200px] inline-block"></span>
        hereinafter referred to as "Evaluator/Examiner
      </p>

      <p className="mb-6">
        By signing below, the parties acknowledge and accept the terms and
        conditions herein.
      </p>

      {/* Section 1 */}
      <div className="mb-4">
        <p className="font-bold mb-2">
          1. The Examiner authorized to disclose and receive the confidential
          information is:
        </p>
        <p className="border-b border-black w-3/4 pb-0.5 mb-1 py-6"></p>
        <p className="text-xs">Name and Title</p>
      </div>

      {/* Section 2 */}
      <div className="mb-4">
        <p className="font-bold mb-2">
          2. On behalf of the Polytechnic University of the Philippines:
        </p>
        <p className="border-b border-black w-3/4 pb-0.5 mb-1">&nbsp;</p>
        <p className="text-xs">Name and Title</p>
      </div>

      {/* Section 3 */}
      <div className="mb-4">
        <p className="font-bold mb-2">
          3. The confidential information disclosed under this Agreement is
          described as:
        </p>
        <p className="mb-2">
          Contents of the Thesis/Dissertation by:{" "}
          <span className="font-bold border-b border-black px-2 pb-0.5 min-w-[200px] inline-block">
            {thesisData?.student?.user.first_name || ""}{" "}
            {thesisData?.student?.user.middle_name
              ? thesisData.student.user.middle_name + " "
              : ""}
            {thesisData?.student?.user.last_name || ""}
          </span>
        </p>
        <p className="mb-4">
          which is entitled:{" "}
          <span className="font-bold border-b border-black px-2 pb-0.5 min-w-[200px] inline-block">
            {thesisData?.thesis_title || ""}
          </span>
        </p>
      </div>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">4.</span> The confidential information
        shall be used by the Evaluator/Examiner only for the purpose of
        examination of thesis/dissertation as part of the requirements of the
        Graduate Program in which the student named above is enrolled.
      </p>

      <p className="text-justify mb-4">
        This Agreement controls confidential information particularly, part, or
        entirety of the research manuscript, confidential research data, and
        personal information as defined under R.A. 10173 or the Data Privacy Act
        of the Philippines. It is any information whether recorded in a material
        form or not, from which the identity of an individual is apparent or can
        be reasonably and directly ascertained by the entity holding the
        information, or when put together with other information would directly
        and certainly identify an individual, e.g., home addresses and other
        contact details of students as usually stipulated in his/her Curriculum
        Vitae as part of the appendices, personnel or persons who have contracts
        with the Polytechnic University of the Philippines.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">5.</span> The obligations imposed upon
        an Evaluator/Examiner hereunder shall apply only to information which at
        the time of disclosure is:
      </p>
      <p className="text-justify mb-2 ml-4">
        (a) marked as confidential if such information is disclosed in a
        physical form as the content of the thesis/dissertation named above, and
        the oral defense, if any, of this same thesis/dissertation, or
      </p>
      <p className="text-justify mb-4 ml-4">
        (b) if disclosed in some other form or manner is identified as
        confidential, and which identification is subsequently confirmed in a
        written notice delivered to the Evaluator/Examiner specified in Item 1
        within thirty (30) days of disclosure.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">6.</span> The Evaluator/Examiner agrees
        to take all action reasonably necessary to protect the confidentiality
        of the confidential information, including without limitation,
        implementing and enforcing operating procedures to minimize the
        possibility of unauthorized use or copying of the confidential
        information. Without limiting the foregoing, the Examiner agrees to
        utilize the same degree of care, to avoid unauthorized disclosure or use
        of the confidential information of the discloser.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">7. </span>
        The obligations imposed upon an Evaluator/Examiner hereunder do not
        apply to information:
      </p>
      <p className="text-justify mb-2 ml-4">
        (a) which is or becomes publicly available without breach of this
        Agreement;
      </p>
      <p className="text-justify mb-2 ml-4">
        (b) which is already known to the Recipient prior to its disclosure
        hereunder;
      </p>
      <p className="text-justify mb-4 ml-4">
        (c) which is independently developed by the Examiner.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">8.</span> The parties acknowledge that
        any technology, product, or other intellectual property identified as
        confidential information and provided hereunder is provided on an "as
        is" basis without warranty of any kind whether express or implied and
        that the implied warranties of merchantability and fitness for a
        particular purpose are expressly disclaimed. In particular, the Examiner
        shall not be liable for any direct, indirect, special, or consequential
        damages in connection with or arising out of the performance or use of
        any portion of the confidential information.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">9.</span> Nothing in this Agreement
        shall be interpreted to prohibit the Evaluator/Examiner from using,
        marketing, licensing, and/or selling any independently developed
        technology, product or other intellectual property that is similar or
        related to the confidential information disclosed hereunder.
      </p>

      {/* Section 10 */}
      <p className="font-bold mb-2">10. Neither Party:</p>
      <p className="text-justify mb-2 ml-4">
        (a) acquires any intellectual property rights under this Agreement
        except the limited right to use the confidential information;
      </p>
      <p className="text-justify mb-2 ml-4">
        (b) has an obligation hereunder to purchase or otherwise acquire any
        service or item from the other;
      </p>
      <p className="text-justify mb-4 ml-4">
        (c) has an obligation hereunder to commercially release any products or
        services using or incorporating the confidential information.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">11.</span> The Evaluator/Examiner shall
        immediately return any Confidential Information and the physical media
        on which it was received or destroy/delete all copies of the
        Confidential Information and certify in writing to the Polytechnic
        University of the Philippines that it has destroyed/deleted all copies
        made of the Confidential Information. Such certification shall be
        delivered within ten (10) after the submission of the approved revised
        copy of the thesis/dissertation manuscript.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">12.</span> All modifications or
        amendments to this Agreement must be in writing and must be signed by
        both parties.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">13.</span> I agree that my obligations
        pursuant to this undertaking apply to Confidential Information that I
        came across or had access to from the time my employment or engagement
        with the University commenced and that such obligations will survive the
        tenure of my employment/engagement with the University.
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">14.</span> I agree that in the event I
        previously executed a confidentiality or non-disclosure agreement or
        undertaking in favor of Polytechnic University of the Philippines that
        the obligations contained in this undertaking are in addition to those
        contained in such prior agreement or undertaking; and
      </p>

      <p className="text-justify mb-4">
        <span className="font-bold mb-2">15.</span> I understand that if I fail
        to comply with this undertaking, such violation may be a ground for the
        Polytechnic University of the Philippines to take appropriate
        disciplinary and/or legal action against me. I am also aware that the
        DPA provides for criminal penalties (imprisonment and a fine) for
        unauthorized processing of personal and sensitive personal information.
      </p>

      <p className="text-justify mb-8">
        This Agreement shall be governed by the laws of the Republic of the
        Philippines.
      </p>

      <p className="text-justify mb-8">
        IN WITNESS WHEREOF, I have affixed my signature to this Agreement this
        <span className="border-b border-black px-2 pb-0.5 min-w-[220px] inline-block mx-1 text-center">
          {formattedDate}
        </span>{" "}
        , in Manila, Philippines.
      </p>

      {/* Signatures Section */}
      <div className="grid grid-cols-2 gap-x-16 mt-8">
        <div>
          <p className="font-bold mb-1">Evaluator/Examiner:</p>
          <p className="border-b border-black w-full pb-0.5 mb-1">
            {thesisData?.adviser?.user.first_name || ""}{" "}
            {thesisData?.adviser?.user.last_name || ""}
          </p>
          <p className="text-xs mb-4">Name of Thesis Examiner [Please print]</p>
          <p className="border-b border-black w-full pb-0.5 mb-1">
            &nbsp;
          </p>{" "}
          {/* Signature line */}
          <p className="text-xs mb-4">Authorized Signature</p>
          <p className="border-b border-black w-full pb-0.5 mb-1">
            {formattedDate}
          </p>{" "}
          {/* Date */}
          <p className="text-xs">Date:</p>
        </div>
        <div>
          <p className="font-bold mb-1">
            Polytechnic University of the Philippines:
          </p>
          {/* Reverted to placeholder as no direct thesisData field for this */}
          <p className="border-b border-black w-full pb-0.5 mb-1">&nbsp;</p>
          <p className="text-xs mb-4">
            Name and Title of University Representative
          </p>
          <p className="border-b border-black w-full pb-0.5 mb-1">&nbsp;</p>{" "}
          {/* Signature line */}
          <p className="text-xs mb-4">Authorized Signature</p>
          <p className="border-b border-black w-full pb-0.5 mb-1">
            {formattedDate}
          </p>{" "}
          {/* Date */}
          <p className="text-xs">Date:</p>
        </div>
      </div>
    </div>
  );
};

export default FormFive;
