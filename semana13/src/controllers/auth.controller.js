import path from 'path'

export function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user
    console.log('Usuario logueado!')
    res.render('main', {
      username: user.username,
    })
  } else {
    console.log('No esta registrado')
    res.sendFile(path.resolve()+'/public/login.html')
  }
}

export function postLogin(req, res) {
  const user = req.user
  console.log(user)
  res.redirect("/index");
}

export function getFailLogin(req, res){
  console.log('Error en el login')
  res.render('login-error', {})
}

export function getSignup(req, res){
  res.sendFile(path.resolve()+'/public/signup.html')
}

export function postSignup(req, res) {
  const user = req.user
  console.log(user)
  res.sendFile(path.resolve()+'/public/index.html')
}

export function getFailSignup(req, res) {
  console.log('Error en el registro')
  res.render('signup-error', {})
}

export function logout(req, res) {
  console.log('Logout')
  req.logout();
  res.sendFile(path.resolve()+'/public/index.html')
}