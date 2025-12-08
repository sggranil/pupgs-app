import AttachmentCardSkeleton from "@/components/molecules/Skeleton/AttachmentCarSkeleton";

const ThesisInfoLoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center md:flex-row gap-4 w-full lg:px-32 py-4 px-8">
     <div className="flex flex-col w-full md:w-1/2 gap-4">
      <div className="bg-white px-4 pt-2 pb-3 rounded-md">
        <div className="pb-1 pt-2">
          <div className="bg-gray-100 animate-pulse h-8 w-3/4 rounded-md"></div>
          <div className="bg-gray-100 animate-pulse h-6 w-1/4 rounded-md mt-2"></div>
        </div>
      </div>
      <div className="bg-white px-4 pt-2 pb-3 rounded-md">
        <div className="pb-1 pt-2">
          <div className="bg-gray-100 animate-pulse h-6 w-1/4 rounded-md"></div>
        </div>
          <AttachmentCardSkeleton />
      </div>

     </div>

      <div className="bg-white w-full md:w-1/3 px-4 pt-2 pb-3 rounded-md">
        <div className="pb-3 pt-2">
          <div className="bg-gray-100 animate-pulse h-6 w-3/4 rounded-md"></div>
        </div>
        <div className="grid grid-row-1 gap-2">
          <div className="w-full h-32 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="w-full h-32 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ThesisInfoLoadingState;
