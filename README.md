# SWPASmart - MERN Stack Project

SWPASmart is a **MERN (MongoDB, Express, React, Node.js) stack-based** web application designed for seamless and efficient management of second-hand product selling and buying.

## 📌 Features

- **User Authentication:** Login and signup functionality with JWT authentication.
- **Product Listing:** Users can upload and browse second-hand products.
- **Wishlist & Favorites:** Users can save favorite items for future reference.
- **Order Management:** Place, track, and manage orders efficiently.
- **Admin Panel:** Dashboard for admins to monitor users, products, and transactions.
- **Search & Filters:** Advanced product search with category-based filtering.
- **Image Uploads:** Secure image storage using `multer`.
- **Secure API:** Uses `express-validator` for input validation and `bcryptjs` for password hashing.

## 📁 Folder Structure

```
SWPASmart/
│-- client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── context/     # React Context API for state management
│   │   ├── services/    # API calls and utilities
│   │   ├── App.js       # Main app file
│   │   ├── index.js     # React entry point
│   ├── public/          # Static assets
│   ├── package.json     # React dependencies
│
│-- server/              # Node.js & Express Backend
│   ├── config/          # Database & environment configuration
│   ├── controllers/     # Business logic for routes
│   ├── middleware/      # Authentication & security middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API endpoints
│   ├── server.js        # Express app entry point
│   ├── package.json     # Backend dependencies
│
│-- .env                 # Environment variables
│-- README.md            # Project documentation
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/swpasmart.git
cd swpasmart
```

### 2️⃣ Setup Backend (Node.js + Express)
```sh
cd server
npm install
```
- Create a `.env` file in the `server/` directory and configure:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  PORT=5000
  ````
- Start the backend server:
```sh
npm start
```

### 3️⃣ Setup Frontend (React)
```sh
cd ../client
npm install
npm start
```

## 🚀 Deployment
- **Frontend:** Deploy on Vercel or Netlify.
- **Backend:** Deploy using Heroku, Render, or DigitalOcean.
- **Database:** MongoDB Atlas for cloud storage.

## 💡 Future Enhancements
- Real-time chat feature between buyers and sellers.
- AI-powered pricing suggestions based on market trends.
- Mobile-friendly UI improvements.

---

