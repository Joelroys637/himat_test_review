import { useNavigate } from 'react-router-dom';
import { Star, Zap, QrCode, LayoutDashboard, Gift, TrendingUp, Smartphone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#000000', color: 'white' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ padding: '3rem 1rem 6rem 1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', animation: 'slideUp 0.8s ease-out forwards' }}>
          
          {/* Animated Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(34, 197, 94, 0.2)' }} className="animate-pulse">
            <Gift size={16} /> 100% Free Forever. No Limitations.
          </div>
          
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Supercharge Your <br/>
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'pulse 3s infinite' }}>Google Reviews</span> with AI.
          </h1>
          
          <p style={{ color: '#a1a1aa', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
            Transform happy customers into powerful marketers. Get a dedicated vendor portal, customize your brand's QR codes, and generate unlimited high-quality reviews completely free.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/vendor')} style={{ fontSize: '1.125rem', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 10px 25px -5px rgba(99,102,241,0.5)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Claim Your Free Dashboard <ArrowRight size={20} />
            </button>
            <button style={{ fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => {e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'scale(1.05)'}} onMouseOut={(e) => {e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'scale(1)'}}>
              View Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Flagship Features Grid */}
      <section id="features" style={{ padding: '6rem 1rem', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Platform Specifications</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Everything you need to dominate local SEO without spending a dime.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Feature 1 */}
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(99,102,241,0.2)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default', position: 'relative', overflow: 'hidden' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
                <QrCode size={30} color="#818cf8" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Custom Google QR Codes</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.05rem' }}>Generate stunning, print-ready QR codes wrapped in custom Google Review templates. Pick your exact brand colors to perfectly match your storefront aesthetics.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(168,85,247,0.2)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default', position: 'relative', overflow: 'hidden' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
               <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(168,85,247,0.2)' }}>
                <LayoutDashboard size={30} color="#c084fc" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Dedicated Vendor Portal</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.05rem' }}>Manage your entire operation from a sleek, centralized dashboard. Update your business keywords, track analytics, and regenerate QRs instantly.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,197,94,0.2)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default', position: 'relative', overflow: 'hidden' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
               <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(20px)' }}></div>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid rgba(34,197,94,0.2)' }}>
                <ShieldCheck size={30} color="#4ade80" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>100% Free. No Limits.</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1.05rem' }}>No hidden subscriptions, no "per-scan" fees, and no feature gating. RateXpeed is entirely free to use for unlimited scans and unlimited review generations.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" style={{ padding: '7rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.02em' }}>How It Works</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Three simple steps to build an unshakeable online reputation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', position: 'relative' }}>
            {[
              { icon: <Smartphone size={32} color="#6366f1" />, step: '01', title: 'Customer Scans QR', desc: 'Your customer scans the custom QR code displayed at your business location using their smartphone.' },
              { icon: <MessageSquare size={32} color="#a855f7" />, step: '02', title: 'Answers 3 Questions', desc: 'They quickly tap answers to three simple questions about what they loved most regarding their experience.' },
              { icon: <Star size={32} color="#ec4899" />, step: '03', title: 'AI Posts Review', desc: 'Our AI instantly generates a beautiful 5-star review they can post to your Google profile with one click.' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', transition: 'transform 0.3s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', position: 'relative', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                  {item.icon}
                  <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#18181b', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 'bold', border: '2px solid #3f3f46' }}>
                    {item.step}
                  </div>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>{item.title}</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '7rem 1rem', background: 'linear-gradient(to right, rgba(99,102,241,0.08), rgba(168,85,247,0.08))', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>Ready to dominate your local market?</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.25rem', marginBottom: '3rem' }}>Join hundreds of vendors who are automating their 5-star Google reviews and boosting their SEO, 100% free.</p>
          <button className="btn btn-primary" onClick={() => navigate('/vendor')} style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', borderRadius: '1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(99,102,241,0.4)', transition: 'transform 0.2s', animation: 'pulse 2s infinite' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Create Free Account
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
