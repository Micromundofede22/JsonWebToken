import { cartsModel } from "../dao/models/cart.model.js"

// Crear carrito
export const createCartController= async (req, res) => {
    try {
        const newCart = req.body
        const result= await cartsModel.create(newCart)
        res.status(200).json({ status: "success", payload: result})
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}


// Trae carrito
export const readCartController= async (req, res) => {
    try {
        const id = req.params.cid
        const result = await cartsModel.findById(id)
        if (id == null) {
            res.status(406).json({ status: "error", error: "Not found" })
        } else {
            res.status(200).json({ status: "success", payload: result })
        }
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message })
    }
}

export const createInCartController= async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await cartsModel.findById(cid)

        let acum = 0
        cart.products.map((datos) => {
            if (datos.product == pid) {
                acum++;
                datos.quantity++;
            }
        })

        if (acum === 0) {
            cart.products.push({ product: pid, quantity: 1 })
        }

        await cartsModel.updateOne({ _id: cid }, cart) //1ero actualizo el carrito
        const actualizado = await cartsModel.findById(cid).populate("products.product") //2do lo busco. Populateo la info de product en products para que aparezca en el carrito y asi se relacionen ambas bases de datos(cart y products)
        res.status(200).json({ status: "success", payload: actualizado }) //3ero lo mando al json
    } catch (err) {
    res.status(500).json({ status: "error", error: err.message })
}
} 


// ELIMINA UN PRODUCTO
export const deleteOneProductController= async(req, res)=>{
    try {
        const cid= req.params.cid
        const pid= req.params.pid
        let cart= await cartsModel.findById(cid)
        
        const productIndex= cart.products.findIndex(item => item.product == pid)

        cart.products.splice(productIndex, 1)
        // console.log(cart)
        await cartsModel.updateOne({_id: cid}, cart)

        const result= await cartsModel.findById(cid).populate("products.product")

        res.status(200).json({status: "success", payload: result})
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message})
    }
}

export const deleteCartController= async(req,res)=>{
    try {
        const cid= req.params.cid
        await cartsModel.updateOne({_id: cid}, {products: []})
        const result= await cartsModel.findById(cid).populate("products.product")
        res.status(200).json({status: "success", payload:result})
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message})
    }
}

// Actualizo cantidades de un producto
export const updateQuantityController = async (req, res)=>{
    try {
        const cid= req.params.cid
        const pid= req.params.pid
        const data= req.body
        
        const valor= data.quantity //extraigo el valor de quantity
        const cart= await cartsModel.findById(cid)
        cart.products.map((data)=>{
            if (data.product == pid) {
                data.quantity = valor
            }
        })
      
        await cartsModel.updateOne({_id: cid}, cart )
        const result= await cartsModel.findById(cid).populate("products.product")
        res.status(200).json({status: "success", payload: result})

    } catch (err) {
        res.status(500).json({ status: "error", error: err.message})
    }
}