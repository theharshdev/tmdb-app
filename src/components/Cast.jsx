import { useNavigate } from "react-router-dom";

function Cast({ actor }) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  const viewCast = useNavigate();

  return (
    <div
      onClick={() => viewCast(`/cast/${actor.id}/${actor.name.toLowerCase().replaceAll(" ", "-")}`)}
      className="cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : "https://placehold.net/avatar-3.svg"}
          alt={actor.name}
          className={`${actor.profile_path ? "object-cover" : "object-contain opacity-30"} w-full h-32`}
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
  );
}

export default Cast;
