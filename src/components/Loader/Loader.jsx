function Loader() {
    return (
        <div className="flex flex-col items-start ml-[100px] w-[500px]">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col gap-4 mb-5 pb-10 border-b border-gray-700 animate-pulse">
                    {/* Profile and Username Placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-700 rounded-full w-10 h-10"></div>
                        <div className="bg-gray-600 h-4 w-24 rounded"></div>
                    </div>
                    {/* Image Placeholder */}
                    <div className="bg-gray-700 w-[468px] h-[468px] rounded-md"></div>
                    {/* Likes and Comments Placeholder */}
                    <div className="flex gap-6 items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-600 w-6 h-6 rounded-full"></div>
                            <div className="bg-gray-600 h-4 w-12 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-600 w-6 h-6 rounded-full"></div>
                            <div className="bg-gray-600 h-4 w-12 rounded"></div>
                        </div>
                    </div>
                    {/* Caption Placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-600 h-4 w-20 rounded"></div>
                        <div className="bg-gray-600 h-4 w-full rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Loader;