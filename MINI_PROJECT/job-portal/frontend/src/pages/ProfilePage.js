import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const SKILLS_OPTIONS = ['JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'Java', 'TypeScript', 'MongoDB', 'AWS', 'Figma', 'Machine Learning', 'Docker'];
const LOCATIONS = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Remote'];
const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Design', 'Marketing', 'Data Science', 'Management', 'Education'];

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    headline: '', experience: '0-1', location: '', skills: [],
    preferredType: 'Full-time', industry: '', salaryMin: '', openToRemote: false, bio: '',
  });
  const [saved, setSaved] = useState(false);

  const toggleSkill = (skill) => {
    setProfile(p => ({
      ...p,
      skills: p.skills.includes(skill) ? p.skills.filter(s => s !== skill) : [...p.skills, skill]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.welcome}>
          <div>
            <h1 style={styles.welcomeName}>Welcome, {user?.name}</h1>
            <p style={styles.welcomeSub}>Fill in your profile details to get started</p>
          </div>
          <button style={styles.findJobsBtn} onClick={() => navigate('/jobs')}>Find Jobs</button>
        </div>

        <div style={styles.grid}>
          <div style={styles.formCard}>
            <h2 style={styles.cardTitle}>My Profile</h2>
            <form onSubmit={handleSave} style={styles.form}>
              <div style={styles.row2}>
                <div style={styles.field}>
                  <label style={styles.label}>Professional Headline</label>
                  <input style={styles.input} placeholder="e.g. React Developer"
                    value={profile.headline} onChange={e => setProfile(p => ({ ...p, headline: e.target.value }))} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Experience Level</label>
                  <select style={styles.select} value={profile.experience}
                    onChange={e => setProfile(p => ({ ...p, experience: e.target.value }))}>
                    <option value="0-1">0-1 years (Fresher)</option>
                    <option value="1-3">1-3 years (Junior)</option>
                    <option value="3-5">3-5 years (Mid-level)</option>
                    <option value="5-8">5-8 years (Senior)</option>
                    <option value="8+">8+ years (Lead)</option>
                  </select>
                </div>
              </div>
              <div style={styles.row2}>
                <div style={styles.field}>
                  <label style={styles.label}>Preferred Location</label>
                  <select style={styles.select} value={profile.location}
                    onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}>
                    <option value="">Select city</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Industry</label>
                  <select style={styles.select} value={profile.industry}
                    onChange={e => setProfile(p => ({ ...p, industry: e.target.value }))}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div style={styles.row2}>
                <div style={styles.field}>
                  <label style={styles.label}>Job Type</label>
                  <select style={styles.select} value={profile.preferredType}
                    onChange={e => setProfile(p => ({ ...p, preferredType: e.target.value }))}>
                    <option>Full-time</option><option>Part-time</option>
                    <option>Freelance</option><option>Internship</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Expected Salary (LPA)</label>
                  <input style={styles.input} type="number" placeholder="e.g. 12"
                    value={profile.salaryMin} onChange={e => setProfile(p => ({ ...p, salaryMin: e.target.value }))} />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Skills</label>
                <div style={styles.skillsGrid}>
                  {SKILLS_OPTIONS.map(skill => (
                    <button key={skill} type="button"
                      style={{ ...styles.skillChip, ...(profile.skills.includes(skill) ? styles.skillChipActive : {}) }}
                      onClick={() => toggleSkill(skill)}>{skill}</button>
                  ))}
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Short Bio</label>
                <textarea style={styles.textarea} rows={3}
                  placeholder="Tell employers a little about yourself..."
                  value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
              </div>
              <label style={styles.checkRow}>
                <input type="checkbox" checked={profile.openToRemote}
                  onChange={e => setProfile(p => ({ ...p, openToRemote: e.target.checked }))} />
                <span style={{ fontSize: 14, color: '#333' }}>Open to remote opportunities</span>
              </label>
              <button type="submit" style={styles.saveBtn}>{saved ? 'Saved!' : 'Save Profile'}</button>
            </form>
          </div>

          <div style={styles.sidePanel}>
            <div style={styles.statsCard}>
              <h3 style={styles.sideTitle}>Your Stats</h3>
              <div style={styles.statsGrid}>
                {[['12','Applications'],['3','Interviews'],['47','Profile Views'],['8','Saved Jobs']].map(([n,l]) => (
                  <div key={l} style={styles.statBox}>
                    <div style={styles.statNum}>{n}</div>
                    <div style={styles.statLabel}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '28px 24px' },
  welcome: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#fff', border: '1px solid #ddd', borderRadius: 8,
    padding: '20px 24px', marginBottom: 24,
  },
  welcomeName: { fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
  welcomeSub: { fontSize: 14, color: '#666' },
  findJobsBtn: {
    background: '#1a56db', color: '#fff', padding: '10px 22px',
    borderRadius: 5, border: 'none', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'Arial, sans-serif',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 },
  formCard: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 28 },
  cardTitle: { fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#333' },
  input: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '9px 12px', color: '#1a1a1a', fontSize: 14, fontFamily: 'Arial, sans-serif' },
  select: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '9px 12px', color: '#1a1a1a', fontSize: 14, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  textarea: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '9px 12px', color: '#1a1a1a', fontSize: 14, resize: 'vertical', fontFamily: 'Arial, sans-serif' },
  skillsGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  skillChip: { padding: '6px 12px', borderRadius: 5, fontSize: 13, background: '#f5f5f5', border: '1px solid #ddd', color: '#333', cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  skillChipActive: { background: '#e8f0fe', border: '1px solid #1a56db', color: '#1a56db' },
  checkRow: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  saveBtn: { background: '#1a56db', color: '#fff', padding: '11px', borderRadius: 5, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  sidePanel: {},
  statsCard: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24 },
  sideTitle: { fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#1a1a1a' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  statBox: { background: '#f9f9f9', border: '1px solid #eee', borderRadius: 6, padding: '14px 16px' },
  statNum: { fontSize: 26, fontWeight: 700, color: '#1a56db' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },
};
