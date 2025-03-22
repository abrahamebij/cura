"use client";
import { useState, useEffect } from "react";
import PatientLayout from "../PatientLayout";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaMapMarkerAlt,
  FaPlus,
  FaFilter,
  FaCheck,
  FaTimes,
  FaHospital,
  FaPhoneAlt,
  FaVideo,
  FaEllipsisV,
} from "react-icons/fa";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);

  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);

    // Mock data
    const mockAppointments = [
      {
        id: 1,
        date: "2025-03-22",
        time: "10:00 AM",
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        location: "Main Hospital, Building A, Room 304",
        status: "confirmed",
        type: "in-person",
        notes: "Remember to bring your medication list",
        contact: "+1 (555) 123-4567",
      },
      {
        id: 2,
        date: "2025-04-05",
        time: "2:30 PM",
        doctor: "Dr. Michael Wilson",
        specialty: "General Medicine",
        location: "Downtown Clinic, Suite 101",
        status: "pending",
        type: "in-person",
        notes: "",
        contact: "+1 (555) 987-6543",
      },
      {
        id: 3,
        date: "2025-03-25",
        time: "11:15 AM",
        doctor: "Dr. Emily Roberts",
        specialty: "Dermatology",
        location: "Virtual Visit",
        status: "confirmed",
        type: "telehealth",
        notes:
          "Login link will be sent via email 10 minutes before appointment",
        contact: "+1 (555) 345-6789",
      },
      {
        id: 4,
        date: "2025-01-15",
        time: "9:00 AM",
        doctor: "Dr. Robert Chen",
        specialty: "Orthopedics",
        location: "Sports Medicine Center, 2nd Floor",
        status: "completed",
        type: "in-person",
        notes: "Follow-up on knee rehabilitation",
        contact: "+1 (555) 234-5678",
      },
      {
        id: 5,
        date: "2025-01-30",
        time: "3:45 PM",
        doctor: "Dr. Lisa Brown",
        specialty: "Neurology",
        location: "Medical Pavilion, Suite 405",
        status: "cancelled",
        type: "in-person",
        notes: "Rescheduling needed",
        contact: "+1 (555) 876-5432",
      },
    ];

    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  }, []);

  // Function to format dates in more readable format
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter appointments based on status
  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "all") return true;
    if (filter === "upcoming")
      return ["confirmed", "pending"].includes(appt.status);
    return appt.status === filter;
  });

  // Sort appointments by date, with upcoming first
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    // First sort by status (completed/cancelled go last)
    if (
      ["completed", "cancelled"].includes(a.status) &&
      !["completed", "cancelled"].includes(b.status)
    )
      return 1;
    if (
      !["completed", "cancelled"].includes(a.status) &&
      ["completed", "cancelled"].includes(b.status)
    )
      return -1;

    // Then sort by date
    return new Date(a.date) - new Date(b.date);
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="badge badge-success gap-1">
            <FaCheck size={10} /> Confirmed
          </span>
        );
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "completed":
        return <span className="badge badge-info">Completed</span>;
      case "cancelled":
        return (
          <span className="badge badge-error gap-1">
            <FaTimes size={10} /> Cancelled
          </span>
        );
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case "telehealth":
        return <FaVideo className="text-primary" />;
      case "in-person":
      default:
        return <FaHospital className="text-primary" />;
    }
  };

  return (
    <PatientLayout title="Appointments">
      <div className="flex flex-col space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaCalendarAlt /> My Appointments
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your upcoming and past medical appointments
            </p>
          </div>

          <button
            onClick={() => setShowNewAppointmentModal(true)}
            className="btn btn-primary"
          >
            <FaPlus className="mr-2" /> New Appointment
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
                    filter === "upcoming" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "confirmed" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("confirmed")}
                >
                  Confirmed
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
                    filter === "completed" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
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
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Date and Time */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                        <div className="text-center">
                          <div className="text-xs font-bold text-primary">
                            {new Date(appointment.date).toLocaleDateString(
                              undefined,
                              { month: "short" }
                            )}
                          </div>
                          <div className="text-xl font-bold text-primary">
                            {new Date(appointment.date).getDate()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          {appointment.doctor}
                          <span className="text-sm font-normal text-gray-500">
                            ({appointment.specialty})
                          </span>
                        </h3>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <FaClock /> {appointment.time}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            {getAppointmentTypeIcon(appointment.type)}
                            <span>
                              {appointment.type === "telehealth"
                                ? "Virtual Visit"
                                : appointment.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      {getStatusBadge(appointment.status)}

                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-sm btn-circle"
                        >
                          <FaEllipsisV />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          {appointment.status !== "completed" &&
                            appointment.status !== "cancelled" && (
                              <>
                                <li>
                                  <a>Reschedule</a>
                                </li>
                                <li>
                                  <a className="text-error">Cancel</a>
                                </li>
                              </>
                            )}
                          <li>
                            <a>View Details</a>
                          </li>
                          {appointment.type === "telehealth" &&
                            appointment.status === "confirmed" && (
                              <li>
                                <a className="text-primary">Join Video Call</a>
                              </li>
                            )}
                          <li>
                            <a>Add to Calendar</a>
                          </li>
                          <li>
                            <a
                              href={`tel:${appointment.contact.replace(
                                /[^\d+]/g,
                                ""
                              )}`}
                            >
                              <FaPhoneAlt className="mr-2" /> Call Office
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 p-2 bg-base-200 rounded-md text-sm">
                      <span className="font-medium">Notes:</span>{" "}
                      {appointment.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <div className="text-gray-400 text-5xl mb-4">
                <FaCalendarAlt className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600">
                No appointments found
              </h3>
              <p className="text-gray-500 mt-2">
                {filter !== "all"
                  ? "Try changing your filter or schedule a new appointment"
                  : "Schedule your first appointment to get started"}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowNewAppointmentModal(true)}
                  className="btn btn-primary"
                >
                  <FaPlus className="mr-2" /> New Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Schedule New Appointment</h3>
            <button
              onClick={() => setShowNewAppointmentModal(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>

            <form className="py-4">
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Appointment Type</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled>Select type</option>
                  <option value="in-person">In-Person Visit</option>
                  <option value="telehealth">Telehealth (Video)</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="annual">Annual Physical</option>
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Specialty</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select specialty
                  </option>
                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Psychiatry</option>
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Doctor</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select doctor
                  </option>
                  <option>Dr. Sarah Johnson</option>
                  <option>Dr. Michael Wilson</option>
                  <option>Dr. Emily Roberts</option>
                  <option>Dr. Robert Chen</option>
                  <option>Dr. Lisa Brown</option>
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Preferred Date</span>
                </label>
                <input type="date" className="input input-bordered w-full" />
              </div>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text">Preferred Time</span>
                </label>
                <select className="select select-bordered w-full">
                  <option disabled selected>
                    Select time
                  </option>
                  <option>Morning (8AM - 12PM)</option>
                  <option>Afternoon (12PM - 5PM)</option>
                  <option>Evening (5PM - 8PM)</option>
                </select>
              </div>

              <div className="form-control mb-5">
                <label className="label">
                  <span className="label-text">Reason for Visit</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Briefly describe the reason for your appointment"
                ></textarea>
              </div>

              <div className="alert alert-info mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  You will receive a confirmation once your appointment request
                  has been processed.
                </span>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Handle form submission
                    setShowNewAppointmentModal(false);
                  }}
                  className="btn btn-primary"
                >
                  Request Appointment
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowNewAppointmentModal(false)}
          ></div>
        </div>
      )}
    </PatientLayout>
  );
}
