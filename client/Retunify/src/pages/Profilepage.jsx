import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Divider, Box, Container, Skeleton, Paper, Stack } from '@mui/material';
import ReviewItem from '../components/ReviewItem';
import DefaultAvatar from '../assets/templatePFP.jpg'; 
import '../pages/styles/Profilepage.css'; 
import WeeklyDigest from '../components/WeeklyDigest'

const ProfilePage = () => {
    const username = localStorage.getItem('username') || 'User';
    const userId = localStorage.getItem('userId') || 1; 
    
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    const API_URL = 'http://127.0.0.1:5000';

    // 1. GET REVIEWS ON COMPONENT MOUNT
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_URL}/reviews/user/${userId}`);
                
                if (response.status === 404) {
                    console.log("User not found or no reviews yet.");
                    setReviews([]);
                    setIsLoading(false);
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    
                    const formattedReviews = data.map(item => ({
                        id: item.review_id,
                        album_id: item.album_id, 
                        albumName: item.album_title,
                        rating: item.rating,
                        reviewText: item.review,
                        albumCover: DefaultAvatar 
                    }));
                    
                    setReviews(formattedReviews);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [userId]);

    const amountOfReviews = reviews.length;

    // 2. DELETE API ROUTE
    const handleDeleteReview = async (reviewId, albumId) => {
        try {
            const response = await fetch(`${API_URL}/reviews/${userId}/${albumId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setReviews(reviews.filter(review => review.id !== reviewId));
            } else {
                console.error("Failed to delete review on backend");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }

    // 3. EDIT (PUT) API ROUTE
    const handleUpdateReview = async (albumId, newRating, newReviewText) => {
        try {
            const response = await fetch(`${API_URL}/reviews/${userId}/${albumId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: parseFloat(newRating),
                    review: newReviewText
                })
            });

            if (!response.ok) {
                console.error("Failed to update review on backend");
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }
    }

    return (
        <Container maxWidth="md" className="profile-mui-container">
            <Box className="profile-header-box" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar 
                    src={DefaultAvatar} 
                    className="profile-avatar-mui"
                    sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h4" className="profile-username-text">
                    {username}
                </Typography>
            </Box>

            <Divider className="profile-divider-mui" sx={{ mb: 4 }} />

            <section className='activity-section' style={{ marginBottom: '2rem' }}>
                <Typography variant='h6' className='activity-title-text' sx={{ mb: 2, fontWeight: 700, letterSpacing: 1}}>
                    MY ACTIVITY
                </Typography>
                <WeeklyDigest
                    userName={username}
                    reviewsWritten={amountOfReviews}
                />
            </section>

            <Divider className="profile-divider-mui" sx={{ my:4 }}></Divider>

            <section className="reviews-section">
                <Typography variant="h6" className="reviews-title-text">
                    REVIEWS
                </Typography>
                
                <Box className="reviews-list-container">
                    {isLoading ? (
                        [1, 2].map((n) => (
                            <Paper key={n} elevation={0} className="review-item-container" sx={{ opacity: 0.8, mb: 2 }}>
                                <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2, bgcolor: '#222' }}/>
                                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <Skeleton variant="text" width="40%" height={30} sx={{ bgcolor: '#222', borderRadius: 1}}/>
                                    <Skeleton variant="text" width="20%" height={24} sx={{ bgcolor: '#222', borderRadius: 1}}/>
                                    <Skeleton variant="rectangular" width="100%" height={60} sx={{ bgcolor: '#222', borderRadius: 2}}/>
                                </Box>
                                <Stack spacing={3} sx={{ width: 90}} >
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ borderRadius: 1, bgcolor: '#222' }}/>
                                    <Skeleton variant="rectangular" width="100%" height={30} sx={{ borderRadius: 1, bgcolor: '#222' }}/>
                                </Stack>
                            </Paper>
                        ))
                    ) : reviews.length === 0 ? (
                        <Typography sx={{ color: '#888', mt: 2 }}>No reviews written yet.</Typography>
                    ) : (
                        reviews.map(item => (
                            <ReviewItem
                                key={item.id}
                                {...item}
                                onDelete={() => handleDeleteReview(item.id, item.album_id)}
                                onUpdate={handleUpdateReview}
                            />
                        ))
                    )}
                </Box>
            </section>
        </Container>
    );
};

export default ProfilePage;