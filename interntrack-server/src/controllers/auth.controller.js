const { validationResult } = require("express-validator");
const User = require("../models/User.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { signAccessToken, signRefreshToken } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");

// Cookie options — httpOnly prevents JS access
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",       // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site in prod
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sendTokenResponse = async (user, res, statusCode = 200) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // Persist refresh token in DB so we can invalidate it on logout
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};

// POST /api/auth/signup
const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("An account with this email already exists.", 409));
  }

  const user = await User.create({ name, email, password });
  await sendTokenResponse(user, res, 201);
});

// POST /api/auth/login
const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { email, password } = req.body;

  // Explicitly select password since it has select: false on schema
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password.", 401));
  }

  await sendTokenResponse(user, res);
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);
    return res.status(200).json({ success: true, message: "Logged out." });
  }

  // Invalidate in DB regardless of token validity
  await User.findOneAndUpdate(
    { refreshToken: token },
    { refreshToken: null }
  );

  res.clearCookie("refreshToken", REFRESH_COOKIE_OPTIONS);
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

// POST /api/auth/refresh
const refresh = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(new AppError("No refresh token provided.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  // Throws JsonWebTokenError or TokenExpiredError → caught by error middleware

  // Verify token matches what we stored (rotation security)
  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    return next(new AppError("Invalid refresh token. Please log in again.", 401));
  }

  const newAccessToken = signAccessToken(user._id);
  res.status(200).json({ success: true, accessToken: newAccessToken });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
});

module.exports = { signup, login, logout, refresh, getMe };