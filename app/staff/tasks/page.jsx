"use client";
import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";
import { FaTasks, FaFilter, FaCheck, FaClock } from "react-icons/fa";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("priority"); // Default filter: sort by priority

  useEffect(() => {
    setLoading(true);
    // Mock data for Dr. Sarah Johnson (staffId: "S001"), aligning patient names with previous pages
    const mockTasks = [
      {
        id: 1,
        description: "Review lab results for John Doe",
        patientId: "P001",
        priority: "high",
        dueDate: "2025-03-23",
      },
      {
        id: 2,
        description: "Approve prescription refill for Jane Smith",
        patientId: "P002",
        priority: "medium",
        dueDate: "2025-03-24",
      },
      {
        id: 3,
        description: "Schedule follow-up for Alice Brown",
        patientId: "P003",
        priority: "low",
        dueDate: "2025-03-25",
      },
    ];

    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 800);
  }, []);

  // Format dates for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort tasks based on filter
  const sortedTasks = [...tasks].sort((a, b) => {
    if (filter === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority]; // High to low priority
    } else if (filter === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate); // Earliest due date first
    }
    return 0;
  });

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className="badge badge-error gap-1">
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        );
      case "medium":
        return (
          <span className="badge badge-warning gap-1">
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        );
      case "low":
        return (
          <span className="badge badge-success gap-1">
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        );
      default:
        return <span className="badge">{priority}</span>;
    }
  };

  // Handle task completion (mock action for now)
  const handleComplete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    alert(`Task ${taskId} marked as complete (mock action)`);
  };

  return (
    <StaffLayout title="My Tasks">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-warning flex items-center gap-2">
              <FaTasks /> My Tasks
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your pending tasks and actions
            </p>
          </div>
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
                    filter === "priority" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("priority")}
                >
                  Priority
                </button>
                <button
                  className={`btn btn-sm join-item ${
                    filter === "dueDate" ? "btn-active" : ""
                  }`}
                  onClick={() => setFilter("dueDate")}
                >
                  Due Date
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-warning"></span>
          </div>
        ) : sortedTasks.length > 0 ? (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow ${
                  task.priority === "high"
                    ? "border-l-4 border-error"
                    : task.priority === "medium"
                    ? "border-l-4 border-warning"
                    : "border-l-4 border-success"
                }`}
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        {task.description}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {formatDate(task.dueDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(task.priority)}
                      <button
                        onClick={() => handleComplete(task.id)}
                        className="btn btn-sm btn-success"
                      >
                        <FaCheck className="mr-2" /> Complete
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
              <FaTasks className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                No pending tasks
              </h3>
              <p className="text-gray-500 mt-2">
                You’re all caught up! New tasks will appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
