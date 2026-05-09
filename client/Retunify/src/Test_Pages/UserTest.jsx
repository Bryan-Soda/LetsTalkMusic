import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const UserTest = () => {

    const api = "http://127.0.0.1:5000";
    const location = useLocation();
    const userID = location.state?.id; //gaters id from login page's navigate portion
    const [artists, setArtists] = useState([])
    const [userReviews, setUserReviews] = useState([])

    const getArtists = async () =>{
      try{
        const response = await fetch(`${api}/artists`);
        const data = await response.json();
        if(!response.ok){
          console.error("ERROR", data);
          return;
        }
        console.log("SUCCESS", data);
        console.log(userID)
        setArtists(data);
      }
      catch(err){
        console.error("API error",err);
      }
    }
    const getUserReviews = async () =>{
      try{
        const response  = await fetch(`${api}/reviews/user/${userID}`);
        const data = await response.json();
        if(!response.ok){
          console.error("ERROR", data);
          return;
        }
        console.log("SUCCESS", data);
        setUserReviews(data);
      }
      catch(err){
        console.error("API ERROR", err);
      }
    }

  return (
    <div>
        <h1>USER PAGE USER PAGE</h1>
        <button onClick={getArtists}>Get Artists</button>
        <ul>
          {artists.map((a, index)=>(
            <li key={index}>
              Name: {a.artist_name} | Genre: {a.genre} 
            </li>
          ))}
        </ul>
        <br/>
        <button onClick={getUserReviews}>Get Your Reviews!</button>
        <ul>
          {userReviews.map((rev,index)=>(
            <li key={index}>
              Album: {rev.album_title} | Review: {rev.review} | Rating: {rev.rating}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default UserTest