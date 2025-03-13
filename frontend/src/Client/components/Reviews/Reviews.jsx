import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStar, FaRegStar, FaPlusCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [fullImage, setFullImage] = useState(null);
  const [expandedText, setExpandedText] = useState(null);
  const navigate = useNavigate();
  const reviews = useSelector((state) => state.admin.reviews);
  
  // Filter accepted reviews
  const acceptedReviews = reviews.filter(item => item.status === "Accepted");

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
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsContainer}>
        <div className={styles.reviewsHeader}>
          <h1 className={styles.sectionTitle}>آراء العملاء</h1>
          <button 
            className={styles.addReviewBtn}
            onClick={() => navigate('/addreview')}
          >
            <FaPlusCircle className={styles.btnIcon} />
            أضف رأيك
          </button>
        </div>

        <div className={styles.reviewsScrollContainer}>
          <div className={styles.reviewsGrid}>
            {acceptedReviews.map((review) => (
              <div 
                className={styles.reviewCard}
                key={review.id}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {review.personName[0]}
                    </div>
                    <div className={styles.userDetails}>
                      <h3 className={styles.userName}>{review.personName}</h3>
                      <div className={styles.reviewDate}>{new Date(review.date).toLocaleDateString('ar-EG')}</div>
                    </div>
                  </div>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      i < review.rating ? 
                      <FaStar key={i} className={styles.starFilled} /> : 
                      <FaRegStar key={i} className={styles.star} />
                    ))}
                  </div>
                </div>

                <div className={styles.cardBody}>
                <div className={styles.dishImage} onClick={() => handleImageClick(review.image)}>
                  {review.image && <img src={review.image} alt={review.plateName} />}
                  <div className={styles.imageOverlay}>انقر للتكبير</div>
                </div>
                  <div className={styles.dishInfo}>
                    <h4 className={styles.dishName}>{review.plateName}</h4>
                    <div 
                      className={`${styles.reviewText} ${
                        expandedText === review.id ? styles.reviewTextExpanded : ''
                      }`}
                    >
                      {review.text}
                    </div>
                    {review.text.length > 100 && (
                      <button 
                        className={styles.toggleTextBtn}
                        onClick={() => toggleText(review.id)}
                        aria-label={expandedText === review.id ? "Collapse review" : "Expand review"}
                      >
                        {expandedText === review.id ? (
                          <FaChevronUp className={styles.toggleIcon} />
                        ) : (
                          <FaChevronDown className={styles.toggleIcon} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {fullImage && (
          <div className={styles.imageModal} onClick={closeModal}>
            <div className={styles.modalContent}>
              <img src={fullImage} alt="التكبير الكامل" />
              <button className={styles.closeBtn}>&times;</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;