"use client";

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

    return `${firstDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })} - ${lastDate.toLocaleDateString("en-US", options)}`;
  };

  const overallSummaryMap = new Map<
    number,
    {
      faculty: any;
      breakdown: Map<string, { count: number; rate: number }>;
      total: number;
    }
  >();

  thesesData.forEach((thesis) => {
    const isFinal = thesis.defense_phase === "final_defense";
    const phaseLabel = isFinal ? "Final" : "Proposal";
    const rateKey = isFinal ? "FINAL" : "PROPOSAL";

    const processRole = (
      faculty: any,
      roleBase: "ADVISER" | "PANELIST" | "SECRETARY",
      displayLabel: string
    ) => {
      if (!faculty) return;
      const rateValue = rates[roleBase][rateKey];
      const compositeKey = `${displayLabel} (${phaseLabel})`;

      const existing = overallSummaryMap.get(faculty.id) || {
        faculty,
        breakdown: new Map<string, { count: number; rate: number }>(),
        total: 0,
      };

      const currentDetails = existing.breakdown.get(compositeKey) || {
        count: 0,
        rate: rateValue,
      };
      existing.breakdown.set(compositeKey, {
        count: currentDetails.count + 1,
        rate: rateValue,
      });

      existing.total += rateValue;
      overallSummaryMap.set(faculty.id, existing);
    };

    processRole(thesis.adviser, "ADVISER", "Adviser");
    thesis.panelists?.forEach((p) => processRole(p, "PANELIST", "Panelist"));
    processRole(thesis.secretary, "SECRETARY", "Secretary");
  });

  const overallSummaryList = Array.from(overallSummaryMap.values());
  const uniqueFacultyMembers = overallSummaryList.map((item) => item.faculty);

  return (
    <div className="w-full h-full px-16">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page { size: A4; margin: 20mm; }
          body { -webkit-print-color-adjust: exact; }
        }
      `,
        }}
      />

      <div className="px-10 py-2 leading-relaxed print:break-after-page">
        <p className="mb-8 text-base">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="text-base space-y-0">
          <p className="m-0 py-[3px] font-bold leading-none">
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
                <p className="m-0 py-[3px] font-bold leading-none">
                  DR. EMANUEL C. DE GUZMAN
                </p>
                <p className="m-0 py-[3px] leading-none">
                  Vice President for Academic Affairs
                </p>
              </div>
              <div className="text-base space-y-0 pt-6">
                <p className="m-0 py-[3px] font-bold leading-none">
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
          <p className="py-4 leading-none">Dear President Muhi:</p>
          <p className="mb-4 text-justify leading-tight">
            May I respectfully request the release of payment for the following
            faculty members who served as panelists during the oral defense
            activities held on{" "}
            <span className="font-bold">{getDefenseDateRange()}</span>.
          </p>

          <div className="flex w-full justify-center">
            <table className="w-[400px] border border-gray-400">
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
          <p className="py-2 text-justify leading-tight">
            The dedication and effort of these faculty members in supporting our
            students’ academic progress are highly commendable. I certify that
            they performed their duties as panelists diligently and outside
            their official time.
          </p>

          <p className="py-2 text-justify leading-tight">
            Thank you for your attention and usual support. Should you require
            any further information or documentation, please do not hesitate to
            contact us through local 203.
          </p>
          <p className="py-2 text-justify leading-tight">Respectfully yours,</p>
          <div className="space-y-0 py-6 text-base">
            <p className="m-0 py-[3px] font-bold leading-none">
              DR. BENILDA ELEONOR V. COMENDADOR
            </p>
            <p className="m-0 py-[3px] leading-none">Chairperson</p>
          </div>

          <p className="py-2 text-justify leading-tight">Noted by:</p>

          <div className="space-y-0 py-6 text-base">
            <p className="m-0 py-[3px] font-bold leading-none">
              ASSOC. MARIANNE C. ORTIZ
            </p>
            <p className="m-0 py-[3px] leading-none">IODE Director</p>
          </div>

          <div className="space-y-0 py-6 text-base">
            <p className="m-0 py-[3px] font-bold leading-none">
              DR. RUDOLF ANTHONY A. LACERNA
            </p>
            <p className="m-0 py-[3px] leading-none">Executive Director</p>
          </div>
        </div>
      </div>

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
            className="mb-12 block last:mb-0 break-inside-avoid print:break-before-page">
            <div className="flex w-full justify-center">
              <h3 className="mb-4 text-center font-semibold uppercase underline">
                {formatStatus(relevantPhase)} - Proponent {index + 1}
              </h3>
            </div>
            <div className="mb-4 w-full overflow-x-auto">
              <table className="w-full table-auto border border-gray-300">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="w-1/4 px-4 py-2 pt-0 text-left">Program</th>
                    <th className="w-1/4 px-4 py-2 pt-0 text-left">
                      Name of Proponent
                    </th>
                    <th className="w-1/2 px-4 py-2 pt-0 text-left">
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
                      className="px-4 py-2 pt-0 text-right font-semibold border-b border-gray-300">
                      Date, Time and Room:
                    </td>
                    <td className="px-4 py-2 pt-0 border-b border-gray-300">
                      {thesis.defense_schedule
                        ? `${new Date(thesis.defense_schedule).toLocaleString(
                            "en-US",
                            {
                              timeZone: "Asia/Manila",
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )} - ${thesis.room?.name || "No Room Assigned"}`
                        : "To be Announced"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-2 pt-0 text-right font-semibold">
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

            <div className="mb-4 flex items-center justify-center">
              <div className="flex w-full items-center justify-center border p-4">
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
                  <p className="text-center font-medium text-red-500">
                    Proof of Payment Attachment is missing or not found for this
                    phase.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr>
                    <th
                      colSpan={4}
                      className="border border-gray-300 bg-gray-200 pb-2 pt-0 text-center text-base font-semibold">
                      EVALUATION COMMITTEE HONORARIUM (Defense Summary)
                    </th>
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 pb-2 pt-0 text-left">
                      Role
                    </th>
                    <th className="border border-gray-300 px-4 pb-2 pt-0 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 pb-2 pt-0 text-center">
                      Rate
                    </th>
                    <th className="border border-gray-300 px-4 pb-2 pt-0 text-right">
                      Amount Due
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roleEntries.map((entry, rIndex) => (
                    <tr key={rIndex}>
                      <td className="border border-gray-300 px-4 pb-2 pt-0 text-sm font-semibold">
                        {entry.role}
                      </td>
                      <td className="border border-gray-300 px-4 pb-2 pt-0">
                        {entry.faculty.user?.first_name}{" "}
                        {entry.faculty.user?.last_name}
                      </td>
                      <td className="border border-gray-300 px-4 pb-2 pt-0 text-center text-xs">
                        {formatCurrency(entry.rate)}
                      </td>
                      <td className="border border-gray-300 bg-yellow-50 px-4 pb-2 pt-0 text-right font-bold">
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

      <div className="border-t-2 border-dashed border-gray-400 pt-6 print:break-before-page">
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr>
                <th
                  colSpan={4}
                  className="border border-gray-300 bg-gray-800 pb-2 pt-2 text-center text-lg font-bold text-white">
                  OVERALL EVALUATION COMMITTEE HONORARIUM SUMMARY
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 pb-2 pt-0 text-left">
                  Faculty Name
                </th>
                <th className="border border-gray-300 px-4 pb-2 pt-0 text-left">
                  Roles & Occurrences
                </th>
                <th className="border border-gray-300 px-4 pb-2 pt-0 text-center">
                  Breakdown of Computation
                </th>
                <th className="border border-gray-300 px-4 pb-2 pt-0 text-right">
                  Total Amount Due
                </th>
              </tr>
            </thead>
            <tbody>
              {overallSummaryList.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-4 pb-2 pt-0 font-semibold">
                    {item.faculty.user?.first_name}{" "}
                    {item.faculty.user?.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 pb-2 pt-0 text-sm italic">
                    {Array.from(item.breakdown.entries())
                      .map(
                        ([rolePhase, details]) =>
                          `${rolePhase} (x${details.count})`
                      )
                      .join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 pb-2 pt-0 text-xs text-center text-gray-600">
                    {Array.from(item.breakdown.entries())
                      .map(
                        ([_, details]) =>
                          `(${formatCurrency(details.rate)} × ${details.count})`
                      )
                      .join(" + ")}
                  </td>
                  <td className="border border-gray-300 bg-yellow-50 px-4 pb-2 pt-0 text-right font-bold">
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
