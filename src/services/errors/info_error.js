// generacion de productos con errores
export const generateProductsErrorInfo = data => {
    return `
    Uno o mas parámetros estan incompletos o no son válidos.
    Lista de properties obligatorios:
        - title: Must be a string. (${data.title})
        - description: Must be a string. (${data.description})
        - price: Must be a string. (${data.price})
        - code: Must be a string. (${data.code})
        - stock: Must be a string. (${data.stock})
        - category: Must be a string. (${data.category})
    `
}

// cart no existe en base de datos
export const cartNotFound= id =>{
    return `
    El carrito (${id}) no existe en nuestra base de datos
    `
}

export const characterNotAcceptable= id =>{
    return`
    El caracter ingresado (${id}), no es válido. 
    `
}