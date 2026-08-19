import React, { useState, useEffect, useContext } from 'react';
import { Loader2, Save } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import StandardTemplate from '../../components/qr-templates/StandardTemplate';
import GoogleReviewTemplate from '../../components/qr-templates/GoogleReviewTemplate';

export default function QRCustomizer() {
  const { vendor: authVendor } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const [qrColor, setQrColor] = useState('#000000');
  const [qrTemplate, setQrTemplate] = useState('standard');
  const [customerUrl, setCustomerUrl] = useState('');

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.vendor) {
          setQrColor(data.vendor.qrColor || '#000000');
          setQrTemplate(data.vendor.qrTemplate || 'standard');
          
          const dynamicUrl = `${window.location.origin}/review/${data.vendor.vendorId}`;
          setCustomerUrl(dynamicUrl);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load your customization profile.");
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchVendorData();
  }, []);

  const handleSave = async () => {
    setError(null);
    setSuccessMsg(null);
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
          qrColor,
          qrTemplate
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccessMsg('QR Settings successfully saved!');
      } else {
        setError(data.message || 'Failed to save settings');
      }
    } catch (err) {
      setError('Network error.');
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
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Customize QR Code</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Personalize your QR code template and colors to match your brand.</p>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Controls Column */}
        <div className="glass-card" style={{ padding: '2rem', height: 'fit-content' }}>
          
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '1.125rem' }}>Select Template</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div 
                onClick={() => setQrTemplate('standard')}
                style={{ 
                  border: qrTemplate === 'standard' ? '2px solid var(--primary-color)' : '2px solid rgba(0,0,0,0.1)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: qrTemplate === 'standard' ? 'rgba(245, 184, 46, 0.15)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Standard
              </div>
              <div 
                onClick={() => setQrTemplate('google-review')}
                style={{ 
                  border: qrTemplate === 'google-review' ? '2px solid var(--primary-color)' : '2px solid rgba(0,0,0,0.1)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  background: qrTemplate === 'google-review' ? 'rgba(245, 184, 46, 0.15)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Google Review
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <label className="form-label" style={{ fontSize: '1.125rem' }}>QR Code Color</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="color" 
                value={qrColor} 
                onChange={(e) => setQrColor(e.target.value)}
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  padding: '0', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              />
              <span style={{ fontFamily: 'monospace', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>{qrColor}</span>
            </div>
          </div>

          <button 
            onClick={handleSave} 
            className="btn btn-primary" 
            disabled={loading} 
            style={{ width: '100%', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Customization</>}
          </button>
        </div>

        {/* Preview Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Live Preview</h3>
          
          <div style={{ 
            background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%23f3f4f6\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            padding: '3rem',
            borderRadius: '1rem',
            border: '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            {qrTemplate === 'standard' ? (
              <StandardTemplate customerUrl={customerUrl} qrColor={qrColor} />
            ) : (
              <GoogleReviewTemplate customerUrl={customerUrl} qrColor={qrColor} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
