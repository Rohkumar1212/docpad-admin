import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { auth, logout } from "../../pages/auth/firebase/firebase";   // <--- IMPORTANT: Firebase user import here

import { 
  HomeIcon, UserGroupIcon, DocumentTextIcon,
  ClipboardDocumentCheckIcon, Cog6ToothIcon, UsersIcon,
  UserCircleIcon, ArrowLeftOnRectangleIcon, ShareIcon
} from "@heroicons/react/24/outline";
import { ImOffice } from "react-icons/im";

const DoctorAdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [user, setUser] = useState(null);

  // GET FIREBASE LOGIN USER
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  const menu = [
    { name: "Dashboard", path: "/doctor/admin/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Patients", path: "/doctor/admin/patients", icon: <UserGroupIcon className="h-5 w-5" /> },
    { name: "OCR Documents", path: "/doctor/admin/ocr-documents", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { name: "Investigations / Reports", path: "/doctor/admin/investigations", icon: <ClipboardDocumentCheckIcon className="h-5 w-5" /> },
    { name: "Discharge Summary", path: "/doctor/admin/discharge-summary", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { name: "Doctor + Staff Access", path: "/doctor/admin/staff-access", icon: <UsersIcon className="h-5 w-5" /> },
       { name: "Sharing", path: "/doctor/admin/sharing", icon: <ShareIcon className="h-5 w-5" /> },
    { name: "Settings", path: "/doctor/admin/settings", icon: <Cog6ToothIcon className="h-5 w-5" /> }
  ];

  const active = menu.find(m => location.pathname.startsWith(m.path))?.name || "Dashboard";

  // FIXED LOGOUT
  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <h2
          className="px-6 py-5 text-xl font-bold border-b bg-gradient-to-r 
        from-blue-600 to-cyan-500 text-white"
        >
          <img
            src="/src/assets/favicon.ico"
            alt="Logo"
            width={30}
            height={30}
            className="inline-block mr-2"
          />
          Doctor
        </h2>

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium 
              ${
                active === item.name
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        {/* USER + LOGOUT */}
        <div className="p-4 border-t">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <UserCircleIcon className="h-9 w-9 text-blue-600" />
              <div>
                <p className="font-semibold text-sm">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-gray-500">Doctor</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 
            text-white rounded-md text-sm"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT VIEW */}
      <main className="flex-1 flex flex-col">
        {/* TOP BAR (only user name now) */}
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b shadow-sm">
          <h2 className="font-bold text-lg capitalize">{active}</h2>

          <p className="text-sm text-gray-700 font-semibold">
            Logged in as:{" "}
            <span className="text-blue-600">
              {user?.displayName || user?.email}
            </span>
          </p>
        </header>

        {/* ACTIVE PAGE LOADS HERE */}
        <section className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DoctorAdminPanel;
