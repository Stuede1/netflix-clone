import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjkwN2Q4MDEyOWI5YjdjMjE4ZmFjMjgwOThlNThlZiIsIm5iZiI6MTc3MTgwNTA2Mi4xNDMwMDAxLCJzdWIiOiI2OTliOTk4NmYwNzc5NmU0OTdiMjk1NmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o0Jnv6jyL7v4obfICw0yutklGjFIHsVEwh7fCulgCRU'
    }
  };

  // Endpoint mapping for different categories
  const getEndpoint = (category) => {
    const endpoints = {
      'now_playing': 'movie/now_playing',
      'popular': 'movie/popular',
      'top_rated': 'movie/top_rated',
      'upcoming': 'movie/upcoming',
      'trending_today': 'trending/movie/day',
      'trending_week': 'trending/movie/week',
      'action': 'discover/movie?with_genres=28',
      'comedy': 'discover/movie?with_genres=35',
      'drama': 'discover/movie?with_genres=18',
      'horror': 'discover/movie?with_genres=27',
      'romance': 'discover/movie?with_genres=10749',
      'sci_fi': 'discover/movie?with_genres=878',
      'animation': 'discover/movie?with_genres=16',
      'thriller': 'discover/movie?with_genres=53'
    };
    return endpoints[category] || 'movie/now_playing';
  };



  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const endpoint = getEndpoint(category);
    const url = category && category.includes('discover') || category && category.includes('trending') 
      ? `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`
      : `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`;
    
    fetch(url, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || res.results || []))
      .catch(err => console.error(err));
    
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, [category]);
  return (
    <div className="title-cards">
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key= {index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
