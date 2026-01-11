"use client";

import PDFDownloadWrapper from "@/components/wrapper/PDFExportWrapper";

interface FormCardProps {
  itemNo?: number;
  title: string;
  isLandscape?: boolean | false;
  document: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const FormDownloadableCard: React.FC<FormCardProps> = ({
  itemNo,
  title,
  document,
  header,
  footer,
  isLandscape,
}) => {
  return (
    <div className="w-[250] p-2 flex-shrink-0 flex flex-col items-center justify-evenly ring-1 ring-black ring-opacity-10 transition-opacity rounded-sm">
      <div>
        <h4 className="text-xs font-semibold text-content-primary mb-2">
          TWD Form No. {itemNo}: {title}
        </h4>
        <PDFDownloadWrapper
          header={header}
          content={document}
          footer={footer}
          fileName={`${title}`}
          buttonLabel={`Download Form #${itemNo}`}
          isLandscape={isLandscape}
        />
      </div>
    </div>
  );
};

export default FormDownloadableCard;
