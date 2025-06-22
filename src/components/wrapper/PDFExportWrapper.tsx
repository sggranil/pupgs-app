"use client";

import { ReactElement } from "react";
import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";

interface PDFDownloadWrapperProps {
  document: ReactElement<DocumentProps>;
  fileName?: string;
  buttonLabel?: string;
  className?: string;
}

export default function PDFDownloadWrapper({
  document,
  fileName = "document.pdf",
  buttonLabel = "Download PDF",
  className = "bg-bgPrimary text-white text-sm p-2 rounded-md",
}: PDFDownloadWrapperProps) {
  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName}
      className={className}
    >
      {({ loading }) => (loading ? "Preparing PDF..." : buttonLabel)}
    </PDFDownloadLink>
  );
}
