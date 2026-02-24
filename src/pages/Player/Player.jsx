import React, { useState, useEffect } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
const {id} = useParams();
const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjkwN2Q4MDEyOWI5YjdjMjE4ZmFjMjgwOThlNThlZiIsIm5iZiI6MTc3MTgwNTA2Mi4xNDMwMDAxLCJzdWIiOiI2OTliOTk4NmYwNzc5NmU0OTdiMjk1NmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o0Jnv6jyL7v4obfICw0yutklGjFIHsVEwh7fCulgCRU'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
     <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
    {apiData.key ? (
    <iframe width='90%' height='90%'
    src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
    ) : (
      <div className="loading">Loading...</div>
    )}
     <div className="player-info">
      <p>{apiData.published_at?.slice(0,10) || 'N/A'}</p>
      <p>{apiData.name || 'Loading...'}</p>
      <p>{apiData.type || 'N/A'}</p>
     </div>
    </div>
  )
}

export default Player