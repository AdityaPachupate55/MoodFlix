import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {

  }, []);

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
        </header>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
      </div>
    </main>
  );
}

export default App;
