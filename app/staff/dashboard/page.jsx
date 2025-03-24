"use client";

import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";
import {
  Calendar,
  Users,
  CheckSquare,
  User,
  FileText,
  Filter,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const mockAppointments = [
  {
    _id: "appt_001",
    patientId: "patient_001",
    patientName: "John Smith",
    date: new Date("2025-03-19T10:30:00"),
    status: "confirmed",
    reason: "Chest pain follow-up",
    notes: "Patient reported improvement after medication change",
  },
  {
    _id: "appt_002",
    patientId: "patient_002",
    patientName: "Emma Davis",
    date: new Date("2025-03-19T14:15:00"),
    status: "pending",
    reason: "Initial consultation",
    notes: "",
  },
  {
    _id: "appt_003",
    patientId: "patient_003",
    patientName: "Michael Brown",
    date: new Date("2025-03-19T16:00:00"),
    status: "confirmed",
    reason: "Post-surgery check-up",
    notes: "Check incision site",
  },
  {
    _id: "appt_004",
    patientId: "patient_004",
    patientName: "Sophia Wilson",
    date: new Date("2025-03-20T09:30:00"),
    status: "confirmed",
    reason: "Annual check-up",
    notes: "",
  },
];

const mockPatients = [
  {
    _id: "patient_001",
    name: "John Smith",
    age: 58,
    lastVisit: new Date("2025-02-15"),
    condition: "Hypertension",
    status: "stable",
  },
  {
    _id: "patient_002",
    name: "Emma Davis",
    age: 42,
    lastVisit: null, // New patient
    condition: "Unknown",
    status: "new",
  },
  {
    _id: "patient_003",
    name: "Michael Brown",
    age: 65,
    lastVisit: new Date("2025-03-05"),
    condition: "Post cardiac surgery",
    status: "recovering",
  },
  {
    _id: "patient_004",
    name: "Sophia Wilson",
    age: 35,
    lastVisit: new Date("2024-03-19"),
    condition: "Arrhythmia",
    status: "stable",
  },
  {
    _id: "patient_005",
    name: "Robert Johnson",
    age: 70,
    lastVisit: new Date("2025-03-10"),
    condition: "Congestive Heart Failure",
    status: "critical",
  },
];

const mockTasks = [
  {
    _id: "task_001",
    type: "prescription",
    patientName: "John Smith",
    description: "Approve medication refill request",
    priority: "high",
    dueDate: new Date("2025-03-19"),
  },
  {
    _id: "task_002",
    type: "lab",
    patientName: "Michael Brown",
    description: "Review post-op lab results",
    priority: "high",
    dueDate: new Date("2025-03-19"),
  },
  {
    _id: "task_003",
    type: "referral",
    patientName: "Sophia Wilson",
    description: "Complete referral to electro-physiologist",
    priority: "medium",
    dueDate: new Date("2025-03-20"),
  },
  {
    _id: "task_004",
    type: "note",
    patientName: "Robert Johnson",
    description: "Update treatment plan notes",
    priority: "low",
    dueDate: new Date("2025-03-21"),
  },
];

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function to format time
const formatTime = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function StaffDashboard() {
  // State for loading and filters
  const [loading, setLoading] = useState(true);
  const [appointmentFilter, setAppointmentFilter] = useState("all");
  const [patientFilter, setPatientFilter] = useState("all");
  const [taskFilter, setTaskFilter] = useState("all");
  const [mockStaff, setMockStaff] = useState({
    _id: "",
    name: "",
    staffId: "",
    role: "",
    specialty: "",
    email: "",
    phone: "",
    department: "",
    availability: [],
  });
  const router = useRouter();
  // const staffId = "staff_001";
  const [staffId, setStaffId] = useState("");

  // Simulate API fetch delay
  useEffect(() => {
    if (typeof window !== "undefined") {
      setStaffId(window.localStorage.getItem("staffId"));
    }
    // (function generateMockStaff() {
    if (staffId === null) {
      router.push("/login");
      toast.error("Invalid Authentication");
    } else if (staffId === "staff_001") {
      setMockStaff({
        _id: "staff_001",
        name: "Dr. Choi Lee",
        staffId: "S001",
        role: "Doctor",
        specialty: "Surgery",
        email: "choi.lee@cura.com",
        phone: "+1 (555) 324-6948",
        department: "Surgery",
        availability: [
          {
            day: "Tuesday",
            slots: ["11:00 AM - 2:00 PM", "6:00 PM - 9:00 PM"],
          },
          {
            day: "Wednesday",
            slots: ["8:00 AM - 11:00 AM", "2:00 PM - 5:00 PM"],
          },
          { day: "Friday", slots: ["7:00 AM - 12:00 PM"] },
        ],
      });
      setLoading(false);
    } else if (staffId === "staff_002") {
      setMockStaff({
        _id: "staff_001",
        name: "Dr. Sarah Johnson",
        staffId: "S001",
        role: "Doctor",
        specialty: "Cardiology",
        email: "sarah.johnson@cura.com",
        phone: "+1 (555) 123-4567",
        department: "Cardiology",
        availability: [
          {
            day: "Monday",
            slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          },
          {
            day: "Wednesday",
            slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
          },
          { day: "Friday", slots: ["9:00 AM - 12:00 PM"] },
        ],
      });
      setLoading(false);
    }
    // log
    setLoading(false);
    // })();
    console.log(staffId);
  }, [staffId]);

  // Filter appointments based on selected filter
  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (appointmentFilter === "all") return true;
    return appointment.status === appointmentFilter;
  });

  // Filter patients based on selected filter
  const filteredPatients = mockPatients.filter((patient) => {
    if (patientFilter === "all") return true;
    return patient.status === patientFilter;
  });

  // Filter tasks based on selected filter
  const filteredTasks = mockTasks.filter((task) => {
    if (taskFilter === "all") return true;
    return task.priority === taskFilter;
  });

  // Get today's appointments
  const todaysAppointments = filteredAppointments.filter((appointment) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    // Loading skeleton component
    <StaffLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex flex-col gap-6">
            {/* Welcome Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h1 className="text-2xl font-bold">
                  Welcome, {mockStaff.name}
                </h1>
                <p className="text-base-content/70">
                  {mockStaff.role}, {mockStaff.specialty}
                </p>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Upcoming Appointments Card */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">Upcoming Appointments</h2>
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">
                    {todaysAppointments.length}
                  </p>
                  <p className="text-base-content/70">scheduled for today</p>
                </div>
              </div>

              {/* Assigned Patients Card */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">Assigned Patients</h2>
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold">{mockPatients.length}</p>
                  <p className="text-base-content/70">under your care</p>
                </div>
              </div>

              {/* Pending Tasks Card */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">Pending Tasks</h2>
                    <CheckSquare className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold">{mockTasks.length}</p>
                  <p className="text-base-content/70">
                    requiring your attention
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Appointments Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h2 className="card-title">Today's Appointments</h2>
                  <div className="dropdown dropdown-end mt-2 md:mt-0">
                    <label
                      tabIndex={0}
                      className="btn btn-sm btn-outline gap-1"
                    >
                      <Filter className="w-4 h-4" />
                      Filter:{" "}
                      {appointmentFilter === "all" ? "All" : appointmentFilter}
                      <ChevronDown className="w-4 h-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={() => setAppointmentFilter("all")}>All</a>
                      </li>
                      <li>
                        <a onClick={() => setAppointmentFilter("confirmed")}>
                          Confirmed
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setAppointmentFilter("pending")}>
                          Pending
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {todaysAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-base-content/70">
                      No appointments scheduled for today.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Time</th>
                          <th>Reason</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todaysAppointments.map((appointment) => (
                          <tr key={appointment._id}>
                            <td>
                              <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>{appointment.patientName}</span>
                              </div>
                            </td>
                            <td>{formatTime(appointment.date)}</td>
                            <td>{appointment.reason}</td>
                            <td>
                              <div className="badge badge-outline badge-sm">
                                {appointment.status === "confirmed" ? (
                                  <span className="text-success">
                                    Confirmed
                                  </span>
                                ) : (
                                  <span className="text-warning">Pending</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="flex gap-2">
                                <button className="btn btn-xs btn-primary">
                                  View
                                </button>
                                <button className="btn btn-xs btn-outline">
                                  Notes
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Patients Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h2 className="card-title">Assigned Patients</h2>
                  <div className="dropdown dropdown-end mt-2 md:mt-0">
                    <label
                      tabIndex={0}
                      className="btn btn-sm btn-outline gap-1"
                    >
                      <Filter className="w-4 h-4" />
                      Filter: {patientFilter === "all" ? "All" : patientFilter}
                      <ChevronDown className="w-4 h-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={() => setPatientFilter("all")}>All</a>
                      </li>
                      <li>
                        <a onClick={() => setPatientFilter("stable")}>Stable</a>
                      </li>
                      <li>
                        <a onClick={() => setPatientFilter("critical")}>
                          Critical
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setPatientFilter("recovering")}>
                          Recovering
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setPatientFilter("new")}>New</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Condition</th>
                        <th>Last Visit</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr key={patient._id}>
                          <td>
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5" />
                              <span>{patient.name}</span>
                            </div>
                          </td>
                          <td>{patient.age}</td>
                          <td>{patient.condition}</td>
                          <td>
                            {formatDate(patient.lastVisit) || "New Patient"}
                          </td>
                          <td>
                            <div
                              className={`badge badge-sm ${
                                patient.status === "stable"
                                  ? "badge-success"
                                  : patient.status === "critical"
                                  ? "badge-error"
                                  : patient.status === "recovering"
                                  ? "badge-warning"
                                  : "badge-info"
                              }`}
                            >
                              {patient.status}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-xs btn-primary">
                                Records
                              </button>
                              <button className="btn btn-xs btn-outline">
                                Schedule
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tasks Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h2 className="card-title">Tasks</h2>
                  <div className="dropdown dropdown-end mt-2 md:mt-0">
                    <label
                      tabIndex={0}
                      className="btn btn-sm btn-outline gap-1"
                    >
                      <Filter className="w-4 h-4" />
                      Filter: {taskFilter === "all" ? "All" : taskFilter}
                      <ChevronDown className="w-4 h-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={() => setTaskFilter("all")}>All</a>
                      </li>
                      <li>
                        <a onClick={() => setTaskFilter("high")}>
                          High Priority
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setTaskFilter("medium")}>
                          Medium Priority
                        </a>
                      </li>
                      <li>
                        <a onClick={() => setTaskFilter("low")}>Low Priority</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Patient</th>
                        <th>Type</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => (
                        <tr key={task._id}>
                          <td>{task.description}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5" />
                              <span>{task.patientName}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              {task.type === "prescription" ? (
                                <FileText className="w-5 h-5" />
                              ) : task.type === "lab" ? (
                                <FileText className="w-5 h-5" />
                              ) : task.type === "referral" ? (
                                <Users className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" />
                              )}
                              <span className="capitalize">{task.type}</span>
                            </div>
                          </td>
                          <td>{formatDate(task.dueDate)}</td>
                          <td>
                            <div
                              className={`badge badge-sm ${
                                task.priority === "high"
                                  ? "badge-error"
                                  : task.priority === "medium"
                                  ? "badge-warning"
                                  : "badge-info"
                              }`}
                            >
                              {task.priority}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-xs btn-primary">
                                Complete
                              </button>
                              <button className="btn btn-xs btn-outline">
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </StaffLayout>
  );
}
