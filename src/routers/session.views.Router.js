import { Router } from "express";
import { getLoginViews, getRegisterViews } from "../controllers/session.views.controller.js";

const router = Router()

// Vista de Login
router.get('/login', getLoginViews)


//Vista para registrar usuarios
router.get('/register', getRegisterViews)



export default router