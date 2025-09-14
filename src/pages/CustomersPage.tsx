import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Phone, Mail, MapPin, Building } from 'lucide-react';
import { usePermissions } from '../hooks/useAuth';

// Mock customers data
const customersData = [
  {
    id: '1',
    code: 'CUST-001',
    name: 'Acme Corporation',
    type: 'business',
    email: 'orders@acme.com',
    phone: '+1 (555) 123-4567',
    website: 'www.acme.com',
    address: '123 Business Ave, City, ST 12345',
    totalOrders: 45,
    totalSpent: 125000,
    status: 'active',
    assignedSalesRep: 'Sarah Sales',
    lastOrderDate: '2024-01-15'
  },
  {
    id: '2',
    code: 'CUST-002',
    name: 'TechStart Inc',
    type: 'business',
    email: 'procurement@techstart.com',
    phone: '+1 (555) 987-6543',
    website: 'www.techstart.com',
    address: '456 Tech Blvd, Innovation City, ST 54321',
    totalOrders: 23,
    totalSpent: 67500,
    status: 'active',
    assignedSalesRep: 'Mike Operations',
    lastOrderDate: '2024-01-14'
  },
  {
    id: '3',
    code: 'CUST-003',
    name: 'John Smith',
    type: 'individual',
    email: 'john.smith@email.com',
    phone: '+1 (555) 456-7890',
    website: null,
    address: '789 Residential St, Hometown, ST 98765',
    totalOrders: 8,
    totalSpent: 1200,
    status: 'active',
    assignedSalesRep: 'Sarah Sales',
    lastOrderDate: '2024-01-10'
  }
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const { hasPermission, isSalesRep } = usePermissions();
  const canCreate = hasPermission('customers', 'write') || isSalesRep;
  const canEdit = hasPermission('customers', 'write') || isSalesRep;

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || customer.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || customer.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage customer relationships and contact information
          </p>
        </div>
        {canCreate && (
          <button className="btn-primary mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    {customer.type === 'business' ? (
                      <Building className="h-5 w-5 text-primary-600" />
                    ) : (
                      <div className="h-5 w-5 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.code}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {customer.address}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-lg font-semibold text-gray-900">{customer.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Spent</p>
                <p className="text-lg font-semibold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 btn-secondary">
                <Eye className="h-4 w-4 mr-2" />
                View
              </button>
              {canEdit && (
                <button className="flex-1 btn-primary">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}