import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import { auth } from "../auth/firebase";
import { toastPleaseNotify } from "../helpers/ToastNotify";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
//  console.log(API_KEY);
const API_DATA = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const Main = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useContext(AuthContext);
 
  console.log(currentUser);
  console.log(auth.currentUser)


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  console.log(movies);
  const currentPosts = movies.slice(firstPostIndex, lastPostIndex);
  console.log(...currentPosts);








   useEffect(() => {
     getData(API_DATA);
   }, []);

   const getData = (API) => {
     setLoading(true);
     axios
       .get(API)
       .then((res) => setMovies(res.data.results))
       .then((err) => console.log(err))
       .finally(() => setLoading(false));
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchMovie && currentUser) {
      getData(API_SEARCH + searchMovie);
    } else if (!currentUser) {
      // alert("Please log in");
       toastPleaseNotify("Please log in");
    } else if(currentUser) {
      // alert("Please enter a movie title");
       toastPleaseNotify("Please enter a movie title");
    }
  };
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="d-flex justify-content-center flex-wrap">
        {loading ? (
          <div className="spinner-border  text-primary m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          currentPosts?.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
      <Pagination
        totalPosts={movies.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Main;
