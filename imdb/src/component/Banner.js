import React , {useState , useEffect} from 'react'
import axios from "axios";

function Banner() {

  const [movie , setMovie]=useState({});
  useEffect(function(){
        
        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=c7e702c834edd3e7a294a21f4f501eaa").then((res)=>{
              
        
              setMovie(res.data.results[19]);
        

        })
  },[])
  return (
   <>


   

      <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.poster_path})]  h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center`}>
          <div className=' text-xl md:text-3xl text-white p-4 bg-gray-900 w-full flex justify-center bg-opacity-50 '>
              {movie.title}
          </div>
      </div> 
   </>
  )
}

export default Banner