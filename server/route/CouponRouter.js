import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../controller/Coupon.js";

const Couponrouter = express.Router();

// Create a new coupon
Couponrouter.post("/", createCoupon);

// Get all coupons
Couponrouter.get("/", getAllCoupons);

// Get a single coupon by ID
Couponrouter.get("/:id", getCouponById);

// Update a coupon
Couponrouter.put("/:id", updateCoupon);

// Delete a coupon
Couponrouter.delete("/:id", deleteCoupon);

export default Couponrouter;