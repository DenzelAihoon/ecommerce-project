import { apiClient } from './api';
import { User, LoginFormData } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@emtech.com' && password === 'admin123') {
          const mockUser: User = {
            id: '1',
            email: 'admin@emtech.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            department: 'Administration',
            permissions: [
              { resource: '*', actions: ['*'] }
            ],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          };
          resolve({
            user: mockUser,
            token: 'mock-jwt-token-admin'
          });
        } else if (email === 'warehouse@emtech.com' && password === 'warehouse123') {
          const mockUser: User = {
            id: '2',
            email: 'warehouse@emtech.com',
            firstName: 'John',
            lastName: 'Warehouse',
            role: 'warehouse_manager',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            department: 'Warehouse Operations',
            permissions: [
              { resource: 'inventory', actions: ['read', 'write', 'update'] },
              { resource: 'warehouse', actions: ['read', 'write', 'update'] },
              { resource: 'orders', actions: ['read', 'update'] }
            ],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          };
          resolve({
            user: mockUser,
            token: 'mock-jwt-token-warehouse'
          });
        } else if (email === 'sales@emtech.com' && password === 'sales123') {
          const mockUser: User = {
            id: '3',
            email: 'sales@emtech.com',
            firstName: 'Sarah',
            lastName: 'Sales',
            role: 'sales_representative',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
            department: 'Sales',
            permissions: [
              { resource: 'customers', actions: ['read', 'write', 'update'] },
              { resource: 'orders', actions: ['read', 'write', 'update'] },
              { resource: 'inventory', actions: ['read'] }
            ],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          };
          resolve({
            user: mockUser,
            token: 'mock-jwt-token-sales'
          });
        } else if (email === 'ops@emtech.com' && password === 'ops123') {
          const mockUser: User = {
            id: '4',
            email: 'ops@emtech.com',
            firstName: 'Mike',
            lastName: 'Operations',
            role: 'operations_manager',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face',
            department: 'Operations',
            permissions: [
              { resource: 'dashboard', actions: ['read'] },
              { resource: 'reports', actions: ['read'] },
              { resource: 'analytics', actions: ['read'] },
              { resource: 'orders', actions: ['read'] },
              { resource: 'inventory', actions: ['read'] },
              { resource: 'customers', actions: ['read'] }
            ],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          };
          resolve({
            user: mockUser,
            token: 'mock-jwt-token-ops'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
    
    // Real implementation would be:
    // return apiClient.post<LoginResponse>('/auth/login', { email, password });
  }

  async getCurrentUser(token: string): Promise<User> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token.includes('admin')) {
          resolve({
            id: '1',
            email: 'admin@emtech.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            department: 'Administration',
            permissions: [{ resource: '*', actions: ['*'] }],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
    
    // Real implementation would be:
    // return apiClient.get<User>('/auth/me');
  }

  async logout(): Promise<void> {
    // Mock implementation - in real app, you might want to invalidate the token on server
    return Promise.resolve();
    
    // Real implementation would be:
    // return apiClient.post<void>('/auth/logout');
  }

  async refreshToken(): Promise<string> {
    // Mock implementation
    return Promise.resolve('new-mock-token');
    
    // Real implementation would be:
    // const response = await apiClient.post<{ token: string }>('/auth/refresh');
    // return response.token;
  }
}

export const authService = new AuthService();