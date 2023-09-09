import { Router } from "express";
import passport from "passport";
import { uploader } from "../middleware/multer.js";
import {
    postLogin, 
    getFailLogin, 
    postRegister, 
    getFailRegister,
    getGitHub,
    gitHubCallback,
    getGoogle,
    googleCallback,
    getLogout,
    getCurrent
} from "../controllers/session.controller.js"


const router = Router()

// API para login
router.post('/login',
passport.authenticate('loginPass', { failureRedirect: '/api/session/failLogin' }),
    postLogin
)

router.get('/failLogin', getFailLogin)


// API register en DB
router.post('/register',
    uploader.single("file"),//uploader.single("file") es el middleware de MULTER para subir fotos. "file, porque en el formulario el name es file"
    passport.authenticate('registerPass', {
        failureRedirect: '/failRegister' //si no registra, que redirija a fail 
    }), 
    postRegister
    )

router.get('/failRegister', getFailRegister)

// ruta que conecta hacia git
router.get("/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    getGitHub
)

// ruta donde git manda json con info del cliente
router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/api/session/failLogin' }),
    gitHubCallback
)


// ruta que conecta hacia google
router.get("/google",
    passport.authenticate("googlePass", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        session: false
    }),
    getGoogle
)

// ruta donde google manda su json con info del cliente
router.get("/googlecallback",
    passport.authenticate("googlePass", { failureRedirect: '/api/session/failLogin' }),
    googleCallback
   )


// Cerrar Session
router.get('/logout', getLogout)

//datos cliente
router.get("/current", getCurrent)


export default router