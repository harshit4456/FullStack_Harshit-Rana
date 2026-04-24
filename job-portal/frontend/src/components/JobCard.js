import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate(`/jobs/${job.id}`)}>
      <div style={styles.top}>
        <div style={styles.logo}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1a56db' }}>{job.logo}</span>
        </div>
        <div style={styles.badges}>
          {job.urgent && <span style={styles.urgentBadge}>Urgent</span>}
          {job.remote && <span style={styles.remoteBadge}>Remote</span>}
        </div>
      </div>

      <h3 style={styles.title}>{job.title}</h3>
      <div style={styles.company}>{job.company}</div>

      <div style={styles.meta}>
        <span style={styles.metaItem}>📍 {job.location}</span>
        <span style={styles.metaItem}>💼 {job.type}</span>
        <span style={styles.metaItem}>⏱ {job.experience}</span>
      </div>

      <div style={styles.salary}>{job.salary}</div>

      <div style={styles.footer}>
        <div style={styles.skills}>
          {job.skills.slice(0, 3).map(s => (
            <span key={s} style={styles.skill}>{s}</span>
          ))}
          {job.skills.length > 3 && <span style={styles.skillMore}>+{job.skills.length - 3}</span>}
        </div>
        <button style={styles.viewBtn} onClick={e => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}>
          View
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff', border: '1px solid #ddd', borderRadius: 8,
    padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10,
    fontFamily: 'Arial, sans-serif',
  },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  logo: {
    width: 44, height: 44, borderRadius: 8, background: '#e8f0fe',
    border: '1px solid #c5d8fd',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  badges: { display: 'flex', gap: 6 },
  urgentBadge: { background: '#fff0f0', border: '1px solid #f5c6c6', color: '#c0392b', padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 },
  remoteBadge: { background: '#e8f8f5', border: '1px solid #b2dfdb', color: '#1a7a5e', padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 },
  title: { fontSize: 16, fontWeight: 700, color: '#1a1a1a' },
  company: { fontSize: 13, color: '#555' },
  meta: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  metaItem: { fontSize: 12, color: '#888' },
  salary: { fontSize: 15, fontWeight: 700, color: '#1a56db' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #eee' },
  skills: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  skill: { background: '#f5f5f5', border: '1px solid #ddd', color: '#555', padding: '3px 8px', borderRadius: 4, fontSize: 11 },
  skillMore: { color: '#999', fontSize: 11, padding: '3px 4px' },
  viewBtn: {
    background: '#1a56db', color: '#fff', padding: '6px 14px',
    borderRadius: 5, fontSize: 13, fontWeight: 600, border: 'none',
    cursor: 'pointer', fontFamily: 'Arial, sans-serif',
  },
};
