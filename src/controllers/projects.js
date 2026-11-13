import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const pageTitle = 'Active Service Projects';
    res.render('projects', { pageTitle, projects });
};

export { showProjectsPage };