import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";

function RecentPlaying() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      let endpoint = "";

      if (query) {
        endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      } else {
        endpoint = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
      }

      console.log(`The Endpoint URL: ${endpoint}`);

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
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [page, query]);

  return (
    <section className="sm:px-4 px-2 max-w-6xl mx-auto py-32">
      <div className="max-w-md mx-auto">
        <SearchInput query={query} setQuery={setQuery} setPage={setPage} />
      </div>
      {loading ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 animate-pulse sm:mt-6 mt-2">
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
          <div className="h-96 rounded-xl bg-zinc-700" />
        </div>
      ) : (
        ""
      )}
      {error ? <p className="text-2xl text-center mb-4">{error}</p> : ""}
      {movies.length === 0 && !loading ? (
        <p className="text-2xl text-center mb-4">Nothing Found!</p>
      ) : (
        ""
      )}
      <div className="lg:columns-5 md:columns-3 columns-2 sm:gap-4 gap-2 sm:mt-6 mt-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  );
}

export default RecentPlaying;
