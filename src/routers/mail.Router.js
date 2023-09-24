import { Router } from "express";
// import { passportCall } from "../middleware/passportCall.js";
import {
    // signUpMail,
    getbillController
} from "../controllers/mail.controller.js"

const router= Router()

// router.post("/user/signup",passportCall("jwt"), signUpMail)                 //email cuando se registra exitosamente user
router.get("/product/getbill/:code", getbillController)//email cuando se realiza la compra

export default router