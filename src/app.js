import express from "express";
import productRouter from "./routers/product.Router.js";
import cartRouter from "./routers/cart.Router.js";
import sessionRouter from "./routers/session.Router.js";
import productsViewsRouter from "./routers/product.views.Router.js";
import cartViewsRouter from "./routers/cart.views.Router.js";
import sessionViewsRouter from "./routers/session.views.Router.js";
import mailRouter from "./routers/mail.Router.js";
import mockRouter from "./routers/mock.Router.js"
import routerChat from "./routers/chat.Router.js";
import loggerRouter from "./routers/logger.Router.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { messagesModel } from "./models/message.model.js";
import session from "express-session"; //DEPENDENCIA SESSION (guarda cookie)
// import MongoStore from "connect-mongo"; //DEPENDENCIA guardar datos en MONGO
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { passportCall } from "./middleware/passportCall.js";
import cookieParser from "cookie-parser"; //crea cookie (para jwt)
import config from "./config/config.js"; //para leer variables de entorno
import cors from "cors";
import { handlePolicies } from "./middleware/auth.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js"
import logger from "./loggers.js";
// import clusterRouter from "./routers/cluster.Router.js"


//variables de entorno
const port = config.port
const mongoUri = config.mongo_uri

const app = express()


//configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine({
    helpers: { //permiten realizar if en las plantillas
        igual: function (value, value2) {
            if (value == value2) {
                return true;
            }
        }
    }
}))
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(cors()) // permite conexiones de front que estan en otros dominios a mi servidor 
app.use(cookieParser()) //crea cookies (se usan para que se guarde el token)
app.use(express.json()) //para que mi servidor pueda recibir json del cliente
app.use(express.urlencoded({ extended: true })) //para que mi servidor pueda recibir json que llegan por formulario por vista desde el cliente
app.use(express.static("./public"))


// MIDLEWARE CREA SESSION NECESARIA PARA PASSPORT
app.use(session({
    secret: "palabraclave",
    resave: true,
    saveUninitialized: true
}))
// CONFIGURACION PASSPORT 
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.get("/", (req, res) => { res.render("sessions/login") })


app.use("/api/session", sessionRouter)                                              //ruta data Onwire session
app.use('/api/products',passportCall("jwt"), productRouter)                         //ruta data Onwire                   
app.use('/api/carts', passportCall("jwt"), cartRouter)                              //ruta data Onwire
app.use("/session", sessionViewsRouter)                                             //ruta html Onwire de session
app.use("/products", passportCall("jwt"), productsViewsRouter)                      //ruta html Onwire products y cart, con middleware passportCall (en la ) que hace ruta privada usando el token como capa de acceso. La estrategy "jwt" esta instanciada en passport config
app.use("/cart", passportCall("jwt"), cartViewsRouter)                              //ruta html Onwire products y cart, con middleware passportCall (en la ) que hace ruta privada usando el token como capa de acceso. La estrategy "jwt" esta instanciada en passport config
app.use("/chat", passportCall("jwt"), handlePolicies("USER"), routerChat)           //ruta html Onwire chat
app.use("/mockingproducts", mockRouter)                                             //ruta prueba del servidor 
app.use("/loggerTest", loggerRouter)
app.use("/mail", mailRouter)
// app.use("/cluster", clusterRouter)

app.use(errorMiddleware)                                                             //middleware de errores siempre al final de endpoints


await mongoose.connect(mongoUri)

const serverHTTP = app.listen(port, () => logger.info(`Server up ${port}`)) //inica servidor http

//CONFIGURACION SOCKET IO
const io = new Server(serverHTTP) // instancia servidor socketio y enlaza al server http
app.set("socketio", io) //creo el objeto SOCKETIO con el servidor io asi lo uso en toda la app (lo uso para emitir en api/product Y api/cart en cada funcion del controller)


io.on('connection', async (socket) => { //servidor escucha cuando llega una nueva conexion
    let messages = (await messagesModel.find()) ? await messagesModel.find() : []
    socket.broadcast.emit('alerta') //es una 3era emisión que avisa a todos menos a quien se acaba de conectar. (las otras dos son socket.emit y io.emit) io es el servidor y socket el cliente
    socket.emit('logs', messages) //solo emite a ese cliente el historial, (no a todos, sino se repetiria el historial)
    socket.on('message', data => { //cuando cliente me haga llegar un mensaje, lo pusheo
        messages.push(data);
        messagesModel.create(messages);
        io.emit('logs', messages) // y el servidor io emite a todos el historial completo
    })
})

io.on("connection", socket => {
    console.log("nuevo cliente")
    socket.on('products', data => {
        io.emit('updateProducts', data)
    })
    socket.on('item', data => {
        io.emit('updateCart', data)
    })
})
