import express from 'express';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../controller/Review.js';

const Reviewrouter = express.Router();

Reviewrouter.get('/', getAllReviews);
Reviewrouter.get('/:id', getReviewById);
Reviewrouter.post('/', createReview);
Reviewrouter.put('/:id', updateReview);
Reviewrouter.delete('/:id', deleteReview);

export default Reviewrouter;
