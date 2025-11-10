import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { useToast } from '../components/common/Toast';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

/**
 * Cart Page Component
 */
export const Cart: React.FC = () => {
  const { cart, isLoading, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { showToast } = useToast();

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      await updateQuantity(productId, quantity);
    } catch (error) {
      showToast('Failed to update quantity', 'error');
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId);
      showToast('Item removed from cart', 'success');
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        showToast('Cart cleared', 'success');
      } catch (error) {
        showToast('Failed to clear cart', 'error');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const cartItems = cart?.items || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button onClick={handleClearCart} className="btn btn-secondary">
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping to add items to your cart
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-lg shadow-md p-6 flex gap-6"
                >
                  {/* Product Image */}
                  <Link
                    to={`/products/${item.productId}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product?.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop'}
                      alt={item.product?.name}
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop';
                      }}
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col">
                    <Link
                      to={`/products/${item.productId}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-2"
                    >
                      {item.product?.name}
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.product?.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            disabled={isLoading}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                            disabled={isLoading}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          {formatPrice(
                            (item.product?.price || 0) * item.quantity
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item.product?.price || 0)} each
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.productId)}
                      disabled={isLoading}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium self-start disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button className="w-full btn btn-primary btn-lg mb-4">
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
