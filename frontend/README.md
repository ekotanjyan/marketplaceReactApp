# Marketplace Frontend - React Assessment

A modern, fully-featured e-commerce frontend application built with React, TypeScript, and Tailwind CSS.

## Features

### ✅ Core Features (Implemented)

- **Authentication & Authorization**
  - JWT-based authentication
  - Protected routes
  - Login/Logout functionality
  - Persistent sessions

- **Product Management**
  - Product listing with grid layout
  - Product detail pages
  - Search and filter functionality
  - Sort by price, name, newest
  - Featured products filter

- **Shopping Cart**
  - Add items to cart
  - Update quantities
  - Remove items
  - Clear cart
  - Cart persistence (localStorage + API sync)
  - Cart badge with item count

- **User Profile**
  - View user information
  - Account details display
  - Role-based UI elements

### 🎨 UI/UX Features

- Fully responsive design (mobile, tablet, desktop)
- Loading states with spinners
- Error handling with user-friendly messages
- Toast notifications for user feedback
- Smooth animations and transitions
- Modern, clean interface with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (LoadingSpinner, ErrorMessage, Toast)
│   ├── layout/         # Layout components (Navbar)
│   ├── products/       # Product-specific components (ProductCard)
│   └── ProtectedRoute.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── pages/              # Route-level page components
│   ├── Login.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   └── Profile.tsx
├── services/           # API service layer
│   ├── api.ts          # Axios configuration with interceptors
│   ├── authService.ts  # Authentication API calls
│   ├── productService.ts # Product API calls
│   └── cartService.ts  # Cart API calls
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Helper functions
│   └── formatters.ts
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file (optional):
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Test Credentials

```
Email: john.doe@example.com
Password: password123
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Architecture Decisions

### 1. Context API for State Management
- **AuthContext**: Manages user authentication state, login/logout
- **CartContext**: Manages shopping cart with local storage fallback
- Avoids prop drilling while keeping complexity low

### 2. Service Layer Pattern
- Separation of concerns: API logic separate from components
- Centralized error handling via Axios interceptors
- Easy to test and mock

### 3. TypeScript for Type Safety
- Full type coverage for API responses
- Interface-driven development
- Reduced runtime errors

### 4. Protected Routes
- Higher-order component pattern for route protection
- Automatic redirect to login for unauthenticated users
- Preserves intended destination for post-login redirect

### 5. Axios Interceptors
- Automatic JWT token injection
- Global error handling
- Request/response transformation

### 6. Toast Notifications
- Non-intrusive user feedback
- Auto-dismiss after 3 seconds
- Context-based for global access

## API Integration

The app integrates with the Marketplace Backend API:

- **Base URL**: `http://localhost:3000/api`
- **Authentication**: JWT tokens in `Authorization: Bearer <token>` header
- **Storage**: Token and user data in localStorage

### Key Endpoints Used

- `POST /api/auth/login` - User login
- `GET /api/products` - List products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart

## Features Showcase

### Authentication Flow
1. User enters credentials on login page
2. JWT token received and stored in localStorage
3. Token automatically added to all API requests
4. Protected routes check authentication status
5. Logout clears token and redirects to login

### Shopping Cart Flow
1. User browses products
2. Click "Add to Cart" on product card or detail page
3. Cart syncs with backend (if authenticated) or localStorage
4. Cart icon shows item count
5. Cart page allows quantity changes and item removal
6. Checkout button ready for order processing

### Product Discovery
1. Landing page shows all products
2. Search bar for text search
3. Featured products filter
4. Sort by price, name, or date
5. Click product for detailed view
6. Add to cart from any view

## Best Practices Implemented

- ✅ TypeScript for type safety
- ✅ Component composition over inheritance
- ✅ Custom hooks for reusable logic
- ✅ Error boundaries for graceful error handling
- ✅ Loading states for better UX
- ✅ Responsive design
- ✅ Accessibility considerations
- ✅ Clean code with proper comments
- ✅ Separation of concerns
- ✅ Environment-based configuration

## Performance Optimizations

- Axios request/response interceptors
- Conditional rendering to minimize re-renders
- Debounced search (can be added)
- Lazy loading for routes (can be added)
- Image lazy loading with error fallbacks

## Future Enhancements

- [ ] Pagination for products
- [ ] Advanced filtering (price range, categories)
- [ ] Product reviews and ratings display
- [ ] Order history page
- [ ] Wishlist functionality
- [ ] User registration
- [ ] Password reset
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)
- [ ] E2E testing with Cypress

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
