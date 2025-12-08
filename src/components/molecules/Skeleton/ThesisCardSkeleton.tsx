const ThesisCardSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg overflow-hidden animate-pulse">
        <div className="w-full h-32 bg-gray-200 rounded-md"></div>

        <div className="px-4 py-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ThesisCardSkeleton;
