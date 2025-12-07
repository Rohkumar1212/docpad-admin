import React, { useState } from "react";

export default function Investigations() {
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");

  const reports = [
    {
      id: 1,
      patient: "Amit Sharma",
      type: "Blood Test (CBC)",
      date: "22 Feb 2025",
      status: "Reviewed",
      values: [
        { name: "Hemoglobin", value: "13.4 g/dL", range: "12–16" },
        { name: "WBC", value: "7,800 /µL", range: "4,000–11,000" },
        { name: "Platelets", value: "2.1 lakh", range: "1.5–4.5" },
      ],
      summary: "Mild dyslipidemia. Follow-up advised."
    },
    {
      id: 2,
      patient: "Priya Gupta",
      type: "MRI Brain",
      date: "20 Feb 2025",
      status: "Pending Review",
      values: [],
      summary: "Awaiting radiologist review"
    },
    {
      id: 3,
      patient: "Rohit Verma",
      type: "Thyroid Function Test",
      date: "25 Feb 2025",
      status: "Completed",
      values: [
        { name: "TSH", value: "5.8 µIU/mL", range: "0.5–5.0" },
        { name: "T3", value: "115 ng/dL", range: "80–200" },
        { name: "T4", value: "9.1 µg/dL", range: "4.5–11.2" },
      ],
      summary: "Subclinical hypothyroidism – evaluate symptoms."
    }
  ];

  const [selected, setSelected] = useState(reports[0]);

  const filtered = reports.filter(r =>
    (filterType === "All" || r.type.includes(filterType)) &&
    r.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Investigations & Reports</h1>
        <p className="text-gray-500 text-sm">Lab values, radiology & diagnostic records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION — Filter + Report List */}
        <div className="lg:col-span-1 space-y-5">

          {/* Filters */}
          <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm">Filters</h2>

            <input
              placeholder="Search patient..."
              className="w-full px-3 py-2 border rounded-md text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="All">All Reports</option>
              <option value="Blood Test">Blood Tests</option>
              <option value="MRI">Radiology / MRI</option>
              <option value="Thyroid">Endocrine / Thyroid</option>
            </select>
          </div>

          {/* Report List */}
          <div className="bg-white p-5 rounded-xl border shadow-sm max-h-[70vh] overflow-y-auto">

            <h2 className="font-semibold text-gray-800 text-sm mb-3">Patient Reports</h2>

            <div className="space-y-2">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`w-full p-3 text-left border rounded-lg transition
                    ${selected.id === r.id
                      ? "bg-blue-50 border-blue-400"
                      : "hover:bg-gray-50 border-gray-200"}`}
                >
                  <p className="font-semibold text-gray-900">{r.patient}</p>
                  <p className="text-xs text-gray-500">{r.type}</p>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span>{r.date}</span>
                    <span className={
                      r.status.includes("Pending")
                        ? "text-amber-600 font-medium"
                        : r.status.includes("Reviewed")
                        ? "text-emerald-600 font-medium"
                        : "text-blue-600 font-medium"
                    }>
                      {r.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT— Selected Report Viewer */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-gray-900 text-lg mb-3">
              {selected.patient} — {selected.type}
            </h2>
            <p className="text-xs text-gray-500 mb-4">Date: {selected.date}</p>

            {/* Values table */}
            <h3 className="font-medium text-gray-800 mb-2">Investigation Values</h3>
            <div className="overflow-x-auto border rounded-lg bg-gray-50">
              <table className="w-full text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2 text-left">Parameter</th>
                    <th className="p-2 text-left">Result</th>
                    <th className="p-2 text-left">Normal Range</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.values.length > 0 ? (
                    selected.values.map((v, i) => (
                      <tr key={i} className="border-b hover:bg-gray-100">
                        <td className="p-2 font-medium">{v.name}</td>
                        <td className="p-2">{v.value}</td>
                        <td className="p-2">{v.range}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-gray-500 text-xs">
                        No values detected — this report is likely a scan/MRI.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary + clinical notes */}
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-900">Report Summary / Notes</h3>
            <textarea
              defaultValue={selected.summary}
              className="w-full p-3 border rounded-md text-sm h-28 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Save Notes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
