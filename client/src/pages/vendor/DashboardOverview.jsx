import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Activity, Users, Star, TrendingUp } from 'lucide-react';

export default function DashboardOverview() {
  const { vendor } = useContext(AuthContext);

  const stats = [
    { title: 'Total Reviews Generated', value: vendor?.totalReviewsGenerated || 0, icon: <Star size={24} color="#fbbf24" />, change: '+0%' },
    { title: 'Profile Views', value: vendor?.profileViews || 0, icon: <Activity size={24} color="#6366f1" />, change: '+0%' },
    { title: 'QR Scans', value: vendor?.qrScans || 0, icon: <Users size={24} color="#a855f7" />, change: '+0%' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Live marketplace KPIs, ops queues, and growth.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.title}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{stat.value}</h3>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.05)', borderRadius: '0.75rem' }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--success)' }}>
              <TrendingUp size={16} />
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Welcome to RateXpeed, {vendor?.username}!</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          This is your central hub for managing your business profile, customizing your QR codes, and tracking your review generation progress. Use the sidebar to navigate through your settings.
        </p>
      </div>
    </div>
  );
}
