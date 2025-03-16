import PaymentTransaction from "../models/PaymentTransaction.js";
import Order from "../models/Orders.js";

// Create a new payment transaction
export const createPaymentTransaction = async (req, res) => {
    try {
        const { order_id, payment_method, transaction_id, created_by } = req.body;

        // Check if the order exists
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const paymentTransaction = await PaymentTransaction.create({
            order_id,
            payment_method,
            transaction_id,
            created_by,
            updated_by: created_by,
        });

        res.status(201).json({ success: true, message: "Payment transaction recorded", paymentTransaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error recording transaction", error: error.message });
    }
};

// Get all payment transactions
export const getAllPaymentTransactions = async (req, res) => {
    try {
        const transactions = await PaymentTransaction.findAll({
            include: [{ model: Order, as: "order" }]
        });

        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transactions", error: error.message });
    }
};

// Get a specific payment transaction by ID
export const getPaymentTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await PaymentTransaction.findByPk(id, {
            include: [{ model: Order, as: "order" }]
        });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transaction", error: error.message });
    }
};

// Update payment transaction status
export const updatePaymentTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_status, updated_by } = req.body;

        const transaction = await PaymentTransaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        transaction.payment_status = payment_status;
        transaction.updated_by = updated_by;
        await transaction.save();

        res.status(200).json({ success: true, message: "Payment status updated", transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating transaction", error: error.message });
    }
};