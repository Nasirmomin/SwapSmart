import bcrypt from 'bcryptjs';
import { 
  User, 
  Category, 
  Product, 
  Blog, 
  Review, 
  Order, 
  Message, 
  Notification, 
  Favorite, 
  Coupon, 
  PaymentTransaction, 
  Report, 
  ReturnRequest, 
  Subscriber, 
  Wishlist 
} from './models/index.js';

// Function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Function to create default data
const createDefaultData = async () => {
  try {
    console.log('Starting to create default data...');
    
    // Create Users
    const hashedPassword = await hashPassword('Password123!');
    const users = await User.bulkCreate([
      {
        full_name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '1234567890',
        address: '123 Admin St',
        city: 'Admin City',
        state: 'Admin State',
        country: 'USA',
        zip_code: '12345',
        profile_picture: 'https://example.com/admin-profile.jpg',
        role: 'admin',
        is_verified: true,
        account_status: 'Active',
        last_login: new Date(),
        preferences: { theme: 'dark', notifications: true },
        is_active: true,
        created_by: null,
        updated_by: null
      },
      {
        full_name: 'Seller User',
        email: 'seller@example.com',
        password: hashedPassword,
        phone: '2345678901',
        address: '456 Seller Ave',
        city: 'Seller City',
        state: 'Seller State',
        country: 'USA',
        zip_code: '23456',
        profile_picture: 'https://example.com/seller-profile.jpg',
        role: 'seller',
        store_name: 'Amazing Products',
        is_verified: true,
        account_status: 'Active',
        last_login: new Date(),
        preferences: { theme: 'light', notifications: true },
        is_active: true,
        created_by: 1,
        updated_by: null
      },
      {
        full_name: 'Customer User',
        email: 'customer@example.com',
        password: hashedPassword,
        phone: '3456789012',
        address: '789 Customer Blvd',
        city: 'Customer City',
        state: 'Customer State',
        country: 'USA',
        zip_code: '34567',
        profile_picture: 'https://example.com/customer-profile.jpg',
        role: 'customer',
        is_verified: true,
        account_status: 'Active',
        last_login: new Date(),
        preferences: { theme: 'light', notifications: true },
        is_active: true,
        created_by: 1,
        updated_by: null
      }
    ]);
    console.log('Users created successfully');

    // Create Categories
    const categories = await Category.bulkCreate([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        image: 'https://example.com/electronics.jpg',
        icon: 'https://example.com/electronics-icon.png',
        parent_id: null,
        level: 0,
        slug: 'electronics',
        meta_description: 'Find the latest electronic devices and gadgets',
        is_active: true,
        featured: true,
        display_order: 1,
        custom_attributes: { showFeatured: true },
        created_by: 1,
        updated_by: null
      },
      {
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        image: 'https://example.com/smartphones.jpg',
        icon: 'https://example.com/smartphones-icon.png',
        parent_id: 1,
        level: 1,
        slug: 'smartphones',
        meta_description: 'Find the latest smartphones and accessories',
        is_active: true,
        featured: true,
        display_order: 1,
        custom_attributes: { brands: ['Apple', 'Samsung', 'Google'] },
        created_by: 1,
        updated_by: null
      },
      {
        name: 'Clothing',
        description: 'Apparel and fashion items',
        image: 'https://example.com/clothing.jpg',
        icon: 'https://example.com/clothing-icon.png',
        parent_id: null,
        level: 0,
        slug: 'clothing',
        meta_description: 'Shop for trendy clothing and fashion items',
        is_active: true,
        featured: false,
        display_order: 2,
        custom_attributes: { sizes: ['S', 'M', 'L', 'XL'] },
        created_by: 1,
        updated_by: null
      }
    ]);
    console.log('Categories created successfully');

    // Create Products
    const products = await Product.bulkCreate([
      {
        title: 'iPhone 14 Pro',
        description: 'Latest Apple smartphone with amazing features',
        price: 999.99,
        discount_price: 899.99,
        condition: 'New',
        location: 'Seller City, USA',
        quantity: 10,
        tags: ['smartphone', 'apple', 'ios'],
        brand: 'Apple',
        warranty_info: '1 year manufacturer warranty',
        image: 'https://example.com/iphone14pro.jpg',
        status: 'Available',
        is_verified: true,
        is_featured: true,
        views_count: 150,
        negotiable: false,
        is_active: true,
        created_by: 2,
        updated_by: null,
        category_id: 2
      },
      {
        title: 'Samsung Galaxy S23',
        description: 'Latest Android flagship with powerful camera',
        price: 899.99,
        discount_price: 849.99,
        condition: 'New',
        location: 'Seller City, USA',
        quantity: 5,
        tags: ['smartphone', 'samsung', 'android'],
        brand: 'Samsung',
        warranty_info: '1 year manufacturer warranty',
        image: 'https://example.com/galaxys23.jpg',
        status: 'Available',
        is_verified: true,
        is_featured: true,
        views_count: 120,
        negotiable: false,
        is_active: true,
        created_by: 2,
        updated_by: null,
        category_id: 2
      },
      {
        title: 'Men\'s Casual T-Shirt',
        description: 'Comfortable cotton t-shirt for everyday wear',
        price: 29.99,
        discount_price: 24.99,
        condition: 'New',
        location: 'Seller City, USA',
        quantity: 20,
        tags: ['t-shirt', 'men', 'casual', 'cotton'],
        brand: 'FashionBrand',
        warranty_info: null,
        image: 'https://example.com/tshirt.jpg',
        status: 'Available',
        is_verified: true,
        is_featured: false,
        views_count: 85,
        negotiable: true,
        is_active: true,
        created_by: 2,
        updated_by: null,
        category_id: 3
      }
    ]);
    console.log('Products created successfully');

    // Create Blogs
    const blogs = await Blog.bulkCreate([
      {
        title: 'Top 10 Smartphones of 2025',
        slug: 'top-10-smartphones-2025',
        content: 'In this blog post, we explore the top 10 smartphones of 2025, discussing their features, pros, and cons...',
        image: 'https://example.com/top-smartphones.jpg',
        category: 'Electronics',
        status: 'published',
        meta_description: 'Discover the best smartphones of 2025 with our comprehensive guide',
        tags: ['smartphones', 'tech', 'reviews'],
        views_count: 250,
        likes_count: 42,
        comments_enabled: true,
        created_by: 1,
        updated_by: null,
        is_active: true
      },
      {
        title: 'How to Choose the Perfect T-Shirt',
        slug: 'choose-perfect-tshirt',
        content: 'Selecting the right t-shirt can be challenging. In this guide, we\'ll help you find the perfect fit...',
        image: 'https://example.com/tshirt-guide.jpg',
        category: 'Fashion',
        status: 'published',
        meta_description: 'Learn how to choose the perfect t-shirt for your body type and style',
        tags: ['fashion', 'clothing', 'style-guide'],
        views_count: 180,
        likes_count: 28,
        comments_enabled: true,
        created_by: 1,
        updated_by: null,
        is_active: true
      }
    ]);
    console.log('Blogs created successfully');

    // Create Reviews
    const reviews = await Review.bulkCreate([
      {
        title: 'Amazing Phone!',
        user_id: 3,
        product_id: 1,
        rating: 5,
        comment: 'This is the best smartphone I\'ve ever owned. The camera quality is exceptional!',
        verified_purchase: true,
        helpful_votes: 12,
        is_active: true,
        created_by: 3,
        updated_by: null
      },
      {
        title: 'Good but Expensive',
        user_id: 3,
        product_id: 2,
        rating: 4,
        comment: 'Great phone with amazing features, but a bit pricey for what you get.',
        verified_purchase: true,
        helpful_votes: 8,
        is_active: true,
        created_by: 3,
        updated_by: null
      },
      {
        title: 'Comfortable Shirt',
        user_id: 3,
        product_id: 3,
        rating: 5,
        comment: 'Very comfortable and fits perfectly. The material is high quality.',
        verified_purchase: true,
        helpful_votes: 5,
        is_active: true,
        created_by: 3,
        updated_by: null
      }
    ]);
    console.log('Reviews created successfully');

    // Create Orders
    const orders = await Order.bulkCreate([
      {
        buyer_id: 3,
        seller_id: 2,
        product_id: 1,
        total_amount: 899.99,
        is_negotiated_price: false,
        status: 'Completed',
        payment_method: 'Credit Card',
        payment_status: 'Paid',
        tracking_number: 'TRACK123456',
        shipping_address: '789 Customer Blvd, Customer City, Customer State, 34567',
        expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        order_notes: 'Please deliver to the front door',
        delivery_status: 'Delivered',
        coupon_code: null,
        discount_amount: 0,
        buyer_rating: 5,
        seller_rating: 5,
        is_active: true,
        created_by: 3,
        updated_by: null
      },
      {
        buyer_id: 3,
        seller_id: 2,
        product_id: 3,
        total_amount: 24.99,
        is_negotiated_price: false,
        status: 'Pending',
        payment_method: 'PayPal',
        payment_status: 'Paid',
        tracking_number: 'TRACK654321',
        shipping_address: '789 Customer Blvd, Customer City, Customer State, 34567',
        expected_delivery_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        order_notes: null,
        delivery_status: 'Processing',
        coupon_code: 'FIRSTORDER',
        discount_amount: 5.00,
        buyer_rating: null,
        seller_rating: null,
        is_active: true,
        created_by: 3,
        updated_by: null
      }
    ]);
    console.log('Orders created successfully');

    // Create Messages
    const messages = await Message.bulkCreate([
      {
        sender_id: 3,
        receiver_id: 2,
        subject: 'Question about iPhone 14 Pro',
        message: 'Hi, I\'m interested in the iPhone 14 Pro. Does it come with a charger?',
        attachments: null,
        is_read: true,
        deleted_by_sender: false,
        deleted_by_receiver: false,
        is_active: true,
        created_by: 3,
        updated_by: null
      },
      {
        sender_id: 2,
        receiver_id: 3,
        subject: 'Re: Question about iPhone 14 Pro',
        message: 'Hello! Yes, the iPhone 14 Pro comes with a USB-C charger in the box. Let me know if you have any other questions!',
        attachments: null,
        is_read: true,
        deleted_by_sender: false,
        deleted_by_receiver: false,
        is_active: true,
        created_by: 2,
        updated_by: null
      },
      {
        sender_id: 3,
        receiver_id: 1,
        subject: 'Account Verification',
        message: 'Hi Admin, I\'m having trouble verifying my account. Can you help me?',
        attachments: null,
        is_read: false,
        deleted_by_sender: false,
        deleted_by_receiver: false,
        is_active: true,
        created_by: 3,
        updated_by: null
      }
    ]);
    console.log('Messages created successfully');

    // Create Notifications
    const notifications = await Notification.bulkCreate([
      {
        user_id: 2,
        type: 'New Order',
        message: 'You have received a new order for iPhone 14 Pro',
        reference_id: 1,
        reference_model: 'Order',
        priority: 'high',
        is_read: true,
        is_active: true,
        created_by: 3,
        updated_by: null
      },
      {
        user_id: 3,
        type: 'Order Update',
        message: 'Your order for iPhone 14 Pro has been shipped',
        reference_id: 1,
        reference_model: 'Order',
        priority: 'medium',
        is_read: true,
        is_active: true,
        created_by: 2,
        updated_by: null
      },
      {
        user_id: 3,
        type: 'New Message',
        message: 'You have received a new message from Amazing Products',
        reference_id: 2,
        reference_model: 'Message',
        priority: 'medium',
        is_read: false,
        is_active: true,
        created_by: 2,
        updated_by: null
      }
    ]);
    console.log('Notifications created successfully');

    // Create Favorites
    const favorites = await Favorite.bulkCreate([
        {
          user_id: 3,
          product_id: 1,
          favorite_type: 'wishlist',
          notes: 'Want to buy when price drops',
          is_active: true,
          created_by: 3,
          updated_by: null
        },
        {
          user_id: 3,
          product_id: 2,
          favorite_type: 'watchlist',
          notes: null,
          is_active: true,
          created_by: 3,
          updated_by: null
        }
      ]);
      console.log('Favorites created successfully');
  
      // Create Coupons
      const coupons = await Coupon.bulkCreate([
        {
          code: 'WELCOME10',
          discount_percentage: 10.0,
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          is_active: true,
          created_by: 1,
          updated_by: null
        },
        {
          code: 'FIRSTORDER',
          discount_percentage: 15.0,
          expiry_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
          is_active: true,
          created_by: 1,
          updated_by: null
        }
      ]);
      console.log('Coupons created successfully');
  
      // Create Payment Transactions
      const paymentTransactions = await PaymentTransaction.bulkCreate([
        {
          order_id: 1,
          payment_method: 'Credit Card',
          payment_status: 'Completed',
          transaction_id: 'TXN12345678',
          is_active: true,
          created_by: 3,
          updated_by: null
        },
        {
          order_id: 2,
          payment_method: 'PayPal',
          payment_status: 'Completed',
          transaction_id: 'PAYPAL987654321',
          is_active: true,
          created_by: 3,
          updated_by: null
        }
      ]);
      console.log('Payment Transactions created successfully');
  
      // Create Reports
      const reports = await Report.bulkCreate([
        {
          reporter_id: 3,
          reported_user_id: 2,
          reason: 'Item not as described',
          status: 'Pending',
          is_active: true,
          created_by: 3,
          updated_by: null
        },
        {
          reporter_id: 2,
          reported_user_id: 3,
          reason: 'Unreasonable demands',
          status: 'Reviewed',
          is_active: true,
          created_by: 2,
          updated_by: 1
        }
      ]);
      console.log('Reports created successfully');
  
      // Create Return Requests
      const returnRequests = await ReturnRequest.bulkCreate([
        {
          order_id: 1,
          user_id: 3,
          reason: 'Product has manufacturing defect',
          status: 'Pending',
          is_active: true,
          created_by: 3,
          updated_by: null
        },
        {
          order_id: 2,
          user_id: 3,
          reason: 'Wrong size delivered',
          status: 'Approved',
          is_active: true,
          created_by: 3,
          updated_by: 2
        }
      ]);
      console.log('Return Requests created successfully');
  
      // Create Subscribers
      const subscribers = await Subscriber.bulkCreate([
        {
          email: 'subscriber1@example.com',
          subscription_status: 'Subscribed',
          is_active: true,
          subscribed_at: new Date(),
          unsubscribed_at: null,
          created_by: null,
          updated_by: null
        },
        {
          email: 'subscriber2@example.com',
          subscription_status: 'Subscribed',
          is_active: true,
          subscribed_at: new Date(),
          unsubscribed_at: null,
          created_by: null,
          updated_by: null
        },
        {
          email: 'unsubscribed@example.com',
          subscription_status: 'Unsubscribed',
          is_active: false,
          subscribed_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          unsubscribed_at: new Date(),
          created_by: null,
          updated_by: null
        }
      ]);
      console.log('Subscribers created successfully');
  
      // Create Wishlists
      const wishlists = await Wishlist.bulkCreate([
        {
          user_id: 3,
          product_id: 1,
          is_active: true,
          created_by: 3,
          updated_by: null
        },
        {
          user_id: 3,
          product_id: 3,
          is_active: true,
          created_by: 3,
          updated_by: null
        }
      ]);
      console.log('Wishlists created successfully');
  
      console.log('All default data created successfully!');
      return true;
    } catch (error) {
      console.error('Error creating default data:', error);
      return false;
    }
  };
  
  // Function to seed all data
  const seedData = async () => {
    try {
      // Check if data already exists to prevent duplicate seeding
      const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
      
      if (adminExists) {
        console.log('Default data already exists. Skipping seed.');
        return false;
      }
      
      // No existing data found, proceed with creating default data
      return await createDefaultData();
    } catch (error) {
      console.error('Error seeding data:', error);
      return false;
    }
  };
  
  export default  seedData ;