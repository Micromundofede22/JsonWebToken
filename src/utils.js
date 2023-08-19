import bcrypt from 'bcrypt' //hashea contraseñas 
import jwt from "jsonwebtoken" //JsonWebToken
import config from "./config/config.js" 

//variables de entorno
const JWT_COOKIE_NAME = config.cookieNameJWT
const JWT_PRIVATE_KEY = config.keyPrivateJWT

// hashea contraseña
export const createHash = password => { //crea hash y se usa en la config de passport
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// validacion
export const isValidPassword = (user, password) => {   //valida la contraseña y se usa en config de passport
    return bcrypt.compareSync(password, user.password)
}

// generar un token con los datos del user (se usa en passport config)
export const generateToken = user => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' }) //mete al user dentro de user
    return token
}


// extraer token de cookie (se usa en la estrategy de JWT en passport config)
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}