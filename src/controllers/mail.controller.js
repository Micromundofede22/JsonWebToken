import nodemailer from "nodemailer";
import config from "../config/config.js"
import Mailgen from "mailgen";

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

    let MailGenerator= new Mailgen({
        theme: "cerberus",
        product: { //encabezado
            name: "Micromundo terrarios",
            link: "http://micromundo.terrarios.com" //link clikeable a mi pagina web 
        }
    })

    let content= {
        body: {
            intro: "Su compra está registrada",
            table: {
                data: [
                    {
                        item: "terrario 1",
                        description: "descripcion del terrario",
                        price: "ARS $8000"
                    }
                ]
            },
            outro: "Que tenga el mejor de los días, Fede"
        }
    }
    let mail= MailGenerator.generate(content) 

    let message= {
        from: `${nodemailerUSER}`,
        to: "fedefolmer00@gmail.com",
        subject: "Gracias por tu compra",
        html: mail
    }
    transporter.sendMail(message)
    .then(()=> res.status(201).json({status: "success"}))
    .catch((err)=> res.status(500).json({err}))
}