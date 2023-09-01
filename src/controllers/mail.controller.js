import nodemailer from "nodemailer";
import config from "../config/config.js"

const nodemailerUSER= config.nodemailerUSER
const nodemailerPASS= config.nodemailerPASS

export const signupController= async(req,res) =>{

}

export const getbillController=async(req,res)=>{
    let configNodemailer={
        service: "gmail",
        auth: {
            user: nodemailerUSER,
            pass: nodemailerPASS
        }
    }
    let transporter= nodemailer.createTransport(configNodemailer)
    let message= {
        from: `${nodemailerUSER}`,
        to: "fedefolmer00@gmail.com",
        subject: "Gracias por tu compra",
        html: "ticket de compra aqui"
    }
    transporter.sendMail(message)
    .then(()=> res.status(201).json({status: "success"}))
    .catch((err)=> res.status(500).json({err}))
}