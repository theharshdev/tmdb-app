import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const API_KEY = "1dd802c65ce8e326e942d6a1b3963478";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function CastDetails() {
  const { castId } = useParams();
  const [castDetails, setCastDetails] = useState({});
  const [castCredits, setCastCredits] = useState([]);

  const castDetailEndpoint = `${BASE_URL}/person/${castId}?api_key=${API_KEY}`;
  const castCreditsEndpoint = `${BASE_URL}/person/${castId}/movie_credits?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(castDetailEndpoint)
      .then((res) => res.json())
      .then((data) => setCastDetails(data));

    fetch(castCreditsEndpoint)
      .then((res) => res.json())
      .then((data) => setCastCredits(data.cast));
  }, [castId]);

  if (!castDetails || !castCredits) return <p className="text-center pt-20 text-4xl">Loading...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-32">
      <div className="grid md:grid-cols-3 gap-10">
        {/* 👤 LEFT: Profile */}
        <div className="flex flex-col gap-6">
          <img
            src={`${IMAGE_BASE}${castDetails.profile_path}`}
            alt={castDetails.name}
            className="w-full rounded-2xl shadow-xl object-cover"
          />
          {/* Basic Info */}
          <div className="bg-zinc-900 p-5 rounded-2xl space-y-3 text-sm">
            <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
            <p>
              <span className="text-gray-400">Known For:</span> {castDetails.known_for_department}
            </p>
            <p>
              <span className="text-gray-400">Gender:</span>{" "}
              {castDetails.gender === 1 ? "Female" : castDetails.gender === 2 ? "Male" : "Not specified"}
            </p>
            <p>
              <span className="text-gray-400">Birthday:</span> {castDetails.birthday || "—"}
            </p>
            <p>
              <span className="text-gray-400">Place:</span> {castDetails.place_of_birth || "—"}
            </p>
          </div>
          {/* External Links */}
          <div className="flex gap-3 flex-wrap">
            {castDetails.homepage && (
              <a
                href={castDetails.homepage}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium"
              >
                Website
              </a>
            )}
            {castDetails.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${castDetails.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-medium"
              >
                IMDb
              </a>
            )}
          </div>
        </div>
        {/* 📖 RIGHT: Content */}
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Name */}
          <div>
            <h1 className="text-4xl font-bold">{castDetails.name}</h1>
            <p className="text-gray-400 mt-1">{castDetails.known_for_department}</p>
          </div>
          {/* Biography */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Biography</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {castDetails.biography || "No biography available."}
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl text-center">
              <p className="text-gray-400 text-xs">Department</p>
              <p className="text-lg font-semibold">{castDetails.known_for_department}</p>
            </div>
            <div className="bg-zinc-900 p-4 rounded-xl text-center">
              <p className="text-gray-400 text-xs">Gender</p>
              <p className="text-lg font-semibold">
                {castDetails.gender === 1 ? "Female" : castDetails.gender === 2 ? "Male" : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center text-4xl font-semibold mt-20">{`Top movies of ${castDetails.name}`}</h3>
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 mt-10">
          {castCredits.map((castCredit) => (
            <MovieCard key={castCredit.id} movie={castCredit} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CastDetails;
