// // Navbar.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiHeart, FiMessageSquare, FiBell, FiUser, FiLogOut, FiSettings, FiPackage } from 'react-icons/fi';
// import { BiSolidStore } from 'react-icons/bi';
// import { RiExchangeFill } from 'react-icons/ri';
// import { toast } from 'react-hot-toast';
// import '../styles/Navbar.css';

// const Navbar = () => {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
//   // Mock user data - replace with actual user data
//   const user = {
//     name: "John Doe",
//     email: "john@example.com",
//     avatar: "/path-to-avatar.jpg" // Replace with actual avatar path
//   };

//   const categories = [
//     "Electronics",
//     "Furniture",
//     "Fashion",
//     "Books",
//     "Sports",
//     "Home & Garden",
//     "Automotive",
//     "Others"
//   ];

//   const handleLogout = () => {
//     // Add logout logic here
//     toast.success('Logged out successfully!');
//   };

//   const handleSell = () => {
//     // Add sell logic here
//     toast.success('Redirecting to sell page...');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/" className="logo">
//           <RiExchangeFill className="logo-icon" />
//           <span>SwapSmart</span>
//         </Link>
        
//         <div className="category-dropdown">
//           <button 
//             className="category-btn"
//             onClick={() => setShowCategoryMenu(!showCategoryMenu)}
//           >
//             Categories
//           </button>
//           {showCategoryMenu && (
//             <div className="category-menu">
//               {categories.map((category, index) => (
//                 <Link 
//                   key={index} 
//                   to={`/category/${category.toLowerCase()}`}
//                   className="category-item"
//                 >
//                   {category}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="navbar-center">
//         <div className="search-container">
//           <input 
//             type="text" 
//             placeholder="Search for items..."
//             className="search-input"
//           />
//           <button className="search-btn">Search</button>
//         </div>
//       </div>

//       <div className="navbar-right">
//         <div className="nav-icons">
//           <Link to="/wishlist" className="nav-icon">
//             <FiHeart />
//           </Link>
//           <Link to="/messages" className="nav-icon">
//             <FiMessageSquare />
//           </Link>
//           <Link to="/notifications" className="nav-icon">
//             <FiBell />
//           </Link>
//         </div>

//         <button className="sell-btn" onClick={handleSell}>
//           <BiSolidStore className="sell-icon" />
//           Sell
//         </button>

//         <div className="profile-container">
//           <button 
//             className="profile-btn"
//             onClick={() => setShowProfileMenu(!showProfileMenu)}
//           >
//             <FiUser />
//           </button>
          
//           {showProfileMenu && (
//             <div className="profile-menu">
//               <div className="profile-header">
//                 <img src={user.avatar} alt="Profile" className="profile-avatar" />
//                 <div className="profile-info">
//                   <h4>{user.name}</h4>
//                   <p>{user.email}</p>
//                 </div>
//               </div>
//               <div className="profile-menu-items">
//                 <Link to="/profile" className="profile-menu-item">
//                   <FiUser />
//                   <span>Profile</span>
//                 </Link>
//                 <Link to="/my-listings" className="profile-menu-item">
//                   <FiPackage />
//                   <span>My Listings</span>
//                 </Link>
//                 <Link to="/settings" className="profile-menu-item">
//                   <FiSettings />
//                   <span>Settings</span>
//                 </Link>
//                 <button onClick={handleLogout} className="profile-menu-item logout">
//                   <FiLogOut />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
function Navbar(){
    return(
        <>
        <h1>hello</h1>
        </>
    )
}
export default Navbar