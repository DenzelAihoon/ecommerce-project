import React, { useState } from 'react';
import { Save, User, Bell, Shield, Database, Truck, Building2 } from 'lucide-react';
import { useAuth, usePermissions } from '../hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const { isAdmin } = usePermissions();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Access Restricted</h3>
        <p className="text-gray-500">You don't have permission to access settings.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'warehouses', name: 'Warehouses', icon: Building2 },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'system', name: 'System', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account and system preferences
        </p>
      </div>

      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">First Name</label>
                    <input type="text" defaultValue={user?.firstName} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input type="text" defaultValue={user?.lastName} className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" defaultValue={user?.email} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Department</label>
                  <input type="text" defaultValue={user?.department} className="form-input" />
                </div>
                <button className="btn-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Low Stock Alerts</h4>
                    <p className="text-sm text-gray-500">Get notified when inventory is running low</p>
                  </div>
                  <input type="checkbox" defaultChecked className="form-checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Order Updates</h4>
                    <p className="text-sm text-gray-500">Receive notifications about order status changes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="form-checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">System Maintenance</h4>
                    <p className="text-sm text-gray-500">Get notified about scheduled maintenance</p>
                  </div>
                  <input type="checkbox" className="form-checkbox" />
                </div>
                <button className="btn-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-input" />
                </div>
                <div>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" />
                </div>
                <div>
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-input" />
                </div>
                <button className="btn-primary">
                  <Save className="h-4 w-4 mr-2" />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Version:</span>
                    <span className="text-sm font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database:</span>
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Backup:</span>
                    <span className="text-sm font-medium">2024-01-15 10:30 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
                <div className="space-y-3">
                  <button className="btn-secondary w-full">
                    Run System Diagnostics
                  </button>
                  <button className="btn-secondary w-full">
                    Clear Cache
                  </button>
                  <button className="btn-danger w-full">
                    Reset System Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}