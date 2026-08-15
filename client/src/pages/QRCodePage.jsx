import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, ExternalLink, RefreshCw, Check } from 'lucide-react';

export default function QRCodePage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const customerUrl = `${window.location.origin}/review/${vendorId}`;
  const qrRef = useRef();

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(customerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_${vendorId}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Your Customer Review QR</h2>
        
        <div 
          ref={qrRef}
          style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '1.5rem', 
            display: 'inline-block',
            marginBottom: '2rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          <QRCodeSVG 
            value={customerUrl} 
            size={256} 
            level="H"
            includeMargin={false}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Customer URL</p>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.6)', 
            padding: '1rem', 
            borderRadius: '0.75rem',
            border: '1px solid var(--card-border)',
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            color: '#a5b4fc'
          }}>
            {customerUrl}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={downloadQR} className="btn btn-primary">
            <Download size={18} />
            Download QR
          </button>
          
          <button onClick={handleCopyUrl} className="btn btn-secondary">
            {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={() => window.open(customerUrl, '_blank')} className="btn btn-secondary">
            <ExternalLink size={18} />
            Open Customer Page
          </button>
          
          <button onClick={() => navigate('/vendor')} className="btn btn-secondary" style={{ border: 'none', background: 'transparent' }}>
            <RefreshCw size={18} />
            Create Another
          </button>
        </div>
      </div>
    </div>
  );
}
