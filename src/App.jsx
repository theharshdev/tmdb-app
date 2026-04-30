import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import Header from "./components/Header";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="bg-zinc-800 w-full h-full min-h-dvh text-white ">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <MoviesList />
                </>
              }
            />
            <Route path="/movie/:id/:slug" element={<MovieDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
