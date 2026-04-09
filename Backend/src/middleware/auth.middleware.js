import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Acess denied login required", success: false });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
