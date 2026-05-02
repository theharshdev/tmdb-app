import { NavLink } from "react-router-dom";

function Footer() {
  const activeClass = ({ isActive }) =>
    `cursor-pointer hover:font-semibold hover:text-green-500 ${isActive ? "text-green-500 font-semibold" : ""}`;

  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">My Movies</h2>
          <p className="text-sm leading-relaxed">
            A modern movie discovery platform built using React and the TMDB
            API. Explore trending movies, search your favorites, and dive deep
            into cast, trailers, and detailed insights.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-medium mb-3">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <NavLink to="/popular" className={activeClass}>
              Popular
            </NavLink>
            <NavLink to="/recent" className={activeClass}>
              Recents
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              About
            </NavLink>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-medium mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>🎬 Movie Discovery</li>
            <li>🔍 Smart Search</li>
            <li>🎭 Detailed Info</li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm">
          <h3 className="text-white font-medium mb-2">Tech Stack</h3>
          <p>React • React Router • Tailwind CSS • TMDB API • JavaScript</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm leading-relaxed">
          <h3 className="text-white font-medium mb-2">Project Overview</h3>
          <p>
            This application provides a seamless experience for discovering
            movies and TV shows using real-time TMDB data. Users can explore
            trending titles, filter by genres, ratings, language, and release
            year, and view detailed information including cast profiles,
            trailers, and production details.
          </p>
          <p className="mt-2">
            The project focuses on performance, clean UI/UX, and modern frontend
            development practices, making it a strong portfolio showcase.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 text-center text-xs py-4 text-zinc-500">
        © {new Date().getFullYear()} My Movies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
