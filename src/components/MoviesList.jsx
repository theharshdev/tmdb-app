import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import Filter from "./Filter";
import ClearFilter from "./ClearFilter";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";

function MoviesList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [language, setLanguage] = useState(searchParams.get("language") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");

  useEffect(() => {
    const params = {};

    if (page > 1) params.page = page;
    if (query) params.query = query;
    if (year) params.year = year;
    if (genre) params.genre = genre;
    if (language) params.language = language;
    if (rating) params.rating = rating;

    setSearchParams(params);
  }, [page, query, year, genre, language, rating]);

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setQuery(searchParams.get("query") || "");
    setYear(searchParams.get("year") || "");
    setGenre(searchParams.get("genre") || "");
    setLanguage(searchParams.get("language") || "");
    setRating(searchParams.get("rating") || "");
  }, [searchParams]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      let endpoint = "";

      if (query) {
        endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      } else if (year || genre || language || rating) {
        endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}${year ? `&primary_release_year=${year}` : ""}${genre ? `&with_genres=${genre}` : ""}${language ? `&with_original_language=${language}` : ""}${rating ? `&vote_average.gte=${rating}` : ""}`;
      } else {
        endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
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
  }, [page, query, year, genre, language, rating]);

  return (
    <section className="sm:px-4 px-2 grid grid-cols-4 gap-6 items-start max-w-6xl mx-auto py-32">
      <div className="col-span-1 w-full sticky top-24 flex flex-col gap-4">
        <SearchInput
          query={query}
          setQuery={setQuery}
          setPage={setPage}
          setYear={setYear}
          setGenre={setGenre}
          setLanguage={setLanguage}
          setRating={setRating}
        />
        <Filter
          year={year}
          genre={genre}
          language={language}
          rating={rating}
          setYear={setYear}
          setGenre={setGenre}
          setLanguage={setLanguage}
          setRating={setRating}
          setPage={setPage}
        />
        <ClearFilter
          setQuery={setQuery}
          setYear={setYear}
          setGenre={setGenre}
          setLanguage={setLanguage}
          setRating={setRating}
          setPage={setPage}
        />
      </div>
      <div className="col-span-3">
        {loading ? (
          <div className="mb-4 break-inside-avoid animate-pulse ">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2">
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
              <div className="h-96 rounded-xl bg-zinc-700" />
            </div>
          </div>
        ) : (
          ""
        )}
        {error ? <p className="text-2xl text-center mb-4">{error}</p> : ""}
        {movies.length === 0 && !loading ? <p className="text-2xl text-center mb-4">Nothing Found!</p> : ""}
        <div className="lg:columns-4 md:columns-3 columns-2 sm:gap-4 gap-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}

export default MoviesList;
