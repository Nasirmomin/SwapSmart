import { sequelize } from '../config/dbConnection.js';

// Import all models
import User from './Users.js';
import Category from './Categories.js';
import Blog from './Blogs.js';
import Product from './Products.js';
import Review from './Reviews.js';
import Order from './Orders.js';
import Message from './Messages.js';
import Notification from './Notifications.js';
import Favorite from './Favorites.js';
import Coupon from './Coupon.js';
import PaymentTransaction from './PaymentTransaction.js';
import Report from './Report.js';
import ReturnRequest from './ReturnRequest.js';
import Subscriber from './Subscribers.js';
import Wishlist from './Wishlist.js';

// User Associations
User.hasMany(Product, { foreignKey: 'created_by', as: 'products' });
User.hasMany(Order, { foreignKey: 'buyer_id', as: 'purchases' });
User.hasMany(Order, { foreignKey: 'seller_id', as: 'sales' });
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
User.hasMany(Review, { foreignKey: 'created_by', as: 'createdReviews' });
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
User.hasMany(Blog, { foreignKey: 'created_by', as: 'blogs' });
User.hasMany(Report, { foreignKey: 'reporter_id', as: 'submittedReports' });
User.hasMany(Report, { foreignKey: 'reported_user_id', as: 'receivedReports' });
User.hasMany(ReturnRequest, { foreignKey: 'user_id', as: 'returnRequests' });
User.hasMany(Wishlist, { foreignKey: 'user_id', as: 'wishlist' });

// Product Associations
Product.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Product.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.hasMany(Review, { foreignKey: 'product_id', as: 'reviews' });
Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });
Product.hasMany(Favorite, { foreignKey: 'product_id', as: 'favorites' });
Product.hasMany(Wishlist, { foreignKey: 'product_id', as: 'wishlists' });

// Category Associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
Category.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Category.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Order Associations
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });
Order.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Order.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Order.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });
Order.hasMany(PaymentTransaction, { foreignKey: 'order_id', as: 'transactions' });
Order.hasMany(ReturnRequest, { foreignKey: 'order_id', as: 'returnRequests' });

// Review Associations
Review.belongsTo(User, { foreignKey: 'user_id', as: 'reviewer' });
Review.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Review.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Review.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Message Associations
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });
Message.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Message.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Notification Associations
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Notification.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Notification.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Favorite Associations
Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Favorite.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Favorite.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Favorite.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Blog Associations
Blog.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
Blog.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Coupon Associations
Coupon.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Coupon.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// PaymentTransaction Associations
PaymentTransaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
PaymentTransaction.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
PaymentTransaction.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Report Associations
Report.belongsTo(User, { foreignKey: 'reporter_id', as: 'reporter' });
Report.belongsTo(User, { foreignKey: 'reported_user_id', as: 'reportedUser' });
Report.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Report.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// ReturnRequest Associations
ReturnRequest.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
ReturnRequest.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
ReturnRequest.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
ReturnRequest.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Subscriber Associations
Subscriber.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Subscriber.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Wishlist Associations
Wishlist.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Wishlist.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Wishlist.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Improved sync function with better error handling and model-by-model sync
const syncModels = async () => {
  try {
    // First sync User model as it's referenced by many other models
    await User.sync({ alter: true });
    console.log('User model synced successfully');
    
    // Sync Category model next (it has self-references but User is its only dependency)
    await Category.sync({ alter: true });
    console.log('Category model synced successfully');
    
    // Sync Product model (depends on User and Category)
    await Product.sync({ alter: true });
    console.log('Product model synced successfully');
    
    // Sync other models with explicit order for dependencies
    const remainingModels = [
      { model: Blog, name: 'Blog' },
      { model: Order, name: 'Order' },
      { model: Review, name: 'Review' },
      { model: Message, name: 'Message' },
      { model: Notification, name: 'Notification' },
      { model: Favorite, name: 'Favorite' },
      { model: Coupon, name: 'Coupon' },
      { model: PaymentTransaction, name: 'PaymentTransaction' },
      { model: Report, name: 'Report' },
      { model: ReturnRequest, name: 'ReturnRequest' },
      { model: Subscriber, name: 'Subscriber' },
      { model: Wishlist, name: 'Wishlist' }
    ];
    
    for (const { model, name } of remainingModels) {
      try {
        await model.sync({ alter: true });
        console.log(`${name} model synced successfully`);
      } catch (modelError) {
        console.error(`Error syncing ${name} model:`, modelError);
      }
    }
    
    console.log('All models synced successfully');
  } catch (error) {
    console.error('Error during model synchronization:', error);
  }
};

export {
  User,
  Product,
  Category,
  Order,
  Review,
  Message,
  Notification,
  Favorite,
  Blog,
  Coupon,
  PaymentTransaction,
  Report,
  ReturnRequest,
  Subscriber,
  Wishlist,
  syncModels
};