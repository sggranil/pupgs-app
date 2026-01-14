const AttachmentCardSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-gray-100 animate-pulse h-20 rounded-md"></div>
          <div className="bg-gray-100 animate-pulse h-20 rounded-md"></div>
        </div>
    )
}

export default AttachmentCardSkeleton;