const { validationResult } = require("express-validator");
const Application = require("../models/Application.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/applications
const getApplications = asyncHandler(async (req, res) => {
  const { status, tag, search, sortBy = "createdAt", order = "desc" } = req.query;

  const filter = { userId: req.user._id };

  if (status) filter.status = status;
  if (tag) filter.tags = tag.toLowerCase();
  if (search) {
    filter.$or = [
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const applications = await Application.find(filter)
    .sort({ [sortBy]: sortOrder })
    .lean();

  res.status(200).json({ success: true, count: applications.length, applications });
});

// GET /api/applications/:id
const getApplicationById = asyncHandler(async (req, res, next) => {
  const application = await Application.findOne({
    _id: req.params.id,
    userId: req.user._id, // ownership check
  });

  if (!application) {
    return next(new AppError("Application not found.", 404));
  }

  res.status(200).json({ success: true, application });
});

// POST /api/applications
const createApplication = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { company, role, status, deadline, notes, hrName, hrEmail, jobLink, tags, salary, location } = req.body;

  const application = await Application.create({
    userId: req.user._id,
    company,
    role,
    status,
    deadline: deadline || null,
    notes,
    hrName,
    hrEmail,
    jobLink,
    tags: tags || [],
    salary,
    location,
  });

  res.status(201).json({ success: true, application });
});

// PUT /api/applications/:id
const updateApplication = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { company, role, status, deadline, notes, hrName, hrEmail, jobLink, tags, salary, location } = req.body;

  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id }, // ownership enforced at query level
    { company, role, status, deadline: deadline || null, notes, hrName, hrEmail, jobLink, tags, salary, location },
    { new: true, runValidators: true }
  );

  if (!application) {
    return next(new AppError("Application not found.", 404));
  }

  res.status(200).json({ success: true, application });
});

// PATCH /api/applications/:id/status  ← Kanban drag-drop
const updateStatus = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!application) {
    return next(new AppError("Application not found.", 404));
  }

  res.status(200).json({ success: true, application });
});

// DELETE /api/applications/:id
const deleteApplication = asyncHandler(async (req, res, next) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!application) {
    return next(new AppError("Application not found.", 404));
  }

  res.status(200).json({ success: true, message: "Application deleted successfully." });
});

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateStatus,
  deleteApplication,
};
