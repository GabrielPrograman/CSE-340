import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const pageTitle = 'Our Partner Organizations';
    res.render('organizations', { pageTitle, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const pageTitle = 'Organization Details';

    res.render('organization', { 
        title: pageTitle, 
        pageTitle, 
        organizationDetails, 
        projects 
    });
};

export { showOrganizationsPage, showOrganizationDetailsPage };