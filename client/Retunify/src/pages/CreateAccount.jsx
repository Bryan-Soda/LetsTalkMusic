import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import './styles/LoginScreen.css'; 

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    const api = "http://127.0.0.1:5000";

    const handleCreateAccount = async () => {
        setError('');
        if (!username || !pass) {
            setError("Username and password are required");
            return;
        }

        try {
            const response = await fetch(`${api}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: pass })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to create account");
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                navigate("/"); 
            }, 2000);

        } catch (err) {
            console.error("API_ERROR", err);
            setError("Could not connect to the server.");
        }
    };

    return (
        <Box className="login-page-container">
            <Container maxWidth="sm">
                <Paper elevation={3} className="login-card-paper">
                    <Typography variant="h3" className="login-title">
                        Join LetsTalkMusic!
                    </Typography>
                    
                    <Box component="form" className="login-form">
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mb: 2 }}>Account created! Redirecting...</Alert>}

                        <TextField
                            label="Choose Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            InputLabelProps={{ style: { color: '#888' } }}
                        />
                        
                        <TextField
                            label="Choose Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="login-input"
                            InputLabelProps={{ style: { color: '#888' } }}
                        />

                        <Button 
                            variant="contained"
                            fullWidth
                            onClick={handleCreateAccount}
                            className="login-submit-btn"
                        >
                            Create Account
                        </Button>

                        <Button 
                            fullWidth
                            onClick={() => navigate("/")}
                            sx={{ mt: 1, color: '#8a8a8a', fontSize: '0.8rem' }}
                        >
                            Already have an account? Log In
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CreateAccount;