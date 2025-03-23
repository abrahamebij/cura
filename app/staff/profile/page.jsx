"use client";
import { useState, useEffect } from "react";
import StaffLayout from "../StaffLayout";
import { FaUser, FaEdit, FaSave } from "react-icons/fa";
import { toast } from "sonner";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    const mockProfile = {
      name: "John Doe",
      patientId: "P001",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dob: "1983-05-15",
      gender: "Male",
      address: "123 Main St, Springfield",
      bloodType: "A+",
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

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to API here
    toast.success("Profile saved (mock action)");
  };

  return (
    <StaffLayout title="Profile">
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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Patient ID</span>
                  </label>
                  <p className="text-gray-700">{profile.patientId}</p>
                </div>

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

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Date of Birth
                    </span>
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={profile.dob}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {new Date(profile.dob).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-700">{profile.gender}</p>
                  )}
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Address</span>
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.address}</p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Blood Type</span>
                  </label>
                  <p className="text-gray-700">{profile.bloodType}</p>
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
export default Profile;
