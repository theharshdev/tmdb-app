import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}/${movie.title.toLowerCase().replaceAll(" ", "-")}`)}
      className="group relative rounded-2xl overflow-hidden shadow-lg bg-zinc-900 hover:scale-[1.03] transition duration-300 break-inside-avoid sm:mb-4 mb-2 cursor-pointer"
    >
      <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-90"></div>
      <div className="absolute top-2 right-2 bg-white/40 backdrop-blur-2xl text-black text-xs font-bold px-2 py-1 rounded-lg shadow">
        {movie.vote_average?.toFixed(1)}
      </div>
      <div className="absolute bottom-0 p-4 flex flex-col gap-2 w-full">
        <h3 className="text-2xl leading-none font-semibold text-white line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-gray-300 leading-none">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
        </p>
        <p className="text-xs text-gray-300 line-clamp-3 opacity-0 group-hover:opacity-100 transition duration-300">
          {movie.overview || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
