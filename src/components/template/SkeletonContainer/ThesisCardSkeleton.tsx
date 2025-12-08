import ThesisCardSkeleton from "@/components/molecules/Skeleton/ThesisCardSkeleton";

const ThesisCardContainerSkeleton: React.FC = () => {
  return (
    <div className="w-full mt-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 py-2">
        <ThesisCardSkeleton />
        <ThesisCardSkeleton />
      </div>
    </div>
  );
};

export default ThesisCardContainerSkeleton;
