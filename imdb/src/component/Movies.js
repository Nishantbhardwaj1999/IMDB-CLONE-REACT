import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  let [pageNumber, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [fav, setFav] = useState([]);
  function goAhead() {
    setPage(pageNumber + 1);
  }
  function goBehind() {
    if (pageNumber > 1) {
      setPage(pageNumber - 1);
    }
  }
  useEffect(
    function () {

      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c7e702c834edd3e7a294a21f4f501eaa&page=${pageNumber}`
        )
        .then((res) => {
          setMovies(res.data.results);
          let oldfav = localStorage.getItem("Imdb");
          oldfav=JSON.parse(oldfav) || [];
          setFav([...oldfav])
        });
    },
    [pageNumber]
  );

  let add = (movie) => {
    let newArray = [...fav, movie];
    setFav([...newArray]);
    console.log(newArray);
    localStorage.setItem("Imdb", JSON.stringify(newArray));
  };
  let del =(movie)=>{
    let newArray=fav.filter((m)=>m.id!=movie.id)
    setFav([...newArray]);
    localStorage.setItem("Imdb", JSON.stringify(newArray));

  }

  return (
    <>
      <div className="mb-8">
        <div className="mt-8 mb-8 font-bold text-xl md:text-3xl text-center">
          Trending Movies
        </div>
        {movies.length === 0 ? (
          <div className="flex justify-center">
            <Oval heigth="100" width="100" color="grey" ariaLabel="loading" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => {
              return (
                <div
                  className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.poster_path})] md:h-[30vh] md:w-[250px] h-[25vh] w-[180px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out relative duration-300`}
                  onMouseEnter={() => {
                    setHover(movie.id);
                  }}
                  onMouseLeave={() => {
                    setHover("");
                  }}
                >
                  {hover == movie.id && (
                    <>
                    {
                          !fav.find((m)=>m.id==movie.id)? <div
                        className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl cursor-pointer text-xl "
                        onClick={() => add(movie)}
                      >
                        🥰
                      </div>:  <div
                        className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl cursor-pointer text-xl "
                        onClick={() => del(movie)}
                      >
                        ❌{" "}
                      </div>
                    }
                      
                     
                    </>
                  )}

                  <div className="w-full bg-gray-900 text-white py-2 text-center rounded-b-xl">
                    {movie.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Pagination page={pageNumber} goAhead={goAhead} goBehind={goBehind} />
    </>
  );
}

export default Movies;
