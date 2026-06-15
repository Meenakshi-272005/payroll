const express = require("express");
const router = express.Router();
const ptConfigController = require("../controllers/pt-config.controller");

// NO AUTH MIDDLEWARE

router.post("/", ptConfigController.createPTConfig);
router.get("/", ptConfigController.getPTConfig);
router.post("/calculate", ptConfigController.calculatePTDeduction);

module.exports = router;
