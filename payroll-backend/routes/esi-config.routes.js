const express = require("express");
const router = express.Router();

// ✅ IMPORT CONTROLLER FUNCTION CORRECTLY
const {
  createESIConfig
} = require("../controllers/esi-Config.controller");

// ✅ ROUTE HANDLER MUST BE A FUNCTION
router.post("/", createESIConfig);

module.exports = router;