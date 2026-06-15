const PFConfig = require("../models/PFConfig");

exports.createPFConfig = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, state, effectiveYear, pfName, applicableSalaryThreshold, employeeContributionRate, employerContributionRate, adminChargeRate } = req.body;

    const pfConfig = new PFConfig({
      country,
      state,
      effectiveYear,
      pfName,
      applicableSalaryThreshold,
      employeeContributionRate,
      employerContributionRate,
      adminChargeRate,
      status: "ACTIVE"
    });

    await pfConfig.save();
    res.status(201).json({ success: true, data: pfConfig, message: "PF Config created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPFConfig = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { country, state, effectiveYear } = req.query;
    const filters = { status: "ACTIVE" };

    if (country) filters.country = country;
    if (state) filters.state = state;
    if (effectiveYear) filters.effectiveYear = parseInt(effectiveYear);

    const config = await PFConfig.find(filters);
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.calculatePFDeduction = async (req, res) => {
  try {
    // NO AUTH CHECK
    const { baseSalary, state, year } = req.body;

    if (!baseSalary || !state || !year) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const pfConfig = await PFConfig.findOne({
      state,
      effectiveYear: year,
      status: "ACTIVE"
    });

    if (!pfConfig) {
      return res.status(404).json({ success: false, message: "PF Config not found" });
    }

    // Monthly PF Calculation
    const pfEligible = baseSalary; // or subset based on rules
    const employeeContribution = (pfEligible * pfConfig.employeeContributionRate) / 100;
    const employerContribution = (pfEligible * pfConfig.employerContributionRate) / 100;
    const adminCharge = (pfEligible * (pfConfig.adminChargeRate || 0.5)) / 100;

    res.json({
      success: true,
      data: {
        baseSalary,
        pfEligible: Math.round(pfEligible),
        monthlyEmployeeContribution: Math.round(employeeContribution),
        monthlyEmployerContribution: Math.round(employerContribution),
        monthlyAdminCharge: Math.round(adminCharge),
        totalMonthlyPFCredit: Math.round(employerContribution + employeeContribution + adminCharge)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
