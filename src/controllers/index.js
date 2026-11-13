const showHomePage = async (req, res) => {
    const pageTitle = 'Welcome to the Community Service Portal';
    res.render('home', { pageTitle });
};

export { showHomePage };