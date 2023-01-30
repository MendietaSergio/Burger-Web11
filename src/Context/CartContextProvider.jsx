import React, { createContext, useContext, useState } from "react";

const CartContext = createContext()

export const CartContextUse = () => {
    return useContext(CartContext)
}

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [orderId, setOrderId] = useState()
    const orders = (formData, priceTotal) => {
        let order = {}
        order.date = "28/01/2023";
        order.buyer = formData;
        order.total = priceTotal;
        order.items = cart.map((cartItem) => {
            const _id = cartItem.item._id;
            const nombre = cartItem.item.nombre;
            const precio = cartItem.item.precio * cartItem.cantidad
            return { _id, nombre, precio }
        })
    }
    const addItem = (item, cantidad) => {
        if (isInCart(item._id)) {
            const updateQty = [...cart];
            updateQty.map(element => {
                if (element.item._id === item._id) {
                    if (cantidad >= 1) {
                        element.cantidad = cantidad;
                    } else {
                        element.cantidad = element.cantidad + cantidad
                    }
                }
                return element
            })
            setCart(updateQty)
        }
        else {
            setCart([...cart, { item, cantidad }])
        }
    }
    //SI ESTA EN EL CARRITO, SUMO SU CANTIDAD
    const isInCart = (_id) => cart.find(element => element.item._id === _id)
    //BORRAR DE LISTA DEL CARRITO
    const clear = () => setCart([])
    //ELIMINO EL ITEM SELECCIONADO
    const removeItem = (_id) => {
        const cartFilter = cart.filter(element => element.item._id !== _id)
        setCart(cartFilter)
    }
    const iconCart = () => {
        return cart.reduce((acum, valor) => acum + valor.cantidad, 0)
    }
    return (
        <CartContext.Provider value={{ cart, addItem, clear, removeItem, iconCart, orders, orderId, setOrderId }}>
            {children}
        </CartContext.Provider>

    )
}