"use client";
import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";
import { FaChartBar, FaFilter, FaDownload } from "react-icons/fa";
import { toast } from "sonner";

export default function Reports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("appointments"); // Default report type
  const [dateRange, setDateRange] = useState("thisMonth"); // Default date range

  useEffect(() => {
    setLoading(true);
    // Mock data for Dr. Sarah Johnson (staffId: "S001")
    const mockReports = {
      appointments: {
        thisMonth: {
          total: 15,
          completed: 12,
          cancelled: 2,
          noShows: 1,
          aiInsight:
            "Predicted no-show rate for next month: 5% (based on historical data).",
        },
        lastMonth: {
          total: 18,
          completed: 15,
          cancelled: 2,
          noShows: 1,
          aiInsight:
            "No-show rate decreased by 3% compared to the previous month.",
        },
      },
      tasks: {
        thisMonth: {
          total: 10,
          completed: 8,
          pending: 2,
          aiInsight:
            "Task completion rate: 80%. Consider prioritizing pending tasks.",
        },
        lastMonth: {
          total: 12,
          completed: 9,
          pending: 3,
          aiInsight: "Task completion rate improved by 5% from last month.",
        },
      },
    };

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
  }, []);

  const currentReport = reports?.[reportType]?.[dateRange];

  return (
    <StaffLayout title="Reports">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaChartBar /> Reports
            </h1>
            <p className="text-gray-600 mt-1">
              Generate and view insights on your activities
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <span className="font-medium">Report Type:</span>
                <div className="join">
                  <button
                    className={`btn btn-sm join-item ${
                      reportType === "appointments" ? "btn-active" : ""
                    }`}
                    onClick={() => setReportType("appointments")}
                  >
                    Appointments
                  </button>
                  <button
                    className={`btn btn-sm join-item ${
                      reportType === "tasks" ? "btn-active" : ""
                    }`}
                    onClick={() => setReportType("tasks")}
                  >
                    Tasks
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <span className="font-medium">Date Range:</span>
                <div className="join">
                  <button
                    className={`btn btn-sm join-item ${
                      dateRange === "thisMonth" ? "btn-active" : ""
                    }`}
                    onClick={() => setDateRange("thisMonth")}
                  >
                    This Month
                  </button>
                  <button
                    className={`btn btn-sm join-item ${
                      dateRange === "lastMonth" ? "btn-active" : ""
                    }`}
                    onClick={() => setDateRange("lastMonth")}
                  >
                    Last Month
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : currentReport ? (
          <div className="space-y-6">
            {/* Report Summary */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  {reportType === "appointments"
                    ? "Appointment Statistics"
                    : "Task Statistics"}
                </h3>
                <div className="divider my-2"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat">
                    <div className="stat-title">Total</div>
                    <div className="stat-value">{currentReport.total}</div>
                  </div>
                  {reportType === "appointments" ? (
                    <>
                      <div className="stat">
                        <div className="stat-title">Completed</div>
                        <div className="stat-value">
                          {currentReport.completed}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Cancelled</div>
                        <div className="stat-value">
                          {currentReport.cancelled}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">No-Shows</div>
                        <div className="stat-value">
                          {currentReport.noShows}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="stat">
                        <div className="stat-title">Completed</div>
                        <div className="stat-value">
                          {currentReport.completed}
                        </div>
                      </div>
                      <div className="stat">
                        <div className="stat-title">Pending</div>
                        <div className="stat-value">
                          {currentReport.pending}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => toast("Of course not...lol")}
                  >
                    <FaDownload className="mr-2" /> Download Report (PDF)
                  </button>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-primary">AI Insight</h3>
                <div className="divider my-2"></div>
                <p className="text-gray-700">{currentReport.aiInsight}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <FaChartBar className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No data available
              </h3>
              <p className="text-gray-500 mt-2">
                Data for this report type and date range will appear here
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
