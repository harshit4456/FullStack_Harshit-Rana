import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password, form.role);
      }
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.brand}>
          <div style={styles.logoIcon}>JA</div>
          <span style={styles.logoText}>Job Apply</span>
        </div>

        <p style={styles.subtitle}>
          {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
        </p>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(mode === 'login' ? styles.tabActive : {}) }}
            onClick={() => { setMode('login'); setError(''); }}
          >Login</button>
          <button
            style={{ ...styles.tab, ...(mode === 'register' ? styles.tabActive : {}) }}
            onClick={() => { setMode('register'); setError(''); }}
          >Register</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === 'register' && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                name="name" type="text" placeholder="Enter your full name"
                value={form.name} onChange={handleChange}
                style={styles.input} required
              />
            </div>
          )}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              name="email" type="email" placeholder="Enter your email"
              value={form.email} onChange={handleChange}
              style={styles.input} required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password" type="password" placeholder="Enter your password"
              value={form.password} onChange={handleChange}
              style={styles.input} required
            />
          </div>

          {mode === 'register' && (
            <div style={styles.fieldGroup}>
              <label style={styles.label}>I am a</label>
              <select name="role" value={form.role} onChange={handleChange} style={styles.select}>
                <option value="jobseeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <p style={styles.switchText}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span style={styles.switchLink} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>

        <div style={styles.demoHint}>
          Demo: Register with any email and password to get started
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: '36px 40px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
  },
  logoIcon: {
    width: 36, height: 36, borderRadius: 6,
    background: '#1a56db',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  logoText: {
    fontSize: 20, fontWeight: 700, color: '#1a1a1a',
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    fontSize: 14, color: '#555', marginBottom: 20, fontFamily: 'Arial, sans-serif',
  },
  tabs: {
    display: 'flex', border: '1px solid #ddd', borderRadius: 6,
    overflow: 'hidden', marginBottom: 24,
  },
  tab: {
    flex: 1, padding: '9px 0', border: 'none',
    background: '#f9f9f9', color: '#555', fontSize: 14,
    cursor: 'pointer', fontFamily: 'Arial, sans-serif',
  },
  tabActive: {
    background: '#1a56db', color: '#fff', fontWeight: 600,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: {
    fontSize: 13, fontWeight: 600, color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    background: '#fff', border: '1px solid #ccc',
    borderRadius: 5, padding: '10px 12px', color: '#1a1a1a',
    fontSize: 14, width: '100%', fontFamily: 'Arial, sans-serif',
  },
  select: {
    background: '#fff', border: '1px solid #ccc',
    borderRadius: 5, padding: '10px 12px', color: '#1a1a1a',
    fontSize: 14, width: '100%', cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
  },
  error: {
    background: '#fff0f0', border: '1px solid #f5c6c6',
    color: '#c0392b', padding: '9px 12px', borderRadius: 5, fontSize: 13,
    fontFamily: 'Arial, sans-serif',
  },
  submitBtn: {
    background: '#1a56db', color: '#fff',
    padding: '11px', borderRadius: 5, border: 'none',
    fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 4,
    fontFamily: 'Arial, sans-serif',
  },
  switchText: {
    marginTop: 18, textAlign: 'center', fontSize: 13, color: '#555',
    fontFamily: 'Arial, sans-serif',
  },
  switchLink: {
    color: '#1a56db', cursor: 'pointer', fontWeight: 600,
    textDecoration: 'underline',
  },
  demoHint: {
    marginTop: 16, textAlign: 'center', fontSize: 12, color: '#888',
    background: '#f9f9f9', border: '1px solid #eee',
    borderRadius: 5, padding: '8px 10px',
    fontFamily: 'Arial, sans-serif',
  },
};
