const LoadingThesisDashboard = () => {
    return (
        <div className="flex md:flex-row flex-col gap-4 md:w-1/2 w-full md:px-0 px-8 py-4">
            <div className="bg-white md:w-1/3 w-full ring-1 ring-black ring-opacity-10 p-4 rounded-md">
                <div className="animate-pulse flex flex-col space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    
                    <div className="space-y-2 pt-4">
                        <div className="h-3 bg-gray-100 rounded"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white md:w-2/3 w-full ring-1 ring-black ring-opacity-10 p-4 rounded-md">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-4 animate-pulse">
                        <div className="h-5 bg-gray-300 rounded w-1/4"></div> 
                        <div className="h-8 bg-gray-200 rounded w-32"></div>
                    </div>

                    <div className="space-y-4 pt-2">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex space-x-4 p-4 border border-gray-100 rounded-md animate-pulse">
                                {/* Left side content (Title/Status) */}
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                                </div>
                                {/* Right side content (Action button/Date) */}
                                <div className="h-10 w-24 bg-gray-200 rounded-full"></div> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingThesisDashboard;