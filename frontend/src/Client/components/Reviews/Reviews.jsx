import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStar, FaRegStar, FaPlusCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Reviews.css';

const Reviews = () => {
  const [fullImage, setFullImage] = useState(null);
  const [expandedText, setExpandedText] = useState(null);
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.client.reviews);

  const handleImageClick = (image) => {
    setFullImage(image);
  };

  const toggleText = (reviewId) => {
    setExpandedText(prev => prev === reviewId ? null : reviewId);
  };

  const closeModal = () => {
    setFullImage(null);
  };

  return (
    <div className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <h1 className="section-title">آراء العملاء</h1>
          <button 
            className="add-review-btn"
            onClick={() => navigate('/addreview')}
          >
            <FaPlusCircle className="btn-icon" />
            أضف رأيك
          </button>
        </div>

        <div className="reviews-scroll-container">
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div 
                className="review-card"
                key={review.id}
              >
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {review.personName[0]}
                    </div>
                    <div className="user-details">
                      <h3 className="user-name">{review.personName}</h3>
                      <div className="review-date">٢٠ أكتوبر ٢٠٢٣</div>
                    </div>
                  </div>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      i < review.rating ? 
                      <FaStar key={i} className="star filled" /> : 
                      <FaRegStar key={i} className="star" />
                    ))}
                  </div>
                </div>

                <div className="card-body">
                  <div 
                    className="dish-image" 
                    onClick={() => handleImageClick(review.image)}
                  >
                    <img src={review.image} alt={review.plateName} />
                    <div className="image-overlay">انقر للتكبير</div>
                  </div>
                  <div className="dish-info">
                    <h4 className="dish-name">{review.plateName}</h4>
                    <div className={`review-text ${expandedText === review.id ? 'expanded' : ''}`}>
                   ``   {review.text} ``
                    </div>
                    <button 
                      className="toggle-text-btn"
                      onClick={() => toggleText(review.id)}
                    >
                      {expandedText === review.id ? (
                        <FaChevronUp className="toggle-icon" />
                      ) : (
                        <FaChevronDown className="toggle-icon" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {fullImage && (
          <div className="image-modal" onClick={closeModal}>
            <div className="modal-content">
              <img src={fullImage} alt="التكبير الكامل" />
              <button className="close-btn">&times;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;