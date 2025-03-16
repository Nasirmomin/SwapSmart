import Review from '../models/Reviews.js';
import User from '../models/Users.js';
import Product from '../models/Products.js';

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching review' });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Update review by ID
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const updatedReview = await review.update(req.body);
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete review by ID
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};
