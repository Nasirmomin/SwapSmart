import ReturnRequest from "../models/ReturnRequest.js";
import Order from "../models/Orders.js";
import User from "../models/Users.js";

// Create a new return request
export const createReturnRequest = async (req, res) => {
    try {
        const { order_id, user_id, reason, created_by } = req.body;

        // Check if the order and user exist
        const order = await Order.findByPk(order_id);
        const user = await User.findByPk(user_id);

        if (!order || !user) {
            return res.status(404).json({ success: false, message: "Order or User not found" });
        }

        const returnRequest = await ReturnRequest.create({
            order_id,
            user_id,
            reason,
            created_by,
            updated_by: created_by,
        });

        res.status(201).json({ success: true, message: "Return request submitted successfully", returnRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating return request", error: error.message });
    }
};

// Get all return requests
export const getAllReturnRequests = async (req, res) => {
    try {
        const returnRequests = await ReturnRequest.findAll({
            include: [{ model: Order, as: "order" }, { model: User, as: "user" }]
        });

        res.status(200).json({ success: true, returnRequests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching return requests", error: error.message });
    }
};

// Get a single return request by ID
export const getReturnRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const returnRequest = await ReturnRequest.findByPk(id, {
            include: [{ model: Order, as: "order" }, { model: User, as: "user" }]
        });

        if (!returnRequest) {
            return res.status(404).json({ success: false, message: "Return request not found" });
        }

        res.status(200).json({ success: true, returnRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching return request", error: error.message });
    }
};

// Update a return request status
export const updateReturnRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, updated_by } = req.body;

        const returnRequest = await ReturnRequest.findByPk(id);
        if (!returnRequest) {
            return res.status(404).json({ success: false, message: "Return request not found" });
        }

        await returnRequest.update({
            status,
            updated_by,
        });

        res.status(200).json({ success: true, message: "Return request updated successfully", returnRequest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating return request", error: error.message });
    }
};

// Delete a return request
export const deleteReturnRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const returnRequest = await ReturnRequest.findByPk(id);

        if (!returnRequest) {
            return res.status(404).json({ success: false, message: "Return request not found" });
        }

        await returnRequest.destroy();
        res.status(200).json({ success: true, message: "Return request deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting return request", error: error.message });
    }
};