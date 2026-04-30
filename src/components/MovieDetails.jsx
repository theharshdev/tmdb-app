import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} | Movies`;
    }
  }, [movie]);

  const endpoint = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const castEndPoint = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(castEndPoint)
      .then((res) => res.json())
      .then((data) => setCast(data.cast));
  }, [id]);

  console.log(endpoint);
  console.log(castEndPoint);

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
      {/* Cast */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-4xl text-center font-semibold mb-8">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {cast
            .sort((a, b) => a.order - b.order) // main cast first
            .slice(0, 18)
            .map((actor) => (
              <div
                key={actor.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE}${actor.profile_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={actor.name}
                    className="w-full h-32 object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                    <p className="text-xs text-gray-300">Popularity: {actor.popularity?.toFixed(1)}</p>
                    <p className="text-xs text-gray-400">Known for: {actor.known_for_department}</p>
                  </div>
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">{actor.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">as {actor.character || "Unknown"}</p>
                  {/* Extra meta */}
                  <div className="flex justify-between items-center mt-1 text-[10px] text-gray-500">
                    <span>#{actor.order + 1}</span>
                    <span>{actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "—"}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
