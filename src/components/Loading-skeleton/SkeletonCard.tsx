export const SkeletonCard = () => {
  return (
    <div className="container min-h-[300px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white p-4 rounded-lg shadow-md"
          >
            <div className="bg-gray-300 h-40 w-full mb-4 rounded" />
            <div className="h-4 bg-gray-300 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
