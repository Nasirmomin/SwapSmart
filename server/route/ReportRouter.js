import express from "express";
import { createReport, getAllReports, getReportById, updateReport, deleteReport } from "../controller/Report.js";

const Reportrouter = express.Router();

Reportrouter.post("/", createReport);
Reportrouter.get("/", getAllReports);
Reportrouter.get("/:id", getReportById);
Reportrouter.put("/:id", updateReport);
Reportrouter.delete("/:id", deleteReport);

export default Reportrouter;