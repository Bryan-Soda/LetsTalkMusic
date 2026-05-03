import React, { useState } from 'react';
import { Avatar, Typography, Divider, Box, Container } from '@mui/material';
import ReviewItem from '../components/ReviewItem';
import DefaultAvatar from '../assets/templatePFP.jpg'; 
import '../pages/styles/Profilepage.css'; 

const ProfilePage = () => {
    const username = localStorage.getItem('username') || 'User';
    
    const [reviews] = useState([
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

    return (
        <Container maxWidth="md" className="profile-mui-container">
            {/* Header Section */}
            <Box className="profile-header-box">
                <Avatar 
                    src={DefaultAvatar} 
                    className="profile-avatar-mui"
                />
                <Typography variant="h4" className="profile-username-text">
                    {username}
                </Typography>
            </Box>

            <Divider className="profile-divider-mui" />

            <section className="reviews-section">
                <Typography variant="h6" className="reviews-title-text">
                    REVIEWS
                </Typography>
                
                <Box className="reviews-list-container">
                    {reviews.map(item => (
                        <ReviewItem 
                            key={item.id}
                            {...item} // brings in all the items from the mock data one by one 
                        />
                    ))}
                </Box>
            </section>
        </Container>
    );
};

export default ProfilePage;