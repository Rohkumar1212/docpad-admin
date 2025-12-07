import React, { useState } from "react";

export default function Sharing() {
  
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Mehta", role: "Consultant", patients: 15, access: "Full" },
    { id: 2, name: "Dr. R Rao", role: "Radiologist", patients: 80, access: "Viewer" },
    { id: 3, name: "Nurse Priya", role: "Nursing", patients: 23, access: "Restricted" },
    { id: 4, name: "Dr. Nitin", role: "Surgeon", patients: 11, access: "Full" },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", role: "", access: "Viewer" });

  const handleAddAccess = () => {
    if (!newStaff.name || !newStaff.role) return;

    setStaff([
      ...staff,
      { id: staff.length + 1, name: newStaff.name, role: newStaff.role, patients: 0, access: newStaff.access }
    ]);

    setNewStaff({ name: "", role: "", access: "Viewer" });
    setShowAddModal(false);
  };


  return (
    <div className="space-y-8 pb-10">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Doctor & Staff Sharing Access</h1>
        <p className="text-gray-500 text-sm mt-1">
          Control who can view + update patient EMR data
        </p>
      </div>


      {/* ACTION BAR */}
      <div className="flex flex-wrap justify-between items-center bg-white border p-4 rounded-xl shadow-sm">

        <input
          type="text"
          placeholder="Search doctors or staff..."
          className="border px-3 py-2 rounded-md text-sm w-72 outline-none"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <button
          onClick={()=>setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + Share Access
        </button>

      </div>


      {/* TABLE LIST */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

          <table className="w-full text-sm">
            
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Patients Assigned</th>
                <th className="p-3 text-left">Access Level</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staff
              .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
              .map((s,i)=>(
                <tr key={i} className="border-b hover:bg-gray-50">
                  
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.role}</td>
                  <td className="p-3">{s.patients}</td>

                  <td className={`p-3 font-semibold ${
                    s.access==="Full" ? "text-blue-600" :
                    s.access==="Viewer" ? "text-green-600" :
                    "text-orange-500"
                  }`}>
                    {s.access}
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button className="text-red-600 hover:underline text-sm">Revoke</button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
      </div>


      {/* ADD ACCESS MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-96 rounded-xl p-6 space-y-5 shadow-lg">

            <h2 className="text-lg font-semibold text-gray-800">Grant New Access</h2>

            <input
              type="text"
              placeholder="Doctor / Staff Name"
              className="w-full px-3 py-2 border rounded-md"
              value={newStaff.name}
              onChange={(e)=>setNewStaff({...newStaff,name:e.target.value})}
            />

            <input
              type="text"
              placeholder="Role (Surgeon, Nurse etc.)"
              className="w-full px-3 py-2 border rounded-md"
              value={newStaff.role}
              onChange={(e)=>setNewStaff({...newStaff,role:e.target.value})}
            />

            <select
              value={newStaff.access}
              onChange={(e)=>setNewStaff({...newStaff,access:e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Viewer">Viewer</option>
              <option value="Full">Full Access</option>
              <option value="Restricted">Restricted</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={()=>setShowAddModal(false)} className="px-4 py-2 border rounded-md">
                Cancel
              </button>
              <button
                onClick={handleAddAccess}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
