import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mobile-container">
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>Review Link Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          This review link is invalid or no longer active.<br/><br/>
          Please scan the QR code provided by the business.
        </p>
        <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
