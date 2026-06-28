const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const {
  category,
  subject,
  message,
} = req.body;

    const complaint = await Complaint.create({
      student: req.user.id,
      category,
      subject,
      message,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate(
      "student",
      "name email"
    );

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const replyToComplaint = async (req, res) => {
  try {
    const { adminReply, status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        adminReply,
        status,
      },
      { new: true }
    );

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createComplaint,
   getMyComplaints,
  getComplaints,
 
  replyToComplaint,
};