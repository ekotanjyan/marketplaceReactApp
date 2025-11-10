import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDate, getInitials } from '../utils/formatters';

/**
 * Profile Page Component
 */
export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const roleColors = {
    buyer: 'bg-blue-100 text-blue-800',
    seller: 'bg-green-100 text-green-800',
    admin: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-8 py-12">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-primary-600">
                {getInitials(user.firstName, user.lastName)}
              </div>

              {/* User Info */}
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-primary-100 text-lg">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="px-8 py-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Account Information
            </h3>

            <div className="space-y-6">
              {/* User ID */}
              <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
                <div className="sm:w-1/3">
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                </div>
                <div className="sm:w-2/3 mt-1 sm:mt-0">
                  <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
                <div className="sm:w-1/3">
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                </div>
                <div className="sm:w-2/3 mt-1 sm:mt-0">
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>

              {/* Full Name */}
              <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
                <div className="sm:w-1/3">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                </div>
                <div className="sm:w-2/3 mt-1 sm:mt-0">
                  <p className="text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-4">
                <div className="sm:w-1/3">
                  <p className="text-sm font-medium text-gray-500">Role</p>
                </div>
                <div className="sm:w-2/3 mt-1 sm:mt-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      roleColors[user.role]
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex flex-col sm:flex-row sm:items-center pb-4">
                <div className="sm:w-1/3">
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                </div>
                <div className="sm:w-2/3 mt-1 sm:mt-0">
                  <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary flex-1">Edit Profile</button>
              <button className="btn btn-secondary flex-1">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Total orders placed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Products reviewed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Wishlist</h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
            <p className="text-sm text-gray-600 mt-1">Saved products</p>
          </div>
        </div>
      </div>
    </div>
  );
};
