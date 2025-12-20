

// components/ReviewSection.js
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../app/axios/axiosInstance';
import toast from 'react-hot-toast';

const ReviewSection = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

   const fetchReviews = useCallback(async () => {
  try {
    const response = await axiosInstance.get("/reviews");

    // Filter reviews for this specific course and approved ones
    const courseReviews = response.data.filter((review) => {
      const isApproved = review.approved;
      const isForThisCourse =
        review.course && review.course._id === courseId;

      return isApproved && isForThisCourse;
    });

    setReviews(courseReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    toast.error("Failed to load reviews");
  } finally {
    setLoading(false);
  }
}, [courseId]);
  useEffect(() => {
    fetchReviews();
  }, [ fetchReviews]);



  const submitReview = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    
    setSubmitting(true);

    try {
      const response = await axiosInstance.post('/reviews', {
        reviewType: 'course',
        itemId: courseId,
        course: courseId,
        rating,
        comment: comment.trim()
      });

      if (response.data.message === 'Review submitted for approval') {
        toast.success('Review submitted for approval!');
        setShowReviewForm(false);
        setComment('');
        setRating(5);
        // Refresh reviews after submission
        fetchReviews();
      }
    } catch (error) {
    //   console.error('Error submitting review:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to submit a review');
      } else {
        toast.error('Failed to submit review Please login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
      <h2 className="text-xl font-bold text-[#204972] mb-4 border-b pb-2">
        Student Reviews
      </h2>

      {/* Review Stats */}
      <div className="flex items-center mb-6">
        <div className="text-center mr-6">
          <div className="text-4xl font-bold text-[#204972]">
            {averageRating}
          </div>
          <div className="text-amber-500 text-lg">
            {renderStars(Math.round(averageRating))}
          </div>
          <div className="text-gray-600 text-xs mt-1">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(r => r.rating === star).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            
            return (
              <div key={star} className="flex items-center mb-1">
                <span className="text-sm text-gray-600 w-4">{star}</span>
                <span className="text-amber-500 ml-1">★</span>
                <div className="ml-2 bg-gray-200 rounded-full h-2 flex-1">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 ml-2 w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Button */}
      {!showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="bg-[#204972] text-white px-4 py-2 rounded-lg hover:bg-[#16385d] transition mb-6"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-[#204972] mb-3">Write Your Review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-amber-500' : 'text-gray-300'
                  } hover:text-amber-400 transition-colors`}
                >
                  {star <= rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#204972]"
              placeholder="Share your experience with this course..."
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#204972] text-white px-4 py-2 rounded-lg hover:bg-[#16385d] disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                setRating(5);
                setComment('');
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-3">★ ☆ ☆ ☆ ☆</div>
            <p className="text-gray-600 mb-4">No reviews yet for this course.</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-[#204972] text-white px-4 py-2 rounded-lg hover:bg-[#16385d] transition"
            >
              Be the first to review
            </button>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-amber-500 text-lg">
                    {renderStars(review.rating)}
                  </div>
                  <h4 className="font-semibold text-gray-900 mt-1">
                    {review.user?.name || 'Anonymous User'}
                  </h4>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;