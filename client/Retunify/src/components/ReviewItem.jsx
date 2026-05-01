import React from 'react';
import '../components/styles/ReviewItem.css';

const ReviewItem = ({ albumCover, albumName, rating, reviewText }) => {
    return (
        <div className="review-item">
            {/* Left side: Album Cover remains as is */}
            <div className="review-cover">
                <img src={albumCover} alt={"ALBUM_IMAGE_HERE"} />
            </div>

            {/* Right side: Information and Content with boxed styling */}
            <div className="review-content">
                <div className="boxed-info album-name-box">
                    <h3 className="album-name">{albumName}</h3>
                </div>
                
                <div className="boxed-info rating-box">
                    <span className="user-rating">{rating}/5</span>
                </div>
                
                <div className="boxed-info review-box">
                    <p className="review-body">{reviewText}</p>
                </div>
            </div>
            {/* Right side: Action Buttons */}
            <div className="review-actions">
                <button className="action-btn edit-review-btn">EDIT</button>
                <button className="action-btn delete-review-btn">DELETE</button>
            </div>
        </div>
    );
};

export default ReviewItem;