import dotenv from "dotenv"  //lee variables de entorno del archivo .env

dotenv.config()

export default{
    port:process.env.PORT,                            //PUERTO listening
    mongo_uri: process.env.MONGO_URI,                 //URL CONEXIÓN BASE DATOS
    persistence: process.env.PERSISTENCE,                  
    admin: process.env.ADMIN,                         //EMAIL DE REGISTRO DEL ADMINISTRADOR 
    cookieNameJWT: process.env.JWT_COOKIE_NAME,       //cookie jwt
    keyPrivateJWT: process.env.JWT_PRIVATE_KEY,        //clave privada cookie
    nodemailerUSER: process.env.NODEMAILER_USER,
    nodemailerPASS: process.env.NODEMAILER_PASS
}