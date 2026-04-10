import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Worker from "../models/worker.model.js";

export const workerRegister = async (req, res) => {
  try {
    const { skills, area, experience, ratePerDay, bio } = req.body;
    const userId = req.user.userId;

    if (!skills || !area || !experience || !ratePerDay) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingWorker = await Worker.findOne({ userId });
    if (existingWorker) {
      return res.status(400).json({
        success: false,
        message: "Worker profile already exists",
      });
    }

    const worker = await Worker.create({
      userId,
      skills,
      area,
      experience,
      ratePerDay,
      bio,
    });

    user.role = "worker";
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Worker registered successfully",
      worker,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllWorker = async (req, res) => {
  try {
    const { skill, area } = req.query; // ← query params lo

    const filter = { isAvailable: true };
    if (skill) filter.skills = skill; // ← skill filter
    if (area) filter.area = area; // ← area filter

    const workers = await Worker.find(filter).populate(
      "userId",
      "name email phone",
    );

    if (workers.length === 0) {
      // ← length check
      return res.status(404).json({
        success: false,
        message: "No workers found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Workers fetched successfully",
      totalWorkers: workers.length,
      workers,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getWorker = async (req, res) => {
  try {
    const workerId = req.params.workerId;

    const worker = await Worker.findById(workerId).populate(
      "userId",
      "name email phone",
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Worker fetched successfully",
      worker,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = req.params.bookingId;
    const { status } = req.body;

    // Valid status check
    const validStatus = ["accepted", "rejected", "completed"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Pehle booking find karo
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Worker check karo — yeh booking is worker ki hai?
    const worker = await Worker.findOne({ userId });
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    if (booking.workerId.toString() !== worker._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "it is not you Booking",
      });
    }

    // Ab update karo
    booking.status = status;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
