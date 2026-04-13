import Booking from "../models/booking.model.js";
import Review from "../models/review.model.js";
import Worker from "../models/worker.model.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, workerId, rating, comment } = req.body;
    const userId = req.user.userId;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    //owner check
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Yeh aapki booking nahi hai",
      });
    }

    if (booking.status !== "completed") {
      return res.status(401).json({ message: "Booking is not completed" });
    }

    const review = await Review.findOne({ bookingId });

    if (review) {
      return res
        .status(400)
        .json({ message: "Review is exit", success: false });
    }

    const createReview = await Review.create({
      userId: userId,
      bookingId,
      workerId,
      rating,
      comment,
    });

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    worker.rating =
      (worker.rating * worker.totalReviews + rating) /
      (worker.totalReviews + 1);
    worker.totalReviews = worker.totalReviews + 1;

    await worker.save();

    return res
      .status(201)
      .json({ message: "review created successfully", createReview });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getWorkerReview = async (req, res) => {
  try {
    const workerId = req.params.workerId;

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res
        .status(404)
        .json({ message: "worker not found", success: false });
    }

    const review = await Review.find({ workerId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      totalReview: review.length,
      message: `Rating: ${
        worker.rating >= 4
          ? "excellent"
          : worker.rating < 4 && worker.rat >= 3
            ? "Good"
            : "Bad"
      }`,
      review,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
