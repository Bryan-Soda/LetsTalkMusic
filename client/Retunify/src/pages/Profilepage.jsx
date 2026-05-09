import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Divider, Box, Container, Skeleton, Paper, Stack } from '@mui/material';
import ReviewItem from '../components/ReviewItem';
import DefaultAvatar from '../assets/templatePFP.jpg'; 
import '../pages/styles/Profilepage.css'; 
import WeeklyDigest from '../components/WeeklyDigest'

const ProfilePage = () => {
    const username = localStorage.getItem('username') || 'User';

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);
    
    const [reviews, setReviews] = useState([
        {
            id: 1,
            albumCover: '../src/assets/SweetBoy.jpg', 
            albumName: 'Sweet Boy',
            rating: 5,
            reviewText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sit eius qui quia optio maxime possimus magnam eos placeat ea? Neque distinctio ipsam officiis nulla! Quibusdam voluptate consequatur non rerum?'
        },
        {
            id: 2,
            albumCover: '../src/assets/SuperClean_Vol.1.jpg',
            albumName: 'Superclean, Vol.I',
            rating: 1,
            reviewText: 'The singer is puerto rican :(.'
        }
    ]);

    const amountOfReviews = reviews.length;

    const handleDeleteReview = (idToDelete) => {
        setReviews(reviews.filter(review => review.id !== idToDelete));
    }

    const averageRating = amountOfReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / amountOfReviews).toFixed(1): 0;

    return (
        <Container maxWidth="md" className="profile-mui-container">
            {/* Header Section */}
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

            {/* My Activity Center */}
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
                    ) : (
                        reviews.map(item => (
                            <ReviewItem
                                key={item.id}
                                {...item}
                                onDelete={() => handleDeleteReview(item.id)}
                            />
                        ))
                    )}
                </Box>
            </section>
        </Container>
    );
};



export default ProfilePage;