import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '../types';
import { cartService } from '../services/cartService';
import { productService } from '../services/productService';
import { useAuth } from './AuthContext';

/**
 * Cart Context Interface
 */
interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  itemCount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncWithServer: () => Promise<void>;
}

/**
 * Create Cart Context
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Props
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart Provider Component
 * Manages global shopping cart state with local storage fallback
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Load cart from localStorage or server
   */
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated) {
        // Try to load from server if authenticated
        try {
          const serverCart = await cartService.getCart();
          // Backend now returns full product details
          setCart(serverCart);
          localStorage.setItem('cart', JSON.stringify(serverCart));
        } catch (error) {
          console.error('Failed to load cart from server:', error);
          loadLocalCart();
        }
      } else {
        // Load from localStorage if not authenticated
        loadLocalCart();
      }
    };

    loadCart();
  }, [isAuthenticated]);

  /**
   * Load cart from localStorage
   */
  const loadLocalCart = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
        initializeEmptyCart();
      }
    } else {
      initializeEmptyCart();
    }
  };

  /**
   * Initialize empty cart
   */
  const initializeEmptyCart = () => {
    const emptyCart: Cart = {
      userId: '',
      items: [],
      total: 0,
      itemCount: 0,
    };
    setCart(emptyCart);
    localStorage.setItem('cart', JSON.stringify(emptyCart));
  };

  /**
   * Calculate cart totals
   */
  const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    const total = items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { total, itemCount };
  };

  /**
   * Add item to cart
   */
  const addToCart = async (productId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        // Add to server cart - backend returns full cart with product details
        const updatedCart = await cartService.addToCart(productId, quantity);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // Add to local cart
        const product = await productService.getProduct(productId);
        const currentCart = cart || { userId: '', items: [], total: 0, itemCount: 0 };

        const existingItemIndex = currentCart.items.findIndex(
          (item) => item.productId === productId
        );

        let updatedItems: CartItem[];

        if (existingItemIndex > -1) {
          // Update existing item
          updatedItems = [...currentCart.items];
          updatedItems[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          updatedItems = [
            ...currentCart.items,
            { productId, quantity, product },
          ];
        }

        const { total, itemCount } = calculateTotals(updatedItems);

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          total,
          itemCount,
        };

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update item quantity
   */
  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setIsLoading(true);
    try {
      if (isAuthenticated) {
        // Update on server - backend returns full cart
        const updatedCart = await cartService.updateCartItem(productId, quantity);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const currentCart = cart || { userId: '', items: [], total: 0, itemCount: 0 };
        const updatedItems = currentCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );

        const { total, itemCount } = calculateTotals(updatedItems);

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          total,
          itemCount,
        };

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = async (productId: string) => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        // Remove from server - backend returns full cart
        const updatedCart = await cartService.removeFromCart(productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const currentCart = cart || { userId: '', items: [], total: 0, itemCount: 0 };
        const updatedItems = currentCart.items.filter(
          (item) => item.productId !== productId
        );

        const { total, itemCount } = calculateTotals(updatedItems);

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          total,
          itemCount,
        };

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear entire cart
   */
  const clearCart = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      }

      initializeEmptyCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sync local cart with server
   */
  const syncWithServer = async () => {
    if (!isAuthenticated) return;

    try {
      const serverCart = await cartService.getCart();
      setCart(serverCart);
      localStorage.setItem('cart', JSON.stringify(serverCart));
    } catch (error) {
      console.error('Failed to sync cart with server:', error);
    }
  };

  const value: CartContextType = {
    cart,
    isLoading,
    itemCount: cart?.itemCount || 0,
    total: cart?.total || 0,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    syncWithServer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to use Cart Context
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
