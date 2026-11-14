import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const pageTitle = 'Upcoming Service Projects';
        res.render('projects', { pageTitle, projects });
    } catch (error) {
        console.error('Error fetching upcoming projects:', error);
        res.status(500).send('Internal Server Error');
    }
};

const showProjectDetailsPage = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render('errors/404', { title: 'Not Found', pageTitle: 'Project Not Found' });
        }

        res.render('project', {
            pageTitle: project.title,
            project
        });
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).send('Internal Server Error');
    }
};

export { showProjectsPage, showProjectDetailsPage };