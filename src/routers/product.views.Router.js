import { Router } from "express";
import {
    productsViewsController,
    realTimeViewsController
} from "../controllers/product.views.controller.js"

const productsViewsRouter = Router()


productsViewsRouter.get("/views", productsViewsController)            //vista productos
productsViewsRouter.get("/realtimeproducts", realTimeViewsController);  //vista RealTime Productos


export default productsViewsRouter;