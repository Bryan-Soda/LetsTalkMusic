import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import './styles/LoginScreen.css';

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const api = "http://127.0.0.1:5000";

    const authenticate = async () => {
        setError('');

        if (!name || !pass) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await fetch(`${api}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: name, 
                    password: pass 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed. Please check your credentials.");
                return;
            }

            localStorage.setItem('userId', data.id);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            navigate("/home");

        } catch (err) {
            console.error("API_ERROR:", err);
            setError("Could not connect to the server. Make sure the backend is running.");
        }
    };

    return (
        <Box className="login-page-container">
            <Container maxWidth="sm">
                <Paper elevation={3} className="login-card-paper">
                    <Typography 
                    variant="h3"
                    className="login-title"
                    >
                        LetsTalkMusic!
                    </Typography>
                    
                    <Box component="form" className="login-form">
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="login-input"
                            autoComplete="username"
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
                            autoComplete="current-password"
                            InputLabelProps={{ style: { color: '#888' } }}
                        />

                        {/* Flex container to place buttons side-by-side */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Button 
                                variant="contained"
                                fullWidth
                                onClick={authenticate}
                                className="login-submit-btn"
                            >
                                Login
                            </Button>
                            
                            <Button 
                                variant="outlined"
                                fullWidth
                                onClick={() => navigate("/create-account")}
                                sx={{ 
                                    display: 'flex', gap: 2, mt: 1,
                                    color: '#17b350', 
                                    borderColor: '#17b350',
                                    fontWeight: 'bold',
                                    '&:hover': { 
                                        borderColor: '#17b350', 
                                        backgroundColor: 'rgba(0, 229, 68, 0.05)' 
                                    }
                                }}
                            >
                                Create Account
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginScreen;