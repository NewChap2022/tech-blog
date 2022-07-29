const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
        res.clearCookie('secondAuth', { path: '/' });
        res.cookie('secondAuth', Math.floor(Math.random() * 100), { expires: new Date(Date.now() + 10 * 1000), httpOnly: true});
    }
};

module.exports = withAuth;