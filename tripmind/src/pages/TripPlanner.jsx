import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import { API_BASE_URL } from '../config/api';

function todayStr() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function TripPlanner() {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // Load saved draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tripmind:planner");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  // Save draft automatically
  useEffect(() => {
    try {
      localStorage.setItem("tripmind:planner", JSON.stringify(form));
    } catch {}
  }, [form]);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // Keep endDate >= startDate automatically
  useEffect(() => {
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setForm((p) => ({ ...p, endDate: p.startDate }));
    }
  }, [form.startDate]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.destination.trim())
      e.destination = "Please enter a destination.";
    if (!form.startDate) e.startDate = "Start date is required.";
    if (!form.endDate) e.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate)
      e.endDate = "End date must be after start date.";
    if (form.budget !== "" && Number(form.budget) < 0)
      e.budget = "Budget can't be negative.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  // ✅ Updated handleSubmit — sends data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      destination: true,
      startDate: true,
      endDate: true,
      budget: true,
      notes: true,
    });

    if (!isValid) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to save trip");

      const data = await response.json();
      console.log("✅ Saved to backend:", data);

      alert("Trip saved successfully!");
      setSubmitted(form);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to save trip. Check if backend is running on port 5000.");
    }
  };

  const onBlur = (e) =>
    setTouched((t) => ({ ...t, [e.target.name]: true }));

  const daysCount = useMemo(() => {
    if (!form.startDate || !form.endDate) return null;
    const s = new Date(form.startDate);
    const en = new Date(form.endDate);
    const days = Math.max(
      1,
      Math.round((en - s) / (1000 * 60 * 60 * 24)) + 1
    );
    return days;
  }, [form.startDate, form.endDate]);

  const fmtCurrency = (n) =>
    n !== null && n !== "" && !Number.isNaN(Number(n))
      ? Number(n).toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })
      : "—";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-600 via-fuchsia-500 to-sky-500 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl shadow-2xl p-[1px] bg-gradient-to-r from-indigo-300/60 via-fuchsia-300/60 to-sky-300/60"
        >
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 backdrop-blur p-6 sm:p-8 text-slate-800">
            <div className="border-b border-slate-200 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
                Trip Planner
              </h1>
              <p className="text-slate-600 mt-2">
                Professional planning with clear validation and a clean summary.
              </p>
            </div>

            {/* FORM START */}
            <form
              onSubmit={handleSubmit}
              className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Destination */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Destination
                </label>
                <div
                  className={`relative flex items-center rounded-lg border bg-white ${
                    touched.destination && errors.destination
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500"
                  } transition`}
                >
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={(e) =>
                      setField("destination", e.target.value)
                    }
                    onBlur={onBlur}
                    placeholder="e.g., Tokyo, Japan"
                    className="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none bg-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                {touched.destination && errors.destination && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.destination}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Start Date
                </label>
                <div
                  className={`relative flex items-center rounded-lg border bg-white ${
                    touched.startDate && errors.startDate
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500"
                  } transition`}
                >
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="date"
                    name="startDate"
                    min={todayStr()}
                    value={form.startDate}
                    onChange={(e) =>
                      setField("startDate", e.target.value)
                    }
                    onBlur={onBlur}
                    className="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none bg-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                {touched.startDate && errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  End Date
                </label>
                <div
                  className={`relative flex items-center rounded-lg border bg-white ${
                    touched.endDate && errors.endDate
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500"
                  } transition`}
                >
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="date"
                    name="endDate"
                    min={form.startDate || todayStr()}
                    value={form.endDate}
                    onChange={(e) =>
                      setField("endDate", e.target.value)
                    }
                    onBlur={onBlur}
                    className="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none bg-transparent text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                {touched.endDate && errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.endDate}
                  </p>
                )}
              </div>

              {daysCount !== null && (
                <div className="md:col-span-2 -mt-2 text-sm text-slate-600">
                  Trip length:{" "}
                  <span className="font-semibold text-slate-800">
                    {daysCount} {daysCount === 1 ? "day" : "days"}
                  </span>
                </div>
              )}

              {/* Budget */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Budget (USD)
                </label>
                <div
                  className={`relative flex items-center rounded-lg border bg-white ${
                    touched.budget && errors.budget
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-slate-300 focus-within:ring-2 focus-within:ring-indigo-500"
                  } transition`}
                >
                  <DollarSign className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="number"
                    name="budget"
                    min="0"
                    step="0.01"
                    value={form.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                    onBlur={onBlur}
                    placeholder="e.g., 2000"
                    className="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none bg-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                {form.budget && (
                  <p className="mt-1 text-xs text-slate-500">
                    Approx. {fmtCurrency(form.budget)}
                  </p>
                )}
                {touched.budget && errors.budget && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.budget}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-800 mb-1">
                  Notes
                </label>
                <div className="relative flex items-start rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition">
                  <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    onBlur={onBlur}
                    rows={4}
                    placeholder="Preferences, must-see places, companions…"
                    className="w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none bg-transparent resize-y text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] ${
                    isValid
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 hover:shadow-indigo-400/40"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Generate Summary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      destination: "",
                      startDate: "",
                      endDate: "",
                      budget: "",
                      notes: "",
                    });
                    setTouched({});
                    setSubmitted(null);
                  }}
                  className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
                >
                  Clear
                </button>
              </div>
            </form>
            {/* FORM END */}
          </div>
        </motion.div>

        {/* Summary Section */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="mt-8 rounded-2xl shadow-xl p-[1px] bg-gradient-to-r from-indigo-300/60 via-fuchsia-300/60 to-sky-300/60"
            >
              <div className="rounded-2xl bg-white/95 backdrop-blur p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Trip Summary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <div className="text-sm text-gray-500">Destination</div>
                    <div className="font-semibold">{submitted.destination}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dates</div>
                    <div className="font-semibold">
                      {submitted.startDate} → {submitted.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Budget</div>
                    <div className="font-semibold">
                      {submitted.budget
                        ? fmtCurrency(submitted.budget)
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Trip Length</div>
                    <div className="font-semibold">
                      {daysCount ?? "—"} {daysCount === 1 ? "day" : "days"}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-sm text-gray-500">Notes</div>
                    <div className="font-semibold whitespace-pre-wrap">
                      {submitted.notes || "—"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
