import { Router } from "express";
import {
    readProductQueryController,
    readProductParamsController,
    createProductController,
    updateProductcontroller,
    deleteProductController
} from "../controllers/product.controller.js"; //traigo funciones controladoras de los router
const productRouter = Router()


// busqueda por query
productRouter.get("/", readProductQueryController)     //lectura por query
productRouter.get("/:pid", readProductParamsController)// lectura por params
productRouter.post('/', createProductController)       // crear producto
productRouter.put("/:pid", updateProductcontroller)    //actualizar productos
productRouter.delete("/:pid", deleteProductController) //eliminar productos

export default productRouter