import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomeRoute from "./pages/home/HomeRoute";
import AboutRoute from "./pages/about/AboutRoute";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import PrivateRoute from "./pages/auth/PrivateRoute";
import DoctorAdminPanel from "./admin_dashbord/panel_design/AdminPanelRoute";

// ==== MODULE PAGES (must be created) sidebar code module ====
import Dashboard from "./admin_dashbord/Dashboard";
import Patients from "./admin_dashbord/Patients";
import OcrDocs from "./admin_dashbord/OcrDocs";
import Investigations from "./admin_dashbord/Investigations";
import DischargeSummary from "./admin_dashbord/DischargeSummary";
import StaffAccess from "./admin_dashbord/StaffAccess";
import Settings from "./admin_dashbord/Settings";
import Sharing from "./admin_dashbord/sharing";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        {/* Protected Area (Dashboard) */}
        <Route
          path="/doctor/admin/*"
          element={
            <PrivateRoute>
              <DoctorAdminPanel />
            </PrivateRoute>
          }
        >
          {/* NESTED ROUTES = OPEN INSIDE DASHBOARD */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="ocr-documents" element={<OcrDocs />} />
          <Route path="investigations" element={<Investigations />} />
          <Route path="discharge-summary" element={<DischargeSummary />} />
          <Route path="staff-access" element={<StaffAccess />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sharing" element={<Sharing />} />

          {/* DEFAULT */}
          <Route index element={<Dashboard />} />
        </Route>

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
