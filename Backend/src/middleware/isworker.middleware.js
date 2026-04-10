export const isNotWorker = (req, res, next) => {
  if (req.user.role === "worker") {
    return res.status(403).json({
      success: false,
      message: "Aap pehle se worker hain",
    });
  }
  next();
};
