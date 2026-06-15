const express = require("express");
const router = express.Router();
const taxSlabController = require("../controllers/tax-slab.controller");

// NO AUTH MIDDLEWARE - All endpoints open for this module

router.post("/", taxSlabController.createTaxSlab);
router.get("/", taxSlabController.getTaxSlabs);
router.post("/calculate", taxSlabController.calculateTax);

module.exports = router;
