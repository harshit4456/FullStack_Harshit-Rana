import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DUMMY_JOBS = {
  '1': { id:'1', title:'Senior Frontend Developer', company:'TechNova Inc.', location:'Bangalore, India', type:'Full-time', experience:'3-5 years', salary:'₹18-25 LPA', skills:['React','TypeScript','CSS','GraphQL','Redux','Jest'], description:'We are looking for a skilled Frontend Developer to join our product team. You will build high-performance interfaces used by millions of users. As a Senior Frontend Developer, you will lead technical decisions and mentor junior developers.', category:'Technology', postedAt:'2024-01-10', deadline:'2024-02-10', logo:'TN', remote:true, urgent:true, about:'TechNova Inc. is a fast-growing SaaS company with 500+ employees serving 10,000+ businesses globally.', responsibilities:['Build and maintain React applications','Lead code reviews and architectural decisions','Collaborate with design and backend teams','Mentor junior developers'], requirements:['3+ years React experience','Strong TypeScript skills','Experience with GraphQL','Understanding of CI/CD'] },
  '2': { id:'2', title:'Data Scientist', company:'Analytics Hub', location:'Mumbai, India', type:'Full-time', experience:'2-4 years', salary:'₹15-22 LPA', skills:['Python','Machine Learning','SQL','TensorFlow','Pandas','scikit-learn'], description:'Join our data science team to build predictive models and extract insights from large datasets.', category:'Data Science', postedAt:'2024-01-12', deadline:'2024-02-15', logo:'AH', remote:false, urgent:false, about:"Analytics Hub is India's leading data analytics firm with 200+ professionals.", responsibilities:['Build ML models','Analyze datasets using Python and SQL','Create dashboards','Present findings to stakeholders'], requirements:['Strong Python skills','Experience with ML frameworks','SQL proficiency','Statistical knowledge'] },
  '3': { id:'3', title:'Product Manager', company:'StartupXYZ', location:'Delhi, India', type:'Full-time', experience:'4-6 years', salary:'₹20-30 LPA', skills:['Product Strategy','Agile','Roadmapping','Analytics','Figma','JIRA'], description:'Drive the vision and strategy for our flagship product. Work with engineering, design, and business teams to deliver great user experiences.', category:'Management', postedAt:'2024-01-08', deadline:'2024-02-08', logo:'SX', remote:true, urgent:false, about:'StartupXYZ is a Series B funded startup disrupting the logistics space.', responsibilities:['Define product vision and roadmap','Work with cross-functional teams','Prioritize features based on data','Gather user feedback'], requirements:['4+ years PM experience','Strong analytical skills','Excellent communication','B2B product experience'] },
  '4': { id:'4', title:'Backend Engineer (Node.js)', company:'CloudSoft', location:'Hyderabad, India', type:'Full-time', experience:'2-5 years', salary:'₹14-20 LPA', skills:['Node.js','MongoDB','REST APIs','Docker','Redis','PostgreSQL'], description:'Build scalable backend services and APIs for our cloud platform. You will be part of a world-class engineering team building infrastructure at scale.', category:'Technology', postedAt:'2024-01-14', deadline:'2024-02-20', logo:'CS', remote:false, urgent:true, about:'CloudSoft provides enterprise cloud infrastructure solutions to 500+ companies.', responsibilities:['Design and build RESTful APIs','Work with databases and caching','Implement microservices','Ensure code quality'], requirements:['2+ years Node.js','MongoDB and SQL knowledge','Docker basics','System design understanding'] },
  '5': { id:'5', title:'UI/UX Designer', company:'DesignStudio Co.', location:'Pune, India', type:'Full-time', experience:'1-3 years', salary:'₹8-14 LPA', skills:['Figma','Adobe XD','Prototyping','User Research','CSS'], description:'Create intuitive designs for clients across web and mobile. Build design systems and conduct user research.', category:'Design', postedAt:'2024-01-15', deadline:'2024-02-28', logo:'DS', remote:true, urgent:false, about:'DesignStudio Co. is an award-winning design agency working with 100+ global brands.', responsibilities:['Create wireframes and prototypes','Conduct user research','Maintain design systems','Collaborate with developers'], requirements:['Proficiency in Figma','Strong portfolio','User research skills','Basic CSS'] },
  '6': { id:'6', title:'DevOps Engineer', company:'InfraCore Ltd.', location:'Chennai, India', type:'Full-time', experience:'3-6 years', salary:'₹16-24 LPA', skills:['AWS','Kubernetes','CI/CD','Terraform','Docker','Linux'], description:'Manage cloud infrastructure and CI/CD pipelines for high-traffic applications.', category:'Technology', postedAt:'2024-01-11', deadline:'2024-02-18', logo:'IC', remote:false, urgent:false, about:'InfraCore Ltd. manages cloud infrastructure for 200+ enterprise clients.', responsibilities:['Manage AWS infrastructure','Build CI/CD pipelines','Implement monitoring','Automate deployments'], requirements:['AWS experience','Kubernetes knowledge','CI/CD expertise','Scripting skills'] },
  '7': { id:'7', title:'Content Writer', company:'MediaBridge', location:'Remote', type:'Part-time', experience:'1-2 years', salary:'₹4-6 LPA', skills:['Writing','SEO','Content Strategy','WordPress'], description:'Create blogs, articles, and marketing copy for digital media clients.', category:'Marketing', postedAt:'2024-01-13', deadline:'2024-03-01', logo:'MB', remote:true, urgent:false, about:'MediaBridge is a content marketing agency serving 50+ brands.', responsibilities:['Write articles weekly','Optimize content for SEO','Collaborate with marketing','Research trending topics'], requirements:['Excellent writing skills','SEO knowledge','WordPress familiarity','Creativity'] },
  '8': { id:'8', title:'Financial Analyst', company:'WealthFirst', location:'Kolkata, India', type:'Full-time', experience:'2-4 years', salary:'₹10-16 LPA', skills:['Excel','Financial Modeling','Power BI','Accounting','Python'], description:'Analyze financial data, build models, and provide strategic recommendations.', category:'Finance', postedAt:'2024-01-09', deadline:'2024-02-12', logo:'WF', remote:false, urgent:false, about:'WealthFirst is a top-10 wealth management firm in India.', responsibilities:['Build financial models','Prepare investment reports','Analyze market trends','Present to management'], requirements:['CFA or MBA Finance preferred','Advanced Excel','Power BI experience','Analytical mindset'] },
};

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applyForm, setApplyForm] = useState({ coverLetter: '', portfolio: '', availability: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        setJob(res.data.job);
      } catch {
        setJob(DUMMY_JOBS[id] || null);
      }
    };
    load();
  }, [id]);

  if (!job) return (
    <div style={styles.page}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: '#555', marginBottom: 16 }}>Job not found.</p>
        <button style={styles.backBtn} onClick={() => navigate('/jobs')}>Back to Jobs</button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/jobs')}>← Back to Jobs</button>

        <div style={styles.layout}>
          <div style={styles.main}>
            {/* Header */}
            <div style={styles.jobHeader}>
              <div style={styles.headerTop}>
                <div style={styles.logo}><span style={{ fontWeight: 700, fontSize: 16, color: '#1a56db' }}>{job.logo}</span></div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {job.urgent && <span style={styles.urgentBadge}>Urgent</span>}
                  {job.remote && <span style={styles.remoteBadge}>Remote</span>}
                </div>
              </div>
              <h1 style={styles.jobTitle}>{job.title}</h1>
              <div style={styles.companyName}>{job.company}</div>
              <div style={styles.metaRow}>
                <span style={styles.metaItem}>📍 {job.location}</span>
                <span style={styles.metaItem}>💼 {job.type}</span>
                <span style={styles.metaItem}>⏱ {job.experience}</span>
                <span style={styles.metaItem}>🏷 {job.category}</span>
              </div>
              <div style={styles.salaryBig}>{job.salary}</div>
            </div>

            {/* Description */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>About the Role</h2>
              <p style={styles.sectionText}>{job.description}</p>
            </div>

            {job.responsibilities && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Responsibilities</h2>
                <ul style={styles.list}>
                  {job.responsibilities.map((r, i) => <li key={i} style={styles.listItem}>• {r}</li>)}
                </ul>
              </div>
            )}

            {job.requirements && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Requirements</h2>
                <ul style={styles.list}>
                  {job.requirements.map((r, i) => <li key={i} style={styles.listItem}>✓ {r}</li>)}
                </ul>
              </div>
            )}

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Skills Required</h2>
              <div style={styles.skillsWrap}>
                {job.skills.map(s => <span key={s} style={styles.skill}>{s}</span>)}
              </div>
            </div>

            {/* Apply Form */}
            {showApplyForm && !applied && (
              <div style={styles.applyFormCard}>
                <h2 style={styles.sectionTitle}>Apply for this Position</h2>
                <div style={styles.applyForm}>
                  <div style={styles.field}>
                    <label style={styles.label}>Cover Letter</label>
                    <textarea style={styles.textarea} rows={5}
                      placeholder="Why are you a good fit for this role?"
                      value={applyForm.coverLetter}
                      onChange={e => setApplyForm(f => ({ ...f, coverLetter: e.target.value }))} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Portfolio / LinkedIn URL</label>
                    <input style={styles.input} placeholder="https://..."
                      value={applyForm.portfolio}
                      onChange={e => setApplyForm(f => ({ ...f, portfolio: e.target.value }))} />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Notice Period / Availability</label>
                    <select style={styles.select} value={applyForm.availability}
                      onChange={e => setApplyForm(f => ({ ...f, availability: e.target.value }))}>
                      <option value="">Select</option>
                      <option>Immediate</option><option>2 weeks</option>
                      <option>1 month</option><option>2 months</option><option>3 months</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button style={styles.submitApply} onClick={() => { setApplied(true); setShowApplyForm(false); }}>Submit Application</button>
                    <button style={styles.cancelBtn} onClick={() => setShowApplyForm(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {applied && (
              <div style={styles.successCard}>
                <h3 style={styles.successTitle}>Application Submitted!</h3>
                <p style={styles.successText}>Your application for <strong>{job.title}</strong> at {job.company} has been submitted successfully.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.stickyCard}>
              <div style={styles.salaryDisplay}>{job.salary}</div>
              {!applied ? (
                <button style={styles.applyBtn} onClick={() => setShowApplyForm(true)}>
                  {showApplyForm ? 'Application Form ↓' : 'Apply Now'}
                </button>
              ) : (
                <div style={styles.appliedBadge}>Applied</div>
              )}
              <button style={styles.saveJobBtn}>Save Job</button>
              <div style={styles.quickInfo}>
                {[['Posted', job.postedAt], ['Deadline', job.deadline || 'Open'], ['Type', job.type], ['Location', job.location]].map(([k, v]) => (
                  <div key={k} style={styles.quickRow}>
                    <span style={styles.quickKey}>{k}</span>
                    <span style={styles.quickVal}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {job.about && (
              <div style={styles.aboutCard}>
                <h3 style={styles.aboutTitle}>About {job.company}</h3>
                <p style={styles.aboutText}>{job.about}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '24px 24px 60px' },
  backBtn: { background: '#fff', border: '1px solid #ccc', color: '#555', padding: '7px 14px', borderRadius: 5, fontSize: 13, cursor: 'pointer', marginBottom: 20, fontFamily: 'Arial, sans-serif' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, alignItems: 'start' },
  main: { display: 'flex', flexDirection: 'column', gap: 16 },
  jobHeader: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24 },
  headerTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  logo: { width: 52, height: 52, borderRadius: 8, background: '#e8f0fe', border: '1px solid #c5d8fd', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  urgentBadge: { background: '#fff0f0', border: '1px solid #f5c6c6', color: '#c0392b', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600 },
  remoteBadge: { background: '#e8f8f5', border: '1px solid #b2dfdb', color: '#1a7a5e', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600 },
  jobTitle: { fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 },
  companyName: { fontSize: 15, color: '#555', marginBottom: 10 },
  metaRow: { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 },
  metaItem: { fontSize: 13, color: '#888' },
  salaryBig: { fontSize: 20, fontWeight: 700, color: '#1a56db' },
  section: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 },
  sectionText: { fontSize: 14, color: '#444', lineHeight: 1.7 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none' },
  listItem: { fontSize: 14, color: '#444', lineHeight: 1.5 },
  skillsWrap: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  skill: { background: '#e8f0fe', border: '1px solid #c5d8fd', color: '#1a56db', padding: '5px 12px', borderRadius: 4, fontSize: 13 },
  applyFormCard: { background: '#fff', border: '1px solid #1a56db', borderRadius: 8, padding: 24 },
  applyForm: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: '#333' },
  textarea: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '10px 12px', color: '#1a1a1a', fontSize: 14, resize: 'vertical', fontFamily: 'Arial, sans-serif' },
  input: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '10px 12px', color: '#1a1a1a', fontSize: 14, fontFamily: 'Arial, sans-serif' },
  select: { background: '#fff', border: '1px solid #ccc', borderRadius: 5, padding: '10px 12px', color: '#1a1a1a', fontSize: 14, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  submitApply: { background: '#1a56db', color: '#fff', padding: '10px 20px', borderRadius: 5, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  cancelBtn: { background: '#fff', border: '1px solid #ccc', color: '#555', padding: '10px 16px', borderRadius: 5, fontSize: 14, cursor: 'pointer', fontFamily: 'Arial, sans-serif' },
  successCard: { background: '#e8f8f5', border: '1px solid #b2dfdb', borderRadius: 8, padding: 24, textAlign: 'center' },
  successTitle: { fontSize: 18, fontWeight: 700, color: '#1a7a5e', marginBottom: 8 },
  successText: { fontSize: 14, color: '#444', lineHeight: 1.6 },
  sidebar: { position: 'sticky', top: 70 },
  stickyCard: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20, marginBottom: 16 },
  salaryDisplay: { fontSize: 22, fontWeight: 700, color: '#1a56db', textAlign: 'center', marginBottom: 16 },
  applyBtn: { display: 'block', width: '100%', background: '#1a56db', color: '#fff', padding: '12px', borderRadius: 5, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 8, fontFamily: 'Arial, sans-serif' },
  appliedBadge: { display: 'block', width: '100%', background: '#e8f8f5', border: '1px solid #b2dfdb', color: '#1a7a5e', padding: '12px', borderRadius: 5, textAlign: 'center', fontWeight: 600, marginBottom: 8 },
  saveJobBtn: { display: 'block', width: '100%', background: '#fff', border: '1px solid #ccc', color: '#555', padding: '10px', borderRadius: 5, fontSize: 13, cursor: 'pointer', marginBottom: 16, fontFamily: 'Arial, sans-serif' },
  quickInfo: { display: 'flex', flexDirection: 'column', gap: 10 },
  quickRow: { display: 'flex', justifyContent: 'space-between' },
  quickKey: { fontSize: 12, color: '#888' },
  quickVal: { fontSize: 12, color: '#333', fontWeight: 500, textAlign: 'right', maxWidth: '55%' },
  aboutCard: { background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 20 },
  aboutTitle: { fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' },
  aboutText: { fontSize: 13, color: '#555', lineHeight: 1.6 },
};
