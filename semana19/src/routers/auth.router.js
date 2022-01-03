import express from 'express'
import passport from '../utils/passport-local.util.js'
import {AuthController} from '../controllers/index.js'

const router = express.Router()

router.get('/login',AuthController.getLogin)
router.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}),AuthController.postLogin)
router.get('/failLogin', AuthController.getFailLogin)

router.get('/signup',AuthController.getSignup)
router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failSignup'}),AuthController.postSignup)
router.get('/failSignup', AuthController.getFailSignup)

router.get('/logout', AuthController.logout)

export { router }