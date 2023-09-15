import { signedCookie } from "cookie-parser";
import config from "../config/config.js";
import UserDTO from "../dto/Users.DTO.js"; 


//variable de entorno en carpeta config, archivo config
const JWT_COOKIE_NAME = config.cookieNameJWT
const JWT_PRIVATE_KEY = config.keyPrivateJWT


export const postLogin= async (req, res) => {
    res.cookie(JWT_COOKIE_NAME, req.user.token, signedCookie(JWT_PRIVATE_KEY)).redirect('/products/views') //en la cookie guardo el token. signedcockie es la cookie firmada
}

export const getFailLogin= (req, res) => {
    res.send({ error: 'Failed Login!' })
}

export const postRegister= async (req, res) => {
    res.redirect('/session/login') //si registra con middleware de routes, redirije al login
}

export const getFailRegister= (req, res) => {
    res.send({ error: 'Failed register!' })            //ruta de fail
}

export const getGitHub= async (req, res) => { }

export const gitHubCallback= async (req, res) => {
    // console.log('Callback: ', req.user)
    res.cookie(JWT_COOKIE_NAME, req.user.token,signedCookie(JWT_PRIVATE_KEY)).redirect('/products/views') //a la coockie le meto el token que esta dentro del user
}

export const getGoogle=  async (req, res) => { }

export const googleCallback=  async (req, res) => {
    // console.log('Callback: ', req.user)
    res.cookie(JWT_COOKIE_NAME, req.user.token, signedCookie(JWT_PRIVATE_KEY)).redirect('/products/views') //a la cookie le meto el token
}

export const getLogout= (req, res) => {
    req.session.destroy(err=>{}) //destruye la session que usa passport en su configuracion
    res.clearCookie(JWT_COOKIE_NAME).redirect("/")//elimino cookie que tiene el token
}

export const getCurrent= (req, res) => {
    if (!req.user) return res.status(401).json({ status: "error", error: "Sesión no detectada, inicia sesión" })
    res.status(200).json({ status: "success", payload: new UserDTO(req.user)})
}