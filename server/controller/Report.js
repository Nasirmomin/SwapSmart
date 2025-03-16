import Report from "../models/Report.js";
import User from "../models/Users.js";

// Create a new report
export const createReport = async (req, res) => {
    try {
        const { reporter_id, reported_user_id, reason, created_by } = req.body;

        // Check if both users exist
        const reporter = await User.findByPk(reporter_id);
        const reportedUser = await User.findByPk(reported_user_id);
        if (!reporter || !reportedUser) {
            return res.status(404).json({ success: false, message: "One or both users not found" });
        }

        const report = await Report.create({
            reporter_id,
            reported_user_id,
            reason,
            created_by,
            updated_by: created_by, // Initially, creator is also the updater
        });

        res.status(201).json({ success: true, message: "Report submitted successfully", report });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error submitting report", error: error.message });
    }
};

// Get all reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ include: [{ model: User, as: "reporter" }, { model: User, as: "reportedUser" }] });
        res.status(200).json({ success: true, reports });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching reports", error: error.message });
    }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByPk(id, { include: [{ model: User, as: "reporter" }, { model: User, as: "reportedUser" }] });

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        res.status(200).json({ success: true, report });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching report", error: error.message });
    }
};

// Update a report status
export const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, updated_by } = req.body;

        const report = await Report.findByPk(id);
        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        await report.update({
            status,
            updated_by,
        });

        res.status(200).json({ success: true, message: "Report updated successfully", report });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating report", error: error.message });
    }
};

// Delete a report
export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByPk(id);

        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        await report.destroy();
        res.status(200).json({ success: true, message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting report", error: error.message });
    }
};