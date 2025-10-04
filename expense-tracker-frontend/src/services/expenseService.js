import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api/expence";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

// REMOVE trailing slash from POST/GET base calls
export const getAllExpenses = () => api.get("");             // was "/"
export const getExpenseById = (id) => api.get(`/${id}`);
export const addExpense = (expense) => api.post("", expense); // was "/"
export const updateExpense = (id, expense) => api.put(`/${id}`, expense);
export const deleteExpense = (id) => api.delete(`/${id}`);
export const getTotal = () => api.get("/summary/total");
export const getByCategory = () => api.get("/summary/category");