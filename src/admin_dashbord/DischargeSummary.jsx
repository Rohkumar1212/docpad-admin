import React, { useState } from "react";

export default function DischargeSummary() {
  const [summary, setSummary] = useState({
    patientName: "",
    mrn: "",
    admissionDate: "",
    dischargeDate: "",
    chiefComplaint: "",
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    treatmentGiven: "",
    investigationSummary: "",
    medications: "",
    followUp: "",
    doctorName: "",
  });

  const handleChange = (field, value) => {
    setSummary({ ...summary, [field]: value });
  };

  return (
    <div className="space-y-6 pb-10">

      <h1 className="text-2xl font-bold text-gray-800">Discharge Summary Generator</h1>
      <p className="text-gray-500 -mt-3">
        Auto-populate patient details, add diagnosis, treatment & generate final summary
      </p>

      {/* Main Card */}
      <div className="bg-white shadow-sm border rounded-2xl p-6 space-y-6">

        {/* TOP BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input className="input" placeholder="Patient Name" 
            value={summary.patientName} onChange={e => handleChange("patientName", e.target.value)} />

          <input className="input" placeholder="MRN (Auto-generated)" 
            value={summary.mrn} onChange={e => handleChange("mrn", e.target.value)} />

          <div className="grid grid-cols-2 gap-4">
            <input className="input" type="date" value={summary.admissionDate} 
              onChange={e => handleChange("admissionDate", e.target.value)} />
            <input className="input" type="date" value={summary.dischargeDate} 
              onChange={e => handleChange("dischargeDate", e.target.value)} />
          </div>
        </div>

        {/* Chief Complaint */}
        <textarea
          className="input resize-none h-20"
          placeholder="Chief Complaint at Admission"
          value={summary.chiefComplaint}
          onChange={(e) => handleChange("chiefComplaint", e.target.value)}
        />

        {/* Diagnosis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea className="input h-28" placeholder="Primary Diagnosis"
            value={summary.primaryDiagnosis}
            onChange={e => handleChange("primaryDiagnosis", e.target.value)}
          />

          <textarea className="input h-28" placeholder="Secondary Diagnosis (if any)"
            value={summary.secondaryDiagnosis}
            onChange={e => handleChange("secondaryDiagnosis", e.target.value)}
          />
        </div>

        {/* Treatment Summary */}
        <textarea
          className="input h-32"
          placeholder="Treatment Given During Hospital Stay"
          value={summary.treatmentGiven}
          onChange={(e) => handleChange("treatmentGiven", e.target.value)}
        />

        {/* Investigation Summary */}
        <textarea
          className="input h-28"
          placeholder="Investigation Summary"
          value={summary.investigationSummary}
          onChange={(e) => handleChange("investigationSummary", e.target.value)}
        />

        {/* Medication + Follow Up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea className="input h-32" placeholder="Medications on Discharge"
            value={summary.medications}
            onChange={e => handleChange("medications", e.target.value)}
          />

          <textarea className="input h-32" placeholder="Follow-up Instructions"
            value={summary.followUp}
            onChange={e => handleChange("followUp", e.target.value)}
          />
        </div>

        {/* Doctor Info */}
        <input
          className="input"
          placeholder="Doctor Name / Signature"
          value={summary.doctorName}
          onChange={(e) => handleChange("doctorName", e.target.value)}
        />

        {/* GENERATE BUTTON */}
        <button className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 
                          text-white font-semibold rounded-xl hover:scale-[1.03] shadow-lg transition">
          Generate Summary PDF
        </button>
      </div>

      {/* FORM UI GLOBAL STYLES */}
      <style>{`
        .input {
          border: 1px solid #d6d6d6;
          padding: 12px;
          border-radius: 10px;
          width: 100%;
          background: #fafbff;
          outline: none;
          font-size: 14px;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 6px rgba(79,70,229,0.25);
        }
      `}</style>
    </div>
  );
}
