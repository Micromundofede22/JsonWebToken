import { Router } from "express";
import {
    signupController,
    getbillController
} from "../controllers/mail.controller.js"

const router= Router()

router.post("/user/signup", signupController) //email cuando se registra exitosamente user
router.get("/product/getbill", getbillController)//email cuando se realiza la compra

export default router