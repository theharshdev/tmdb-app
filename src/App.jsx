import "./assets/css/App.css";
import MoviesList from "./components/MoviesList";

function App() {
  return (
    <>
      <main className="bg-zinc-800 w-full h-full min-h-dvh overflow-x-hidden text-white ">
        <MoviesList />
      </main>
    </>
  );
}

export default App;
