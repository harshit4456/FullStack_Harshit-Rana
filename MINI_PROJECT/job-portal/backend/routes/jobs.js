const express = require('express');
const router = express.Router();

const dummyJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechNova Inc.',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹18-25 LPA',
    skills: ['React', 'TypeScript', 'CSS', 'GraphQL'],
    description: 'We are looking for a skilled Frontend Developer to join our product team. You will build beautiful, high-performance interfaces used by millions.',
    category: 'Technology',
    postedAt: '2024-01-10',
    deadline: '2024-02-10',
    logo: 'TN',
    color: '#6366f1',
    remote: true,
    urgent: true
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Mumbai, India',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹15-22 LPA',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    description: 'Join our data science team to build predictive models and extract insights from large datasets. You will work closely with business stakeholders.',
    category: 'Data Science',
    postedAt: '2024-01-12',
    deadline: '2024-02-15',
    logo: 'AH',
    color: '#0ea5e9',
    remote: false,
    urgent: false
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Delhi, India',
    type: 'Full-time',
    experience: '4-6 years',
    salary: '₹20-30 LPA',
    skills: ['Product Strategy', 'Agile', 'Roadmapping', 'Analytics'],
    description: 'Drive the vision and strategy for our flagship product. Work with engineering, design, and business teams to deliver exceptional user experiences.',
    category: 'Management',
    postedAt: '2024-01-08',
    deadline: '2024-02-08',
    logo: 'SX',
    color: '#f59e0b',
    remote: true,
    urgent: false
  },
  {
    id: '4',
    title: 'Backend Engineer (Node.js)',
    company: 'CloudSoft',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '₹14-20 LPA',
    skills: ['Node.js', 'MongoDB', 'REST APIs', 'Docker'],
    description: 'Build scalable backend services and APIs for our cloud platform. Experience with microservices and containerization preferred.',
    category: 'Technology',
    postedAt: '2024-01-14',
    deadline: '2024-02-20',
    logo: 'CS',
    color: '#10b981',
    remote: false,
    urgent: true
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'DesignStudio Co.',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹8-14 LPA',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    description: 'Create intuitive and stunning designs for our clients across web and mobile. Build design systems, conduct user research, and iterate rapidly.',
    category: 'Design',
    postedAt: '2024-01-15',
    deadline: '2024-02-28',
    logo: 'DS',
    color: '#ec4899',
    remote: true,
    urgent: false
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'InfraCore Ltd.',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '3-6 years',
    salary: '₹16-24 LPA',
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform'],
    description: 'Manage cloud infrastructure and CI/CD pipelines for high-traffic applications. Drive automation, monitoring, and reliability improvements.',
    category: 'Technology',
    postedAt: '2024-01-11',
    deadline: '2024-02-18',
    logo: 'IC',
    color: '#f97316',
    remote: false,
    urgent: false
  },
  {
    id: '7',
    title: 'Content Writer',
    company: 'MediaBridge',
    location: 'Remote',
    type: 'Part-time',
    experience: '1-2 years',
    salary: '₹4-6 LPA',
    skills: ['Writing', 'SEO', 'Content Strategy', 'WordPress'],
    description: 'Create compelling blogs, articles, and marketing copy for our digital media clients. SEO knowledge and creative storytelling are a must.',
    category: 'Marketing',
    postedAt: '2024-01-13',
    deadline: '2024-03-01',
    logo: 'MB',
    color: '#8b5cf6',
    remote: true,
    urgent: false
  },
  {
    id: '8',
    title: 'Financial Analyst',
    company: 'WealthFirst',
    location: 'Kolkata, India',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹10-16 LPA',
    skills: ['Excel', 'Financial Modeling', 'Power BI', 'Accounting'],
    description: 'Analyze financial data, build models, and provide strategic recommendations to support business decisions across verticals.',
    category: 'Finance',
    postedAt: '2024-01-09',
    deadline: '2024-02-12',
    logo: 'WF',
    color: '#14b8a6',
    remote: false,
    urgent: false
  }
];

// Search/Filter jobs
router.get('/search', (req, res) => {
  try {
    const { title, location, category, type, experience, remote } = req.query;

    let filtered = [...dummyJobs];

    if (title) {
      filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(title.toLowerCase()) ||
        j.company.toLowerCase().includes(title.toLowerCase()) ||
        j.skills.some(s => s.toLowerCase().includes(title.toLowerCase()))
      );
    }
    if (location) {
      filtered = filtered.filter(j =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (category && category !== 'All') {
      filtered = filtered.filter(j => j.category === category);
    }
    if (type && type !== 'All') {
      filtered = filtered.filter(j => j.type === type);
    }
    if (experience && experience !== 'All') {
      filtered = filtered.filter(j => j.experience === experience);
    }
    if (remote === 'true') {
      filtered = filtered.filter(j => j.remote === true);
    }

    res.json({ jobs: filtered, total: filtered.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all jobs
router.get('/', (req, res) => {
  res.json({ jobs: dummyJobs, total: dummyJobs.length });
});

// Get single job
router.get('/:id', (req, res) => {
  const job = dummyJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ job });
});

module.exports = router;
