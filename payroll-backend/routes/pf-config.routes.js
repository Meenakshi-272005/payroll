const express = require("express");
const router = express.Router();
const pfConfigController = require("../controllers/pf-config.controller");

// NO AUTH MIDDLEWARE

router.post("/", pfConfigController.createPFConfig);
router.get("/", pfConfigController.getPFConfig);
router.post("/calculate", pfConfigController.calculatePFDeduction);

module.exports = router;
