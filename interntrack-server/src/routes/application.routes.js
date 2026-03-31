const express = require("express");
const router = express.Router();
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  updateStatus,
  deleteApplication,
} = require("../controllers/application.controller");
const { getSummary } = require("../controllers/stats.controller");
const { protect } = require("../middleware/auth.middleware");
const { applicationValidator, statusValidator } = require("../validators/application.validator");

// All routes require auth
router.use(protect);

// Stats — must be defined BEFORE /:id to avoid "stats" being treated as an ID
router.get("/stats/summary", getSummary);

router.route("/")
  .get(getApplications)
  .post(applicationValidator, createApplication);

router.route("/:id")
  .get(getApplicationById)
  .put(applicationValidator, updateApplication)
  .delete(deleteApplication);

router.patch("/:id/status", statusValidator, updateStatus);

module.exports = router;
