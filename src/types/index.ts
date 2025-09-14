// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  department: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 
  | 'warehouse_manager'
  | 'sales_representative'
  | 'operations_manager'
  | 'external_stakeholder'
  | 'admin';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Inventory Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  cost: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  images: string[];
  status: 'active' | 'inactive' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product: Product;
  warehouseId: string;
  warehouse: Warehouse;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderPoint: number;
  maxStock: number;
  location: string;
  lastRestocked: string;
  cost: number;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: Address;
  manager: User;
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'inactive' | 'maintenance';
  zones: WarehouseZone[];
}

export interface WarehouseZone {
  id: string;
  name: string;
  code: string;
  type: 'storage' | 'picking' | 'packing' | 'shipping' | 'receiving';
  capacity: number;
  currentUtilization: number;
}

// Sales Order Types
export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: Customer;
  status: OrderStatus;
  priority: OrderPriority;
  orderDate: string;
  requestedDeliveryDate: string;
  actualDeliveryDate?: string;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  assignedTo?: User;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'picking'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type OrderPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  notes?: string;
}

// Customer Types
export interface Customer {
  id: string;
  code: string;
  name: string;
  type: 'individual' | 'business';
  email: string;
  phone: string;
  website?: string;
  taxId?: string;
  addresses: Address[];
  contacts: Contact[];
  creditLimit: number;
  paymentTerms: string;
  status: 'active' | 'inactive' | 'suspended';
  assignedSalesRep?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping' | 'warehouse';
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

// Dashboard and Analytics Types
export interface DashboardMetrics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  inventoryValue: number;
  lowStockItems: number;
  activeCustomers: number;
  orderFulfillmentRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface OrderFormData {
  customerId: string;
  requestedDeliveryDate: string;
  priority: OrderPriority;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
    discount: number;
  }[];
  shippingAddressId: string;
  notes?: string;
}

export interface CustomerFormData {
  name: string;
  type: 'individual' | 'business';
  email: string;
  phone: string;
  website?: string;
  taxId?: string;
  creditLimit: number;
  paymentTerms: string;
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    phone: string;
  };
}

// Filter and Search Types
export interface FilterOptions {
  search?: string;
  status?: string;
  category?: string;
  warehouse?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  userId: string;
  user: User;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}