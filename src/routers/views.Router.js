import { Router } from "express";
import {
    productViewController,
    cartViewController,
    realTimeViewcontroller
} from "../controllers/views.controller.js"

const viewsRouter = Router()

viewsRouter.get("/products", productViewController)            //vista productos
viewsRouter.get("/cart/:cid", cartViewController)              //vista carrito
viewsRouter.get("/realtimeproducts", realTimeViewcontroller);  //vista RealTime Productos


export default viewsRouter;