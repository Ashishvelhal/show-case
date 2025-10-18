import Inquiry from "../models/inquiry.model.js";

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newInquiry = new Inquiry({ name, email, message });
    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    console.log('Fetching inquiries for user:', req.user._id);
    console.log('User is admin:', req.user.isAdmin);
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    console.log('Inquiries fetched successfully:', inquiries.length);
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    console.error("Full error object:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an inquiry
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { name, email, message },
      { new: true, runValidators: true }
    );
    if (!updatedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(updatedInquiry);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
