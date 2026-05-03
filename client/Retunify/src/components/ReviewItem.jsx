import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ReviewItem.css'; 

const ReviewItem = ({ albumCover, albumName, rating, reviewText }) => {
    return (
        <Paper elevation={0} className="review-item-container">
            {/* Left side: Album Cover */}
            <Box 
                component="img"
                src={albumCover}
                className="review-album-img"
                alt={albumName}
            />

            {/* Middle: Information and Content */}
            <Box className="review-info-wrapper">
                
                <Box className="boxed-label">
                    <Typography variant="subtitle1" className="album-name-text">
                        {albumName}
                    </Typography>
                </Box>
                
                <Box className="boxed-label">
                    <Typography variant="body2" className="rating-text">
                        {rating}/5
                    </Typography>
                </Box>
                
                <Box className="review-text-box">
                    <Typography variant="body2" className="review-body-text">
                        {reviewText}
                    </Typography>
                </Box>
            </Box>

            {/* Right side: Action Buttons */}
            <Stack spacing={3} className="action-stack">
                <Button 
                    variant="contained" 
                    size="small"
                    startIcon={<EditIcon />}
                    className="edit-btn-mui"
                >
                    EDIT
                </Button>
                <Button 
                    variant="contained" 
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    className="delete-btn-mui"
                >
                    DELETE
                </Button>
            </Stack>
        </Paper>
    );
};

export default ReviewItem;