import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Stack, Rating, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ReviewItem.css'; 

// Added album_id and onUpdate to the props
const ReviewItem = ({ album_id, albumCover, albumName, rating, reviewText, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentRating, setCurrentRating] = useState(rating);
    const [currentReviewText, setCurrentReviewText] = useState(reviewText);
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = currentReviewText.length > 150;

    const handleEditClick = () => {
        // If we are currently editing and click the button, it means we are SAVING
        if (isEditing) {
            onUpdate(album_id, currentRating, currentReviewText);
        }
        setIsEditing(!isEditing);
    };

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        setOpenDeleteDialog(false);
        onDelete();
    }

    return (
        <Paper elevation={0} className="review-item-container">
            <Box 
                component="img"
                src={albumCover}
                className="review-album-img"
                alt={albumName}
                sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover' : { transform: 'scale(1.05)' }
                }}
            />

            <Box className="review-info-wrapper">
                
                <Box className="boxed-label">
                    <Typography variant="subtitle1" className="album-name-text">
                        {albumName}
                    </Typography>
                </Box>
                
                <Box className="boxed-label" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                        name="dynamic-rating"
                        value={currentRating}
                        onChange={(event, newValue) => {setCurrentRating(newValue);}}
                        precision={0.5}
                        readOnly={!isEditing}
                        size="small"
                    />
                    <Typography variant="body2" className="rating-text">
                        {currentRating}/5
                    </Typography>
                </Box>
                
                <Box className="review-text-box">
                    {isEditing ? (
                        <TextField
                            multiline
                            fullWidth
                            minRows={2}
                            variant="outlined"
                            size="small"
                            value={currentReviewText}
                            onChange={(e) => setCurrentReviewText(e.target.value)}
                            inputProps= {{ className: "review-body-text" }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'black',
                                    color: '#1ED760',
                                    padding: '10px',
                                    '& fieldset': {
                                        borderColor: '#444',
                            
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1ED760',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1ED760'
                                    }
                                }
                            }}
                        />
                    ) : (
                        <Box>
                            <Collapse in={isExpanded || !isLongText} collapsedSize={45}>
                                <Typography variant="body2" className="review-body-text">
                                    {currentReviewText}
                                </Typography>
                            </Collapse>
                            {isLongText && (
                                <Typography
                                    variant="caption"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    sx={{
                                        color: '#1ED760',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        display: 'inline-block',
                                        marginTop: '8px',
                                        '&:hover': { textDecoration: 'underline'}
                                    }}
                                >
                                    {isExpanded ? "Show Less" : "... Read More"}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>

            <Stack spacing={3} className="action-stack">
                <Button 
                    variant={isEditing ? "outlined" : "contained"} 
                    size="small"
                    startIcon={<EditIcon />}
                    className="edit-btn-mui"
                    onClick={handleEditClick}
                >
                    {isEditing ? "SAVE" : "EDIT"}
                </Button>
                <Button 
                    variant="contained" 
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    className="delete-btn-mui"
                    onClick={handleDeleteClick}
                >
                    DELETE
                </Button>
            </Stack>
            <Dialog open={openDeleteDialog} onClose={handleCloseDialog} PaperProps={{
                sx: {
                    backgroundColor: '#111111',
                    color: 'white',
                    border: '1px solid #333',
                    borderRadius: 3
                }
            }}
            >
                <DialogTitle sx={{ color: '#1ED760', fontWeight: 'bold' }}>
                    Delete Review?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#000' }}>
                        Are you sure you want to delete your review for <strong>{albumName}</strong>? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '16px' }}>
                    <Button onClick={handleCloseDialog} sx={{ color: '#1ED760' }}>
                        CANCEL
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error">
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ReviewItem;