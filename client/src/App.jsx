import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VendorDashboard from './pages/VendorDashboard';
import QRCodePage from './pages/QRCodePage';
import CustomerReview from './pages/CustomerReview';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/vendor/qr/:vendorId" element={<QRCodePage />} />
        <Route path="/review/:vendorId" element={<CustomerReview />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
