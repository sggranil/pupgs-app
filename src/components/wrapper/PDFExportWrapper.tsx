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

    const [mainCanvas, headerImg, footerImg] = await Promise.all([
      html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      }),
      headerRef.current
        ? html2canvas(headerRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          }).then((c) => c.toDataURL("image/png"))
        : Promise.resolve(null),
      footerRef.current
        ? html2canvas(footerRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          }).then((c) => c.toDataURL("image/png"))
        : Promise.resolve(null),
    ]);

    const imgWidth = mainCanvas.width;
    const imgHeight = mainCanvas.height;

    const pdf = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "px",
      format: "legal",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const headerHeight = headerImg ? (isLandscape ? 85 : 80) : 0;
    const footerHeight = footerImg ? 85 : 20;
    const usableHeight = pageHeight - headerHeight - footerHeight;

    const ratio = pageWidth / imgWidth;
    const scaledTotalHeight = imgHeight * ratio;
    const totalPages = Math.ceil(scaledTotalHeight / usableHeight);

    for (let i = 0; i < totalPages; i++) {
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
      if (i > 0) pdf.addPage();

      if (headerImg) {
        pdf.addImage(headerImg, "PNG", 0, 0, pageWidth, headerHeight);
      }

      pdf.addImage(pageImg, "JPEG", 0, headerHeight, pageWidth, usableHeight);

      if (footerImg) {
        pdf.addImage(
          footerImg,
          "PNG",
          0,
          pageHeight - footerHeight,
          pageWidth,
          footerHeight
        );
      }
    }

    pdf.save(`${fileName}`);
  };

  return (
    <div className="">
      <Modal
        title="Export Document"
        modalType={isLandscape ? "pdf" : "form"}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}>
        <div className="w-full h-[400px] overflow-y-auto border border-gray-200 rounded-md bg-white">
          {header && <div ref={headerRef}>{header}</div>}
          <div ref={printRef}>{content}</div>
          {footer && <div ref={footerRef}>{footer}</div>}
        </div>

        <button
          className="bg-brand-primary p-2 mt-2 text-white text-sm rounded-md"
          onClick={handleGeneratePdf}>
          {buttonLabel}
        </button>
      </Modal>

      <button
        className="underline text-brand-primary text-xs"
        onClick={() => setModalOpen(true)}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default PDFExportWrapper;
