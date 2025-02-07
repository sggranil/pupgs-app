"use client";

interface FormCardProps {
    itemNo: number;
    title: string;
    link: string;
    data?: any;
}

const FormDownloadableCard: React.FC<FormCardProps> = ({ itemNo, title, link, data }) => {
    return (
        <div className="w-[300] md:w-full flex-shrink-0 m-1">
            <div className="h-[110] md:h-full flex items-center justify-between p-3 bg-white rounded-md shadow-md">
                <div>
                    <h4 className="text-sm font-semibold text-textPrimary">TWD Form No. {itemNo}: {title}</h4>
                    <a className="text-blue-500 underline text-sm" href={link} target="_blank" rel="noopener noreferrer">
                        Download Form {itemNo}
                    </a>
                </div>
            </div>
        </div>

    );
}

export default FormDownloadableCard;