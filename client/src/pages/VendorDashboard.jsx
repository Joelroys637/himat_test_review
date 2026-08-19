import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Store, QrCode } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const businessTypes = [
  'Restaurant', 'Hotel', 'Clothing Shop', 'Electronics Shop',
  'Salon', 'Bakery', 'Medical Shop', 'Travel Agency', 'Cafe',
  'Supermarket', 'Other'
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { vendor: authVendor } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const [formData, setFormData] = useState({
    businessType: 'Restaurant',
    customBusinessType: '',
    shopName: '',
    googleReviewUrl: ''
  });
  
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [vendorData, setVendorData] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.vendor) {
          setVendorData(data.vendor);
          
          let bType = data.vendor.businessType || 'Restaurant';
          let customType = '';
          if (data.vendor.businessType && !businessTypes.includes(data.vendor.businessType)) {
            bType = 'Other';
            customType = data.vendor.businessType;
          }

          setFormData({
            businessType: bType,
            customBusinessType: customType,
            shopName: data.vendor.shopName || '',
            googleReviewUrl: data.vendor.googleReviewUrl || ''
          });
          setKeywords(data.vendor.keywords || []);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load your business profile.");
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchVendorData();
  }, []);

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
    setSuccessMsg(null);
    
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
      const token = localStorage.getItem('vendorToken');
      const response = await fetch(`/api/vendors/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
        setSuccessMsg('Business profile successfully updated!');
        setVendorData(data.vendor);
        // navigate(`/vendor/qr/${data.vendorId}`);
      } else {
        setError(data.message || 'Failed to update business profile');
      }
    } catch (err) {
      setError('Network error. Ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>Profile Information</h1>
        
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Business information</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button"
                onClick={() => navigate('/vendor')}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius: '2rem', fontSize: '0.875rem' }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="profile-form"
                className="btn btn-primary" 
                disabled={loading} 
                style={{ padding: '0.5rem 1.5rem', width: 'auto', borderRadius: '2rem', fontSize: '0.875rem' }}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: '#fca5a5', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', color: '#6ee7b7', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
              {successMsg}
            </div>
          )}

          <form id="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid">
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

              <div className="form-group" style={formData.businessType !== 'Other' ? { gridColumn: '1 / -1' } : {}}>
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

              <div className="form-group form-full-width">
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

              <div className="form-group form-full-width">
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

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
