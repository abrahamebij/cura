"use client";
import { useState, useEffect } from "react";
import PatientLayout from "../PatientLayout";
import {
  FaPrescriptionBottleAlt,
  FaFilter,
  FaPlus,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    setLoading(true);
    const mockPrescriptions = [
      {
        id: 101,
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedDate: "2025-03-12",
        refills: 2,
        status: "active",
        doctor: "Dr. Sarah Johnson",
      },
      {
        id: 102,
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedDate: "2025-03-10",
        refills: 5,
        status: "active",
        doctor: "Dr. Michael Wilson",
      },
      {
        id: 103,
        name: "Ibuprofen",
        dosage: "200mg",
        frequency: "As needed",
        prescribedDate: "2025-01-15",
        refills: 0,
        status: "expired",
        doctor: "Dr. Emily Roberts",
      },
    ];

    setTimeout(() => {
      setPrescriptions(mockPrescriptions);
      setLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (filter === "all") return true;
    return prescription.status === filter;
  });

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
            <FaTimes size={10} /> Expired
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <PatientLayout title="Prescriptions">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
              <FaPrescriptionBottleAlt /> My Prescriptions
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your medication prescriptions
            </p>
          </div>
          <button className="btn btn-secondary">
            <FaPlus className="mr-2" /> Request New Prescription
          </button>
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
                        {prescription.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {prescription.dosage}, {prescription.frequency}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Prescribed by {prescription.doctor} on{" "}
                        {formatDate(prescription.prescribedDate)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Refills Remaining: {prescription.refills}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(prescription.status)}
                      {prescription.status === "active" && (
                        <button className="btn btn-sm btn-secondary">
                          Request Refill
                        </button>
                      )}
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
                Contact your doctor to request a new prescription
              </p>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}

export default Prescriptions;
