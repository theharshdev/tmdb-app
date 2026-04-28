import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      const endpoint = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results || []);
          setTotalPages(data.total_pages);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to load movies");
          setLoading(false);
        });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return () => clearTimeout(delayDebounce);
    }, 400);
  }, [page, query]);

  return (
    <section className="sm:px-4 px-2">
      <SearchInput query={query} setQuery={setQuery} setPage={setPage} />
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>{loading ? <p className="text-2xl mt-4">Loading movies...</p> : ""}</div>
        <div>{error ? <p className="text-2xl mt-4">{error}</p> : ""}</div>
      </div>
      <div
        className="max-w-6xl mx-auto my-10 lg:columns-5 md:columns-4 sm:columns-3 columns-2
       sm:gap-4 gap-2"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
}

export default MoviesList;
