function SearchInput({ query, setQuery, setPage, setYear, setGenre, setLanguage, setRating }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search movies..."
        className="block py-3 px-5 border focus:border-green-500 transition duration-500 border-zinc-500 rounded-xl w-full outline-0"
        value={query}
        onChange={(e) => {
          setPage(1);
          setGenre("");
          setYear("");
          setLanguage("");
          setRating("");
          setQuery(e.target.value);
        }}
      />
    </>
  );
}

export default SearchInput;
