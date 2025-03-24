"use client"; // Enables client-side rendering in Next.js

import { useState, useEffect } from "react";
import Link from "next/link";
import PatientLayout from "../PatientLayout"; // Assuming you have a PatientLayout component
import {
  FaCalendarAlt,
  FaFilter,
  FaClock,
  FaCheck,
  FaUserMd,
} from "react-icons/fa";

// Define the Appointment type based on the Patient schema
interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  status: "confirmed" | "pending" | "cancelled";
  type: "in-person" | "telehealth";
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("date"); // Default filter: sort by date

  useEffect(() => {
    setLoading(true);
    // Mock data for a patient (e.g., John Doe, patientId: "P001")
    const mockAppointments: Appointment[] = [
      {
        id: "1",
        date: "2025-03-12",
        time: "10:00 AM",
        doctor: "Dr. Sarah Johnson",
        status: "confirmed",
        type: "in-person",
      },
      {
        id: "2",
        date: "2025-03-15",
        time: "11:30 AM",
        doctor: "Dr. Choi",
        status: "pending",
        type: "telehealth",
      },
      {
        id: "3",
        date: "2025-03-20",
        time: "02:00 PM",
        doctor: "Dr. Sarah Johnson",
        status: "confirmed",
        type: "in-person",
      },
    ];

    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  }, []);

  // Format dates for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort appointments based on filter
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (filter === "date") {
      return new Date(a.date).getTime() - new Date(b.date).getTime(); // Earliest date first
    } else if (filter === "status") {
      const statusOrder = { confirmed: 1, pending: 2, cancelled: 3 };
      return statusOrder[a.status] - statusOrder[b.status]; // Sort by status
    }
    return 0;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="badge badge-success gap-1">
            <FaCheck size={10} /> Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="badge badge-warning gap-1">
            <FaClock size={10} /> Pending
          </span>
        );
      case "cancelled":
        return <span className="badge badge-error gap-1">Cancelled</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  // Mock reschedule action
  const handleReschedule = (id: string) => {
    alert(`Reschedule appointment ${id} (mock action)`);
  };

  // Mock cancel action
  const handleCancel = (id: string) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
    alert(`Cancelled appointment ${id} (mock action)`);
  };

  return (
    <PatientLayout title="My Appointments">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaCalendarAlt /> My Appointments
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage your upcoming appointments
            </p>
          </div>
          <Link href="/patient/appointments/book" className="btn btn-primary">
            Book New Appointment
          </Link>
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
                    filter === "date" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("date")}
                >
                  Date
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "status" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("status")}
                >
                  Status
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : sortedAppointments.length > 0 ? (
          <div className="space-y-4">
            {sortedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <FaUserMd /> {appointment.doctor}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(appointment.date)} at {appointment.time}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.type === "telehealth"
                          ? "Virtual Visit"
                          : "In-Person"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(appointment.status)}
                      {appointment.status !== "cancelled" && (
                        <>
                          <button
                            onClick={() => handleReschedule(appointment.id)}
                            className="btn btn-sm btn-warning"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            className="btn btn-sm btn-error"
                          >
                            Cancel
                          </button>
                        </>
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
              <FaCalendarAlt className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No appointments found
              </h3>
              <p className="text-gray-500 mt-2">
                Book a new appointment to get started
              </p>
              <Link
                href="/patient/appointments/book"
                className="btn btn-primary mt-4"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
