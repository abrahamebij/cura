"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StaffLayout from "../StaffLayout";
import {
  FaPrescriptionBottleAlt,
  FaFilter,
  FaCheck,
  FaClock,
} from "react-icons/fa";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default filter: show all prescriptions

  useEffect(() => {
    setLoading(true);
    // Mock data for Dr. Sarah Johnson (staffId: "S001"), aligning patient names
    const mockPrescriptions = [
      {
        id: 1,
        patientId: "P001",
        patientName: "John Doe",
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        prescribedDate: "2025-03-10",
        refills: 2,
        status: "active",
      },
      {
        id: 2,
        patientId: "P002",
        patientName: "Jane Smith",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedDate: "2025-03-05",
        refills: 0,
        status: "expired",
      },
      {
        id: 3,
        patientId: "P003",
        patientName: "Alice Brown",
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "As needed",
        prescribedDate: "2025-03-01",
        refills: 1,
        status: "active",
      },
    ];

    setTimeout(() => {
      setPrescriptions(mockPrescriptions);
      setLoading(false);
    }, 800);
  }, []);

  // Format dates for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter prescriptions
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (filter === "all") return true;
    return prescription.status === filter;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="badge badge-success gap-1">
            <FaCheck size={10} /> Active
          </span>
        );
      case "expired":
        return (
          <span className="badge badge-error gap-1">
            <FaClock size={10} /> Expired
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <StaffLayout title="Prescriptions">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
              <FaPrescriptionBottleAlt /> Prescriptions
            </h1>
            <p className="text-gray-600 mt-1">
              Manage prescriptions for your patients
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
                    filter === "active" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "expired" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("expired")}
                >
                  Expired
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        ) : filteredPrescriptions.length > 0 ? (
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        {prescription.name} for {prescription.patientName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Dosage: {prescription.dosage} | Frequency:{" "}
                        {prescription.frequency}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Prescribed: {formatDate(prescription.prescribedDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Refills Remaining: {prescription.refills}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      {getStatusBadge(prescription.status)}
                      <div className="flex gap-x-2">
                        {prescription.status === "active" &&
                          prescription.refills > 0 && (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => alert("Refill Approved")}
                            >
                              Approve Refill
                            </button>
                          )}
                        <Link
                          href={`/staff/patients/${prescription.patientId}/prescriptions`}
                          className="btn btn-sm btn-secondary"
                        >
                          View History
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <FaPrescriptionBottleAlt className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No prescriptions found
              </h3>
              <p className="text-gray-500 mt-2">
                Prescriptions for your patients will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
