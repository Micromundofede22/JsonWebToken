import { Router } from "express";
import { generateUser } from "../utils.js";

const router= Router()

const users = []

router.get("/", async(req,res)=>{
    for (let index = 0; index < 100; index++) {
        users.push(generateUser())
    }
    res.send({ status: 'success', payload: users })
})

export default router
