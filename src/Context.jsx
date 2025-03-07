// Context.js
import React, { useContext, useEffect, useState } from "react";

const API_URL = 'http://www.omdbapi.com/?apikey=56ce1264';
const AppContext = React.createContext();

// Provider function
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("avengers");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setIsLoading(false);
        setIsError({
          show: true,
          msg: data.Error || "No movies found",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError({
        show: true,
        msg: "Something went wrong. Please try again.",
      });
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800);
    
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ 
      isLoading, 
      movie, 
      isError, 
      query, 
      setQuery 
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };