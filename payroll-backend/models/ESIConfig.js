// payroll-backend/models/ESIConfig.js
const mongoose = require('mongoose');

const ESIConfigSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      enum: ['India'],
      default: 'India'
    },
    state: {
      type: String,
      required: true,
      enum: ['Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Maharashtra']
    },
    effectiveYear: {
      type: Number,
      required: true,
      min: 2000,
      max: 2050
    },
    esiName: {
      type: String,
      required: true,
      default: "Employees' State Insurance (ESI)"
    },
    applicableSalaryThreshold: {
      type: Number,
      required: true,
      min: 0
    },
    employeeContributionRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    employerContributionRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    monthlyCalculationAmount: {
      type: Number,
      required: false,
      min: 0
    },
    benefits: {
      sicknessBenefit: String,
      disabilityBenefit: String,
      medicalBenefit: String,
      maternityBenefit: String,
      injuryBenefit: String
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    collection: 'esi_configs'
  }
);

ESIConfigSchema.index({ country: 1, state: 1, effectiveYear: 1 });

module.exports = mongoose.model('ESIConfig', ESIConfigSchema);
