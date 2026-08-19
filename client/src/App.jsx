import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import VendorDashboard from './pages/VendorDashboard';
import VendorLogin from './pages/VendorLogin';
import VendorSignup from './pages/VendorSignup';
import QRCodePage from './pages/QRCodePage';
import CustomerReview from './pages/CustomerReview';
import NotFound from './pages/NotFound';

import VendorLayout from './layouts/VendorLayout';
import DashboardOverview from './pages/vendor/DashboardOverview';
import QRCustomizer from './pages/vendor/QRCustomizer';

const ProtectedRoute = ({ children }) => {
  const { vendor, loading } = useContext(AuthContext);
  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!vendor) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<VendorLogin />} />
      <Route path="/signup" element={<VendorSignup />} />
      
      {/* Vendor Dashboard Nested Routes */}
      <Route path="/vendor" element={
        <ProtectedRoute>
          <VendorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardOverview />} />
        <Route path="edit" element={<VendorDashboard />} />
        <Route path="customize" element={<QRCustomizer />} />
        <Route path="qr-view" element={<QRCodePage />} />
      </Route>

      <Route path="/review/:vendorId" element={<CustomerReview />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
