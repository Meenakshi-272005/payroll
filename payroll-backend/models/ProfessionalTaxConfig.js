// payroll-backend/models/ProfessionalTaxConfig.js
const mongoose = require('mongoose');

const ProfessionalTaxConfigSchema = new mongoose.Schema(
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
    ptName: {
      type: String,
      required: true
    },
    applicableSalaryThreshold: {
      type: Number,
      required: true,
      min: 0
    },
    taxSlabs: [
      {
        minSalary: {
          type: Number,
          required: true,
          min: 0
        },
        maxSalary: {
          type: Number,
          required: true
        },
        taxAmount: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    monthlyCalculationAmount: {
      type: Number,
      required: false,
      min: 0
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
    collection: 'professional_tax_configs'
  }
);

ProfessionalTaxConfigSchema.index({ country: 1, state: 1, effectiveYear: 1 });

module.exports = mongoose.model('ProfessionalTaxConfig', ProfessionalTaxConfigSchema);
