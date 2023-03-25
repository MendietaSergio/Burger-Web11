export const MessageWsp = ({ data, cart, dataConfig }) => {
    const {
        abonaCon,
        direccion,
        entrecalles,
        nombre,
        pagaCon,
        telefono,
        vuelto,
        precioTotal
    } = data;
    const {
        envio,
        infoWsp: {
            viewStart,
            viewEnd
        },
        valorEnvio,
        titulo,
    } = dataConfig[0];
    let msg =
        `https://wa.me/541134548252?text=${(viewStart.replace(/ /g, "+"))}%0D%0A+%0D%0A+PRODUCTOS`
    cart.forEach(pedido => {
        msg +=
            "%0D%0A++%E2%80%A2+" +
            (pedido.item.nombre).replace(/ /g, "+") +
            "+" +
            "%7C+%24" +
            pedido.item.precio +
            "+x+" +
            pedido.cantidad +
            "+unid.+%28%24" +
            (pedido.cantidad * pedido.item.precio) +
            "%29"
    });
    // // // ============================================ //
    msg += `+%0D%0A+%0D%0A+DATOS+ENVIO+%0D%0A+Nombre:+${nombre}+%0D%0A+Telefono:+${telefono}+%0D%0A+Direccion:+${direccion}+%0D%0A+Entrecalles:+${entrecalles}`
    msg += `+%0D%0A+Subtotal:+$${precioTotal}+%0D%0A+Precio+envio:+$${envio ? valorEnvio : '0'}+%0D%0A+Total+con+envio:+$${precioTotal + valorEnvio}+%0D%0A+Paga+con:+$${pagaCon}+%0D%0A+Abona+con:+${abonaCon}+%0D%0A+${abonaCon === "efectivo" ? `Vuelto:+$${vuelto}+%0D%0A+` : `Recuerde+enviar+el+comprobante+%0D%0A+`}+%0D%0A+${(viewEnd).replace(/ /g, "+")}`
    return msg;
}