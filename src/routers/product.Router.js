import { Router } from "express";
import { handlePolicies } from "../middleware/auth.middleware.js";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
} from "../controllers/product.controller.js"; //traigo funciones controladoras de los router

const productRouter = Router()

// busqueda por query
productRouter.get("/", getAllProductsController)                               //lectura por query de todos los products
productRouter.get("/:pid", getProductByIdController)                           // lectura por params
productRouter.post('/',handlePolicies("ADMIN"), createProductController)       // crear producto
productRouter.put("/:pid",handlePolicies("ADMIN"), updateProductController)    //actualizar productos
productRouter.delete("/:pid",handlePolicies("ADMIN"), deleteProductController) //eliminar productos

// productRouter.post('/', createProductController)       // crear producto
// productRouter.put("/:pid", updateProductController)    //actualizar productos
// productRouter.delete("/:pid", deleteProductController)

export default productRouter