export const CartSkeleton = () => {
  return (
    <div className="min-h-screen py-8 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-40 mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side (Cart Items) */}
          <div className="lg:w-2/3 space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side (Summary) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="h-5 bg-gray-200 rounded w-1/2" />
              {[...Array(4)].map((_, i) => (
                <div className="flex justify-between" key={i}>
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
              <div className="h-10 bg-gray-300 rounded w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
