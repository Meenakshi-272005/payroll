const ProfessionalTaxConfig = require("../models/ProfessionalTaxConfig");

exports.createPTConfig = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, state, effectiveYear, ptName, applicableSalaryThreshold, taxSlabs } = req.body;

    const ptConfig = new ProfessionalTaxConfig({
      country,
      state,
      effectiveYear,
      ptName,
      applicableSalaryThreshold,
      taxSlabs,
      status: "ACTIVE"
    });

    await ptConfig.save();
    res.status(201).json({ success: true, data: ptConfig, message: "PT Config created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPTConfig = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, state, effectiveYear } = req.query;
    const filters = { status: "ACTIVE" };

    if (country) filters.country = country;
    if (state) filters.state = state;
    if (effectiveYear) filters.effectiveYear = parseInt(effectiveYear);

    const config = await ProfessionalTaxConfig.find(filters);
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.calculatePTDeduction = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { monthlySalary, state, year } = req.body;

    if (!monthlySalary || !state || !year) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const ptConfig = await ProfessionalTaxConfig.findOne({
      state,
      effectiveYear: year,
      status: "ACTIVE"
    });

    if (!ptConfig) {
      return res.status(404).json({ success: false, message: "PT Config not found" });
    }

    // Monthly PT Calculation
    let professionalTax = 0;
    const ptApplicable = monthlySalary >= ptConfig.applicableSalaryThreshold;

    if (ptApplicable) {
      for (let slab of ptConfig.taxSlabs) {
        if (monthlySalary >= slab.minSalary && monthlySalary <= slab.maxSalary) {
          professionalTax = slab.taxAmount;
          break;
        }
      }
    }

    res.json({
      success: true,
      data: {
        monthlySalary,
        ptApplicable,
        monthlyProfessionalTax: Math.round(professionalTax)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
