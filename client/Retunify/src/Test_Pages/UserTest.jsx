import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const UserTest = () => {

    const api = "http://127.0.0.1:5000";
    const [artists, setArtists] = useState([])


    const getArtists = async () =>{
      try{
        const response = await fetch(`${api}/artists`)
        const data = await response.json();
        if(!response.ok){
          console.error("ERROR", data);
          return;
        }
        console.log("SUCCESS", data);
        setArtists(data);
      }
      catch(err){
        console.error("API error",err);
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
    </div>
  )
}

export default UserTest