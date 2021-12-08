import path from 'path';
export function getLogin(req, res) {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  if (req.isAuthenticated()) {
    const user = req.user
    //console.log('Usuario logueado!')
    res.render('main', {
      username: user.displayName,
      photo: user.photos[0].value
    })
  } else {
    //console.log('No esta registrado')
    res.sendFile(path.resolve()+'/public/login.html')
  }
}

export function postLogin(req, res) {
  const user = req.user
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.redirect("/index");
}

export function getFailLogin(req, res){
  //console.log('Error en el login')
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.render('login-error', {})
}

export function getSignup(req, res){
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.sendFile(path.resolve()+'/public/signup.html')
}

export function postSignup(req, res) {
  const user = req.user
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.redirect("/index");
}

export function getFailSignup(req, res) {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  res.render('signup-error', {})
}

export function logout(req, res) {
  //logger.info(`Method: ${req.method} Url: ${req.url}`)
  req.logout();
  res.sendFile(path.resolve()+'/public/index.html')
}