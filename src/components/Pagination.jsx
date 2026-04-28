function Pagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-6 my-12">
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed! cursor-pointer py-3 px-6 text-sm border rounded-xl border-zinc-500 font-medium"
      >
        Previous Page
      </button>
      <span className="text-lg font-medium">{page}</span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
        className="disabled:opacity-50 disabled:cursor-not-allowed! cursor-pointer py-3 px-6 text-sm border rounded-xl border-zinc-500 font-medium"
      >
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
