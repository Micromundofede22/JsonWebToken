import { ProductService } from "../services/services.js";

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
export const getProductByIdController = async (req, res) => {
    try {
        const id = req.params.pid
        const result = await ProductService.getById(id)

        if (id === null || id < 0) {
            res.status(406).json({ status: "error", error: "Not found" })
        } else {
            res.status(200).json({ status: "success", payload: result })
            req.app.get("socketio").emit("updateProducts", await ProductService.getAll()) //socketio (servidor), emite un objeto updateProducts al cliente, cuyo socket escucha en el script de la vista realTime
        }
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}

// crear productos
export const createProductController = async (req, res) => {
    try {
        const data = req.body
        const result = await ProductService.create(data)
        res.status(201).json({ status: "success", payload: result })
        const updateProducts= await ProductService.getAll()
        req.app.get("socketio").emit("updateProducts",updateProducts )
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
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