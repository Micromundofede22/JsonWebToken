import { Router } from "express";
import passport from "passport";
import {JWT_COOKIE_NAME} from "../utils.js"
import { uploader } from "../middleware/multer.js";

const router = Router()

// Vista de Login
router.get('/', (req, res) => {
    res.render('sessions/login')
})


// API para login
router.post('/login', passport.authenticate('loginPass', { failureRedirect: '/failLogin' }),
    async (req, res) => {
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/views/products') //en la cookie guardo el token
        
    }
)

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Failed Login!' })
})



//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register')
})


// API para crear usuarios en la DB
router.post('/register',uploader.single("file"), passport.authenticate('registerPass', {
    failureRedirect: '/failRegister' //si no registra, que redirija a fail 
}),  async (req, res) => {
    res.redirect('/') //si registra, redirije al login
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Faileed!' })            //ruta de fail
})

// ruta que conecta hacia git
router.get("/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => { }
)

// ruta donde git manda json
router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        // console.log('Callback: ', req.user)
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/views/products')
    }
) 

router.get("/google",
    passport.authenticate("googlePass", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        session: false
    }),
    async (req, res) => { }
)

router.get("/googlecallback",
    passport.authenticate("googlePass",{ failureRedirect: '/' }),
    async (req, res) => {
        console.log('Callback: ', req.user)
        res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/views/products')
    })


// Cerrar Session
router.get('/logout', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).redirect("/")
})



export default router