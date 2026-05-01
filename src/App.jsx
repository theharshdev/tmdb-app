import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/css/App.css";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import CastDetails from "./components/CastDetails";
import RecentPlaying from "./components/RecentPlaying";
import About from "./components/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="bg-zinc-800 w-full h-full min-h-dvh text-white ">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/popular" replace />} />
            <Route path="/popular" element={<MoviesList />} />
            <Route path="/recent" element={<RecentPlaying />} />
            <Route path="/about" element={<About />} />
            <Route path="/movie/:id/:slug" element={<MovieDetails />} />
            <Route path="/cast/:castId/:castSlug" element={<CastDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
