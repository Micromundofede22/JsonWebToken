import { Router } from "express";
import { handlePolicies } from "../middleware/auth.middleware.js";
import { 
    createCartController, 
    getCartController, 
    createInCartController,
    deleteOneProductController,
    deleteCartController,
    updateQuantityController,
    purchaseController
} from "../controllers/cart.controller.js";


const cartRouter = Router()


cartRouter.get("/:cid", getCartController)                                            // ME TRAE EL CARRITO
cartRouter.post('/', createCartController)                                            // CREA CARRITO
cartRouter.post("/:cid/product/:pid",handlePolicies("USER"), createInCartController)                         // AGREGA AL CARRITO
cartRouter.put("/:cid/product/:pid",handlePolicies("USER"), updateQuantityController)                        // ACTUALIZO CANTIDADES
cartRouter.delete("/:cid/product/:pid", deleteOneProductController)                   // ELIMINA 1 SOLO PRODUCTO
cartRouter.delete("/:cid",deleteCartController)                                       // ELIMINA TODOS LOS PRODUCTOS
cartRouter.post("/:cid/purchase", purchaseController)                                 // genera ticket compra

export default cartRouter