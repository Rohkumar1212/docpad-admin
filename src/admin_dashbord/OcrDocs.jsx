import React, { useState } from "react";

export default function OcrDocs() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Blood_Report_Amit.pdf",
      type: "Lab Report",
      status: "Processed",
      uploadedAt: "22 Feb 2025",
      fileURL: null,   // preview URL once uploaded or fetched
    },
    {
      id: 2,
      name: "MRI_Scan_Priya.jpg",
      type: "Radiology",
      status: "Processing",
      uploadedAt: "25 Feb 2025",
      fileURL: null,
    },
  ]);

  const [selected, setSelected] = useState(files[0] || null);
  const [hover, setHover] = useState(false);

  // Handle Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file); // required for preview

    const newDoc = {
      id: files.length + 1,
      name: file.name,
      type: "Clinical Document",
      status: "Processing",
      uploadedAt: "Today",
      fileURL: fileURL,
    };

    setFiles([newDoc, ...files]);
    setSelected(newDoc);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">OCR Document Upload</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload medical reports, prescriptions & discharge summaries — OCR converts into searchable text.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Upload + Document List */}
        <div className="space-y-4">

          {/* Upload Box */}
          <div
            className={`rounded-2xl border-2 border-dashed p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 
            ${hover ? "border-blue-600" : "border-blue-300"}`}
            onDragEnter={() => setHover(true)}
            onDragLeave={() => setHover(false)}
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/15 text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4M12 3v12m0 0-4-4m4 4 4-4" />
                </svg>
              </div>

              <p className="font-semibold text-gray-800 text-sm">Drag & Drop documents</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG • Max 10MB</p>

              <label className="inline-flex px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold cursor-pointer hover:bg-blue-700">
                Browse Files
                <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
              </label>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow border p-4 text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-sm text-gray-800">Suggested Uploads</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Lab Results (CBC, LFT, KFT etc.)</li>
              <li>X-Ray, CT, MRI, Ultrasound Images</li>
              <li>Discharge Summary & Notes</li>
              <li>Handwritten Prescriptions</li>
            </ul>
          </div>

          {/* Uploaded Document List */}
          <div className="bg-white rounded-xl shadow border p-4 h-72 overflow-y-auto">
            <div className="flex justify-between text-xs mb-2">
              <p className="font-semibold text-gray-800">Uploaded Documents</p>
              <span className="text-gray-500">{files.length} files</span>
            </div>

            <div className="space-y-2">
              {files.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelected(doc)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs border 
                  ${selected?.id === doc.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <p className="font-semibold text-gray-800 truncate">{doc.name}</p>
                  <p className="flex justify-between text-[11px]">
                    <span className="text-gray-500">{doc.type}</span>
                    <span className={doc.status === "Processed" ? "text-emerald-600" : "text-yellow-600"}>
                      {doc.status}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 space-y-4">

          {/* Viewer + Info */}
          <div className="grid md:grid-cols-2 gap-5 bg-white rounded-xl shadow border p-5">

            {/* LIVE PDF / IMAGE PREVIEW */}
            <div className="border rounded-xl h-56 bg-gray-50 flex items-center justify-center overflow-hidden">

              {selected ? (
                selected.fileURL && selected.name.toLowerCase().endsWith(".pdf") ? (

                  <iframe src={selected.fileURL} className="w-full h-full rounded-lg" title="PDF Preview"></iframe>

                ) : selected.fileURL ? (

                  <img src={selected.fileURL} alt="Preview" className="w-full h-full object-contain rounded-lg" />

                ) : (
                  <p className="text-gray-500 text-xs">No preview available</p>
                )
              ) : (
                <p className="text-gray-500 text-sm">Select a file to preview</p>
              )}

            </div>

            {/* Meta Detail */}
            <div className="space-y-3 text-xs">
              <h2 className="font-semibold text-gray-800 text-sm">Document Information</h2>

              <Details label="File Name" value={selected?.name} />
              <Details label="Type" value={selected?.type} />
              <Details label="Uploaded" value={selected?.uploadedAt} />
              <Details label="OCR Status" value={selected?.status} />
              <Details label="Linked Patient" value={selected ? "Not Assigned" : "-"} />

              <p className="text-[11px] text-blue-600">OCR will auto-extract text & enable search.</p>
            </div>
          </div>

          {/* OCR TEXT OUTPUT VIEWER */}
          <div className="bg-white rounded-xl shadow border p-5">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-sm text-gray-800">Extracted Text</h2>
              <button className="px-3 py-1 text-[11px] bg-emerald-100 text-emerald-700 rounded-full border border-emerald-300">
                Copy Text
              </button>
            </div>

            <div className="h-52 bg-gray-50 rounded-lg p-3 text-[11px] overflow-y-auto">
              {selected?.status === "Processed" ? (
                <p>
                  Hb: 13.4 g/dL | WBC: 7800/µL | Platelets: 2.1 lakh/µL  
                  FBS: 112 mg/dL | PPBS: 148 mg/dL  
                  Impression: Mild dyslipidemia — lifestyle changes advised.
                </p>
              ) : selected ? (
                <p className="italic text-gray-500">OCR Processing... text will appear here.</p>
              ) : (
                <p className="text-gray-400 italic">Select a file to view OCR output.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Details({ label, value }) {
  return (
    <p className="text-[11px]"><span className="text-gray-500">{label}:</span> <b>{value || "-"}</b></p>
  );
}
