"use client";
import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";

import { FaFileAlt, FaFilter, FaDownload } from "react-icons/fa";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const mockRecords = [
      {
        id: 1,
        type: "Diagnosis",
        date: "2025-03-12",
        doctor: "Dr. Sarah Johnson",
        diagnosis: "Hypertension",
        treatment: "Prescribed Lisinopril 10mg daily",
        notes: "Follow-up in 1 month",
      },
      {
        id: 2,
        type: "Lab Result",
        date: "2025-03-10",
        doctor: "Dr. Michael Wilson",
        diagnosis: "Blood Glucose Test",
        treatment: "Normal range, continue Metformin",
        notes: "Results emailed to patient",
      },
      {
        id: 3,
        type: "Diagnosis",
        date: "2025-01-15",
        doctor: "Dr. Emily Roberts",
        diagnosis: "Mild Sprain",
        treatment: "Rest, Ibuprofen as needed",
        notes: "Resolved",
      },
    ];

    setTimeout(() => {
      setRecords(mockRecords);
      setLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRecords = records.filter((record) => {
    if (filter === "all") return true;
    return record.type.toLowerCase() === filter;
  });

  return (
    <StaffLayout title="Medical Records">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaFileAlt /> My Medical Records
            </h1>
            <p className="text-gray-600 mt-1">
              View your medical history and test results
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="font-medium">Filter:</span>
              <div className="join">
                <button
                  className={`btn btn-sm join-item ${
                    filter === "all" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "diagnosis" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("diagnosis")}
                >
                  Diagnoses
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "lab result" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("lab result")}
                >
                  Lab Results
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Records List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredRecords.length > 0 ? (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{record.type}</h3>
                      <p className="text-sm text-gray-600">
                        {record.diagnosis}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        By {record.doctor} on {formatDate(record.date)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Treatment: {record.treatment}
                      </p>
                      {record.notes && (
                        <p className="text-sm text-gray-500 mt-1">
                          Notes: {record.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="btn btn-sm btn-primary">
                        <FaDownload className="mr-2" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <FaFileAlt className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No records found
              </h3>
              <p className="text-gray-500 mt-2">
                Your medical records will appear here after your visits
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
