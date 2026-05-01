import React, { useState } from 'react';
import ReviewItem from '../components/ReviewItem';
import '../pages/styles/Profilepage.css'; 

const ProfilePage = () => {
    // Get the username stored during the authenticate function in LoginScreen
    const username = localStorage.getItem('username') || 'User';
    
    // Mock data representing what will eventually be fetched from Flask/SQL backend
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
        <div className="profile-container">
            <header className="profile-header">
                <div className="avatar-circle">
                </div>
                <div className="profile-info">
                    <h1 className="username">{username}</h1>
                </div>
            </header>

            <hr className="profile-divider" />

            {/* List section for the reviews */}
            <section className="reviews-section">
                <h2 className="section-title">REVIEWS</h2>
                <div className="reviews-list">
                    {/* Mapping through array to populate ReviewItem components automatically */}
                    {reviews.map(item => (
                        <ReviewItem 
                            key={item.id}
                            albumCover={item.albumCover}
                            albumName={item.albumName}
                            rating={item.rating}
                            reviewText={item.reviewText}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;