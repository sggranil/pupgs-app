import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import Modal from "../organisms/Modal";

interface PDFExportWrapperProps {
  fileName: string;
  buttonLabel: string;
  content: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isLandscape?: boolean;
}

const PDFExportWrapper: React.FC<PDFExportWrapperProps> = ({
  fileName,
  buttonLabel,
  content,
  header,
  footer,
  isLandscape,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = async () => {
    if (!printRef.current) return;

    const originalStyle = printRef.current.style.height;
    printRef.current.style.height = "auto";

    try {
      const [mainCanvas, headerCanvas, footerCanvas] = await Promise.all([
        html2canvas(printRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          windowHeight: printRef.current.scrollHeight,
        }),
        headerRef.current
          ? html2canvas(headerRef.current, {
              scale: 2,
              useCORS: true,
              backgroundColor: "#ffffff",
            })
          : Promise.resolve(null),
        footerRef.current
          ? html2canvas(footerRef.current, {
              scale: 2,
              useCORS: true,
              backgroundColor: "#ffffff",
            })
          : Promise.resolve(null),
      ]);

      const pdf = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // DYNAMIC HEIGHT CALCULATION (Prevents Stretching)
      const headerHeight = headerCanvas
        ? (headerCanvas.height * pageWidth) / headerCanvas.width
        : 0;
      const footerHeight = footerCanvas
        ? (footerCanvas.height * pageWidth) / footerCanvas.width
        : 20; // Default padding if no footer

      const usableHeight = pageHeight - headerHeight - footerHeight;

      const imgWidth = mainCanvas.width;
      const imgHeight = mainCanvas.height;
      const ratio = pageWidth / imgWidth;
      const scaledTotalHeight = imgHeight * ratio;
      const totalPages = Math.ceil(scaledTotalHeight / usableHeight);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        const sourceY = (i * usableHeight) / ratio;
        const sliceHeight = usableHeight / ratio;

        const pageCanvas = document.createElement("canvas");
        const ctx = pageCanvas.getContext("2d");

        pageCanvas.width = imgWidth;
        pageCanvas.height = sliceHeight;

        ctx!.fillStyle = "#ffffff";
        ctx!.fillRect(0, 0, imgWidth, sliceHeight);
        ctx!.drawImage(
          mainCanvas,
          0,
          sourceY,
          imgWidth,
          sliceHeight,
          0,
          0,
          imgWidth,
          sliceHeight
        );

        const pageImg = pageCanvas.toDataURL("image/jpeg", 1.0);

        // Add Header
        if (headerCanvas) {
          const headerData = headerCanvas.toDataURL("image/png");
          pdf.addImage(headerData, "PNG", 0, 0, pageWidth, headerHeight);
        }

        // Add Content
        pdf.addImage(pageImg, "JPEG", 0, headerHeight, pageWidth, usableHeight);

        // Add Footer
        if (footerCanvas) {
          const footerData = footerCanvas.toDataURL("image/png");
          pdf.addImage(
            footerData,
            "PNG",
            0,
            pageHeight - footerHeight,
            pageWidth,
            footerHeight
          );
        }
      }

      pdf.save(`${fileName}`);
    } finally {
      printRef.current.style.height = originalStyle;
    }
  };

  return (
    <div className="">
      <Modal
        title="Export Document"
        modalType={isLandscape ? "pdf" : "form"}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}>
        <div className="w-full h-[400px] overflow-y-auto border border-gray-200 rounded-md bg-white">
          <div className="bg-white">
            {header && <div ref={headerRef}>{header}</div>}
            <div ref={printRef}>{content}</div>
            {footer && <div ref={footerRef}>{footer}</div>}
          </div>
        </div>

        <button
          className="bg-brand-primary p-2 mt-2 text-white text-sm rounded-md"
          onClick={handleGeneratePdf}>
          {buttonLabel}
        </button>
      </Modal>

      <button
        className="bg-brand-primary text-white px-3 py-2 rounded-md text-sm"
        onClick={() => setModalOpen(true)}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default PDFExportWrapper;
