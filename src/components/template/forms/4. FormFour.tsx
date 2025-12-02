import { Thesis } from "@/interface/thesis.interface";

interface FormFourProps {
  thesisData: Thesis | null;
  dean: string | null;
}

const FormFour: React.FC<FormFourProps> = ({ thesisData, dean }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full px-16 py-8 font-inter bg-white shadow-lg rounded-lg mx-auto text-sm leading-normal flex flex-col">
      {" "}
      {/* Changed text-xs to text-sm */}
      <h1 className="text-center font-bold text-base mb-6 uppercase flex-shrink-0">
        {" "}
        {/* Changed text-sm to text-base */}
        Thesis/Dissertation Adviser Appointment and Acknowledgement Form
      </h1>
      <div className="mb-6 flex-shrink-0">
        <p className="border-b border-black w-48 text-left pb-3">
          {formattedDate}
        </p>
        <p className="text-sm mt-1">(Date)</p>{" "}
        {/* Changed text-xs to text-sm */}
      </div>
      <div className="mb-6 flex-shrink-0">
        <p className="border-b border-black w-64 text-left pb-3">
          {thesisData?.adviser?.user.prefix || ""}{" "}
          {thesisData?.adviser?.user.first_name}{" "}
          {thesisData?.adviser?.user.last_name}{" "}
          {thesisData?.adviser?.user.ext_name || ""}
        </p>
        <p className="text-sm mt-1">(Name of Faculty)</p>{" "}
        {/* Changed text-xs to text-sm */}
      </div>
      <p className="mb-3 flex-shrink-0">Sir/Madam:</p>
      <p className="text-justify indent-8 mb-4 flex-shrink-0">
        You have been favorably recommended by the Program Chairperson to
        Supervise the following thesis/dissertation paper:
      </p>
      <div className="overflow-x-auto mb-6 flex-shrink-0">
        <table className="min-w-full border border-gray-300 table-auto">
          <tbody className="bg-white">
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Thesis/Dissertation Title:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.thesis_title || ""}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Name of Proponent:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.student?.user.first_name || ""}{" "}
                {thesisData?.student?.user.middle_name
                  ? thesisData.student.user.middle_name + " "
                  : ""}{" "}
                {thesisData?.student?.user.last_name || ""}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Program:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.student?.user.program || ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-6 flex-shrink-0">
        Kindly confirm your acceptance of this endorsement. Thank you very much.
      </p>
      <p className="mb-3 flex-shrink-0">Truly yours,</p>
      <div className="my-8 flex justify-start">
        <div className="text-right">
          <div className="inline-block w-64 border-b border-black mb-1 flex justify-center">
            <span className="text-center">{dean}</span>
          </div>
          <div className="inline-block w-64 flex justify-center">
            <span className="text-sm m-0 p-0 mb-1">Dean/Director</span>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-black mb-6 h-2 flex-shrink-0">
        &nbsp;
      </div>
      <p className="text-justify indent-8 mb-4 flex-grow">
        I hereby read the attached thesis/dissertation manuscript and I accept
        my appointment as Thesis/Dissertation Adviser. I commit to supervise the
        Student throughout the thesis/dissertation writing process and provide
        the necessary guidance by being available for periodic meetings and
        draft/performance reviews of his/her written work.
      </p>
      <p className="text-justify indent-8 mb-8 flex-shrink-0">
        I further certify that this assignment is within the allowable number of
        advisees based on the Graduate School Guidelines on Thesis/Dissertation
        Writing.
      </p>
      <div className="overflow-x-auto mb-8 flex-shrink-0">
        <table className="min-w-full border border-gray-300 table-auto">
          <tbody className="bg-white">
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Thesis/Dissertation Title:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.thesis_title || ""}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Name of Proponent:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.student?.user.first_name || ""}{" "}
                {thesisData?.student?.user.middle_name
                  ? thesisData.student.user.middle_name + " "
                  : ""}{" "}
                {thesisData?.student?.user.last_name || ""}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold border border-gray-300 w-1/3">
                Program:
              </td>
              <td className="px-3 py-2 border border-gray-300">
                {thesisData?.student?.user.program || ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="border-b border-black w-72 inline-block text-center pb-1">
          {thesisData?.adviser?.user.prefix || ""}{" "}
          {thesisData?.adviser?.user.first_name}{" "}
          {thesisData?.adviser?.user.last_name}{" "}
          {thesisData?.adviser?.user.ext_name || ""}
        </p>
        <p className="text-sm p-0">
          (Signature over Printed Name of Thesis/Dissertation Adviser)
        </p>{" "}
        {/* Changed text-xs to text-sm */}
      </div>
      <div className="text-right mt-4 flex-shrink-0">
        <p className="border-b border-black w-48 inline-block text-left pb-1">
          {formattedDate}
        </p>
        <p className="text-sm mt-1">Date:</p>
      </div>
    </div>
  );
};

export default FormFour;
