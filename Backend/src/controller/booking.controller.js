import Booking from "../models/booking.model.js";
import Worker from "../models/worker.model.js";

export const createBooking = async (req, res) => {
  try {
    const { workerId, date, address, description } = req.body;
    const userId = req.user.userId;

    if (!workerId || !date || !address) {
      return res
        .status(400)
        .json({ message: "these fields are required", success: false });
    }

    const workerexit = await Worker.findById(workerId).populate(
      "userId",
      "name email",
    );

    //check worker exit

    if (!workerexit) {
      return res
        .status(404)
        .json({ message: "worker is not exit", success: false });
    }

    //check worker is avialable
    if (workerexit.isAvailable === false) {
      return res
        .status(400)
        .json({ message: "worker is not availabe", success: false });
    }

    //check user is not worker
    if (workerexit.userId.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "you cannot book yourself",
      });
    }

    const booking = await Booking.create({
      workerId: workerId,
      date: date,
      address,
      description,
      userId: userId,
      totalAmount: workerexit.ratePerDay,
    });

    return res.status(201).json({
      message: "booking confirm successfully",
      success: true,
      booking,
      worker: {
        name: workerexit.userId.name,
        email: workerexit.userId.email,
        area: workerexit.area,
        ratePerDay: workerexit.ratePerDay,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking is not found" });
    }

    //check booking yehi user hai na

    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Yeh aapki booking nahi hai",
      });
    }

    //status check

    if (booking.status === "accepted") {
      return res
        .status(400)
        .json({ message: "Accept booking is not cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res
      .status(200)
      .json({ message: "booking cancel successfully", success: true });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error", success: false });
  }
};

export const getMyBooking = async (req, res) => {
  try {
    const userId = req.user.userId;

    const booking = await Booking.find({ userId })
      .populate("workerId", "skills area ratePerDay")
      .sort({ createdAt: -1 });

    if (booking.length === 0) {
      return res
        .status(404)
        .json({ message: "Booking is not found", success: false });
    }

    return res.status(200).json({
      message: "Your all the Booking",
      success: true,
      TotalBooking: booking.length,
      booking,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error", success: false });
  }
};

//worker book kar rha hai
