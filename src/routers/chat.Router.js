import { Router } from "express";
import { getMessageController } from "../controllers/message.controller.js";


const router= Router()


router.get("/", getMessageController)

export default router