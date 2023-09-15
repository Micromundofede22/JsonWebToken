import { Router } from "express";
import logger from "../loggers.js";

//ROUTER QUE PRUEBA TODOS LOS NIVELES DE LOGGER 
const router= Router()

router.get("/", (req,res)=>{
    logger.debug("DEBUG")
    logger.http("HTTP")
    logger.info("INFO")
    logger.warning("WARNING")
    logger.error("ERROR")
    logger.fatal("FATAL")
})

export default router