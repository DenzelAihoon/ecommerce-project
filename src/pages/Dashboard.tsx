import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth, usePermissions } from '../hooks/useAuth';

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 45000, orders: 120 },
  { month: 'Feb', sales: 52000, orders: 140 },
  { month: 'Mar', sales: 48000, orders: 130 },
  { month: 'Apr', sales: 61000, orders: 160 },
  { month: 'May', sales: 55000, orders: 145 },
  { month: 'Jun', sales: 67000, orders: 175 },
];

const orderStatusData = [
  { name: 'Completed', value: 65, color: '#10B981' },
  { name: 'Processing', value: 20, color: '#F59E0B' },
  { name: 'Pending', value: 10, color: '#EF4444' },
  { name: 'Cancelled', value: 5, color: '#6B7280' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Acme Corp', amount: 2450, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'TechStart Inc', amount: 1890, status: 'processing', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Global Solutions', amount: 3200, status: 'pending', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Innovation Labs', amount: 1650, status: 'completed', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'Future Systems', amount: 2890, status: 'processing', date: '2024-01-13' },
];

const lowStockItems = [
  { id: '1', name: 'Wireless Headphones', sku: 'WH-001', stock: 5, reorderPoint: 20 },
  { id: '2', name: 'Bluetooth Speaker', sku: 'BS-002', stock: 3, reorderPoint: 15 },
  { id: '3', name: 'USB-C Cable', sku: 'UC-003', stock: 8, reorderPoint: 25 },
  { id: '4', name: 'Power Bank', sku: 'PB-004', stock: 2, reorderPoint: 10 },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  color: string;
}

function MetricCard({ title, value, change, changeType, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {changeType === 'increase' ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`ml-2 text-sm font-medium ${
          changeType === 'increase' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="ml-2 text-sm text-gray-500">from last month</span>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'processing':
      return <Clock className="h-4 w-4" />;
    case 'pending':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

export default function Dashboard() {
  const { user } = useAuth();
  const { isWarehouseManager, isSalesRep, isOperationsManager } = usePermissions();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your logistics operations today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value="1,247"
          change={12.5}
          changeType="increase"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <MetricCard
          title="Revenue"
          value="$89,432"
          change={8.2}
          changeType="increase"
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard
          title="Inventory Items"
          value="2,847"
          change={-2.1}
          changeType="decrease"
          icon={Package}
          color="bg-purple-500"
        />
        <MetricCard
          title="Active Customers"
          value="486"
          change={15.3}
          changeType="increase"
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'sales' ? `$${value.toLocaleString()}` : value,
                name === 'sales' ? 'Sales' : 'Orders'
              ]} />
              <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Orders
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {orderStatusData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {(isWarehouseManager || isOperationsManager) && (
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Low Stock Alerts
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  View Inventory
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        {item.stock} units left
                      </p>
                      <p className="text-xs text-gray-500">
                        Reorder at {item.reorderPoint}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Role-specific Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isSalesRep && (
            <>
              <button className="btn-primary">
                Create New Order
              </button>
              <button className="btn-secondary">
                Add Customer
              </button>
              <button className="btn-secondary">
                View My Orders
              </button>
            </>
          )}
          {isWarehouseManager && (
            <>
              <button className="btn-primary">
                Update Inventory
              </button>
              <button className="btn-secondary">
                Process Shipments
              </button>
              <button className="btn-secondary">
                Generate Reports
              </button>
            </>
          )}
          {isOperationsManager && (
            <>
              <button className="btn-primary">
                View Analytics
              </button>
              <button className="btn-secondary">
                Export Reports
              </button>
              <button className="btn-secondary">
                System Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}