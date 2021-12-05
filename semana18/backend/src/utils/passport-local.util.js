import bcrypt from 'bcrypt'
import pkg from "passport-local";
const { Strategy } = pkg;
import passport from 'passport'
import { userModel } from '../models/index.js'

function isValidPassword(user, password) {
  return bcrypt.compareSync(password,user.password)
}

passport.use('login', new Strategy(
  (displayName, password, done) => {
    userModel.default.findOne({ displayName }, (err, user) => {
      if (err) return done(err)
      if (!user) {
        console.log('Usuario no encontrado!')
        return done(null, false)
      }
      if (!isValidPassword(user, password)) {
        console.log('Invalid password')
        return done(null, false)
      }
      return done(null,user)
    })
  }
))

function createHash(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null )
}
function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }
  return edad;
}
passport.use('signup', new Strategy({
  passReqToCallback:true
}, (req, displayName, password, done) => {
    userModel.default.findOne({ displayName }, (err,user) => {
    if (err) return done(err)
    if (user) {
        console.log('El usuario existe!')
        return done(null, false)
    }
    console.log(req.body);
    const age = calcularEdad(req.body.age);
    
    const newUser = {
      displayName,
      password : createHash(password),
      email:req.body.email,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      age,

    }

    userModel.default.create(newUser, (err, user) => {
      if (err) return done(err)
      console.log('Usuario creado')
      return done(null, user)
    })
  })
}

))

passport.serializeUser((user, done) => {
  done(null,user)
})

passport.deserializeUser((id, done) => {
    userModel.default.findById(id, done)
})

export default passport