function About() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-32 text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About This App</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A modern movie discovery platform built using React and the TMDB API. Explore trending movies, search your
          favorites, and dive deep into cast, trailers, and detailed insights.
        </p>
      </div>
      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">🎬 Movie Discovery</h3>
          <p className="text-sm text-gray-400">Browse popular, top-rated, and upcoming movies with real-time data.</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">🔍 Smart Search</h3>
          <p className="text-sm text-gray-400">Instantly search movies with live filtering and debounced input.</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">🎭 Detailed Info</h3>
          <p className="text-sm text-gray-400">View cast, trailers, ratings, and full movie details in one place.</p>
        </div>
      </div>
      {/* Tech Stack */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["React", "React Router", "Tailwind CSS", "TMDB API", "JavaScript"].map((tech) => (
            <span key={tech} className="bg-zinc-800 px-4 py-2 rounded-full text-sm text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          This application is designed to provide users with a seamless experience for discovering movies and TV shows.
          It integrates real-time data from TMDB and presents it in a clean, responsive, and user-friendly interface.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Users can explore trending titles, filter content based on genres, ratings, language, and release year, and
          view detailed information including cast profiles, trailers, and production details.
        </p>
        <p className="text-gray-300 leading-relaxed">
          The project focuses on performance, UI/UX design, and modern frontend development practices, making it a
          strong portfolio project for showcasing real-world application development skills.
        </p>
      </div>
    </section>
  );
}

export default About;
