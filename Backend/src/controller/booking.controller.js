export const createBooking = async (req, res) => {
  try {
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
