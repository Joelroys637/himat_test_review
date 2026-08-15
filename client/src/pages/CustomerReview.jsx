import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Copy, RefreshCw, Loader2, Check } from 'lucide-react';

export default function CustomerReview() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [vendorData, setVendorData] = useState(null);
  const [review, setReview] = useState('');
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchVendorAndReview();
  }, [vendorId]);

  const fetchVendorAndReview = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch vendor data for shopName and googleReviewUrl
      const vendorRes = await fetch(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`);
      const vendorJson = await vendorRes.json();

      if (!vendorJson.success) {
        navigate('/404');
        return;
      }
      
      setVendorData(vendorJson.vendor);

      // 2. Generate review
      await generateReviewText();
    } catch (err) {
      setError('Network error. Unable to load review.');
    } finally {
      setLoading(false);
    }
  };

  const generateReviewText = async () => {
    try {
      const reviewRes = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId })
      });
      const reviewJson = await reviewRes.json();

      if (reviewJson.success) {
        setReview(reviewJson.review);
      } else {
        setError('Failed to generate review.');
      }
    } catch (err) {
      setError('Failed to generate review.');
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    await generateReviewText();
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setShowToast(true);
      
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (loading && !vendorData) {
    return (
      <div className="mobile-container" style={{ alignItems: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: 'var(--text-secondary)' }}>Generating your review...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div className="glass-card">
          <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Oops!</h3>
          <p>{error}</p>
          <button onClick={fetchVendorAndReview} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      {showToast && (
        <div className="toast">
          ✓ Review copied successfully!
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={28} fill="currentColor" />
          ))}
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{vendorData?.shopName}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>We value your experience</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem 1rem' }}>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <Loader2 className="animate-spin" size={32} color="var(--primary-color)" />
          </div>
        ) : (
          <div className="review-box">
            {review}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={handleCopy} 
            className="btn btn-primary"
            style={{ padding: '1rem', fontSize: '1.125rem' }}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copied' : 'Copy Review'}
          </button>

          <button 
            onClick={() => window.open(vendorData?.googleReviewUrl, '_blank')} 
            className="btn btn-secondary"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '1rem',
              fontSize: '1.125rem',
              color: 'white'
            }}
          >
            <Star size={20} fill="currentColor" color="#fbbf24" />
            Leave a Google Review
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={handleRegenerate}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Generate Another
          </button>
        </div>
      </div>
    </div>
  );
}
