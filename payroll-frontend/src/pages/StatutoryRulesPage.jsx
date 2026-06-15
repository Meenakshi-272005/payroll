import React, { useState, useEffect } from "react";
import axios from "axios";
import StatutoryRulesForm from "../components/StatutoryRulesForm";

export default function StatutoryRulesPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    country: "India",
    state: "",
    year: new Date().getFullYear()
  });

  useEffect(() => {
    fetchRules();
  }, [filters]);

  const fetchRules = async () => {
    try {
      setLoading(true);
      // ✅ FIXED: Changed /api/v1/ to /api/
      const response = await axios.get("/api/statutory", {
        params: filters
      });
      // ✅ FIXED: Handle response.data.data structure
      setRules(response.data.data || []);
    } catch (error) {
      console.error("Error fetching rules:", error);
      setRules([]); // ✅ Fallback to empty array
      alert("Failed to fetch statutory rules");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    if (window.confirm("Are you sure you want to archive this rule?")) {
      try {
        // ✅ FIXED: Changed /api/v1/ to /api/
        await axios.delete(`/api/statutory/${ruleId}`);
        alert("Rule archived successfully");
        fetchRules();
      } catch (error) {
        console.error("Error deleting rule:", error);
        alert("Failed to archive rule");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Statutory Rules Configuration
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "+ Add New Rule"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <StatutoryRulesForm
              onSuccess={() => {
                setShowForm(false);
                fetchRules();
              }}
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              placeholder="e.g., Tamil Nadu"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Rules Table */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Rule Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Emp. Contribution %
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Employer Contribution %
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Effective From
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* ✅ FIXED: Safe check using optional chaining */}
                {(rules?.length ?? 0) === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No rules found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  rules.map((rule) => (
                    <tr key={rule._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {rule.ruleType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {rule.state}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {rule.effectiveYear}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {rule.employeeContribution}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {rule.employerContribution}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {new Date(rule.effectiveFrom).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDeleteRule(rule._id)}
                          className="text-red-600 hover:text-red-800 mr-4"
                        >
                          Archive
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
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
