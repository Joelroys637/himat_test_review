import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <Star size={48} color="#fbbf24" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Review Generator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '2rem' }}>
          Effortlessly generate custom Google reviews for your business with a simple QR scan.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/vendor')} style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
          Go to Vendor Dashboard
        </button>
      </div>
    </div>
  );
}
