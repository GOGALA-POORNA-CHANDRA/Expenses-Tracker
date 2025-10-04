import React, { useEffect, useState } from "react";
import {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getTotal,
  getByCategory,
} from "../services/expenseService";

const emptyForm = { id: null, amount: "", date: "", note: "", category: "" };

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState({});
  const [filter, setFilter] = useState({ q: "", category: "", from: "", to: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [listRes, totalRes, catRes] = await Promise.all([
        getAllExpenses(),
        getTotal(),
        getByCategory(),
      ]);
      setExpenses(listRes.data || []);
      setTotal(totalRes?.data?.total ?? 0);
      setByCategory(catRes?.data ?? {});
    } catch (err) {
      console.error("Error loading data:", err);
      alert("Failed to load data from backend. Check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // FRONTEND ONLY FILTERS
  const applyFilters = () => {
    return expenses.filter((e) => {
      // Category filter
      if (filter.category?.trim()) {
        if (!e.category?.toLowerCase().includes(filter.category.trim().toLowerCase())) return false;
      }

      // Search in note / amount / category
      if (filter.q?.trim()) {
        const q = filter.q.trim().toLowerCase();
        if (
          !(String(e.note || "").toLowerCase().includes(q) ||
            String(e.amount).toLowerCase().includes(q) ||
            String(e.category || "").toLowerCase().includes(q))
        )
          return false;
      }

      // Date range filter
      const eDate = new Date(e.date);
      if (filter.from) {
        const fromDate = new Date(filter.from);
        if (eDate < fromDate) return false;
      }
      if (filter.to) {
        const toDate = new Date(filter.to);
        if (eDate > toDate) return false;
      }

      return true;
    });
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const payload = {
      amount: Number(form.amount),
      date: form.date,
      note: form.note,
      category: form.category,
    };
    try {
      if (isEditing) {
        await updateExpense(form.id, payload);
      } else {
        await addExpense(payload);
      }
      setForm(emptyForm);
      setIsEditing(false);
      await refreshAll();
      document.getElementById("list")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Save failed:", err);
      const msg = err?.response?.data || err.message;
      alert("Save failed: " + JSON.stringify(msg));
    }
  };

  const edit = (e) => {
    setForm({
      id: e.id,
      amount: e.amount,
      date: e.date,
      note: e.note || "",
      category: e.category || "",
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      await refreshAll();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const clearFilters = () => setFilter({ q: "", category: "", from: "", to: "" });

  const filtered = applyFilters();

  return (
    <div>
      {/* Add/Edit Form */}
      <section id="add" className="card">
        <h2>{isEditing ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={submit} className="form">
          <div className="row">
            <label>
              Amount *
              <input
                name="amount"
                type="number"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Date *
              <input name="date" type="date" value={form.date} onChange={handleChange} required />
            </label>
          </div>
          <div className="row">
            <label>
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g., Food"
              />
            </label>
            <label>
              Note
              <input name="note" value={form.note} onChange={handleChange} placeholder="Optional note" />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
            <button
              type="button"
              className="muted"
              onClick={() => {
                setForm(emptyForm);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>

      {/* Filters */}
      <section id="filters" className="card">
        <h3>Search & Filters</h3>
        <div className="row">
          <label>
            Search (note / amount / category)
            <input
              value={filter.q}
              onChange={(e) => setFilter({ ...filter, q: e.target.value })}
              placeholder="Search..."
            />
          </label>
          <label>
            Category
            <input
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              placeholder="Category"
            />
          </label>
        </div>
        <div className="row">
          <label>
            From
            <input
              type="date"
              value={filter.from}
              onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={filter.to}
              onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" onClick={(e) => e.preventDefault()}>
            Apply
          </button>
          <button className="muted" onClick={clearFilters}>
            Clear
          </button>
          <button className="muted" onClick={refreshAll}>
            Reload Data
          </button>
        </div>
      </section>

      {/* Expense List */}
      <section id="list" style={{ marginTop: 20 }}>
        <h2>Expenses {loading ? "(loading...)" : ` — ${filtered.length}`}</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.amount}</td>
                    <td>{e.date}</td>
                    <td>{e.category || "Uncategorized"}</td>
                    <td className="note">{e.note}</td>
                    <td>
                      <button onClick={() => edit(e)}>Edit</button>{" "}
                      <button className="danger" onClick={() => remove(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="card" style={{ marginTop: 20 }}>
        <h3>Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-title">Total Spent</div>
            <div className="summary-value">₹{total}</div>
          </div>
          <div className="summary-card full">
            <div className="summary-title">By Category</div>
            {Object.keys(byCategory).length === 0 ? (
              <p>No category data.</p>
            ) : (
              <ul className="cat-list">
                {Object.entries(byCategory).map(([cat, amt]) => (
                  <li key={cat}>
                    <span>{cat}</span>
                    <strong>₹{amt}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}