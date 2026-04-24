import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div style={styles.logo} onClick={() => navigate('/profile')}>
          <div style={styles.logoIcon}>JA</div>
          <span style={styles.logoText}>Job Apply</span>
        </div>

        <div style={styles.links}>
          <button
            style={{ ...styles.navLink, ...(location.pathname === '/profile' ? styles.navLinkActive : {}) }}
            onClick={() => navigate('/profile')}
          >Dashboard</button>
          <button
            style={{ ...styles.navLink, ...(location.pathname.startsWith('/jobs') ? styles.navLinkActive : {}) }}
            onClick={() => navigate('/jobs')}
          >Find Jobs</button>
        </div>

        <div style={styles.right}>
          <div style={styles.userBadge}>
            <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div style={styles.userName}>{user?.name}</div>
              <div style={styles.userRole}>{user?.role}</div>
            </div>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: '#ffffff',
    borderBottom: '1px solid #ddd',
    padding: '0 24px',
    fontFamily: 'Arial, sans-serif',
  },
  inner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 58,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  logoIcon: {
    width: 32, height: 32, borderRadius: 5,
    background: '#1a56db',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700, color: '#fff',
  },
  logoText: { fontWeight: 700, fontSize: 17, color: '#1a1a1a' },
  links: { display: 'flex', gap: 4 },
  navLink: {
    background: 'none', border: 'none', color: '#555',
    padding: '7px 14px', borderRadius: 5, fontWeight: 500,
    fontSize: 14, cursor: 'pointer', fontFamily: 'Arial, sans-serif',
  },
  navLinkActive: { color: '#1a56db', background: '#e8f0fe', fontWeight: 600 },
  right: { display: 'flex', alignItems: 'center', gap: 14 },
  userBadge: { display: 'flex', alignItems: 'center', gap: 8 },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: '#1a56db',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: '#fff',
  },
  userName: { fontSize: 13, fontWeight: 600, color: '#1a1a1a' },
  userRole: { fontSize: 11, color: '#888', textTransform: 'capitalize' },
  logoutBtn: {
    background: '#fff', border: '1px solid #ccc', color: '#555',
    padding: '6px 14px', borderRadius: 5, fontSize: 13,
    cursor: 'pointer', fontFamily: 'Arial, sans-serif',
  },
};
