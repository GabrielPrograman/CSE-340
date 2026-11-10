import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

app.get('/', async (req, res) => {
    res.render('home', { pageTitle: 'Welcome to the Community Service Portal' });
});

// TEMPORARY ROUTE TO INITIALIZE DATABASE TABLES ON RENDER
app.get('/setup-db', async (req, res) => {
    let tempPool;
    try {
        let sqlPath = path.join(__dirname, 'setup.sql');
        if (!fs.existsSync(sqlPath)) {
            sqlPath = path.join(__dirname, 'database', 'setup.sql');
        }
        if (!fs.existsSync(sqlPath)) {
            sqlPath = path.join(__dirname, 'src', 'setup.sql');
        }

        if (!fs.existsSync(sqlPath)) {
            return res.status(404).send('Error: setup.sql file could not be found on the server.');
        }

        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        tempPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });

        await tempPool.query(sql);
        await tempPool.end();

        res.send('Database tables created and initialized successfully!');
    } catch (err) {
        if (tempPool) {
            try { await tempPool.end(); } catch (e) {}
        }
        console.error('Error executing setup script:', err);
        res.status(500).send(`<pre style="color:red; font-size:15px; font-family:monospace;">Error executing script:\n\n${err.stack || err.message}</pre>`);
    }
});

app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        const pageTitle = 'Our Partner Organizations';
        res.render('organizations', { pageTitle, organizations });
    } catch (error) {
        console.error('Error loading organizations:', error);
        res.status(500).send('Internal Server Error: Unable to load organizations.');
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();
        const pageTitle = 'Active Service Projects';
        res.render('projects', { pageTitle, projects });
    } catch (error) {
        console.error('Error loading projects:', error);
        res.status(500).send('Internal Server Error: Unable to load projects.');
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        const pageTitle = 'Service Project Categories';
        res.render('categories', { pageTitle, categories });
    } catch (error) {
        console.error('Error loading categories:', error);
        res.status(500).send('Internal Server Error: Unable to load categories.');
    }
});

app.listen(port, async () => {
    try {
        await testConnection();
        console.log(`Server running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});