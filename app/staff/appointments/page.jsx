"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import StaffLayout from "../../patient/PatientLayout";

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

const AppointmentsPage = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const filteredAppointments = appointments.filter((appointment) => {
      if (filterStatus === "all") return true;
      return appointment.status === filterStatus;
    });

    if (filterDate) {
      const date = new Date(filterDate);
      const filteredAppointmentsByDate = filteredAppointments.filter(
        (appointment) => {
          const appointmentDate = new Date(appointment.date);
          return (
            appointmentDate.getDate() === date.getDate() &&
            appointmentDate.getMonth() === date.getMonth() &&
            appointmentDate.getFullYear() === date.getFullYear()
          );
        }
      );
      setFilteredAppointments(filteredAppointmentsByDate);
    } else {
      setFilteredAppointments(filteredAppointments);
    }
  }, [appointments, filterStatus, filterDate]);

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const handleFilterDateChange = (date) => {
    setFilterDate(date);
  };

  return (
    <StaffLayout>
      <div className="p-4">
        <div className="flex flex-col gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h1 className="text-2xl font-bold">Appointments</h1>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex gap-2">
                  <label className="label">Filter by status:</label>
                  <select
                    className="select select-sm"
                    value={filterStatus}
                    onChange={(e) => handleFilterStatusChange(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <label className="label">Filter by date:</label>
                  <input
                    type="date"
                    className="input input-sm"
                    value={filterDate}
                    onChange={(e) => handleFilterDateChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span>{appointment.patientName}</span>
                          </div>
                        </td>
                        <td>{formatDate(appointment.date)}</td>
                        <td>{formatTime(appointment.date)}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <div className="badge badge-outline badge-sm">
                            {appointment.status === "confirmed" ? (
                              <span className="text-success">Confirmed</span>
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
                              Edit
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
    </StaffLayout>
  );
};

export default AppointmentsPage;
