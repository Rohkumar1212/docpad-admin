import React from "react";
import {
  Users,
  FileText,
  Activity,
  CalendarCheck,
  User,
  Clock,
  BriefcaseMedical,
} from "lucide-react";

// ==========================================================
// METRIC CARD
// ==========================================================
const CardMetricNew = ({ title, value, change, icon: Icon, iconBg }) => (
  <div
    className={`p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] ${iconBg}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          {value}
        </h2>
      </div>

      <div className="p-2 sm:p-3 rounded-full bg-white/20 text-white">
        <Icon size={22} />
      </div>
    </div>
    <p className="text-xs text-white/70 mt-3">{change}</p>
  </div>
);

// ==========================================================
// APPOINTMENT CARD
// ==========================================================
const AppointmentCardNew = ({ name, type, time, color }) => (
  <div className="p-3 border-l-4 border-sky-500 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
    <div>
      <p className="font-semibold text-gray-800 flex items-center">
        <User size={14} className="mr-2 text-sky-500" />
        {name}
      </p>
      <p className="text-xs text-gray-500 ml-5">{type}</p>
    </div>
    <div className={`text-xs sm:text-sm font-bold ${color} flex items-center`}>
      <Clock size={12} className="mr-1" />
      {time}
    </div>
  </div>
);

// ==========================================================
// PATIENT CARD
// ==========================================================
const PatientAccessCard = ({ name, role }) => (
  <div className="min-w-[100px] text-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer">
    <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center mb-2">
      <User size={20} className="text-sky-600" />
    </div>
    <p className="text-sm font-semibold text-gray-800">{name}</p>
    <p className="text-xs text-sky-500 font-medium">{role}</p>
  </div>
);

// ==========================================================
// FINAL DASHBOARD (FULL SCREEN + RESPONSIVE)
// ==========================================================
export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 md:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10 select-none">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center">
            <BriefcaseMedical
              size={26}
              className="text-sky-500 mr-2 sm:mr-3"
            />
            Clinic Dashboard
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Clinic activity | Patient flow | Medical record analytics
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <CardMetricNew
            title="Total Patients"
            value="124"
            change="+12 this week (9.7% increase)"
            icon={Users}
            iconBg="bg-gradient-to-br from-sky-500 to-sky-700"
          />

          <CardMetricNew
            title="OCR Documents"
            value="341"
            change="+28 uploaded (8.2% new docs)"
            icon={FileText}
            iconBg="bg-gradient-to-br from-indigo-500 to-indigo-700"
          />

          <CardMetricNew
            title="Investigations"
            value="89"
            change="5 pending review (High Priority)"
            icon={Activity}
            iconBg="bg-gradient-to-br from-emerald-500 to-emerald-700"
          />

          <CardMetricNew
            title="Active Follow-Ups"
            value="43"
            change="Next 7 days (Plan your week)"
            icon={CalendarCheck}
            iconBg="bg-gradient-to-br from-rose-500 to-rose-700"
          />
        </div>

        {/* CENTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">

          {/* GRAPH */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-xl p-5 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Patients Analytics (Monthly Flow)
            </h2>

            <div className="h-56 sm:h-80 rounded-xl bg-sky-50 border-2 border-dashed border-sky-200 flex items-center justify-center text-sky-400 text-sm sm:text-lg font-semibold">
              <Activity size={24} className="mr-2" />
              Graph Coming Soon...
            </div>
          </div>

          {/* APPOINTMENTS */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xl p-5 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Upcoming Appointments
            </h2>

            <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[330px] pr-2">
              <AppointmentCardNew name="Amit Sharma" type="Review Consultation" time="10:30 AM" color="text-sky-600" />
              <AppointmentCardNew name="Priya Gupta" type="MRI Report Discussion" time="11:45 AM" color="text-sky-600" />
              <AppointmentCardNew name="Sneha Patil" type="Blood Test Follow-up" time="02:10 PM" color="text-green-600" />
              <AppointmentCardNew name="Rohit Verma" type="General Checkup" time="04:00 PM" color="text-rose-600" />
              <AppointmentCardNew name="Rahul Jain" type="Cardio Follow-Up" time="05:30 PM" color="text-sky-600" />
              <AppointmentCardNew name="Kajal Deshmukh" type="New Patient Intake" time="06:30 PM" color="text-rose-600" />
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* QUICK ACCESS */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-5 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Quick Patient Access
            </h2>

            <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 no-scrollbar">
              {["Amit Sharma", "Priya Gupta", "Sneha Patil", "Rohit Verma", "Arjun Reddy", "Kajal Deshmukh"].map(
                (name, index) => (
                  <PatientAccessCard
                    key={index}
                    name={name.split(" ")[0]}
                    role="View Record"
                  />
                )
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-5 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Recent EMR Activity Feed
            </h2>

            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-sky-500 mr-3">•</span>
                <span>
                  <b className="text-gray-900">OCR Processed</b> — Blood Report for <b className="text-sky-600">Priya G</b>
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-green-500 mr-3">•</span>
                <span>
                  <b className="text-gray-900">Investigation Updated</b> — <b className="text-green-600">ECG + Lipid Panel</b> completed
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-indigo-500 mr-3">•</span>
                <span>
                  <b className="text-gray-900">Doctor Note Added</b> — New note for <b className="text-indigo-600">Amit Sharma</b>
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-rose-500 mr-3">•</span>
                <span>
                  <b className="text-gray-900">Discharge Finalized</b> — Completed for <b className="text-rose-600">Sneha P</b>
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>
                  <b className="text-gray-900">New Patient Registered</b> — Welcome <b className="text-yellow-600">Rahul Jain</b>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
