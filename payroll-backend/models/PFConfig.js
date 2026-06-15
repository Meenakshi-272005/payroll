// payroll-backend/models/PFConfig.js
const mongoose = require('mongoose');

const PFConfigSchema = new mongoose.Schema(
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
    pfName: {
      type: String,
      required: true,
      default: "Employees' Provident Fund (EPF)"
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
    adminChargeRate: {
      type: Number,
      required: false,
      min: 0,
      max: 10
    },
    monthlyCalculationAmount: {
      type: Number,
      required: false,
      min: 0
    },
    investmentOptions: [
      {
        name: String,
        rate: {
          type: Number,
          min: 0,
          max: 100
        },
        type: {
          type: String,
          enum: ['INTEREST', 'MARKETLINKED']
        }
      }
    ],
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
    collection: 'pf_configs'
  }
);

PFConfigSchema.index({ country: 1, state: 1, effectiveYear: 1 });

module.exports = mongoose.model('PFConfig', PFConfigSchema);
