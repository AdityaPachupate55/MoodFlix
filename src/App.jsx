import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovie = async (query='') => {
    setIsLoading(true);
    seterrorMsg("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const reponse = await fetch(endpoint, API_OPTIONS);

      if (!reponse.ok) {
        throw new Error("Falied to load movies");
      }

      const data = await reponse.json();

      if (data.reponse === false) {
        seterrorMsg(data.error || "Failed to fetch movies");
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      seterrorMsg("Error fetching movie");
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">

        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> you'll enjoy
            without hassle
          </h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>
          {isLoading ? (<p className="text-white"><Spinner /></p>):errorMsg?(<p className="text-red-50">{errorMsg}</p>):(
            <ul>
              {movieList.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  );
}

export default App;
