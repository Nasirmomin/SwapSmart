import express from "express";
import {
    createPaymentTransaction,
    getAllPaymentTransactions,
    getPaymentTransactionById,
    updatePaymentTransaction
} from "../controller/PaymentTranscation.js";

const PaymentTransactionrouter = express.Router();

PaymentTransactionrouter.post("/", createPaymentTransaction);
PaymentTransactionrouter.get("/", getAllPaymentTransactions);
PaymentTransactionrouter.get("/:id", getPaymentTransactionById);
PaymentTransactionrouter.put("/:id", updatePaymentTransaction);

export default PaymentTransactionrouter;