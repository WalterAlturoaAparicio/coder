import bcrypt from 'bcrypt'
import pkg from "passport-local";
const { Strategy } = pkg;
import passport from 'passport'
//import { userService }  from '../services/index.js'
import { UserModel } from '../DB/models/index.js'

function isValidPassword(user, password) {
  return bcrypt.compareSync(password,user.password)
}

passport.use('login', new Strategy(
  (displayName, password, done) => {
    // try {
    //   const user = await userService.getUser();
    //   if (!isValidPassword(user, password)){
    //     console.log('invalid password');
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // } catch (error) {
    //   return done(null,error)
    // }
    UserModel.default.findOne({ displayName }, (err, user) => {
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

passport.use('signup', new Strategy({
  passReqToCallback:true
}, (req, displayName, password, done) => {
  UserModel.default.findOne({ displayName }, (err,user) => {
    if (err) return done(err)
    if (user) {
        console.log('El usuario existe!')
        return done(null, false)
    }
    const newUser = {
      displayName,
      password : createHash(password),
      email:req.body.email,
      firstName:req.body.firstName,
      lastName:req.body.lastName
    }

    UserModel.default.create(newUser, (err, user) => {
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

passport.deserializeUser((user, done) => {
  //UserModel.default.findById(id, done)
  done(null, user)
})

export default passport