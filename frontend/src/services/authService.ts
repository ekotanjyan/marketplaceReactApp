import api from './api';
import { ApiResponse, AuthResponse, LoginCredentials, User } from '../types';

/**
 * Authentication Service
 * Handles all auth-related API calls
 */

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return response.data.data!;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/profile');
    return response.data.data!.user;
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<{ user: User }>>(
      '/auth/profile',
      userData
    );
    return response.data.data!.user;
  },

  /**
   * Register new user
   */
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'buyer' | 'seller';
  }): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      userData
    );
    return response.data.data!;
  },
};
