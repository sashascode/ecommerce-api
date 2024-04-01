export const isAuthenticated = (req, res, next) => {
    if (req.cookies && req.cookies['access_token']) {
        return res.redirect('/');
    }

    return next();
}