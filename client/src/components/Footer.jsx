import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import siteLogo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer style={{ 
      background: '#0a0a0a', 
      color: '#a1a1aa', 
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          
          {/* Left Column (Brand + Newsletter) */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              <img src={siteLogo} alt="RateXpeed" style={{ height: '32px', width: 'auto' }} />
              <span><span style={{ color: 'var(--primary-color)' }}>Rate</span>Xpeed</span>
            </Link>
            <p style={{ marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Democratizing world-class tech through AI-augmented delivery and human expertise. Enterprise quality, startup speed, free entry point.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
              <a href="https://www.instagram.com/himat_technologies/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/himat-14b1051b4/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>

            <div>
              <p style={{ color: 'white', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Weekly insights on AI, web, and growth <ArrowRight size={14} />
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    padding: '0.75rem 1rem', 
                    borderRadius: '0.5rem',
                    color: 'white',
                    width: '100%',
                    outline: 'none'
                  }} 
                />
                <button style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ color: 'white', fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Quick Links</h4>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
            <Link to="/vendor" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
            <a href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>How It Works</a>
            <a href="/#features" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Powerful Features</a>
          </div>

        </div>

        {/* Bottom Line */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          paddingTop: '2rem', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.875rem'
        }}>
          <div>
            © 2026 HiMat Technologies. All rights reserved. Built in remote, shipped worldwide.
          </div>
        </div>

      </div>
    </footer>
  );
}
