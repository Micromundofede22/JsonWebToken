import winston from "winston";
import config from "./config/config.js";


const createLogger= env =>{
    if(env == "PROD"){ //environment de PRODUCCION
        return winston.createLogger({
            levels: { //niveles de logs a guardar
                debug: 0,
                http: 1,
                info: 2,
                warning: 3,
                error: 4,
                fatal:5
            },
            transports: [
                new winston.transports.File({ //transporta logs en un archivo
                    filename: './logs/errors.log', //esta carpeta ponerla en .gitignore
                    level: "error",
                    format: winston.format.combine(
                        winston.format.timestamp(), //guarda fecha y hora del log
                        // winston.format.simple()     //guarda en formato de texto simple
                    )
                })
            ]
        })
    }else{ //environment de desarrollo (dev en .env)
        return winston.createLogger({
            levels: { 
                debug: 0,
                http: 1,
                info: 2,
                warning: 3,
                error: 4,
                fatal:5 //el nivel más alto. se imprimen todos los anteriores
            },
            transports: [
                new winston.transports.Console({ // imprime solo en consola 
                    level: "fatal",
                    format: winston.format.combine(
                        winston.format.colorize(), // aplica colores a los niveles
                        winston.format.timestamp(),
                        winston.format.simple()
                    )
                })
            ]
        })
    }
}

const logger= createLogger(config.environment)

export default logger