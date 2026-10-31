
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas EJS y la carpeta views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware para archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas usando funciones flecha y async/await
app.get('/', async (req, res) => {
    res.render('home', { pageTitle: 'Welcome to the Community Service Portal' });
});

app.get('/organizations', async (req, res) => {
    res.render('organizations', { pageTitle: 'Our Partner Organizations' });
});

app.get('/projects', async (req, res) => {
    res.render('projects', { pageTitle: 'Active Service Projects' });
});

app.get('/categories', async (req, res) => {
    res.render('categories', { pageTitle: 'Service Project Categories' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});