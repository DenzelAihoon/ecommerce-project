// This file is now redundant as the useAuth hook is exported from AuthContext.tsx
// We'll keep the usePermissions hook here for better organization

import { useAuth } from '../contexts/AuthContext';

// Custom hook for role-based permissions
export function usePermissions() {
  const { user } = useAuth();
  
  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check specific permissions
    return user.permissions.some(permission => 
      permission.resource === resource && permission.actions.includes(action)
    );
  };
  
  const canAccess = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };
  
  const isWarehouseManager = user?.role === 'warehouse_manager';
  const isSalesRep = user?.role === 'sales_representative';
  const isOperationsManager = user?.role === 'operations_manager';
  const isExternalStakeholder = user?.role === 'external_stakeholder';
  const isAdmin = user?.role === 'admin';
  
  return {
    hasPermission,
    canAccess,
    isWarehouseManager,
    isSalesRep,
    isOperationsManager,
    isExternalStakeholder,
    isAdmin,
    role: user?.role,
  };
}