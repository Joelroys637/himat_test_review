import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Store } from 'lucide-react';

const businessTypes = [
  'Restaurant', 'Hotel', 'Clothing Shop', 'Electronics Shop',
  'Salon', 'Bakery', 'Medical Shop', 'Travel Agency', 'Cafe',
  'Supermarket', 'Other'
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    businessType: 'Restaurant',
    customBusinessType: '',
    shopName: '',
    googleReviewUrl: ''
  });
  
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    const kw = keywordInput.trim().replace(/,/g, '');
    if (kw && !keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (kwToRemove) => {
    setKeywords(keywords.filter(kw => kw !== kwToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (keywords.length === 0) {
      setError('Please add at least one review keyword.');
      return;
    }
    
    const finalBusinessType = formData.businessType === 'Other' 
      ? formData.customBusinessType 
      : formData.businessType;

    if (!finalBusinessType) {
       setError('Please specify a business type.');
       return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessType: finalBusinessType,
          shopName: formData.shopName,
          keywords,
          googleReviewUrl: formData.googleReviewUrl
        })
      });

      const data = await response.json();
      
      if (data.success) {
        navigate(`/vendor/qr/${data.vendorId}`);
      } else {
        setError(data.message || 'Failed to generate QR code');
      }
    } catch (err) {
      setError('Network error. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Store size={32} color="var(--primary-color)" />
          <div>
            <h2 style={{ margin: 0 }}>Vendor Dashboard</h2>
            <div style={{ color: 'var(--success)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }}></span>
              System Online
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: '#fca5a5', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Type</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {formData.businessType === 'Other' && (
            <div className="form-group animate-pulse" style={{ animation: 'none' }}>
              <label className="form-label">Custom Business Type</label>
              <input
                type="text"
                name="customBusinessType"
                value={formData.customBusinessType}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g. Gym, Library"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Shop / Business Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. Leo's Coffee House"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Review Keywords</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                className="form-input"
                placeholder="Type keyword and press Enter"
              />
              <button type="button" onClick={addKeyword} className="btn btn-secondary" style={{ width: 'auto' }}>
                Add
              </button>
            </div>
            <div className="tags-container">
              {keywords.map(kw => (
                <span key={kw} className="tag">
                  {kw}
                  <button type="button" className="tag-remove" onClick={() => removeKeyword(kw)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              e.g. coffee, friendly staff, clean environment, good service, affordable price
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Google Review URL</label>
            <input
              type="url"
              name="googleReviewUrl"
              value={formData.googleReviewUrl}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://g.page/..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <Loader2 className="animate-spin" /> : 'Generate Customer QR'}
          </button>
        </form>
      </div>
    </div>
  );
}
