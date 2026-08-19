import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Edit, QrCode, Palette } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorLayout() {
  const sidebarLinks = [
    { to: '/vendor', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
    { to: '/vendor/edit', icon: <Edit size={20} />, label: 'Edit Profile' },
    { to: '/vendor/customize', icon: <Palette size={20} />, label: 'Customize QR' },
    { to: '/vendor/qr-view', icon: <QrCode size={20} />, label: 'View QR Code' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <Header />
      
      <div className="vendor-layout-wrapper">
        {/* Sidebar */}
        <aside className="vendor-sidebar">
          <div style={{ padding: '0 1rem', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="mobile-hidden">
            Menu
          </div>
          
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(245, 184, 46, 0.15)' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              })}
            >
              {React.cloneElement(link.icon, { color: 'currentColor' })}
              <span className="mobile-hidden">{link.label}</span>
            </NavLink>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="vendor-main-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
