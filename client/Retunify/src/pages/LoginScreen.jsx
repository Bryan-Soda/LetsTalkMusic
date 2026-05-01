import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './styles/LoginScreen.css';

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const api = "http://127.0.0.1:5000";

    const authenticate = async () => {
        if (!name || !pass) {
            alert("Username and password are required");
            return;
        }
        try {
            const response = await fetch(`${api}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, password: pass }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Login failed");
                return;
            }

            // Persist user session data
            localStorage.setItem('userId', data.id);
            localStorage.setItem('username', data.username);

            navigate("/home");

        } catch (err) {
            console.error("API_ERROR", err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">  
                <h1>Retunify</h1>              
                <div className="input-group">
                    <label>Username</label>
                    <input 
                        type="text"
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter username"
                    /> 
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={pass} 
                        onChange={e => setPass(e.target.value)} 
                        placeholder="Enter password"
                    /> 
                </div>

                <button className="login-btn" onClick={authenticate}>Login</button>
            </div>
        </div>
    );
};

export default LoginScreen;