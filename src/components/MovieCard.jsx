const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  return (
    <div className="break-inside-avoid sm:mb-4 mb-2 flex flex-col gap-3 text-sm">
      <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} className="rounded-lg block w-full" />
      <h3 className="text-xl font-medium">{movie.title}</h3>
      <p>{movie.release_date}</p>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
}

export default MovieCard;
