// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// User & Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'buyer' | 'seller' | 'admin';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  categoryId: string;
  sellerId: string;
  sellerName?: string;
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// Loading & Error States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
