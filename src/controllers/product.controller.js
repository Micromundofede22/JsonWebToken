import { ProductService } from "../services/services.js";
// testing errores
import CustomError from "../services/errors/custom_error.js"; //clase que crea errores
import EErrors from "../services/errors/enums_error.js"; //diccionario errores
import {
    generateProductsErrorInfo, 
    characterNotAcceptable
} from "../services/errors/info_error.js" //info de errores al generar products



// busqueda por query todos los productos
export const getAllProductsController = async (req, res) => {
    try {
        // const result = await getProduct(req, res)
        const result= await ProductService.getAllPaginate(req,res)

        res.status(200).json({
            status: "success",
            payload: result,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        })

    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}

// busqueda por params
export const getProductByIdController = async (req, res, next) => {
    try {
        const id = req.params.pid
        const result = await ProductService.getById(id)

        if (id === null || id < 0) {
            CustomError.createError({                   
                name: "Caracter incorrecto",       
                cause: characterNotAcceptable(id), 
                message: "El Id es null o menor a 0",  
                code: EErrors.INVALID_TYPES_ERROR       
            })
            
        } else {
            res.status(200).json({ status: "success", payload: result })
            req.app.get("socketio").emit("updateProducts", await ProductService.getAll()) //socketio (servidor), emite un objeto updateProducts al cliente, cuyo socket escucha en el script de la vista realTime
        }
    } catch (error) {
        next(error)
    }
}

// crear productos
export const createProductController = async (req, res, next) => { //next, para que error pase al middleware del error
    try {
        const data = req.body

        // GESTION DE ERRORES MEDIANTE EL MIDDLEWARE DE ERRORES
        if(!data.title || !data.description || !data.price || !data.code || !data.stock || !data.category){
            CustomError.createError({                   //custom creador del error
                name: "Error al crear Productos",       // nombre error
                cause: generateProductsErrorInfo(data), //en cause va la info que genere en info
                message: "Error al crear un producto",  //mensaje corto
                code: EErrors.INVALID_TYPES_ERROR       //tipo de error numerado en diccionario
            })
        }

        const result = await ProductService.create(data)
        res.status(201).json({ status: "success", payload: result })
        const updateProducts= await ProductService.getAll()
        req.app.get("socketio").emit("updateProducts",updateProducts )
    } catch (error) {
        next(error)

    }
}

// ACTUALIZAR PRODUCTOS
export const updateProductController = async (req, res) => {
    try {
        const id = req.params.pid
        const data = req.body
        const result = await ProductService.update(id, data)

        if (result === null) {
            res.status(404).json({ status: "error", error: "Not found" })
        } else {
            res.status(200).json({ status: "success", payload: result })
            req.app.get("socketio").emit("updateProducts", await ProductService.getAll())
        }
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}

// ELIMINAR PRODUCTOS
export const deleteProductController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await ProductService.delete(id)
        if (result == null) {
            res.status(404).json({ status: "error", error: "Not found" })
        } else {
            res.status(200).json({ status: "success", payload: result })
            req.app.get("socketio").emit("updateProducts", await ProductService.getAll())
        }
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}