import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CanteenProvider } from './context/CanteenContext';
import { ToastContainer } from './components/common/ToastContainer';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Student pages
import { StudentDashboard } from './pages/StudentDashboard';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AssistantPage } from './pages/AssistantPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';

// Admin pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminMenuPage } from './pages/AdminMenuPage';
import { InventoryPage } from './pages/InventoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';

export default function App() {
  return (
    <CanteenProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders/:orderId" element={<OrderTrackingPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/history" element={<OrderHistoryPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/menu" element={<AdminMenuPage />} />
          <Route path="/admin/inventory" element={<InventoryPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/insights" element={<AIInsightsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Toast Notifications */}
        <ToastContainer />
      </BrowserRouter>
    </CanteenProvider>
  );
}
