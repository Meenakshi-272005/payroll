// payroll-backend/models/TaxSlab.js
const mongoose = require('mongoose');

const TaxSlabSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      enum: ['India'],
      default: 'India'
    },
    financialYear: {
      type: String,
      required: true,
      match: /^\d{4}-\d{4}$/
    },
    slabName: {
      type: String,
      required: true
    },
    slabs: [
      {
        minIncome: {
          type: Number,
          required: true,
          min: 0
        },
        maxIncome: {
          type: Number,
          required: true
        },
        taxRate: {
          type: Number,
          required: true,
          min: 0,
          max: 100
        },
        surcharge: {
          type: Number,
          required: false,
          min: 0,
          max: 100
        },
        cess: {
          type: Number,
          required: false,
          min: 0,
          max: 100
        }
      }
    ],
    standardDeduction: {
      type: Number,
      required: false,
      min: 0
    },
    basicExemptionLimit: {
      type: Number,
      required: true,
      min: 0
    },
    applicableForRegime: {
      type: String,
      enum: ['OLD', 'NEW'],
      required: true
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
    collection: 'tax_slabs'
  }
);

TaxSlabSchema.index({ country: 1, financialYear: 1, applicableForRegime: 1 });

module.exports = mongoose.model('TaxSlab', TaxSlabSchema);
