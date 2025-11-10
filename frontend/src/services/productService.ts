import api from './api';
import { ApiResponse, Product, ProductsResponse } from '../types';

/**
 * Product Service
 * Handles all product-related API calls
 */

export interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
  page?: number;
  limit?: number;
}

export const productService = {
  /**
   * Get all products with optional filters
   */
  getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const response = await api.get<ApiResponse<ProductsResponse>>(
      `/products?${params.toString()}`
    );
    return response.data.data!;
  },

  /**
   * Get single product by ID
   */
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(
      `/products/${id}`
    );
    return response.data.data!;
  },

  /**
   * Create new product (requires seller/admin role)
   */
  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const response = await api.post<ApiResponse<{ product: Product }>>(
      '/products',
      productData
    );
    return response.data.data!.product;
  },

  /**
   * Update product (requires ownership or admin)
   */
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await api.put<ApiResponse<{ product: Product }>>(
      `/products/${id}`,
      productData
    );
    return response.data.data!.product;
  },

  /**
   * Delete product (requires ownership or admin)
   */
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
