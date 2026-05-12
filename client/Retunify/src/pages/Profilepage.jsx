import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Divider, Box, Container, Skeleton, Paper, Stack } from '@mui/material';
import ReviewItem from '../components/ReviewItem';
import DefaultAvatar from '../assets/templatePFP.jpg'; 
import '../pages/styles/Profilepage.css'; 
import WeeklyDigest from '../components/WeeklyDigest'
import { Link } from 'react-router-dom';

// Import Album Covers
import Blonde from '../assets/AlbumCovers/Blonde.jpg';
import BrightFuture from '../assets/AlbumCovers/BrightFuture.jpg';
import Chromakopia from '../assets/AlbumCovers/Chromakopia.jpg';
import Cinema from '../assets/AlbumCovers/CINEMA.jpg';
import Ctrl from '../assets/AlbumCovers/CTRL.jpg';
import Currents from '../assets/AlbumCovers/Currents.jpg';
import EP3 from '../assets/AlbumCovers/EP3.jpg';
import FancyThat from '../assets/AlbumCovers/FancyThat.jpg';
import GoodKidMadCity from '../assets/AlbumCovers/GoodKidMadCity.jpg';
import Immunity from '../assets/AlbumCovers/Immunity.jpg';
import InRainbows from '../assets/AlbumCovers/InRainbows.jpg';
import ManningFireworks from '../assets/AlbumCovers/ManningFireworks.jpg';
import Melodrama from '../assets/AlbumCovers/Melodrama.jpg';
import OffTheWall from '../assets/AlbumCovers/OffTheWall.jpg';
import RandomAccessMemories from '../assets/AlbumCovers/RandomAccessMemories.jpg';
import Rumours from '../assets/AlbumCovers/Rumours.jpg';
import ShortAndSweet from '../assets/AlbumCovers/ShortAndSweet.jpg';
import Submarine from '../assets/AlbumCovers/Submarine.jpg';
import SuperCleanVol1 from '../assets/AlbumCovers/SuperCleanVol1.jpg';
import SweetBoy from '../assets/AlbumCovers/SweetBoy.jpg';
import TheGreatImpersonator from '../assets/AlbumCovers/TheGreatImpersonator.jpg';
import Thriller from '../assets/AlbumCovers/Thriller.jpg';
import ToHellWithIt from '../assets/AlbumCovers/tohellwithit.jpg';
import TwoHands from '../assets/AlbumCovers/TwoHands.jpg';
import CMIYGL from '../assets/AlbumCovers/CMIYGL.png';
import Malcolm from '../assets/AlbumCovers/Malcolm_todd.png';
import OKCPU from '../assets/AlbumCovers/OkComp.png';
import ChannelO from '../assets/AlbumCovers/ChannelO.png';
import TPAB from '../assets/AlbumCovers/TPAB.png';
import abysskiss from '../assets/AlbumCovers/abysskiss.jpg';
import BehindTheMask from '../assets/AlbumCovers/BehindTheMask.jpg';
import Charm from '../assets/AlbumCovers/Charm.jpg';
import Deadbeat from '../assets/AlbumCovers/Deadbeat.jpg';
import Discovery from '../assets/AlbumCovers/Discovery.jpg';
import IICHL from '../assets/AlbumCovers/IfICantHaveLove.jpeg';
import PH from '../assets/AlbumCovers/PureHeroine.jpg';
import SOS from '../assets/AlbumCovers/SOS.jpg';
import TangoInTheNight from '../assets/AlbumCovers/TangoInTheNight.jpg';
import NoLoveLost from '../assets/AlbumCovers/NoLoveLost.jpg';
import two from '../assets/AlbumCovers/2.png';
import Madvillainy from '../assets/AlbumCovers/Madvillainy.png';
import star from '../assets/AlbumCovers/star.png';
import DBTMF from '../assets/AlbumCovers/DBTMF.png';
import Heaven from '../assets/AlbumCovers/Heaven_knows.png';

// Keys must be EXACT name as in seed_data!!
const albumCoverMap = {
  "abysskiss": abysskiss,
  "Behind The Mask": BehindTheMask,
  "Charm": Charm,
  "Deadbeat": Deadbeat,
  "Discovery": Discovery,
  "If I Can't Have Love, I Want Power": IICHL,
  "Pure Heroine": PH,
  "SOS": SOS,
  "Tango in the Night": TangoInTheNight,
  "Behind the Mask": BehindTheMask,
  "No Love Lost to Kindness": NoLoveLost,
  "Blonde": Blonde,
  "Bright Future": BrightFuture,
  "CHROMAKOPIA": Chromakopia,
  "CINEMA": Cinema,
  "CTRL": Ctrl,
  "Currents": Currents,
  "EP III": EP3,
  "Fancy That": FancyThat,
  "Good Kid, M.A.A.D City": GoodKidMadCity,
  "Immunity": Immunity,
  "In Rainbows": InRainbows,
  "Manning Fireworks": ManningFireworks,
  "Melodrama": Melodrama,
  "Off the Wall": OffTheWall,
  "Random Access Memories": RandomAccessMemories,
  "Rumours": Rumours,
  "Short n' Sweet": ShortAndSweet,
  "Submarine": Submarine,
  "Superclean Vol. I": SuperCleanVol1,
  "Sweet Boy": SweetBoy,
  "The Great Impersonator": TheGreatImpersonator,
  "Thriller": Thriller,
  "to hell with it": ToHellWithIt,
  "Two Hands": TwoHands,
  "CALL ME IF YOU GET LOST": CMIYGL,
  "Malcolm Todd": Malcolm,
  "OK Computer": OKCPU,
  "channel ORANGE": ChannelO,
  "To Pimp A Butterfly": TPAB,
  "2": two,
  "star": star,
  "DeBÍ TiRAR MáS FOToS": DBTMF,
  "Madvillainy": Madvillainy,
  "Heaven knows": Heaven,
};

const ProfilePage = () => {
    const username = localStorage.getItem('username') || 'Welcome to the User Page';
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
                    const formattedReviews = await Promise.all(data.map(async (item) => {
                        // let fetchedCover = DefaultAvatar;

                        // try {
                        //     const itunesRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(item.album_title)}&entity=album&limit=1`);
                        //     const itunesData = await itunesRes.json();

                        //     if (itunesData.results && itunesData.results.length > 0) {
                        //         fetchedCover = itunesData.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
                        //     }
                        // } catch (imageError) {
                        //     console.error("Failed to fetch album cover for", item.album_title);
                        // }
                        const fetchedCover = albumCoverMap[item.album_title] || DefaultAvatar;
                        return {
                            id: item.review_id,
                            album_id: item.album_id, 
                            albumName: item.album_title,
                            rating: item.rating,
                            reviewText: item.review,
                            albumCover: fetchedCover 
                        };
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

            if (response.ok) {
                setReviews(prevReviews => 
                    prevReviews.map(review =>
                        review.album_id === albumId
                        ? {...review, rating: parseFloat(newRating), newReviewText }
                        : review
                    )
                );
            } else {
                console.error("Failed to update review on backend");
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }
    }

    return (
        <Container maxWidth="md" className="profile-mui-container">
            <Box 
            sx={{ width:'100%', display: 'flex', mb: 2, mt: 2 }}>
                <Link 
                        to="/home" 
                        className="back-link" 
                        style={{ color: '#00e544', textDecoration: 'none', width: '80px' }}
                    >
                        ← BACK
                </Link>
            </Box>
            <Box className="profile-header-box" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                {/* <Avatar 
                    src={DefaultAvatar} 
                    className="profile-avatar-mui"
                    sx={{ width: 80, height: 80 }}
                /> */}
                <Typography variant="h4" className="profile-username-text">
                    Hello {username}!
                </Typography>
            </Box>

            <Divider className="profile-divider-mui" sx={{ mb: 4 }} />

            <section className='activity-section' style={{ marginBottom: '2rem',  }}>
                {/* <Typography variant='h6' className='activity-title-text' sx={{ mb: 2, fontWeight: 700, letterSpacing: 1}}>
                    MY ACTIVITY
                </Typography> */}
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