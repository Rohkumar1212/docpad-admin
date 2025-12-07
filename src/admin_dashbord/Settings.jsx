import React, { useEffect, useState } from "react";
import { auth } from "../pages/auth/firebase/firebase"; 

export default function Settings() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    speciality: "",
    phone: "",
    photo: ""
  });

  const [theme, setTheme] = useState("light");
  const [notif, setNotif] = useState(true);

  // LOAD FIREBASE LOGGED USER
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserData({
        name: user.displayName || "",
        email: user.email || "",
        speciality: "Not updated",
        phone: user.phoneNumber || "Not Provided",
        photo: user.photoURL || "/avatar.png"
      });
    }
  }, []);

  return (
    <div className="space-y-10 pb-16">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        
        {/* Profile Avatar */}
        <img
          src={userData.photo}
          alt="Profile"
          className="w-16 h-16 rounded-full border shadow-sm"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your profile & EMR preferences</p>
        </div>
      </div>


      {/* PROFILE INFO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
        <h2 className="font-semibold text-lg text-gray-900">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            value={userData.name}
            onChange={(e)=>setUserData({...userData,name:e.target.value})}
            className="input-style"
            placeholder="Full Name"
          />

          <input
            value={userData.email}
            readOnly
            className="input-style bg-gray-100 cursor-not-allowed"
            placeholder="Email Address"
          />

          <input
            value={userData.speciality}
            onChange={(e)=>setUserData({...userData,speciality:e.target.value})}
            className="input-style"
            placeholder="Speciality"
          />

          <input
            value={userData.phone}
            onChange={(e)=>setUserData({...userData,phone:e.target.value})}
            className="input-style"
            placeholder="Phone Number"
          />

        </div>

        <button className="primary-btn">Save Profile</button>
      </div>


      {/* APP PREFERENCES */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
        <h2 className="font-semibold text-lg text-gray-900">Application Preferences</h2>

        <div className="setting-box">
          <p className="text-sm font-medium text-gray-700">Theme Mode</p>
          <select
            value={theme}
            onChange={(e)=>setTheme(e.target.value)}
            className="select-style"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="setting-box">
          <p className="text-sm font-medium text-gray-700">Email Notifications</p>
          <label className="switch">
            <input type="checkbox" checked={notif} onChange={()=>setNotif(!notif)}/>
            <span className="slider"></span>
          </label>
        </div>
      </div>


      {/* SECURITY SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
        <h2 className="font-semibold text-lg text-gray-900">Security</h2>

        <div className="setting-box">
          <div>
            <h3 className="font-medium text-gray-900 text-sm">Reset Password</h3>
            <p className="text-xs text-gray-500">Send password reset email</p>
          </div>
          <button onClick={() => auth.sendPasswordResetEmail(userData.email)} className="primary-btn">
            Reset
          </button>
        </div>
      </div>



{/* ========= CUSTOM CSS ============ */}
<style>{`
.input-style{border:1px solid #D1D5DB;padding:10px 12px;border-radius:10px;background:#F9FAFB;font-size:14px;transition:.25s;}
.input-style:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.25);background:white;}

.setting-box{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid #e5e7eb;border-radius:12px;}
.select-style{border:1px solid #D1D5DB;padding:8px 12px;border-radius:10px;background:#F9FAFB;font-size:14px}

.primary-btn{padding:8px 18px;background:#2563EB;color: #fff;border-radius:8px;font-size:14px;}
.primary-btn:hover{background:#1E40AF;}

.switch{position:relative;width:42px;height:22px;}
.switch input{display:none;}
.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#d1d5db;border-radius:34px;transition:.4s;}
.slider:before{content:"";position:absolute;height:18px;width:18px;left:2px;bottom:2px;background:white;border-radius:50%;transition:.4s;}
input:checked + .slider{background:#2563EB;}
input:checked + .slider:before{transform:translateX(20px);}
`}</style>

    </div>
  );
}
