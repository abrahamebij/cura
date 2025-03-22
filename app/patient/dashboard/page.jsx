"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PatientLayout from "../PatientLayout";
import {
  FaCalendarAlt,
  FaPrescriptionBottleAlt,
  FaCreditCard,
  FaBell,
  FaHeartbeat,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { findOnePatient } from "../../database/handlers/patient";

export default function Dashboard() {
  // In a real application, you would fetch this data from your API
  const { data } = useSession();
  const [patientData, setPatientData] = useState({});
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);

  // Simulate loading data from an API
  useEffect(() => {
    setLoading(true);
    //  fetch data from db
    if (data) {
      (async function () {
        const result = JSON.parse(await findOnePatient(data.user));
        // console.log(result.response.appointments.length);
        setPatientData(result.response);
        setLoading(false);
      })();
    }
  }, [data]);

  // const [patientData, setPatientData] = useState({
  //   name: "John Doe",
  //   age: 42,
  //   bloodType: "A+",
  //   lastCheckup: "2025-03-01",
  //   upcomingAppointments: [
  //     {
  //       id: 1,
  //       date: "2025-03-20",
  //       time: "10:00 AM",
  //       doctor: "Dr. Sarah Johnson",
  //       department: "Cardiology",
  //       status: "Confirmed",
  //     },
  //     {
  //       id: 2,
  //       date: "2025-04-05",
  //       time: "2:30 PM",
  //       doctor: "Dr. Michael Wilson",
  //       department: "General Checkup",
  //       status: "Pending",
  //     },
  //   ],
  //   recentPrescriptions: [
  //     {
  //       id: 101,
  //       name: "Lisinopril",
  //       dosage: "10mg",
  //       frequency: "Once daily",
  //       prescribed: "2025-03-12",
  //       refills: 2,
  //     },
  //     {
  //       id: 102,
  //       name: "Metformin",
  //       dosage: "500mg",
  //       frequency: "Twice daily",
  //       prescribed: "2025-03-10",
  //       refills: 5,
  //     },
  //   ],
  //   pendingBills: [
  //     {
  //       id: 201,
  //       service: "Cardiology Consultation",
  //       amount: 175.0,
  //       date: "2025-03-12",
  //       status: "Pending",
  //     },
  //     {
  //       id: 202,
  //       service: "Laboratory Tests",
  //       amount: 220.5,
  //       date: "2025-03-12",
  //       status: "Processing",
  //     },
  //   ],
  //   notifications: [
  //     {
  //       id: 301,
  //       message: "Your lab results are ready to view",
  //       date: "2025-03-15",
  //       read: false,
  //       priority: "high",
  //     },
  //     {
  //       id: 302,
  //       message: "Appointment reminder: Cardiology, March 20th",
  //       date: "2025-03-14",
  //       read: true,
  //       priority: "medium",
  //     },
  //     {
  //       id: 303,
  //       message: "New message from Dr. Johnson",
  //       date: "2025-03-13",
  //       read: false,
  //       priority: "medium",
  //     },
  //   ],
  //   vitalStats: [
  //     {
  //       name: "Blood Pressure",
  //       value: "120/80 mmHg",
  //       date: "2025-03-01",
  //       status: "normal",
  //     },
  //     {
  //       name: "Heart Rate",
  //       value: "72 bpm",
  //       date: "2025-03-01",
  //       status: "normal",
  //     },
  //     {
  //       name: "Blood Glucose",
  //       value: "95 mg/dL",
  //       date: "2025-03-01",
  //       status: "normal",
  //     },
  //     {
  //       name: "Cholesterol",
  //       value: "185 mg/dL",
  //       date: "2025-03-01",
  //       status: "normal",
  //     },
  //   ],
  // });

  // Function to format dates in more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // // Count unread notifications
  // const unreadCount = patientData.notifications.filter((n) => !n.read).length;

  return (
    <PatientLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary rounded-md p-3 text-white">
                  <FaHeartbeat className="w-6 h-6" />
                </div>
                <div className="ml-5">
                  <h3 className="card-title text-lg text-primary">
                    Welcome, {patientData.name}
                  </h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      Blood Group:{" "}
                      <span className="uppercase inline">
                        {patientData.bloodGroup}
                      </span>{" "}
                      | Age:{" "}
                      {new Date().getFullYear() -
                        new Date(`${patientData.dob}`).getFullYear()}
                      {/* | Last Checkup:{" "}
                      {formatDate(patientData.lastCheckup)} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Appointments */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary rounded-md p-3 text-white">
                    <FaCalendarAlt className="w-6 h-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-600">
                      Upcoming Appointments
                    </h3>
                    <p className="text-lg font-medium">
                      {patientData.appointments.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end bg-gray-100 p-4">
                <Link
                  href="/patient/appointments"
                  className="btn btn-link btn-sm text-primary"
                >
                  View all
                </Link>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-secondary rounded-md p-3 text-white">
                    <FaPrescriptionBottleAlt className="w-6 h-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-600">
                      Active Prescriptions
                    </h3>
                    <p className="text-lg font-medium">
                      {patientData.prescriptions.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end bg-gray-100 p-4">
                <Link
                  href="/patient/prescriptions"
                  className="btn btn-link btn-sm text-secondary"
                >
                  Manage prescriptions
                </Link>
              </div>
            </div>

            {/* Billing */}
            {/* <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-warning rounded-md p-3 text-white">
                    <FaCreditCard className="w-6 h-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-600">
                      Pending Bills
                    </h3>
                    <p className="text-lg font-medium">
                      $
                      {patientData.pendingBills
                        .reduce((sum, bill) => sum + bill.amount, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end bg-gray-100 p-4">
                <Link
                  href="/patient/billing"
                  className="btn btn-link btn-sm text-warning"
                >
                  Pay bills
                </Link>
              </div>
            </div> */}

            {/* Notifications */}
            {/* <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-error rounded-md p-3 text-white">
                    <FaBell className="w-6 h-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-600">
                      Unread Notifications
                    </h3>
                    <p className="text-lg font-medium">{unreadCount}</p>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end bg-gray-100 p-4">
                <button className="btn btn-link btn-sm text-error">
                  Mark all as read
                </button>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Upcoming Appointments */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-primary flex items-center">
                    <FaCalendarAlt className="w-5 h-5 mr-2" /> Upcoming
                    Appointments
                  </h3>
                  <Link
                    href="/patient/appointments"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View All
                  </Link>
                </div>
                <div className="divider my-2"></div>
                {patientData.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {patientData.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex justify-between items-center p-3 bg-base-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.department}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500">
                              {formatDate(appointment.date)} at{" "}
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`badge ${
                              appointment.status === "Confirmed"
                                ? "badge-primary"
                                : "badge-warning"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming appointments</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-secondary flex items-center">
                    <FaPrescriptionBottleAlt className="w-5 h-5 mr-2" /> Recent
                    Prescriptions
                  </h3>
                  <Link
                    href="/patient/prescriptions"
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    View All
                  </Link>
                </div>
                <div className="divider my-2"></div>
                {patientData.prescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {patientData.prescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="flex justify-between items-center p-3 bg-base-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{prescription.name}</p>
                          <p className="text-sm text-gray-600">
                            {prescription.dosage}, {prescription.frequency}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-500">
                              Prescribed: {formatDate(prescription.prescribed)}{" "}
                              • Refills: {prescription.refills}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-xs btn-secondary">
                            Refill
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No active prescriptions</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vital Stats */}
          {/* <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="card-title text-primary flex items-center">
                  <FaChartBar className="w-5 h-5 mr-2" /> Vital Statistics
                </h3>
                <Link
                  href="/patient/health"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View History
                </Link>
              </div>
              <div className="divider my-2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {patientData.vitalStats.map((stat, index) => (
                  <div key={index} className="stat bg-base-200 rounded-box">
                    <div className="stat-title text-xs">{stat.name}</div>
                    <div className="stat-value text-lg">{stat.value}</div>
                    <div className="stat-desc flex items-center">
                      <span
                        className={`badge badge-xs ${
                          stat.status === "normal"
                            ? "badge-success"
                            : stat.status === "warning"
                            ? "badge-warning"
                            : "badge-error"
                        } mr-1`}
                      ></span>
                      {stat.status.charAt(0).toUpperCase() +
                        stat.status.slice(1)}{" "}
                      • {formatDate(stat.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Notifications */}
          {/* <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="card-title text-error flex items-center">
                  <FaBell className="w-5 h-5 mr-2" /> Recent Notifications
                </h3>
                <button className="btn btn-sm btn-outline btn-error">
                  Mark All as Read
                </button>
              </div>
              <div className="divider my-2"></div>
              {patientData.notifications.length > 0 ? (
                <div className="space-y-3">
                  {patientData.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`alert ${
                        notification.priority === "high"
                          ? "alert-error"
                          : notification.priority === "medium"
                          ? "alert-warning"
                          : "alert-info"
                      } ${notification.read ? "opacity-60" : ""}`}
                    >
                      <div>
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">
                            {notification.message}
                          </span>
                          <span className="text-xs">
                            {formatDate(notification.date)}
                          </span>
                        </div>
                        {!notification.read && (
                          <span className="badge badge-xs badge-error ml-2"></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No notifications</p>
                </div>
              )}
            </div>
          </div> */}
        </div>
      )}
    </PatientLayout>
  );
}
