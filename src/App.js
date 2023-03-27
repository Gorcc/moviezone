import React from "react";
import MovieCard from "./MovieCard";
import popularSearches from "./popularSearches";
import "./App.css";
import SearchIcon from "./search.svg";
// 607906a4
const API_URL = "http://www.omdbapi.com?apikey=607906a4";
const random = Math.floor(Math.random() * popularSearches.length);

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  React.useEffect(() => {
    searchMovies(popularSearches[random]);
  }, []);

  return (
    <div className="app">
      <h1>Moviezone</h1>
      <div className="search">
        <input
          placeholder="Search any movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <h2>
        Search results for {searchTerm ? searchTerm : popularSearches[random]}
      </h2>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
