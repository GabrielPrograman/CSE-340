import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const app = express();
const port = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    res.render('home', { pageTitle: 'Welcome to the Community Service Portal' });
});

// TEMPORARY ROUTE TO INITIALIZE DATABASE TABLES ON RENDER
app.get('/setup-db', async (req, res) => {
    try {
        const sqlPath = path.join(__dirname, 'setup.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        await pool.query(sql);
        res.send('Database tables created and initialized successfully!');
    } catch (err) {
        console.error('Error executing setup script:', err);
        res.status(500).send('Error executing script: ' + err.message);
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
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});