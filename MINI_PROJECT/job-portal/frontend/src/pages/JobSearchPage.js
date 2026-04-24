import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';

const CATEGORIES = ['All', 'Technology', 'Data Science', 'Design', 'Management', 'Marketing', 'Finance'];
const JOB_TYPES = ['All', 'Full-time', 'Part-time', 'Freelance', 'Internship'];

const DUMMY_JOBS = [
  { id:'1', title:'Senior Frontend Developer', company:'TechNova Inc.', location:'Bangalore, India', type:'Full-time', experience:'3-5 years', salary:'₹18-25 LPA', skills:['React','TypeScript','CSS','GraphQL'], category:'Technology', logo:'TN', color:'#1a56db', remote:true, urgent:true },
  { id:'2', title:'Data Scientist', company:'Analytics Hub', location:'Mumbai, India', type:'Full-time', experience:'2-4 years', salary:'₹15-22 LPA', skills:['Python','Machine Learning','SQL','TensorFlow'], category:'Data Science', logo:'AH', color:'#0ea5e9', remote:false, urgent:false },
  { id:'3', title:'Product Manager', company:'StartupXYZ', location:'Delhi, India', type:'Full-time', experience:'4-6 years', salary:'₹20-30 LPA', skills:['Product Strategy','Agile','Roadmapping','Analytics'], category:'Management', logo:'SX', color:'#f59e0b', remote:true, urgent:false },
  { id:'4', title:'Backend Engineer (Node.js)', company:'CloudSoft', location:'Hyderabad, India', type:'Full-time', experience:'2-5 years', salary:'₹14-20 LPA', skills:['Node.js','MongoDB','REST APIs','Docker'], category:'Technology', logo:'CS', color:'#10b981', remote:false, urgent:true },
  { id:'5', title:'UI/UX Designer', company:'DesignStudio Co.', location:'Pune, India', type:'Full-time', experience:'1-3 years', salary:'₹8-14 LPA', skills:['Figma','Adobe XD','Prototyping','User Research'], category:'Design', logo:'DS', color:'#ec4899', remote:true, urgent:false },
  { id:'6', title:'DevOps Engineer', company:'InfraCore Ltd.', location:'Chennai, India', type:'Full-time', experience:'3-6 years', salary:'₹16-24 LPA', skills:['AWS','Kubernetes','CI/CD','Terraform'], category:'Technology', logo:'IC', color:'#f97316', remote:false, urgent:false },
  { id:'7', title:'Content Writer', company:'MediaBridge', location:'Remote', type:'Part-time', experience:'1-2 years', salary:'₹4-6 LPA', skills:['Writing','SEO','Content Strategy','WordPress'], category:'Marketing', logo:'MB', color:'#8b5cf6', remote:true, urgent:false },
  { id:'8', title:'Financial Analyst', company:'WealthFirst', location:'Kolkata, India', type:'Full-time', experience:'2-4 years', salary:'₹10-16 LPA', skills:['Excel','Financial Modeling','Power BI','Accounting'], category:'Finance', logo:'WF', color:'#14b8a6', remote:false, urgent:false },
];

export default function JobSearchPage() {
  const [jobs, setJobs] = useState(DUMMY_JOBS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ title: '', location: '', category: 'All', type: 'All', remote: false });
  const [searched, setSearched] = useState(false);

  const applyFilters = (f) => {
    let filtered = [...DUMMY_JOBS];
    if (f.title) filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(f.title.toLowerCase()) ||
      j.company.toLowerCase().includes(f.title.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(f.title.toLowerCase()))
    );
    if (f.location) filtered = filtered.filter(j => j.location.toLowerCase().includes(f.location.toLowerCase()));
    if (f.category !== 'All') filtered = filtered.filter(j => j.category === f.category);
    if (f.type !== 'All') filtered = filtered.filter(j => j.type === f.type);
    if (f.remote) filtered = filtered.filter(j => j.remote);
    return filtered;
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = {};
      if (filters.title) params.title = filters.title;
      if (filters.location) params.location = filters.location;
      if (filters.category !== 'All') params.category = filters.category;
      if (filters.type !== 'All') params.type = filters.type;
      if (filters.remote) params.remote = true;
      const res = await axios.get('/api/jobs/search', { params });
      setJobs(res.data.jobs);
    } catch {
      setJobs(applyFilters(filters));
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    const newFilters = { ...filters, category: cat };
    setFilters(newFilters);
    setSearched(true);
    setJobs(applyFilters(newFilters));
  };

  const handleReset = () => {
    const reset = { title: '', location: '', category: 'All', type: 'All', remote: false };
    setFilters(reset);
    setJobs(DUMMY_JOBS);
    setSearched(false);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Find Jobs</h1>
          <p style={styles.headerSub}>{DUMMY_JOBS.length} jobs available</p>
        </div>

        {/* Search Form */}
        <div style={styles.searchBox}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <div style={styles.searchRow}>
              <input
                style={styles.searchInput}
                placeholder="Job title, company, or skill..."
                value={filters.title}
                onChange={e => setFilters(f => ({ ...f, title: e.target.value }))}
              />
              <input
                style={styles.searchInput}
                placeholder="Location (city or Remote)"
                value={filters.location}
                onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
              />
              <select style={styles.filterSelect} value={filters.type}
                onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
                {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <label style={styles.remoteToggle}>
                <input type="checkbox" checked={filters.remote}
                  onChange={e => setFilters(f => ({ ...f, remote: e.target.checked }))} />
                <span style={{ fontSize: 13, color: '#333' }}>Remote only</span>
              </label>
              <button type="submit" style={styles.searchBtn}>Search</button>
              {searched && <button type="button" style={styles.resetBtn} onClick={handleReset}>Reset</button>}
            </div>
          </form>

          {/* Category row */}
          <div style={styles.categoryRow}>
            {CATEGORIES.map(cat => (
              <button key={cat}
                style={{ ...styles.catPill, ...(filters.category === cat ? styles.catPillActive : {}) }}
                onClick={() => handleCategoryClick(cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.resultsHeader}>
          <span style={styles.resultsCount}>{loading ? 'Searching...' : `${jobs.length} result${jobs.length !== 1 ? 's' : ''}`}</span>
        </div>

        {loading ? (
          <div style={styles.loadingState}>Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No jobs found. <button style={styles.resetLink} onClick={handleReset}>Clear filters</button></p>
          </div>
        ) : (
          <div style={styles.grid}>
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '28px 24px' },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
  headerSub: { fontSize: 14, color: '#666' },
  searchBox: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20, marginBottom: 20 },
  searchForm: {},
  searchRow: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 },
  searchInput: { flex: 1, minWidth: 180, background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '9px 12px', color: '#1a1a1a', fontSize: 14, fontFamily: 'Arial, sans-serif' },
  filterSelect: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '9px 12px', color: '#1a1a1a', fontSize: 14, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  remoteToggle: { display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 },
  searchBtn: { background: '#1a56db', color: '#fff', padding: '9px 20px', borderRadius: 5, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  resetBtn: { background: '#fff', border: '1px solid #ccc', color: '#555', padding: '9px 16px', borderRadius: 5, fontSize: 13, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  categoryRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  catPill: { padding: '6px 14px', borderRadius: 20, border: '1px solid #ddd', background: '#f5f5f5', color: '#555', fontSize: 13, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  catPillActive: { background: '#1a56db', border: '1px solid #1a56db', color: '#fff', fontWeight: 600 },
  resultsHeader: { marginBottom: 16 },
  resultsCount: { fontSize: 14, color: '#555' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 },
  loadingState: { textAlign: 'center', padding: '60px 0', color: '#888', fontSize: 15 },
  emptyState: { textAlign: 'center', padding: '60px 0', color: '#555', fontSize: 15 },
  resetLink: { background: 'none', border: 'none', color: '#1a56db', cursor: 'pointer', textDecoration: 'underline', fontSize: 15 },
};
