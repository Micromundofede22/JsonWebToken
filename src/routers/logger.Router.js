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

    res.status(404).json({status: "error", error: err})
})

export default router