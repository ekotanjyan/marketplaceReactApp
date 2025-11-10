import api from './api';
import { ApiResponse, Cart } from '../types';

/**
 * Cart Service
 * Handles all shopping cart API calls
 */

export const cartService = {
  /**
   * Get user's cart
   */
  getCart: async (): Promise<Cart> => {
    const response = await api.get<ApiResponse<{ cart: Cart }>>('/cart');
    return response.data.data!.cart;
  },

  /**
   * Add item to cart
   */
  addToCart: async (productId: string, quantity: number = 1): Promise<Cart> => {
    const response = await api.post<ApiResponse<{ cart: Cart }>>('/cart', {
      productId,
      quantity,
    });
    return response.data.data!.cart;
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (productId: string, quantity: number): Promise<Cart> => {
    const response = await api.put<ApiResponse<{ cart: Cart }>>(
      `/cart/${productId}`,
      { quantity }
    );
    return response.data.data!.cart;
  },

  /**
   * Remove item from cart
   */
  removeFromCart: async (productId: string): Promise<Cart> => {
    const response = await api.delete<ApiResponse<{ cart: Cart }>>(
      `/cart/${productId}`
    );
    return response.data.data!.cart;
  },

  /**
   * Clear entire cart
   */
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};
