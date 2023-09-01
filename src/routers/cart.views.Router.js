import { Router } from "express";
import {cartViewController, cartRealTimeController} from "../controllers/cart.views.controller.js"


const cartViewsRouter = Router()

cartViewsRouter.get("/views/:cid", cartViewController)              //vista carrito
cartViewsRouter.get("/cartrealtime/:cid",cartRealTimeController )

export default cartViewsRouter;