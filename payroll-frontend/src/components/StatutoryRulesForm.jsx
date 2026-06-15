import React, { useState } from "react";
import axios from "axios";

export default function StatutoryRuleForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    // General
    country: "India",
    state: "Tamil Nadu",
    effectiveYear: 2024,
    effectiveFrom: "2024-04-01",

    // PF
    pf: {
      employeeContribution: 12,
      employerContribution: 12
    },

    // ESI
    esi: {
      applicableSalaryThreshold: 21000,
      employeeContributionRate: 0.75,
      employerContributionRate: 3.25
    }
  });

  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 1. Save PF Rule
      await axios.post(
        "/api/statutory",
        {
          country: formData.country,
          state: formData.state,
          effectiveYear: formData.effectiveYear,
          ruleType: "PFTHRESHOLD",
          employeeContribution: formData.pf.employeeContribution,
          employerContribution: formData.pf.employerContribution,
          effectiveFrom: formData.effectiveFrom
        },
        { withCredentials: true }
      );

      // 🔹 2. Save ESI Config
      await axios.post(
        "/api/esi-config",
        {
          country: formData.country,
          state: formData.state,
          effectiveYear: formData.effectiveYear,
          applicableSalaryThreshold:
            formData.esi.applicableSalaryThreshold,
          employeeContributionRate:
            formData.esi.employeeContributionRate,
          employerContributionRate:
            formData.esi.employerContributionRate
        },
        { withCredentials: true }
      );

      alert("✅ PF & ESI Configuration Saved Successfully");
      onSuccess && onSuccess();
    } catch {
      // errors intentionally ignored (as you requested)
      console.log("Save attempted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 bg-white rounded shadow space-y-6"
    >
      <h2 className="text-2xl font-bold">
        Statutory Configuration (PF & ESI)
      </h2>

      {/* ================= GENERAL ================= */}
      <h3 className="font-semibold text-lg">General Details</h3>

      <input
        className="border p-2 w-full"
        value={formData.country}
        onChange={(e) =>
          setFormData({ ...formData, country: e.target.value })
        }
        placeholder="Country"
        required
      />

      <input
        className="border p-2 w-full"
        value={formData.state}
        onChange={(e) =>
          setFormData({ ...formData, state: e.target.value })
        }
        placeholder="State"
        required
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={formData.effectiveYear}
        onChange={(e) =>
          setFormData({ ...formData, effectiveYear: e.target.value })
        }
        placeholder="Effective Year"
        required
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={formData.effectiveFrom}
        onChange={(e) =>
          setFormData({ ...formData, effectiveFrom: e.target.value })
        }
        required
      />

      {/* ================= PF ================= */}
      <h3 className="font-semibold text-lg">PF Configuration</h3>

      <input
        type="number"
        className="border p-2 w-full"
        value={formData.pf.employeeContribution}
        onChange={(e) =>
          setFormData({
            ...formData,
            pf: {
              ...formData.pf,
              employeeContribution: e.target.value
            }
          })
        }
        placeholder="PF Employee Contribution (%)"
        required
      />

      <input
        type="number"
        className="border p-2 w-full"
        value={formData.pf.employerContribution}
        onChange={(e) =>
          setFormData({
            ...formData,
            pf: {
              ...formData.pf,
              employerContribution: e.target.value
            }
          })
        }
        placeholder="PF Employer Contribution (%)"
        required
      />

      {/* ================= ESI ================= */}
      <h3 className="font-semibold text-lg">ESI Configuration</h3>

      <input
        type="number"
        className="border p-2 w-full"
        value={formData.esi.applicableSalaryThreshold}
        onChange={(e) =>
          setFormData({
            ...formData,
            esi: {
              ...formData.esi,
              applicableSalaryThreshold: e.target.value
            }
          })
        }
        placeholder="Applicable Salary Threshold"
        required
      />

      <input
        type="number"
        step="0.01"
        className="border p-2 w-full"
        value={formData.esi.employeeContributionRate}
        onChange={(e) =>
          setFormData({
            ...formData,
            esi: {
              ...formData.esi,
              employeeContributionRate: e.target.value
            }
          })
        }
        placeholder="ESI Employee Contribution (%)"
        required
      />

      <input
        type="number"
        step="0.01"
        className="border p-2 w-full"
        value={formData.esi.employerContributionRate}
        onChange={(e) =>
          setFormData({
            ...formData,
            esi: {
              ...formData.esi,
              employerContributionRate: e.target.value
            }
          })
        }
        placeholder="ESI Employer Contribution (%)"
        required
      />

      {/* ================= SAVE ================= */}
      <button
        disabled={loading}
        className="bg-blue-600 text-white px-8 py-3 rounded font-semibold"
      >
        {loading ? "Saving..." : "Save Statutory Configuration"}
      </button>
    </form>
  );
}
