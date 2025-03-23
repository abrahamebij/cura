"use client";
import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";
import { FaUser, FaEdit, FaSave } from "react-icons/fa";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Mock data for Dr. Sarah Johnson (staffId: "S001")
    const mockProfile = {
      name: "Dr. Sarah Johnson",
      staffId: "S001",
      role: "Doctor",
      specialty: "Cardiology",
      email: "sarah.johnson@hospital.com",
      phone: "+1 (555) 987-6543",
      department: "Cardiology Department",
      availability: [
        { day: "Mon", startTime: "08:00 AM", endTime: "05:00 PM" },
        { day: "Wed", startTime: "08:00 AM", endTime: "05:00 PM" },
        { day: "Fri", startTime: "08:00 AM", endTime: "05:00 PM" },
      ],
    };

    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...profile.availability];
    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value,
    };
    setProfile((prev) => ({ ...prev, availability: updatedAvailability }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to API here
    alert("Profile saved (mock action)");
  };

  return (
    <StaffLayout title="My Profile">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FaUser /> My Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Details */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : profile ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.name}</p>
                  )}
                </div>

                {/* Staff ID */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Staff ID</span>
                  </label>
                  <p className="text-gray-700">{profile.staffId}</p>
                </div>

                {/* Role */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Role</span>
                  </label>
                  <p className="text-gray-700">{profile.role}</p>
                </div>

                {/* Specialty */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Specialty</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="specialty"
                      value={profile.specialty}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.specialty}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.phone}</p>
                  )}
                </div>

                {/* Department */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Department</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={profile.department}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.department}</p>
                  )}
                </div>

                {/* Availability */}
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Availability</span>
                  </label>
                  {profile.availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-4 mb-2"
                    >
                      {isEditing ? (
                        <>
                          <select
                            value={slot.day}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                index,
                                "day",
                                e.target.value
                              )
                            }
                            className="select select-bordered w-full sm:w-1/3"
                          >
                            <option value="Mon">Monday</option>
                            <option value="Tue">Tuesday</option>
                            <option value="Wed">Wednesday</option>
                            <option value="Thu">Thursday</option>
                            <option value="Fri">Friday</option>
                            <option value="Sat">Saturday</option>
                            <option value="Sun">Sunday</option>
                          </select>
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="input input-bordered w-full sm:w-1/3"
                          />
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                index,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="input input-bordered w-full sm:w-1/3"
                          />
                        </>
                      ) : (
                        <p className="text-gray-700">
                          {slot.day}: {slot.startTime} - {slot.endTime}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn btn-primary">
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-16">
              <FaUser className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                Profile not found
              </h3>
              <p className="text-gray-500 mt-2">
                Please contact support to set up your profile
              </p>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
}
