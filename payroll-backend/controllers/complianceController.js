// payroll-backend/controllers/complianceController.js
const StatutoryRule = require('../models/StatutoryRule');
const TaxSlab = require('../models/TaxSlab');
const PFConfig = require('../models/PFConfig');
const ESIConfig = require('../models/ESIConfig');
const ProfessionalTaxConfig = require('../models/ProfessionalTaxConfig');

// Get all statutory rules
exports.getStatutoryRules = async (req, res) => {
  try {
    const rules = await StatutoryRule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tax slabs
exports.getTaxSlabs = async (req, res) => {
  try {
    const slabs = await TaxSlab.find();
    res.json(slabs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all PF configs
exports.getPFConfigs = async (req, res) => {
  try {
    const configs = await PFConfig.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ESI configs
exports.getESIConfigs = async (req, res) => {
  try {
    const configs = await ESIConfig.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all PT configs
exports.getPTConfigs = async (req, res) => {
  try {
    const configs = await ProfessionalTaxConfig.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create statutory rule
exports.createStatutoryRule = async (req, res) => {
  try {
    const rule = new StatutoryRule(req.body);
    await rule.save();
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
