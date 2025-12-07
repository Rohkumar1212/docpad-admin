import React, { useState } from "react";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  
  const [patients, setPatients] = useState([
    {
      id: "MRN-202501",
      name: "Amit Sharma",
      age: 32,
      gender: "Male",
      phone: "9876543210",
      comorbidity: ["Diabetic"],
      lastVisit: "22 Feb 2025",
      owner: "Dr. A. Verma"
    },
    {
      id: "MRN-202502",
      name: "Priya Gupta",
      age: 28,
      gender: "Female",
      phone: "9658741230",
      comorbidity: ["HTN", "Asthma"],
      lastVisit: "19 Feb 2025",
      owner: "Dr. S. Patel"
    }
  ]);

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    comorbidity: [],
  });

  const diseases = ["Diabetic", "Hypertension", "Asthma", "Thyroid", "Heart Patient"];

  const toggleComorbidity = (c) => {
    setForm({
      ...form,
      comorbidity: form.comorbidity.includes(c)
        ? form.comorbidity.filter(x => x !== c)
        : [...form.comorbidity, c]
    });
  };

  const addPatient = () => {
    if(!form.name || !form.age || !form.gender) return;

    const newPatient = {
      id: "MRN-" + Math.floor(100000 + Math.random() * 900000),
      ...form,
      lastVisit: "Today",
      owner: "You"
    }

    setPatients([...patients, newPatient]);
    setForm({ name:"", age:"", gender:"", phone:"", address:"", comorbidity:[] });
    setModal(false);
  };

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* TITLE + Add button */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Patients Directory</h1>

        <button onClick={() => setModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + Register Patient
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 flex-wrap">
        <input
          placeholder="Search by Name / MRN / Phone..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-3 py-2 rounded shadow-sm w-72 text-sm"
        />

        <select
          className="border px-3 py-2 rounded text-sm"
          value={filter}
          onChange={e=>setFilter(e.target.value)}
        >
          <option value="">Filter by Comorbidity</option>
          {diseases.map((d,i)=> <option key={i}>{d}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 font-medium text-gray-700">
            <tr>
              <th className="p-3 text-left">MRN</th>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Age/Gender</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Comorbidity</th>
              <th className="p-3 text-left">Last Visit</th>
              <th className="p-3 text-left">Owner Doctor</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p,i)=>(
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3 font-semibold">{p.name}</td>
                <td className="p-3">{p.age} / {p.gender}</td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3">
                  {p.comorbidity.map((c,j)=>(
                    <span key={j}
                      className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded mr-1">
                      {c}
                    </span>
                  ))}
                </td>
                <td className="p-3">{p.lastVisit}</td>
                <td className="p-3">{p.owner}</td>

                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:underline mx-1">View</button>
                  <button className="text-green-600 hover:underline mx-1">Edit</button>
                  <button className="text-red-600 hover:underline mx-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD PATIENT MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[420px] rounded-xl space-y-4">
            
            <h2 className="text-lg font-bold">Register New Patient</h2>

            <input className="input" placeholder="Full Name"
              value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input className="input" placeholder="Age"
              type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})}/>

            <select className="input" value={form.gender}
              onChange={e=>setForm({...form,gender:e.target.value})}>
              <option value="">Select Gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>

            <input className="input" placeholder="Phone Number"
              value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>

            <textarea className="input resize-none h-16" placeholder="Address (optional)"
              value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>

            <p className="font-medium text-sm">Comorbidity Tags</p>
            <div className="flex gap-2 flex-wrap">
              {diseases.map((d,i)=>(
                <button key={i}
                  onClick={()=>toggleComorbidity(d)}
                  className={`px-2 py-1 text-xs rounded border
                  ${form.comorbidity.includes(d) ? "bg-blue-600 text-white" : ""}`}>
                  {d}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button onClick={()=>setModal(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button onClick={addPatient}
                className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .input { width:100%; border:1px solid #ddd; padding:8px;
                 border-radius:6px; font-size:14px; }
      `}</style>

    </div>
  );
}
