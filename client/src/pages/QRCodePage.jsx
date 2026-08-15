import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, ExternalLink, Check, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { AuthContext } from '../context/AuthContext';
import StandardTemplate from '../components/qr-templates/StandardTemplate';
import GoogleReviewTemplate from '../components/qr-templates/GoogleReviewTemplate';

export default function QRCodePage() {
  const navigate = useNavigate();
  const { vendor: authVendor } = useContext(AuthContext);
  
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState(null);
  
  const qrRef = useRef(null);

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
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVendorData();
  }, []);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(vendorData?.customerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const downloadQR = async () => {
    if (!qrRef.current) return;
    try {
      // Use html2canvas to capture the entire customized template
      const canvas = await html2canvas(qrRef.current, {
        scale: 3, // High resolution
        backgroundColor: null, // Keep transparent backgrounds if any
        logging: false
      });
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `RateXpeed_QR_${vendorData?.vendorId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    } catch (err) {
      console.error("Failed to download QR image", err);
      alert("Failed to download image. Try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary-color)" />
      </div>
    );
  }

  if (!vendorData || !vendorData.customerUrl) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No QR Code Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Please set up your business profile first.</p>
      </div>
    );
  }

  const qrColor = vendorData.qrColor || '#000000';
  const qrTemplate = vendorData.qrTemplate || 'standard';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', alignSelf: 'flex-start' }}>Your Active QR Code</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', alignSelf: 'flex-start' }}>Download and print this QR code to place at your storefront.</p>
        
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', width: '100%' }}>
        
        {/* Visual Preview Area */}
        <div style={{ 
          background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\' fill=\'%231a1a1a\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          padding: '3rem',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
        }}>
          {qrTemplate === 'standard' ? (
            <StandardTemplate customerUrl={vendorData.customerUrl} qrColor={qrColor} qrRef={qrRef} />
          ) : (
            <GoogleReviewTemplate customerUrl={vendorData.customerUrl} qrColor={qrColor} qrRef={qrRef} />
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px', width: '100%' }}>
          
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Customer URL</p>
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.6)', 
              padding: '1rem', 
              borderRadius: '0.75rem',
              border: '1px solid var(--card-border)',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              color: '#a5b4fc',
              fontSize: '0.875rem'
            }}>
              {vendorData.customerUrl}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <button onClick={downloadQR} className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.125rem' }}>
              <Download size={20} style={{ marginRight: '0.5rem' }} />
              Download High-Res QR
            </button>
            
            <button onClick={handleCopyUrl} className="btn btn-secondary" style={{ padding: '1rem' }}>
              {copied ? <Check size={18} color="var(--success)" style={{ marginRight: '0.5rem' }} /> : <Copy size={18} style={{ marginRight: '0.5rem' }} />}
              {copied ? 'Copied to Clipboard' : 'Copy Customer URL'}
            </button>

            <button onClick={() => window.open(vendorData.customerUrl, '_blank')} className="btn btn-secondary" style={{ padding: '1rem', background: 'transparent' }}>
              <ExternalLink size={18} style={{ marginRight: '0.5rem' }} />
              Test Customer Page
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
