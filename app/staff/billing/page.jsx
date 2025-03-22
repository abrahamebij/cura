"use client";
import { useState, useEffect } from "react";
import PatientLayout from "../PatientLayout";
import { FaCreditCard, FaFilter, FaCheck, FaClock } from "react-icons/fa";

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const mockBills = [
      {
        id: 201,
        service: "Cardiology Consultation",
        amount: 175.0,
        date: "2025-03-12",
        status: "pending",
      },
      {
        id: 202,
        service: "Laboratory Tests",
        amount: 220.5,
        date: "2025-03-10",
        status: "paid",
      },
      {
        id: 203,
        service: "Orthopedic Follow-up",
        amount: 150.0,
        date: "2025-01-15",
        status: "paid",
      },
    ];

    setTimeout(() => {
      setBills(mockBills);
      setLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredBills = bills.filter((bill) => {
    if (filter === "all") return true;
    return bill.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="badge badge-success gap-1">
            <FaCheck size={10} /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="badge badge-warning gap-1">
            <FaClock size={10} /> Pending
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <PatientLayout title="Billing">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-warning flex items-center gap-2">
              <FaCreditCard /> My Billing
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your hospital bills
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
                    filter === "pending" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "paid" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("paid")}
                >
                  Paid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bills List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-warning"></span>
          </div>
        ) : filteredBills.length > 0 ? (
          <div className="space-y-4">
            {filteredBills.map((bill) => (
              <div
                key={bill.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{bill.service}</h3>
                      <p className="text-sm text-gray-600">
                        ${bill.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Date: {formatDate(bill.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(bill.status)}
                      {bill.status === "pending" && (
                        <button className="btn btn-sm btn-warning">
                          Pay Now
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
              <FaCreditCard className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No bills found
              </h3>
              <p className="text-gray-500 mt-2">
                Your billing history will appear here after services
              </p>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
