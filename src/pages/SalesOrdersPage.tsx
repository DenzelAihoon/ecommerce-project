import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Truck,
  Calendar,
  User,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { usePermissions } from '../hooks/useAuth';
import clsx from 'clsx';

// Mock sales orders data
const ordersData = [
  {
    id: 'ORD-001',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'Acme Corporation',
      email: 'orders@acme.com',
      phone: '+1 (555) 123-4567'
    },
    status: 'completed',
    priority: 'normal',
    orderDate: '2024-01-15',
    requestedDeliveryDate: '2024-01-20',
    actualDeliveryDate: '2024-01-19',
    items: [
      { name: 'Wireless Headphones', quantity: 10, unitPrice: 89.99 },
      { name: 'USB-C Cable', quantity: 20, unitPrice: 19.99 }
    ],
    subtotal: 1299.80,
    taxAmount: 103.98,
    shippingAmount: 25.00,
    totalAmount: 1428.78,
    assignedTo: 'Sarah Sales',
    shippingAddress: '123 Business Ave, City, ST 12345'
  },
  {
    id: 'ORD-002',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'TechStart Inc',
      email: 'procurement@techstart.com',
      phone: '+1 (555) 987-6543'
    },
    status: 'processing',
    priority: 'high',
    orderDate: '2024-01-15',
    requestedDeliveryDate: '2024-01-18',
    actualDeliveryDate: null,
    items: [
      { name: 'Mechanical Keyboard', quantity: 5, unitPrice: 149.99 },
      { name: 'Bluetooth Speaker', quantity: 3, unitPrice: 64.99 }
    ],
    subtotal: 944.92,
    taxAmount: 75.59,
    shippingAmount: 15.00,
    totalAmount: 1035.51,
    assignedTo: 'Mike Operations',
    shippingAddress: '456 Tech Blvd, Innovation City, ST 54321'
  },
  {
    id: 'ORD-003',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Global Solutions Ltd',
      email: 'orders@globalsolutions.com',
      phone: '+1 (555) 456-7890'
    },
    status: 'pending',
    priority: 'urgent',
    orderDate: '2024-01-14',
    requestedDeliveryDate: '2024-01-16',
    actualDeliveryDate: null,
    items: [
      { name: 'Power Bank', quantity: 15, unitPrice: 49.99 },
      { name: 'Wireless Headphones', quantity: 8, unitPrice: 89.99 }
    ],
    subtotal: 1469.77,
    taxAmount: 117.58,
    shippingAmount: 30.00,
    totalAmount: 1617.35,
    assignedTo: 'Sarah Sales',
    shippingAddress: '789 Corporate Dr, Business Park, ST 98765'
  },
  {
    id: 'ORD-004',
    orderNumber: 'ORD-2024-004',
    customer: {
      name: 'Innovation Labs',
      email: 'purchasing@innovationlabs.com',
      phone: '+1 (555) 321-0987'
    },
    status: 'shipped',
    priority: 'normal',
    orderDate: '2024-01-13',
    requestedDeliveryDate: '2024-01-17',
    actualDeliveryDate: null,
    items: [
      { name: 'USB-C Cable', quantity: 50, unitPrice: 19.99 }
    ],
    subtotal: 999.50,
    taxAmount: 79.96,
    shippingAmount: 20.00,
    totalAmount: 1099.46,
    assignedTo: 'John Warehouse',
    shippingAddress: '321 Research Way, Science City, ST 13579'
  },
  {
    id: 'ORD-005',
    orderNumber: 'ORD-2024-005',
    customer: {
      name: 'Future Systems',
      email: 'orders@futuresystems.com',
      phone: '+1 (555) 654-3210'
    },
    status: 'cancelled',
    priority: 'low',
    orderDate: '2024-01-12',
    requestedDeliveryDate: '2024-01-19',
    actualDeliveryDate: null,
    items: [
      { name: 'Bluetooth Speaker', quantity: 2, unitPrice: 64.99 },
      { name: 'Power Bank', quantity: 4, unitPrice: 49.99 }
    ],
    subtotal: 329.94,
    taxAmount: 26.40,
    shippingAmount: 10.00,
    totalAmount: 366.34,
    assignedTo: 'Sarah Sales',
    shippingAddress: '654 Future Ave, Tomorrow City, ST 24680'
  }
];

const statusOptions = ['All', 'pending', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled'];
const priorityOptions = ['All', 'low', 'normal', 'high', 'urgent'];

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-orange-100 text-orange-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'processing':
      return <Clock className="h-4 w-4" />;
    case 'pending':
      return <AlertTriangle className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent':
      return 'text-red-600';
    case 'high':
      return 'text-orange-600';
    case 'normal':
      return 'text-blue-600';
    case 'low':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
}

export default function SalesOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  const { hasPermission, isSalesRep, isWarehouseManager, isOperationsManager } = usePermissions();
  
  const canCreate = hasPermission('orders', 'write') || isSalesRep;
  const canEdit = hasPermission('orders', 'write') || isSalesRep || isWarehouseManager;
  const canView = hasPermission('orders', 'read') || isSalesRep || isWarehouseManager || isOperationsManager;

  // Filter orders data
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || order.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalOrders = filteredOrders.length;
  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;
  const completedOrders = filteredOrders.filter(order => order.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track customer orders from creation to delivery
          </p>
        </div>
        {canCreate && (
          <div className="mt-4 sm:mt-0">
            <button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders or customers..."
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
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-input"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'All' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="form-input"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'All' ? priority : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Total Amount</th>
                <th>Assigned To</th>
                {canView && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} items</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td>
                    <span className={`font-medium capitalize ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm text-gray-900">
                      {order.actualDeliveryDate 
                        ? new Date(order.actualDeliveryDate).toLocaleDateString()
                        : new Date(order.requestedDeliveryDate).toLocaleDateString()
                      }
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.actualDeliveryDate ? 'Delivered' : 'Requested'}
                    </div>
                  </td>
                  <td className="font-medium text-gray-900">
                    ${order.totalAmount.toLocaleString()}
                  </td>
                  <td>
                    <div className="flex items-center text-sm text-gray-900">
                      <User className="h-4 w-4 mr-1 text-gray-400" />
                      {order.assignedTo}
                    </div>
                  </td>
                  {canView && (
                    <td>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedOrder(order.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canEdit && (
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing 1 to {filteredOrders.length} of {filteredOrders.length} results
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary" disabled>
            Previous
          </button>
          <button className="btn-primary">
            1
          </button>
          <button className="btn-secondary" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}