const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    employeeContribution: { type: Number, required: true },
    employerContribution: { type: Number, required: true }
  },
  { _id: false }
);

const statutoryRuleSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    effectiveYear: { type: Number, required: true },

    ruleType: {
      type: String,
      enum: ["PFTHRESHOLD", "ESITHRESHOLD", "PTTHRESHOLD"],
      required: true
    },

    pf: contributionSchema,
    esi: contributionSchema,

    description: String,
    status: { type: String, default: "ACTIVE" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StatutoryRule", statutoryRuleSchema);
