import express from "express";
import {
    createReturnRequest,
    getAllReturnRequests,
    getReturnRequestById,
    updateReturnRequest,
    deleteReturnRequest
} from "../controller/ReturnRequest.js";

const ReturnRequestrouter = express.Router();

ReturnRequestrouter.post("/", createReturnRequest);
ReturnRequestrouter.get("/", getAllReturnRequests);
ReturnRequestrouter.get("/:id", getReturnRequestById);
ReturnRequestrouter.put("/:id", updateReturnRequest);
ReturnRequestrouter.delete("/:id", deleteReturnRequest);

export default ReturnRequestrouter;