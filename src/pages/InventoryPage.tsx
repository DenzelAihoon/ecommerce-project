import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Download,
  Upload
} from 'lucide-react';
import { usePermissions } from '../hooks/useAuth';
import clsx from 'clsx';

// Mock inventory data
const inventoryData = [
  {
    id: '1',
    sku: 'WH-001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    quantity: 145,
    reservedQuantity: 20,
    availableQuantity: 125,
    reorderPoint: 50,
    unitCost: 45.99,
    unitPrice: 89.99,
    warehouse: 'Main Warehouse',
    location: 'A-1-001',
    status: 'active',
    lastRestocked: '2024-01-10',
  },
  {
    id: '2',
    sku: 'BS-002',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    quantity: 8,
    reservedQuantity: 5,
    availableQuantity: 3,
    reorderPoint: 15,
    unitCost: 32.50,
    unitPrice: 64.99,
    warehouse: 'Main Warehouse',
    location: 'A-1-002',
    status: 'low_stock',
    lastRestocked: '2024-01-05',
  },
  {
    id: '3',
    sku: 'UC-003',
    name: 'USB-C Cable',
    category: 'Accessories',
    quantity: 234,
    reservedQuantity: 15,
    availableQuantity: 219,
    reorderPoint: 100,
    unitCost: 8.99,
    unitPrice: 19.99,
    warehouse: 'Main Warehouse',
    location: 'B-2-001',
    status: 'active',
    lastRestocked: '2024-01-12',
  },
  {
    id: '4',
    sku: 'PB-004',
    name: 'Power Bank 10000mAh',
    category: 'Electronics',
    quantity: 2,
    reservedQuantity: 0,
    availableQuantity: 2,
    reorderPoint: 10,
    unitCost: 25.99,
    unitPrice: 49.99,
    warehouse: 'Secondary Warehouse',
    location: 'C-1-003',
    status: 'critical',
    lastRestocked: '2023-12-28',
  },
  {
    id: '5',
    sku: 'KB-005',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    quantity: 67,
    reservedQuantity: 8,
    availableQuantity: 59,
    reorderPoint: 25,
    unitCost: 89.99,
    unitPrice: 149.99,
    warehouse: 'Main Warehouse',
    location: 'A-3-001',
    status: 'active',
    lastRestocked: '2024-01-08',
  },
];

const categories = ['All', 'Electronics', 'Accessories', 'Hardware', 'Software'];
const warehouses = ['All', 'Main Warehouse', 'Secondary Warehouse', 'Distribution Center'];
const statusOptions = ['All', 'active', 'low_stock', 'critical', 'out_of_stock'];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'low_stock':
      return 'bg-yellow-100 text-yellow-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'out_of_stock':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4" />;
    case 'low_stock':
    case 'critical':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const { hasPermission, isWarehouseManager, isOperationsManager } = usePermissions();
  
  const canEdit = hasPermission('inventory', 'write') || isWarehouseManager;
  const canDelete = hasPermission('inventory', 'delete') || isWarehouseManager;
  const canExport = hasPermission('inventory', 'read') || isOperationsManager;

  // Filter inventory data
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesWarehouse = selectedWarehouse === 'All' || item.warehouse === selectedWarehouse;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus;
  });

  const totalItems = filteredInventory.length;
  const totalValue = filteredInventory.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const lowStockItems = filteredInventory.filter(item => item.status === 'low_stock' || item.status === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track and manage your inventory across all warehouses
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {canExport && (
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          )}
          {canEdit && (
            <>
              <button className="btn-secondary">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">$</span>
            </div>
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
                placeholder="Search products..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Warehouse</label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="form-input"
                >
                  {warehouses.map(warehouse => (
                    <option key={warehouse} value={warehouse}>{warehouse}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-input"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status === 'All' ? status : status.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Available</th>
                <th>Reserved</th>
                <th>Total</th>
                <th>Location</th>
                <th>Status</th>
                <th>Unit Cost</th>
                <th>Unit Price</th>
                {(canEdit || canDelete) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.warehouse}</div>
                    </div>
                  </td>
                  <td className="font-mono text-sm">{item.sku}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={clsx(
                      'font-medium',
                      item.availableQuantity <= item.reorderPoint ? 'text-red-600' : 'text-gray-900'
                    )}>
                      {item.availableQuantity}
                    </span>
                  </td>
                  <td className="text-gray-600">{item.reservedQuantity}</td>
                  <td className="font-medium">{item.quantity}</td>
                  <td className="text-sm text-gray-600">{item.location}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td>${item.unitCost}</td>
                  <td>${item.unitPrice}</td>
                  {(canEdit || canDelete) && (
                    <td>
                      <div className="flex items-center space-x-2">
                        {canEdit && (
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
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
          Showing 1 to {filteredInventory.length} of {filteredInventory.length} results
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