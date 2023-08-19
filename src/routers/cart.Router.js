import { Router } from "express";
import { 
    createCartController, 
    readCartController, 
    createInCartController,
    deleteOneProductController,
    deleteCartController,
    updateQuantityController
} from "../controllers/cart.controller.js";


const cartRouter = Router()


cartRouter.post('/', createCartController)                          // CREA CARRITO
cartRouter.get("/:cid", readCartController)                         // ME TRAE EL CARRITO
cartRouter.post("/:cid/product/:pid", createInCartController)       // AGREGA AL CARRITO
cartRouter.delete("/:cid/product/:pid", deleteOneProductController) // ELIMINA 1 SOLO PRODUCTO
cartRouter.delete("/:cid",deleteCartController)                     // ELIMINA TODOS LOS PRODUCTOS
cartRouter.put("/:cid/product/:pid", updateQuantityController)      // ACTUALIZO CANTIDADES


export default cartRouter