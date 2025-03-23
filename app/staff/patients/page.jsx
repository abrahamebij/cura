"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StaffLayout from "../StaffLayout";
import {
  FaUser,
  FaFilter,
  FaCalendarAlt,
  FaPrescriptionBottleAlt,
  FaFileAlt,
  FaUserInjured,
} from "react-icons/fa";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("lastVisit"); // Default filter: sort by last visit

  useEffect(() => {
    setLoading(true);
    // Mock data simulating patients assigned to Dr. Sarah Johnson (staffId: "S001")
    const mockPatients = [
      {
        id: "P001",
        name: "John Doe",
        lastVisit: "2025-03-12",
        bloodType: "A+",
        recentAppointment: "2025-03-12",
      },
      {
        id: "P002",
        name: "Jane Smith",
        lastVisit: "2025-03-10",
        bloodType: "O-",
        recentAppointment: "2025-03-10",
      },
      {
        id: "P003",
        name: "Alice Brown",
        lastVisit: "2025-02-28",
        bloodType: "B+",
        recentAppointment: "2025-02-28",
      },
    ];

    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, []);

  // Format dates for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort patients based on filter
  const sortedPatients = [...patients].sort((a, b) => {
    if (filter === "lastVisit") {
      return new Date(b.lastVisit) - new Date(a.lastVisit); // Most recent first
    } else if (filter === "name") {
      return a.name.localeCompare(b.name); // Alphabetical by name
    }
    return 0;
  });

  return (
    <StaffLayout title="My Patients">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
              <FaUserInjured /> My Patients
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your assigned patients
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="font-medium">Sort By:</span>
              <div className="join">
                <button
                  className={`btn btn-sm join-item ${
                    filter === "lastVisit" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("lastVisit")}
                >
                  Last Visit
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "name" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("name")}
                >
                  Name
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patients List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        ) : sortedPatients.length > 0 ? (
          <div className="space-y-4">
            {sortedPatients.map((patient) => (
              <div
                key={patient.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        Blood Type: {patient.bloodType}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Last Visit: {formatDate(patient.lastVisit)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Recent Appointment:{" "}
                        {formatDate(patient.recentAppointment)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/staff/patients/${patient.id}/records`}
                        className="btn btn-sm btn-primary"
                      >
                        <FaFileAlt className="mr-2" /> View Records
                      </Link>
                      <Link
                        href={`/staff/patients/${patient.id}/appointments`}
                        className="btn btn-sm btn-secondary"
                      >
                        <FaCalendarAlt className="mr-2" /> Schedule Appointment
                      </Link>
                      <Link
                        href={`/staff/patients/${patient.id}/prescriptions`}
                        className="btn btn-sm btn-warning"
                      >
                        <FaPrescriptionBottleAlt className="mr-2" /> Manage
                        Prescriptions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <FaUser className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No patients assigned
              </h3>
              <p className="text-gray-500 mt-2">
                Patients assigned to you will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
