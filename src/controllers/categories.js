import { getAllCategories } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const pageTitle = 'Service Project Categories';
    res.render('categories', { pageTitle, categories });
};

export { showCategoriesPage };