import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - allow deployed frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// Data file for fallback
const DATA_FILE = path.join(__dirname, 'data.json');
let db = { profile: {}, projects: [], experiences: [], education: [], skills: [] };
let mongoReady = false;

// Schemas
const profileSchema = new mongoose.Schema({}, { strict: false });
const projectSchema = new mongoose.Schema({}, { strict: false });
const experienceSchema = new mongoose.Schema({}, { strict: false });
const educationSchema = new mongoose.Schema({}, { strict: false });
const skillSchema = new mongoose.Schema({}, { strict: false });

let Profile, Project, Experience, Education, Skill;

// Load fallback data
function loadFallback() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      db = data;
      console.log('Loaded fallback data from file');
    }
  } catch (err) {
    console.log('No fallback file');
  }
}

// Save fallback
function saveFallback() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Init MongoDB or fallback
async function init() {
  loadFallback();
  
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri && mongoUri.includes('mongodb')) {
    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected!');
      mongoReady = true;
      
      Profile = mongoose.model('Profile', profileSchema);
      Project = mongoose.model('Project', projectSchema);
      Experience = mongoose.model('Experience', experienceSchema);
      Education = mongoose.model('Education', educationSchema);
      Skill = mongoose.model('Skill', skillSchema);
    } catch (err) {
      console.log('MongoDB error, using fallback:', err.message);
      mongoReady = false;
    }
  } else {
    console.log('No MongoDB configured, using JSON file');
  }
}

// API: Profile
app.get('/api/profile', async (req, res) => {
  if (mongoReady && Profile) {
    try {
      const doc = await Profile.findOne();
      if (doc) return res.json(doc);
    } catch (err) {}
  }
  res.json(db.profile || {});
});

app.put('/api/profile', async (req, res) => {
  const data = req.body;
  if (mongoReady && Profile) {
    try {
      await Profile.findOneAndUpdate({}, data, { upsert: true });
    } catch (err) {}
  }
  db.profile = data;
  saveFallback();
  res.json(data);
});

// API: Projects
app.get('/api/projects', async (req, res) => {
  if (mongoReady && Project) {
    try {
      const docs = await Project.find();
      if (docs.length) return res.json(docs);
    } catch (err) {}
  }
  res.json(db.projects || []);
});

app.put('/api/projects', async (req, res) => {
  const data = req.body;
  if (mongoReady) {
    try {
      await Project.deleteMany({});
      if (data.length) await Project.insertMany(data);
    } catch (err) {}
  }
  db.projects = data;
  saveFallback();
  res.json({ success: true });
});

// API: Experiences
app.get('/api/experiences', async (req, res) => {
  if (mongoReady && Experience) {
    try {
      const docs = await Experience.find();
      if (docs.length) return res.json(docs);
    } catch (err) {}
  }
  res.json(db.experiences || []);
});

app.put('/api/experiences', async (req, res) => {
  const data = req.body;
  if (mongoReady) {
    try {
      await Experience.deleteMany({});
      if (data.length) await Experience.insertMany(data);
    } catch (err) {}
  }
  db.experiences = data;
  saveFallback();
  res.json({ success: true });
});

// API: Education
app.get('/api/education', async (req, res) => {
  if (mongoReady && Education) {
    try {
      const docs = await Education.find();
      if (docs.length) return res.json(docs);
    } catch (err) {}
  }
  res.json(db.education || []);
});

app.put('/api/education', async (req, res) => {
  const data = req.body;
  if (mongoReady) {
    try {
      await Education.deleteMany({});
      if (data.length) await Education.insertMany(data);
    } catch (err) {}
  }
  db.education = data;
  saveFallback();
  res.json({ success: true });
});

// API: Skills
app.get('/api/skills', async (req, res) => {
  if (mongoReady && Skill) {
    try {
      const docs = await Skill.find();
      if (docs.length) return res.json(docs);
    } catch (err) {}
  }
  res.json(db.skills || []);
});

app.put('/api/skills', async (req, res) => {
  const data = req.body;
  if (mongoReady) {
    try {
      await Skill.deleteMany({});
      if (data.length) await Skill.insertMany(data);
    } catch (err) {}
  }
  db.skills = data;
  saveFallback();
  res.json({ success: true });
});

// Auth
app.get('/api/get-env-credentials', (req, res) => {
  res.json({ username: process.env.ADMIN_USERNAME, hasPassword: !!process.env.ADMIN_PASSWORD });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start
init().then(() => {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
});