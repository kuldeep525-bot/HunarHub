import User from "../models/user.model.js";
import Worker from "../models/worker.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the all the value" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "email already exit", success: false });
    }

    const Hashpassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      name: name,
      email: email,
      password: Hashpassword,
      phone: phone,
      role,
    });

    return res.status(201).json({
      message: "User created Successfully",
      success: true,
      userData: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill the all the field" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", success: false });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", success: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    };

    res.cookie("jwt", token, cookieOption);

    return res.status(200).json({
      message: "User login Successfully",
      success: true,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Kindly login first", success: false });
    }
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ message: "User logout Successfully", success: true });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "User fetch data Successfully", success: true, user });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const profileUpdated = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, phone } },
      { new: true },
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "User  data updated  Successfully", success: true });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not find", success: false });
    }

    //worker account also delete
    await Worker.findOneAndDelete({ userId });

    //user delete account
    await user.deleteOne();
    res.clearCookie("jwt");

    return res.status(200).json({
      message: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

export const recoverAccount = async (req, res) => {};

export const forgotPassword = async (req, res) => {
  try {
    //verify with email
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "if this email exits, otp has been sent" });
    }

    //4 digit otp

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //first hash karo otp ko

    const hashOpt = crypto.createHash("sha256").update(otp).digest("hex");
    user.otp = hashOpt;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const message = `Your Hunar Hub password reset OTP is: ${otp}\n\nThis OTP will expire in 10 minutes.\n\nIf you did not request this, please ignore.`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Otp",
      text: message,
    });

    return res
      .status(200)
      .json({
        message: "If this email exists, OTP has been sent",
        success: true,
      });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    //verify with email
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and Otp are required" });
    }

    //first hash karo otp ko

    const hashOpt = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      otp: hashOpt,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid email and otp" });
    }

    return res.status(200).json({ message: "Otp verifiy successfully" });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    //verify with email
    const { email, otp, password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and ConfirmPassword are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //first hash karo otp ko

    const hashOpt = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      otp: hashOpt,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid or expiredOtp" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful. Please login again." });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};
