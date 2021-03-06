export function auth(req, res, next) {
  if (req.session.user && req.session.admin) {
    next();
  } else {
    return res.status(401).redirect("/login");
  }
}
export function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }else{
    res.redirect('/login')
  }
}