import { useUserStore } from "@/store/userStore";

export const Pagination = () => {
  const page = useUserStore((state) => state.page);
  const limit = useUserStore((state) => state.limit);
  const totalPages = useUserStore((state) => state.totalPages);
  const setPage = useUserStore((state) => state.setPage);
  const setLimit = useUserStore((state) => state.setLimit);

  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">Página</span>
        <select
          value={limit}
          onChange={(e) => {
            setPage(1); // reinicia la página al cambiar límite
            setLimit(Number(e.target.value));
          }}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Anterior
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
