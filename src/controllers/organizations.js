import { getAllOrganizations } from '../models/organizations.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const pageTitle = 'Our Partner Organizations';
    res.render('organizations', { pageTitle, organizations });
};

export { showOrganizationsPage };