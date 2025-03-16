import Coupon from "../models/Coupon.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
    try {
        const { code, discount_percentage, expiry_date, created_by } = req.body;
        const coupon = await Coupon.create({
            code,
            discount_percentage,
            expiry_date,
            created_by,
            updated_by: created_by, // Initially, creator is also the updater
        });
        res.status(201).json({ success: true, message: "Coupon created successfully", coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating coupon", error: error.message });
    }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json({ success: true, coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching coupons", error: error.message });
    }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        res.status(200).json({ success: true, coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching coupon", error: error.message });
    }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, discount_percentage, expiry_date, updated_by } = req.body;

        const coupon = await Coupon.findByPk(id);
        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        await coupon.update({
            code,
            discount_percentage,
            expiry_date,
            updated_by,
        });

        res.status(200).json({ success: true, message: "Coupon updated successfully", coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating coupon", error: error.message });
    }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" });
        }

        await coupon.destroy();
        res.status(200).json({ success: true, message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting coupon", error: error.message });
    }
};