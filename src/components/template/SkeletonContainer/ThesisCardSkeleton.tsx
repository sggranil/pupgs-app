import ThesisCardSkeleton from "@/components/molecules/Skeleton/ThesisCardSkeleton";

const ThesisCardContainerSkeleton: React.FC = () => {
  return (
    <div className="w-full mt-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 py-2">
        <ThesisCardSkeleton />
        <ThesisCardSkeleton />
        <ThesisCardSkeleton />
      </div>
    </div>
  );
};

export default ThesisCardContainerSkeleton;
