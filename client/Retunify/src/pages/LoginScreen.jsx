import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
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

            localStorage.setItem('userId', data.id);
            localStorage.setItem('username', data.username);
            navigate("/home");

        } catch (err) {
            console.error("API_ERROR", err);
        }
    };

    return (
        <Box className="login-page-container">
            <Container maxWidth="xs">
                <Paper elevation={3} className="login-card-paper">
                    <Typography variant="h3" className="login-title">
                        Retunify
                    </Typography>
                    
                    <Box component="form" className="login-form">
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="login-input"
                            InputLabelProps={{ style: { color: '#888' } }}
                        />
                        
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="login-input"
                        />

                        <Button 
                            variant="contained"
                            fullWidth
                            onClick={authenticate}
                            className="login-submit-btn"
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginScreen;