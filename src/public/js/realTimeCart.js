const socket = io() //del lado del cliente, a io le ponemos nombre socket

const tableBody = document.getElementById("tabla");

console.log("pasando por aca realTimeCart")
socket.on("updateCart", (data) => { //cocket cuando escucha el updateProducts responde con esto
    const dataenArray= [data]
    const arrayIterable= dataenArray[0]
    console.log(arrayIterable)
    tableBody.innerHTML = ` `
    for (let product of data) {
        console.log("paso")
        const documentFragment= document.createDocumentFragment() //para que un elemento reciba varios appendchild

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        td1.innerHTML = `${product.title}`
        td3.innerHTML = `${product.price}`
        td4.innerHTML= `${product.thumbnails}`

        documentFragment.appendChild(tr) //mi fila tr es la fragmentada

        tr.appendChild(td1,td3,td4) //le añado varios  appendchild

        tableBody.appendChild(documentFragment) //luego a la tabla le añado el documento fragmentado (que es la fila tr)
    }
});