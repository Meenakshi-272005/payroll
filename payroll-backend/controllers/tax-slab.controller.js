const TaxSlab = require("../models/TaxSlab");

exports.createTaxSlab = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, financialYear, slabName, slabs, standardDeduction, basicExemptionLimit, applicableForRegime } = req.body;

    const taxSlab = new TaxSlab({
      country,
      financialYear,
      slabName,
      slabs,
      standardDeduction,
      basicExemptionLimit,
      applicableForRegime,
      status: "ACTIVE"
    });

    await taxSlab.save();
    res.status(201).json({ success: true, data: taxSlab, message: "Tax slab created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTaxSlabs = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, financialYear } = req.query;
    const filters = { status: "ACTIVE" };

    if (country) filters.country = country;
    if (financialYear) filters.financialYear = financialYear;

    const slabs = await TaxSlab.find(filters);
    res.json({ success: true, data: slabs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.calculateTax = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { grossSalary, financialYear, country, regime } = req.body;

    if (!grossSalary || !financialYear || !country) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const taxSlab = await TaxSlab.findOne({
      country,
      financialYear,
      applicableForRegime: regime || "OLD"
    });

    if (!taxSlab) {
      return res.status(404).json({ success: false, message: "Tax slab not found" });
    }

    const standardDeduction = taxSlab.standardDeduction || 50000;
    const taxableIncome = Math.max(0, grossSalary - standardDeduction);

    let tax = 0, surcharge = 0, cess = 0;

    for (let slab of taxSlab.slabs) {
      if (taxableIncome > slab.minIncome) {
        const income = Math.min(taxableIncome, slab.maxIncome) - slab.minIncome;
        tax += (income * slab.taxRate) / 100;
        surcharge += (income * (slab.surcharge || 0)) / 100;
        cess += (income * (slab.cess || 0)) / 100;
      }
    }

    const totalTax = tax + surcharge + cess;
    const netTakeHome = grossSalary - totalTax;

    res.json({
      success: true,
      data: {
        grossSalary,
        taxableIncome,
        tax: Math.round(tax),
        surcharge: Math.round(surcharge),
        cess: Math.round(cess),
        totalTax: Math.round(totalTax),
        netTakeHome: Math.round(netTakeHome)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
