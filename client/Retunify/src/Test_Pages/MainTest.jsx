import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const MainTest = () => {
    // TEST
    const api = "http://127.0.0.1:5000";
    const navigate = useNavigate()
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');

    const makeUser = async () =>{
        if(!username || !pass){
            console.error("Username and password is required");
            return;
        }
        try{
            const response = await fetch(`${api}/user`,{
                method: "POST",
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify({username: username, password: pass})
            });
            const data = await response.json();
            if(!response.ok){
                console.error("ERROR", data);
                return;
            }
            console.log("SUCCESS", data);
        }
        catch(err){
            console.error("API ERROR", err);
        }
    }
    const verifyUser = async () =>{
        if(!username || !pass){
            console.error("Username and password is required");
            return;
        }
        try{
            const response = await fetch(`${api}/auth`,{
                method: "POST",
                headers:{"Content-Type":"application/json",},
                body: JSON.stringify({username: username, password: pass})
            });
            const data = await response.json();
            if(!response.ok){
                console.error("ERROR", data);
                return;
            }
            console.log("SUCCESS", data);  
            
            if(data.role == "user"){
                navigate("/user-page", {state: {id:data.id}}); //passes id
            }
        }
        catch(err){
            console.error("API ERROR", err)
        }
    }
  return (
    <div>
        <h1>MAKE A NEW ACCOUNT PAGE</h1>
        <br/>
        <label>Username:</label>
        <input value={username} onChange={e => setUsername(e.target.value)}/>
        <br/>
        <label>Password:</label>
        <input value={pass} onChange={e => setPass(e.target.value)}/>
        <br/>
        <button onClick={makeUser} >Create Account</button>
        <br/>
        <button onClick={verifyUser}> Login </button>
    </div>
  )
}

export default MainTest