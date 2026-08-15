import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import siteLogo from '../assets/logo.png';

export default function Header() {
  const { vendor, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Close the mobile menu automatically if the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <img src={siteLogo} alt="RateXpeed" style={{ height: '32px', width: 'auto' }} />
          <span><span style={{ color: 'var(--primary-color)' }}>Rate</span>Xpeed</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="mobile-hidden" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: 'var(--text-secondary)', fontWeight: '500', transition: 'color 0.2s' }}>Home</Link>
          {vendor ? (
            <>
              <Link to="/vendor" className="nav-link" style={{ color: 'white', fontWeight: '600' }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ color: 'white', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', background: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Login</Link>
          )}
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          className="desktop-hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#111111',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <img src={siteLogo} alt="RateXpeed" style={{ height: '32px', width: 'auto' }} />
              <span><span style={{ color: 'var(--primary-color)' }}>Rate</span>Xpeed</span>
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={32} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '1.25rem' }}
            >
              Home
            </Link>
            {vendor ? (
              <>
                <Link 
                  to="/vendor" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '1.25rem' }}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  style={{ color: 'var(--danger)', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: '600', fontSize: '1.25rem', padding: 0 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '1.25rem' }}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
