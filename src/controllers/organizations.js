import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const pageTitle = 'Our Partner Organizations';
        res.render('organizations', { title: pageTitle, pageTitle, organizations });
    } catch (error) {
        next(error);
    }
};

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;
        const organizationDetails = await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            return res.status(404).render('errors/404', {
                title: 'Organization Not Found',
                pageTitle: 'Organization Not Found'
            });
        }

        const projects = await getProjectsByOrganizationId(organizationId);
        const pageTitle = organizationDetails.name || 'Organization Details';

        res.render('organization', {
            title: pageTitle,
            pageTitle,
            organizationDetails,
            projects
        });
    } catch (error) {
        next(error);
    }
};

const showNewOrganizationForm = async (req, res, next) => {
    try {
        const pageTitle = 'Add New Organization';
        res.render('new-organization', {
            title: pageTitle,
            pageTitle
        });
    } catch (error) {
        next(error);
    }
};

const processNewOrganizationForm = async (req, res, next) => {
    try {
        const { name, description, contactEmail } = req.body;
        const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

        const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

        // Set a success flash message
        req.flash('success', 'Organization added successfully!');

        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
};