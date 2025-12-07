import React, { useState } from "react";

export default function StaffAccess() {
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);

  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Arjun Singh", role: "Consultant", added: "12 Feb 2025", access: "Full" },
    { id: 2, name: "Dr. Priya Shetty", role: "Radiologist", added: "05 Feb 2025", access: "Reports Only" },
    { id: 3, name: "Nurse Shalini", role: "Nursing Staff", added: "18 Feb 2025", access: "View Only" },
  ]);

  const [form, setForm] = useState({ name: "", email: "", role: "", access: "" });

  const handleAdd = () => {
    if (!form.name || !form.email || !form.role || !form.access) return;
    setStaff([...staff, { id: staff.length + 1, ...form, added: "Today" }]);
    setForm({ name: "", email: "", role: "", access: "" });
    setAddModal(false);
  };

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Doctor & Staff Access</h1>
        <p className="text-gray-500 -mt-1">Grant access, manage permissions & team visibility</p>
      </div>

      {/* SEARCH + ADD BUTTON */}
      <div className="flex justify-between items-center">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 w-72 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => setAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          + Add Member
        </button>
      </div>

      {/* STAFF LIST TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Access Level</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.role}</td>
                <td className="p-3">{s.access}</td>
                <td className="p-3">{s.added}</td>

                <td className="p-3 flex justify-center gap-3">
                  <button className="px-3 py-1 text-blue-600 hover:underline">Modify</button>
                  <button className="px-3 py-1 text-red-600 hover:underline">Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD NEW STAFF MODAL */}
      {addModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-xl shadow-lg space-y-4">

            <h2 className="text-lg font-semibold">Add Healthcare Member</h2>

            <input className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input className="input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <select className="input"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="Consultant">Consultant</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Nurse">Nurse</option>
              <option value="Medical Assistant">Medical Assistant</option>
            </select>

            <select className="input"
              value={form.access}
              onChange={e => setForm({ ...form, access: e.target.value })}
            >
              <option value="">Select Access Level</option>
              <option value="Full">Full Access</option>
              <option value="Reports Only">Reports Only</option>
              <option value="View Only">View Only</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setAddModal(false)} className="px-4 py-2 border rounded-lg">
                Cancel
              </button>
              <button onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d4d4d4;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 4px rgba(79,70,229,.4);
        }
      `}</style>
    </div>
  );
}
