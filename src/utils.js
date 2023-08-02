import bcrypt from 'bcrypt' //hashea contraseñas 
import jwt from "jsonwebtoken"


export const JWT_PRIVATE_KEY = 'secret' //clave y nombres en constantes, para no harcodearlas repetidamente
export const JWT_COOKIE_NAME = 'CookieToken'


export const createHash = password => { //crea hash y se usa en la config de passport
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {   //valida la contraseña y se usa en config de passport
    return bcrypt.compareSync(password, user.password)
}

// generar un token con los datos del user
export const generateToken = user => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' }) //mete al user dentro de user
    return token
}

// extraer token de cookie
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[JWT_COOKIE_NAME] : null
}