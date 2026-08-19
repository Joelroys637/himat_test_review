import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function GoogleReviewTemplate({ customerUrl, qrColor = '#000000', qrRef }) {
  return (
    <div 
      ref={qrRef}
      style={{
        width: '320px',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Circle Logo Area */}
      <div style={{
        position: 'relative',
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        borderTop: '8px solid #4285F4',    // Blue
        borderRight: '8px solid #EA4335',  // Red
        borderBottom: '8px solid #FBBC05', // Yellow
        borderLeft: '8px solid #34A853',   // Green
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '18px', color: '#333', fontWeight: '500', marginBottom: '4px' }}>Review us</div>
        <div style={{ fontSize: '18px', color: '#333', fontWeight: '500', marginBottom: '4px' }}>on</div>
        {/* Simple Google text approximation */}
        <div style={{ display: 'flex', fontWeight: 'bold', fontSize: '28px', letterSpacing: '-1px' }}>
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </div>
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FBBC05">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Instruction Text */}
      <div style={{ 
        color: '#000000', 
        fontSize: '18px', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '20px',
        lineHeight: '1.2'
      }}>
        Scan the QR Code below<br/>to leave us a review!
      </div>

      {/* The QR Code */}
      <div style={{ padding: '8px', background: 'white' }}>
        <QRCodeSVG 
          value={customerUrl || 'https://ratexpeed.com'} 
          size={160} 
          fgColor={qrColor}
          level="H"
          includeMargin={false}
        />
      </div>
    </div>
  );
}
