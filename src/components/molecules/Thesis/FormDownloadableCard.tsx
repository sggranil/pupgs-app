"use client";

import PDFDownloadWrapper from "@/components/wrapper/PDFExportWrapper";

interface FormCardProps {
    itemNo: number;
    title: string;
    document: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const FormDownloadableCard: React.FC<FormCardProps> = ({ itemNo, title, document, header, footer }) => {
    return (
        <div className="w-[300] md:w-full flex-shrink-0 m-1">
            <div className="h-[110] md:h-full flex items-center justify-between py-3 bg-white rounded-md">
                <div>
                    <h4 className="text-sm font-semibold text-textPrimary mb-2">TWD Form No. {itemNo}: {title}</h4>
                    <PDFDownloadWrapper
                        header={header}
                        content={document}
                        footer={footer}
                        fileName={`${title}`}
                        buttonLabel={`Download Form #${itemNo}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default FormDownloadableCard;