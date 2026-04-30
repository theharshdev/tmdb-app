import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} | Movies`;
    }
  }, [movie]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p className="text-center pt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
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
            className="w-60 h-auto rounded-2xl shadow-2xl"
          />
          {/* Details */}
          <div className="flex flex-col gap-4">
            {/* Title */}
            <h1 className="text-4xl font-bold">{movie.title}</h1>
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
                <span key={g.id} className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
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
                <p>{movie.production_countries.map((c) => c.name).join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400">Popularity</p>
                <p>{movie.popularity}</p>
              </div>
            </div>
            {/* Production Companies */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Production</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex justify-center flex-col gap-2">
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
                  <span key={lang.iso_639_1} className="bg-zinc-700 px-3 py-1 rounded text-sm">
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
    </div>
  );
}

export default MovieDetails;
