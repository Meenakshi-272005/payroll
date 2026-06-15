import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaxSlabPage() {
  const [taxSlabs, setTaxSlabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [salary, setSalary] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [formData, setFormData] = useState({
    country: "India",
    financialYear: "2025-2026",
    slabName: "",
    applicableForRegime: "OLD",
    basicExemptionLimit: "",
    standardDeduction: "",
    slabs: []
  });

  useEffect(() => {
    fetchTaxSlabs();
  }, []);

  const fetchTaxSlabs = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Using correct API path /api/
      const response = await axios.get("/api/tax-slabs");
      setTaxSlabs(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tax slabs:", error);
      setTaxSlabs([]);
      alert("Failed to fetch tax slabs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTaxSlab = async (e) => {
    e.preventDefault();
    try {
      // ✅ FIXED: Using correct API path
      await axios.post("/api/tax-slabs", formData);
      alert("Tax slab created successfully!");
      setShowForm(false);
      setFormData({
        country: "India",
        financialYear: "2025-2026",
        slabName: "",
        applicableForRegime: "OLD",
        basicExemptionLimit: "",
        standardDeduction: "",
        slabs: []
      });
      fetchTaxSlabs();
    } catch (error) {
      console.error("Error creating tax slab:", error);
      alert("Failed to create tax slab: " + error.response?.data?.error);
    }
  };

  const calculateTax = async () => {
    if (!salary) {
      alert("Please enter a salary amount");
      return;
    }

    try {
      // ✅ FIXED: Using correct API path
      const response = await axios.post("/api/tax-slabs/calculate", {
        grossSalary: parseFloat(salary),
        financialYear: "2025-2026",
        country: "India",
        regime: "OLD"
      });
      setCalculationResult(response.data.data);
    } catch (error) {
      console.error("Error calculating tax:", error);
      alert("Failed to calculate tax");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Income Tax Slabs</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "+ Add New Tax Slab"}
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Create Tax Slab</h2>
            <form onSubmit={handleCreateTaxSlab} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Slab Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Income Tax Slabs - Old Regime"
                    value={formData.slabName}
                    onChange={(e) => setFormData({ ...formData, slabName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Financial Year</label>
                  <input
                    type="text"
                    placeholder="2025-2026"
                    value={formData.financialYear}
                    onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Basic Exemption Limit</label>
                  <input
                    type="number"
                    required
                    placeholder="250000"
                    value={formData.basicExemptionLimit}
                    onChange={(e) => setFormData({ ...formData, basicExemptionLimit: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Standard Deduction</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={formData.standardDeduction}
                    onChange={(e) => setFormData({ ...formData, standardDeduction: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Regime</label>
                  <select
                    value={formData.applicableForRegime}
                    onChange={(e) => setFormData({ ...formData, applicableForRegime: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="OLD">Old Regime</option>
                    <option value="NEW">New Regime</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Tax Slab
              </button>
            </form>
          </div>
        )}

        {/* Calculator */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Tax Calculator</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter annual salary"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
              onClick={calculateTax}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Calculate
            </button>
          </div>

          {calculationResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold mb-4">Calculation Result</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Gross Salary</p>
                  <p className="text-lg font-bold">
                    ₹ {calculationResult.grossSalary?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Taxable Income</p>
                  <p className="text-lg font-bold">
                    ₹ {calculationResult.taxableIncome?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Income Tax</p>
                  <p className="text-lg font-bold text-red-600">
                    ₹ {calculationResult.tax?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Surcharge</p>
                  <p className="text-lg font-bold text-red-600">
                    ₹ {calculationResult.surcharge?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cess</p>
                  <p className="text-lg font-bold text-red-600">
                    ₹ {calculationResult.cess?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Net Take Home</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹ {calculationResult.netTakeHome?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tax Slabs Table */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Financial Year
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Slab Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Standard Deduction
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Basic Exemption
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Regime
                  </th>
                </tr>
              </thead>
              <tbody>
                {(taxSlabs?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No tax slabs found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  taxSlabs.map((slab) => (
                    <tr key={slab._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {slab.financialYear}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {slab.slabName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        ₹ {slab.standardDeduction?.toLocaleString() || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        ₹ {slab.basicExemptionLimit?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {slab.applicableForRegime}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
