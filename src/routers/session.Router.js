import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middleware/passportCall.js";
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
    getCurrent,
    cargaImage,
    postOlvidar,
    verifyToken,
    restablecerContra,
    getVerifyUser
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
    passport.authenticate('registerPass', { failureRedirect: '/api/session/failRegister' }),
    postRegister) //si no registra, que redirija a fail 

// VERIFICACION DE CUENTA 
router.get("/verify-user/:user", getVerifyUser)

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

//actualizar foto perfil
router.post("/current/cargaimage",
    uploader.single("file"), //uploader.single("file") es el middleware de MULTER para subir fotos. "file, porque en el formulario el name es file"
    passportCall("jwt"),
    cargaImage
)

//recuperar contraseña
router.post("/olvidar-contra", postOlvidar)
//verificar token mandado al mail
router.get("/verify-token/:token", verifyToken)
//restablecer contraseña
router.post("/restablecer-contra/:user", restablecerContra )

export default router