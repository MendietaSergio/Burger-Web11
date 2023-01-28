import React, { createContext, useContext, useState } from "react";

const CartContext = createContext()

export const CartContextUse = () => {
    return useContext(CartContext)
}

export const CartContextProvider = ({ Children }) => {
    const [cart, setCart] = useState([])
    const [orderId, setOrderId] = useState()
    const orders = (formData, priceTotal) => {
        let order = {}
        order.date = "28/01/2023";
        order.buyer = formData;
        order.total = priceTotal;
        order.items = cart.map((cartItem) => {
            const id = cartItem.item.id;
            const nameProduct = cartItem.item.nameProduct;
            const price = cartItem.item.price * cartItem.quantity
            return { id, nameProduct, price }
        })
    }
    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            const updateQty = [...cart];
            updateQty.map(element => {
                if (element.item.id === item.id) {
                    element.quantity = element.quantity + quantity
                }
                return element
            })
            setCart(updateQty)
        }
        else {
            setCart([...cart, { item, quantity }])
        }
    }
    //SI ESTA EN EL CARRITO, SUMO SU CANTIDAD
    const isInCart = (id) => cart.find(element => element.item.id === id)
    //BORRAR DE LISTA DEL CARRITO
    const clear = () => setCart([])
    //ELIMINO EL ITEM SELECCIONADO
    const removeItem = (id) => {
        const cartFilter = cart.filter(element => element.item.id !== id)
        setCart(cartFilter)
    }
    const iconCart = () => {
        return cart.reduce((acum, valor) => acum + valor.quantity, 0)
    }
    return (
        <CartContext.Provider value={{ cart, addItem, clear, removeItem, iconCart, orders, orderId, setOrderId }}>
            {children}
        </CartContext.Provider>

    )
}