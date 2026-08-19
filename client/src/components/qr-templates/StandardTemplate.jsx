import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function StandardTemplate({ customerUrl, qrColor = '#000000', qrRef }) {
  return (
    <div 
      ref={qrRef}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '32px',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <QRCodeSVG 
        value={customerUrl || 'https://ratexpeed.com'} 
        size={220} 
        fgColor={qrColor}
        level="H"
        includeMargin={false}
      />
    </div>
  );
}
