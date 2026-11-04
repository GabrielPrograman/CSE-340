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

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const pageTitle = 'Our Partner Organizations';

    res.render('organizations', { pageTitle, organizations });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    const pageTitle = 'Active Service Projects';

    res.render('projects', { pageTitle, projects });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    const pageTitle = 'Service Project Categories';

    res.render('categories', { pageTitle, categories });
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