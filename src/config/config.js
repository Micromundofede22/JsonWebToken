import dotenv from "dotenv"  //lee variables de entorno del archivo .env

dotenv.config()

export default{
    port:process.env.PORT,                            //PUERTO listening
    mongo_uri: process.env.MONGO_URI,                 //URL CONEXIÓN BASE DATOS
    admin: process.env.ADMIN,                         //EMAIL DE REGISTRO DEL ADMINISTRADOR 
    cookieNameJWT: process.env.JWT_COOKIE_NAME,       //cookie jwt
    keyPrivateJWT: process.env.JWT_PRIVATE_KEY        //clave privada cookie
}