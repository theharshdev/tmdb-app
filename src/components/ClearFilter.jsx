function ClearFilter({ setYear, setGenre, setLanguage, setRating, setPage, setQuery }) {
  return (
    <button
      onClick={() => {
        setGenre("");
        setLanguage("");
        setPage(1);
        setRating("");
        setYear("");
        setQuery("");
      }}
      className="block w-full py-3 px-5 font-medium text-base rounded-xl bg-zinc-600 hover:bg-red-500 transition duration-500"
    >
      Clear All Filters
    </button>
  );
}

export default ClearFilter;
