import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import siteConfig from '../data/siteConfig.json';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';

const FAQS = [
  {
    q: 'How do I become an official CODEX member?',
    a: 'Membership recruitments open at the beginning of each academic semester. Complete the inquiry form below, attend our orientation hackathon, and participate in our project sprint.',
  },
  {
    q: 'Do I need prior coding experience to join?',
    a: 'No prior advanced experience is strictly required for junior intake. We value curiosity, consistency, and problem-solving aptitude over raw memorization. We host zero-to-hero bootcamps in Web, AI, and 3D graphics.',
  },
  {
    q: 'What technologies does the club primarily work with?',
    a: 'We actively build with React, TypeScript, Three.js/WebGL, Python, PyTorch, Go, FastAPI, Docker, and distributed cloud systems.',
  },
  {
    q: 'How often does the club hold meetings?',
    a: 'Our core innovation lab sessions are held every Wednesday and Friday from 4:30 PM to 6:30 PM in the Advanced Computing Lab (Block 4).',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    year: 'Year 2',
    domain: 'Fullstack Web',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#ffffff'],
      });
    } catch (err) {
      // Fallback silently if canvas-confetti is not rendered
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* PAGE HEADER */}
      <PageHeader
        badge="GET IN TOUCH"
        title="Connect with CODEX"
        subtitle="Apply to join our student developer squads, propose a cross-club collaboration, or visit our advanced computing lab."
        breadcrumbs={[{ name: 'Contact & Join', path: null }]}
      />

      <div className="container" style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '48px',
          }}
          className="contact-grid"
        >
          {/* 1. APPLICATION & CONTACT FORM */}
          <div>
            <GlassCard style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                  Student Membership &amp; Inquiries
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                Fill out the application below to connect with our membership onboarding team.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: '36px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <CheckCircle2 size={44} color="#059669" style={{ marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Application Transmitted!
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '380px', marginBottom: '24px' }}>
                    Thank you, <strong style={{ color: 'var(--text-primary)' }}>{formData.name}</strong>. Our student council will review your submission and reach out via <strong style={{ color: 'var(--accent-blue)' }}>{formData.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        studentId: '',
                        year: 'Year 2',
                        domain: 'Fullstack Web',
                        message: '',
                      });
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Diya Nair"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        College Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@college.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Academic Year
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="glass-input"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Year 1" style={{ background: '#ffffff', color: '#0f172a' }}>First Year (Freshman)</option>
                        <option value="Year 2" style={{ background: '#ffffff', color: '#0f172a' }}>Second Year (Sophomore)</option>
                        <option value="Year 3" style={{ background: '#ffffff', color: '#0f172a' }}>Third Year (Junior)</option>
                        <option value="Year 4" style={{ background: '#ffffff', color: '#0f172a' }}>Fourth Year (Senior)</option>
                        <option value="Postgrad" style={{ background: '#ffffff', color: '#0f172a' }}>Postgraduate / Faculty</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Primary Domain Interest
                      </label>
                      <select
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="glass-input"
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="Fullstack Web" style={{ background: '#ffffff', color: '#0f172a' }}>Fullstack Web (React/Node)</option>
                        <option value="AI & ML" style={{ background: '#ffffff', color: '#0f172a' }}>Machine Learning &amp; AI</option>
                        <option value="3D & WebGL" style={{ background: '#ffffff', color: '#0f172a' }}>3D Graphics / Three.js</option>
                        <option value="Cloud & DevOps" style={{ background: '#ffffff', color: '#0f172a' }}>Cloud &amp; Distributed Systems</option>
                        <option value="Mobile Development" style={{ background: '#ffffff', color: '#0f172a' }}>Mobile Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Tell us about your interests or past projects
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share what technologies you enjoy, GitHub link, or why you want to build with Codex..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="glass-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', width: '100%' }}>
                    <span>Submit Application</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </GlassCard>
          </div>

          {/* 2. CAMPUS DETAILS & FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Campus Info Card */}
            <GlassCard style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Campus Lab Headquarters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="var(--accent-blue)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>LOCATION</strong>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{siteConfig.contact.labLocation}</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{siteConfig.contact.campus}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={18} color="var(--accent-indigo)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>HOURS</strong>
                    <span style={{ color: 'var(--text-primary)' }}>{siteConfig.contact.meetingSchedule}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Mail size={18} color="var(--accent-blue)" style={{ marginTop: '3px' }} />
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>OFFICIAL INBOX</strong>
                    <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'var(--accent-blue)' }}>
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* FAQS ACCORDION */}
            <GlassCard style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Frequently Asked Questions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(241, 245, 249, 0.7)',
                        border: '1px solid rgba(15, 23, 42, 0.07)',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          fontWeight: 600,
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: '0 18px 16px 18px',
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
