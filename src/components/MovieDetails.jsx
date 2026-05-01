import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Cast from "./Cast";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} | Movies`;
    }
  }, [movie]);

  const endpoint = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const castEndPoint = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  const trailerEndPoint = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
  const similarMoviesEndPoint = `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(castEndPoint)
      .then((res) => res.json())
      .then((data) => setCast(data.cast));

    fetch(trailerEndPoint)
      .then((res) => res.json())
      .then((data) => setTrailers(data.results));

    fetch(similarMoviesEndPoint)
      .then((res) => res.json())
      .then((data) => setSimilarMovies(data.results));
  }, [id]);

  const filteredTrailers = trailers.filter((t) => t.type === "Trailer");

  console.log(endpoint);
  console.log(castEndPoint);
  console.log(trailerEndPoint);

  if (!movie) return <p className="text-center pt-20 text-4xl">Loading...</p>;

  return (
    <div className="pt-20">
      {/* Backdrop */}
      <div className="relative w-full h-[60vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/70 to-transparent" />
      </div>
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-40 pb-12 relative z-10">
        <div className="flex items-start flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-60 h-auto rounded-2xl shadow-2xl sticky top-28"
          />
          {/* Details */}
          <div className="flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <h2 className="text-4xl font-bold italic">{`Original Title: "${movie.original_title}"`}</h2>
            {/* Tagline */}
            <p className="text-white italic">{movie.tagline}</p>
            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>📅 {movie.release_date}</span>
              <span>⏱ {movie.runtime} min</span>
              <span>
                ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count})
              </span>
            </div>
            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>
            {/* Overview */}
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            {/* Extra Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
              <div>
                <p className="text-gray-400">Language</p>
                <p>{movie.original_language.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p>{movie.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Budget</p>
                <p>${movie.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Revenue</p>
                <p>${movie.revenue.toLocaleString()}</p>
              </div>
              <div> 
                <p className="text-gray-400">Country</p>
                <p>
                  {movie.production_countries.map((c) => c.name).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Popularity</p>
                <p>{movie.popularity}</p>
              </div>
            </div>
            {/* Trailers */}
            <div className="mt-5">
              <h3 className="text-3xl font-medium">Watch Trailer</h3>
              {filteredTrailers.length > 0 ? (
                filteredTrailers
                  .slice(0, 1)
                  .map((trailer) => (
                    <iframe
                      key={trailer.key}
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      className="w-full aspect-video rounded-xl mt-8"
                    />
                  ))
              ) : (
                <p className="text-center py-8 text-xl font-medium">
                  No trailer found
                </p>
              )}
            </div>
            {/* Cast */}
            <div className="mt-5">
              <h2 className="text-3xl font-semibold mb-8">Top Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cast
                  .sort((a, b) => a.order - b.order) // main cast first
                  .slice(0, 18)
                  .map((actor) => (
                    <Cast key={actor.id} actor={actor} />
                  ))}
              </div>
            </div>
            {/* Production Companies */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Production</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex justify-center flex-col gap-2"
                  >
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="w-32 h-20 object-contain bg-white p-3 rounded-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Spoken Languages */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <div className="flex gap-2 flex-wrap">
                {movie.spoken_languages.map((lang) => (
                  <span
                    key={lang.iso_639_1}
                    className="bg-zinc-700 px-3 py-1 rounded text-sm"
                  >
                    {lang.english_name}
                  </span>
                ))}
              </div>
            </div>
            {/* Links */}
            <div className="flex gap-4 mt-6">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-4 py-2 rounded-lg font-medium"
                >
                  Visit Website
                </a>
              )}
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium"
                >
                  IMDb
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Similar Movies */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h3 className="text-center text-3xl font-medium">Similar Movies</h3>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 mt-8">
          {similarMovies.length > 0 ? (
            similarMovies
              .slice(0, 10)
              .map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="text-center py-8 text-xl font-medium">
              Nothing found similar!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
