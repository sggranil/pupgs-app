import React from "react";
import { Thesis } from "@/interface/thesis.interface";
import { formatStatus } from "@/utilities/StringFormatter";

interface HonorariumRates {
  ADVISER: {
    PROPOSAL: number;
    FINAL: number;
  };
  PANELIST: {
    PROPOSAL: number;
    FINAL: number;
  };
  SECRETARY: {
    PROPOSAL: number;
    FINAL: number;
  };
}

interface ThesisHonorariumProps {
  thesesData: Thesis[] | null;
  honorariumRates: HonorariumRates;
}

const formatCurrency = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Php 0.00";
  }
  // Added Intl.NumberFormat for comma separators
  return `Php ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const ThesisHonorarium: React.FC<ThesisHonorariumProps> = ({
  thesesData,
  honorariumRates: rates,
}) => {
  if (!thesesData || thesesData.length === 0) {
    return (
      <div className="w-full h-full px-16 py-8 text-center text-xl font-semibold">
        No Thesis data available for Honorarium Request.
      </div>
    );
  }

  // 1. DATE RANGE LOGIC
  const getDefenseDateRange = () => {
    const dates = thesesData
      .map((t) =>
        t.defense_schedule ? new Date(t.defense_schedule).getTime() : null
      )
      .filter((d): d is number => d !== null)
      .sort((a, b) => a - b);

    if (dates.length === 0) return "No date set";

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);

    if (firstDate.toDateString() === lastDate.toDateString()) {
      return firstDate.toLocaleDateString("en-US", options);
    }

    // Format: January 31 - February 10, 2026
    return `${firstDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })} - ${lastDate.toLocaleDateString("en-US", options)}`;
  };

  // 2. OVERALL SUMMARY LOGIC (Multiplies based on occurrences)
  const overallSummaryMap = new Map<
    number,
    { faculty: any; roles: Map<string, number>; total: number }
  >();

  thesesData.forEach((thesis) => {
    // Determine rate based on specific thesis phase
    const isFinal = thesis.defense_phase === "final_defense";
    const currentRateKey = isFinal ? "FINAL" : "PROPOSAL";

    const processRole = (faculty: any, roleName: string, rateValue: number) => {
      if (!faculty) return;
      const existing = overallSummaryMap.get(faculty.id) || {
        faculty,
        roles: new Map<string, number>(),
        total: 0,
      };

      // Increment count for this role and add to total
      const currentRoleCount = existing.roles.get(roleName) || 0;
      existing.roles.set(roleName, currentRoleCount + 1);
      existing.total += rateValue;

      overallSummaryMap.set(faculty.id, existing);
    };

    processRole(thesis.adviser, "Adviser", rates.ADVISER[currentRateKey]);
    thesis.panelists?.forEach((p) =>
      processRole(p, "Panelist", rates.PANELIST[currentRateKey])
    );
    processRole(thesis.secretary, "Secretary", rates.SECRETARY[currentRateKey]);
  });

  const overallSummaryList = Array.from(overallSummaryMap.values());
  const uniqueFacultyMembers = overallSummaryList.map((item) => item.faculty);

  return (
    <div className="w-full h-full px-16">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `,
        }}
      />

      {/* 1. OFFICIAL REQUEST LETTER */}
      <div className="px-10 py-2 leading-relaxed print:break-after-page">
        <p className="mb-8 text-base">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="text-base space-y-0">
          <p className="m-0 py-[3px] leading-none font-bold">
            MANUEL M. MUHI, D. Tech.
          </p>
          <p className="m-0 py-[3px] leading-none">University President</p>
          <p className="m-0 py-[3px] leading-none">This University</p>
        </div>

        <div className="py-4">
          <div className="flex align-top justify-start">
            <p>Through:</p>
            <div className="block ml-16">
              <div className="text-base space-y-0">
                <p className="m-0 py-[3px] leading-none font-bold">
                  DR. EMANUEL C. DE GUZMAN
                </p>
                <p className="m-0 py-[3px] leading-none">
                  Vice President for Academic Affairs
                </p>
              </div>
              <div className="text-base space-y-0 pt-6">
                <p className="m-0 py-[3px] leading-none font-bold">
                  Prof. ALBERTO C. GUILLO
                </p>
                <p className="m-0 py-[3px] leading-none">
                  Vice President for Planning and Finance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="leading-none py-4">Dear President Muhi:</p>
          <p className="text-justify leading-tight mb-4">
            May I respectfully request the release of payment for the following
            faculty members who served as panelists during the oral defense
            activities held on{" "}
            <span className="font-bold">{getDefenseDateRange()}</span>.
          </p>

          <div className="w-full flex justify-center">
            <table className="border border-gray-400 w-[400px]">
              <thead className="bg-green-100">
                <tr>
                  <th className="border border-gray-400 px-4 py-2 text-center align-middle">
                    List of Faculty Members
                  </th>
                </tr>
              </thead>
              <tbody>
                {uniqueFacultyMembers?.map((member, index) => (
                  <tr key={`faculty-${index}`}>
                    <td className="border border-gray-400 px-4 py-2 pt-0 align-middle">
                      {index + 1}. {member?.user?.first_name}{" "}
                      {member?.user?.last_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-justify leading-tight py-2">
            The dedication and effort of these faculty members in supporting our
            students’ academic progress are highly commendable. I certify that
            they performed their duties as panelists diligently and outside
            their official time.
          </p>

          <p className="text-justify leading-tight py-2">
            Thank you for your attention and usual support. Should you require
            any further information or documentation, please do not hesitate to
            contact us through local 203.
          </p>
          <p className="text-justify leading-tight py-2">Respectfully yours,</p>
          <div className="text-base space-y-0 py-6">
            <p className="m-0 py-[3px] leading-none font-bold">
              DR. BENILDA ELEONOR V. COMENDADOR
            </p>

            <p className="m-0 py-[3px] leading-none">Chairperson</p>
          </div>

          <p className="text-justify leading-tight py-2">Noted by:</p>

          <div className="text-base space-y-0 py-6">
            <p className="m-0 py-[3px] leading-none font-bold">
              ASSOC. MARIANNE C. ORTIZ
            </p>

            <p className="m-0 py-[3px] leading-none">IODE Director</p>
          </div>

          <div className="text-base space-y-0 py-6">
            <p className="m-0 py-[3px] leading-none font-bold">
              DR. RUDOLF ANTHONY A. LACERNA
            </p>

            <p className="m-0 py-[3px] leading-none">Executive Director</p>
          </div>
        </div>
      </div>

      {/* 2. INDIVIDUAL PROPONENT REPORTS */}
      {thesesData?.map((thesis, index) => {
        const relevantPhase = thesis.defense_phase || "final_defense";
        const currentRateKey =
          relevantPhase === "final_defense" ? "FINAL" : "PROPOSAL";

        const latestReceipt = thesis.thesis_receipts
          ? [...thesis.thesis_receipts]
              .filter((r) => r.receipt_name.includes(relevantPhase))
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )[0]
          : null;

        const roleEntries: { role: string; faculty: any; rate: number }[] = [];
        if (thesis.adviser)
          roleEntries.push({
            role: "Adviser",
            faculty: thesis.adviser,
            rate: rates.ADVISER[currentRateKey],
          });
        thesis.panelists?.forEach((p) =>
          roleEntries.push({
            role: "Panelist",
            faculty: p,
            rate: rates.PANELIST[currentRateKey],
          })
        );
        if (thesis.secretary)
          roleEntries.push({
            role: "Secretary",
            faculty: thesis.secretary,
            rate: rates.SECRETARY[currentRateKey],
          });

        return (
          <div
            key={index}
            className="block mb-12 last:mb-0 break-inside-avoid print:break-before-page">
            <div className="w-full flex justify-center">
              <h3 className="underline uppercase font-semibold mb-4 text-center">
                {formatStatus(relevantPhase)} - Proponent {index + 1}
              </h3>
            </div>
            <div className="overflow-x-auto w-full mb-4">
              <table className="w-full table-auto border border-gray-300">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="px-4 py-2 pt-0 text-left w-1/4">Program</th>
                    <th className="px-4 py-2 pt-0 text-left w-1/4">
                      Name of Proponent
                    </th>
                    <th className="px-4 py-2 pt-0 text-left w-1/2">
                      Title of Thesis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 pt-0">
                      {thesis.student?.user?.program}
                    </td>
                    <td className="px-4 py-2 pt-0">
                      {thesis.student?.user?.first_name}{" "}
                      {thesis.student?.user?.last_name}
                    </td>
                    <td className="px-4 py-2 pt-0">{thesis.thesis_title}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-2 pt-0 font-semibold text-right">
                      Date and Time:
                    </td>
                    <td className="px-4 py-2 pt-0">
                      {thesis.defense_schedule
                        ? new Date(thesis.defense_schedule).toLocaleString(
                            "en-US",
                            {
                              timeZone: "Asia/Manila",
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )
                        : "To be Announced"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-2 pt-0 font-semibold text-right">
                      Proof of Payment:
                    </td>
                    <td className="px-4 py-2 pt-0">
                      {latestReceipt
                        ? `OR #${latestReceipt.or_number}`
                        : "No Receipt Found"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center mb-4">
              <div className="w-full border p-4 flex items-center justify-center">
                {latestReceipt?.attachment ? (
                  latestReceipt.attachment.endsWith(".pdf") ? (
                    <p className="text-center text-gray-500">
                      PDF preview not supported in capture. Please download or
                      view separately.
                    </p>
                  ) : (
                    <img
                      src={latestReceipt.attachment}
                      alt="Proof of Payment Attachment"
                      className="w-1/2"
                      crossOrigin="anonymous"
                    />
                  )
                ) : (
                  <p className="text-center text-red-500 font-medium">
                    Proof of Payment Attachment is missing or not found for this
                    phase.
                  </p>
                )}
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="min-w-full border border-gray-300 table-auto">
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      className="border border-gray-300 text-center text-base font-semibold bg-gray-200 pt-0 pb-2">
                      EVALUATION COMMITTEE HONORARIUM (Defense Summary)
                    </th>
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 text-left pt-0 pb-2 px-4">
                      Role
                    </th>
                    <th className="border border-gray-300 text-left pt-0 pb-2 px-4">
                      Name
                    </th>
                    <th className="border border-gray-300 text-center pt-0 pb-2 px-4">
                      Rate
                    </th>
                    <th className="border border-gray-300 text-right pt-0 pb-2 px-4">
                      Amount Due
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roleEntries.map((entry, rIndex) => (
                    <tr key={rIndex}>
                      <td className="border border-gray-300 pt-0 pb-2 px-4 text-sm font-semibold">
                        {entry.role}
                      </td>
                      <td className="border border-gray-300 pt-0 pb-2 px-4">
                        {entry.faculty.user?.first_name}{" "}
                        {entry.faculty.user?.last_name}
                      </td>
                      <td className="border border-gray-300 pt-0 pb-2 px-4 text-center text-xs">
                        {formatCurrency(entry.rate)}
                      </td>
                      <td className="border border-gray-300 pt-0 pb-2 px-4 text-right font-bold bg-yellow-50">
                        {formatCurrency(entry.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* 3. OVERALL SUMMARY AT THE BOTTOM */}
      <div className="pt-6 border-t-2 border-dashed border-gray-400 print:break-before-page">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-300 table-auto">
            <thead>
              <tr>
                <th
                  colSpan={3}
                  className="border border-gray-300 text-center text-lg font-bold bg-gray-800 text-white pt-2 pb-2">
                  OVERALL EVALUATION COMMITTEE HONORARIUM SUMMARY
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-left pt-0 pb-2 px-4">
                  Faculty Name
                </th>
                <th className="border border-gray-300 text-left pt-0 pb-2 px-4">
                  Roles & Occurrences
                </th>
                <th className="border border-gray-300 text-right pt-0 pb-2 px-4">
                  Total Amount Due
                </th>
              </tr>
            </thead>
            <tbody>
              {overallSummaryList.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 pt-0 pb-2 px-4">
                    {item.faculty.user?.first_name}{" "}
                    {item.faculty.user?.last_name}
                  </td>
                  <td className="border border-gray-300 pt-0 pb-2 px-4 text-sm italic">
                    {Array.from(item.roles.entries())
                      .map(([role, count]) => `${role} (${count}x)`)
                      .join(", ")}
                  </td>
                  <td className="border border-gray-300 pt-0 pb-2 px-4 text-right font-bold bg-yellow-50">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThesisHonorarium;
