const { body } = require("express-validator");

const applicationValidator = [
  body("company")
    .trim()
    .notEmpty().withMessage("Company name is required")
    .isLength({ max: 100 }).withMessage("Company name too long"),

  body("role")
    .trim()
    .notEmpty().withMessage("Role is required")
    .isLength({ max: 100 }).withMessage("Role too long"),

  body("status")
    .optional()
    .isIn(["Applied", "OA", "Interview", "Offer", "Rejected"])
    .withMessage("Invalid status value"),

  body("deadline")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage("Invalid date format"),

  body("hrEmail")
    .optional({ checkFalsy: true })
    .isEmail().withMessage("Invalid HR email format"),
];

const statusValidator = [
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["Applied", "OA", "Interview", "Offer", "Rejected"])
    .withMessage("Invalid status value"),
];

module.exports = { applicationValidator, statusValidator };