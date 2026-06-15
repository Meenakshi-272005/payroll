import axios from "axios";

const API_BASE = "/api";


export const complianceService = {
  // Statutory Rules
  createStatutoryRule: (data) =>
    axios.post(`${API_BASE}/statutory`, data),
  // NO withCredentials
  getStatutoryRules: (filters) =>
    axios.get(`${API_BASE}/statutory`, { params: filters }),
  updateStatutoryRule: (ruleId, data) =>
    axios.put(`${API_BASE}/statutory/${ruleId}`, data),
  archiveStatutoryRule: (ruleId) =>
    axios.delete(`${API_BASE}/statutory/${ruleId}`),

  // Tax Slabs
  getTaxSlabs: (filters) =>
    axios.get(`${API_BASE}/tax-slabs`, { params: filters }),
  calculateTax: (data) =>
    axios.post(`${API_BASE}/tax-slabs/calculate`, data),

  // PF Configuration
  getPFConfig: (filters) =>
    axios.get(`${API_BASE}/pf-config`, { params: filters }),
  calculatePFDeduction: (data) =>
    axios.post(`${API_BASE}/pf-config/calculate`, data),

  // ESI Configuration
  getESIConfig: (filters) =>
    axios.get(`${API_BASE}/esi-config`, { params: filters }),
  calculateESIDeduction: (data) =>
    axios.post(`${API_BASE}/esi-config/calculate`, data),

  // Professional Tax
  getPTConfig: (filters) =>
    axios.get(`${API_BASE}/pt-config`, { params: filters }),
  calculatePTDeduction: (data) =>
    axios.post(`${API_BASE}/pt-config/calculate`, data)
};
