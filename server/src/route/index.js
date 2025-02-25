import express from 'express';
import userRoutes from './UserRoute.js';
import Productrouter from './ProductRouter.js';
import Orderrouter from './OrderRoute.js';
import Categoryrouter from './CategoryRoute.js';
import Reviewrouter from './ReviewRouter.js';
import Messagerouter from './MessageRoute.js';
import Blogrouter from './BlogRouter.js';
import Subscriberrouter from './SubscriberRouter.js';
import Favoriterouter from './FavoritesRouter.js';
import authMiddleware from '../middleware/auth.js';
import Registerrouter from './Register/RegisterRouter.js';

const router = express.Router();

// Define route paths
router.use('/users', authMiddleware,userRoutes);
router.use('/product',Productrouter)
router.use('/order',Orderrouter)
router.use('/category',Categoryrouter)
router.use('/review',Reviewrouter)
router.use('/message',Messagerouter)
router.use('/blog',Blogrouter)
router.use('/subscriber',Subscriberrouter)
router.use('/favorite',Favoriterouter)
router.use('/register',Registerrouter)
export default router;
