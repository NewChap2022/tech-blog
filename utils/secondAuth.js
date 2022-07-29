const secondAuth = (req, res, next) => {
    if (!req.cookies['secondAuth']) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = secondAuth;