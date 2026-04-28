function SearchInput({ query, setQuery, setPage }) {
  return (
    <>
      <input
        type="text"
        placeholder="Search movies..."
        className="block py-3 px-5 border-2 focus:border-green-500 transition duration-500 border-zinc-500 rounded-xl max-w-xl w-full outline-0 mx-auto mt-12"
        value={query}
        onChange={(e) => {
          setPage(1);
          setQuery(e.target.value);
        }}
      />
    </>
  );
}

export default SearchInput;
