"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ThesisReceipt, Thesis } from "@/interface/thesis.interface";
import ThesisHonorarium from "@/components/template/forms/ThesisHonorarium";
import PageHeader from "@/components/template/forms/component/PageHeader";
import PageFooter from "@/components/template/forms/component/PageFooter";
import PDFExportWrapper from "@/components/wrapper/PDFExportWrapper";
import { useAllThesis } from "@/hooks/thesis";

interface ThesisReceiptsProps extends Thesis {
  receipt?: ThesisReceipt;
}

interface HonorariumRates {
  ADVISER: { PROPOSAL: number; FINAL: number };
  PANELIST: { PROPOSAL: number; FINAL: number };
  SECRETARY: { PROPOSAL: number; FINAL: number };
}

const DEFAULT_HONORARIUM__RATES: HonorariumRates = {
  ADVISER: { PROPOSAL: 3750.0, FINAL: 5000.0 },
  PANELIST: { PROPOSAL: 2500.0, FINAL: 2500.0 },
  SECRETARY: { PROPOSAL: 625.0, FINAL: 1250.0 },
};

export default function ThesisHonorariumPage() {
  const { data: allThesisData, isLoading } = useAllThesis();
  const listAllData = (allThesisData?.data as ThesisReceiptsProps[]) || null;

  // 1. Updated state to handle a range
  const today = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState({
    start: today,
    end: today,
  });

  const [filteredTheses, setFilteredTheses] = useState<
    ThesisReceiptsProps[] | null
  >(null);
  const [customRates, setCustomRates] = useState<HonorariumRates>(
    DEFAULT_HONORARIUM__RATES
  );

  const handleRateChange = useCallback(
    (
      role: keyof HonorariumRates,
      phase: "PROPOSAL" | "FINAL",
      value: string
    ) => {
      const rateValue = parseFloat(value);
      const finalRate = isNaN(rateValue) ? 0 : rateValue;

      setCustomRates((prevRates) => ({
        ...prevRates,
        [role]: { ...prevRates[role], [phase]: finalRate },
      }));
    },
    []
  );

  useEffect(() => {
    if (listAllData && dateRange.start && dateRange.end) {
      const filtered = listAllData.filter((thesis) => {
        if (!thesis.defense_schedule) return false;
        const defenseDate = new Date(thesis.defense_schedule)
          .toISOString()
          .split("T")[0];

        return defenseDate >= dateRange.start && defenseDate <= dateRange.end;
      });
      setFilteredTheses(filtered);
    } else {
      setFilteredTheses(null);
    }
  }, [listAllData, dateRange]);

  const isExportDisabled = !filteredTheses || filteredTheses.length === 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 animate-pulse font-medium">
          Loading thesis records...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b space-y-3 print:hidden">
        <div
          className="w-full h-24 rounded-m mb-6"
          style={{ backgroundImage: "url('/maroon-bg.jpg')" }}>
          <div className="flex items-end justify-between h-full">
            <h1 className="text-white text-xl font-bold p-2 pl-4">
              Thesis Honorarium Request
            </h1>
          </div>
        </div>

        <h4 className="font-semibold text-lg">1. Select Defense Date Range:</h4>
        <div className="flex items-center space-x-4 pb-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 uppercase mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 uppercase mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="py-4 space-y-3 border-b print:hidden">
        <h4 className="font-semibold text-lg">
          2. Customize Honorarium Rates (PHP):
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Adviser (Proposal/Pre-Oral):
            </label>
            <input
              type="number"
              value={customRates.ADVISER.PROPOSAL}
              onChange={(e) =>
                handleRateChange("ADVISER", "PROPOSAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Adviser (Final Defense):
            </label>
            <input
              type="number"
              value={customRates.ADVISER.FINAL}
              onChange={(e) =>
                handleRateChange("ADVISER", "FINAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* PANELIST */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Panelist (Proposal/Pre-Oral):
            </label>
            <input
              type="number"
              value={customRates.PANELIST.PROPOSAL}
              onChange={(e) =>
                handleRateChange("PANELIST", "PROPOSAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Panelist (Final Defense):
            </label>
            <input
              type="number"
              value={customRates.PANELIST.FINAL}
              onChange={(e) =>
                handleRateChange("PANELIST", "FINAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* SECRETARY */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Secretary (Proposal/Pre-Oral):
            </label>
            <input
              type="number"
              value={customRates.SECRETARY.PROPOSAL}
              onChange={(e) =>
                handleRateChange("SECRETARY", "PROPOSAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Secretary (Final Defense):
            </label>
            <input
              type="number"
              value={customRates.SECRETARY.FINAL}
              onChange={(e) =>
                handleRateChange("SECRETARY", "FINAL", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="p-3 mt-4 border-t flex justify-end print:hidden">
        {!isExportDisabled ? (
          <PDFExportWrapper
            fileName={`honorarium_request_${dateRange.start}_to_${dateRange.end}`}
            buttonLabel={`Export Honorarium Request (${filteredTheses?.length} Defenses)`}
            header={<PageHeader />}
            content={
              <ThesisHonorarium
                thesesData={filteredTheses!}
                honorariumRates={customRates}
              />
            }
            footer={<PageFooter />}
          />
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-400 text-white text-base font-medium rounded-md shadow-sm cursor-not-allowed">
            Export Honorarium Request (0 Defenses)
          </button>
        )}
      </div>
    </div>
  );
}
