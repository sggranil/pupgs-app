import { Thesis } from "@/interface/thesis.interface";
import { User } from "@/interface/user.interface";

interface FormElevenProps {
  thesisData: Thesis | null;
  programChair: string | null;
  dean: string | null;
}

const FormEleven: React.FC<FormElevenProps> = ({
  thesisData,
  programChair,
  dean,
}) => {
  const semesterDate = thesisData?.student?.user.start_date
    ? new Date(thesisData.student.user.start_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "No Date";

  const getCurrentSemester = () => {
    if (!thesisData?.student?.user.start_date) return "No Semester";
    const month = new Date(thesisData.student.user.start_date).getMonth();

    if (month >= 9 || month <= 1) {
      return "First Semester";
    } else if (month >= 2 && month <= 5) {
      return "Second Semester";
    } else {
      return "Summer";
    }
  };

  const currentSemester = getCurrentSemester();

  const getFullUserName = (user: User | undefined) => {
    return user
      ? `${user.first_name || ""} ${
          user.middle_name ? user.middle_name + " " : ""
        }${user.last_name || ""}`
      : "";
  };

  return (
    <div className="w-full px-16 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg uppercase mt-2">
          Thesis/Dissertation Panel on Oral Defense Appointment and Acceptance
          Form
        </h1>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <p className="font-semibold w-1/3">Name of Student/Candidate:</p>
          <span className="border-b border-black flex-grow px-2 pb-3">
            {getFullUserName(thesisData?.student?.user)}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <p className="font-semibold w-1/3">Program:</p>
          <span className="border-b border-black flex-grow px-2 pb-3">
            {thesisData?.student?.user.program || ""}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <p className="font-semibold w-1/3">
            School Year & Semester Started in the Program:
          </p>
          <span className="border-b border-black flex-grow px-2 pb-3">
            {semesterDate} - {currentSemester}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <p className="font-semibold w-1/3">
            Date of Passing the Comprehensive Examination:
          </p>
          <span className="border-b border-black flex-grow px-2 pb-3">
            {thesisData?.defense_schedule
              ? new Date(thesisData.defense_schedule).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
              : "____________________"}
          </span>
        </div>
        <div className="mb-2">
          <p className="font-semibold">Thesis/Dissertation Title:</p>
          <span className="border-b border-black w-full inline-block px-2 pb-3 mt-1">
            {thesisData?.thesis_title || ""}
          </span>
          <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1">
            &nbsp;
          </span>
          <span className="border-b border-black w-full inline-block px-2 pb-0.5 mt-1 mb-2">
            &nbsp;
          </span>
        </div>
        <div className="flex items-center mb-2">
          <p className="font-semibold w-1/3">Adviser:</p>
          <span className="border-b border-black flex-grow px-2 pb-3">
            {getFullUserName(thesisData?.adviser?.user)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full border border-gray-300 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/4">
                Final Defense Panel
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-1/3">
                Name
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-[25%]">
                Signature (Signifying Acceptance of Appointment)
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-[15%]">
                Date of Signing
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Chair */}
            <tr>
              <td className="border border-gray-300 px-3 py-2 font-semibold">
                Chair
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {programChair}
              </td>
              <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
              <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
            </tr>
            {/* Members */}
            {Array.from({ length: 4 }).map((_, index) => {
              // Max 4 members (3 for thesis, 4 for dissertation)
              const panelist = thesisData?.panelists?.[index]; // Assuming panelists array includes chair and members
              if (panelist && panelist.user.role !== "chair") {
                // Only render if it's a member
                return (
                  <tr key={`member-${index}`}>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">
                      Members ({index + 1})
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {getFullUserName(panelist.user)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                    <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                  </tr>
                );
              }
              return (
                <tr key={`member-placeholder-${index}`}>
                  <td className="border border-gray-300 px-3 py-2 font-semibold">
                    Members ({index + 1})
                  </td>
                  <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                  <td className="border border-gray-300 px-3 py-2">&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-16">
        <div>
          <p className="font-bold mb-4">Recommending Approval:</p>
          <div className="text-center w-full h-6 mb-1">{programChair}</div>
          <p className="text-xs text-center">(Program Chairperson)</p>
        </div>
        <div>
          <p className="font-bold mb-4">Approved by:</p>
          <div className="text-center w-full h-6 mb-1">{dean}</div>
          <p className="text-xs text-center">(Dean/Director)</p>
        </div>
      </div>
    </div>
  );
};

export default FormEleven;
