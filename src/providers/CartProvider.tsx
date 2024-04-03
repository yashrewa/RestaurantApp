import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "../types";
import { randomUUID } from "expo-crypto";
import { Tables } from "../database.types";

type Product = Tables<'products'>


type CartType = {
    items: CartItem[];
    addItem?: (product: Product, size: CartItem['size']) => void;
    updateQuantity?: (itemId: string, newQuantity: number, size: string) => void;
    total: number;
}
const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) => {
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }
        const existingItemIndex = items.findIndex(item => item.product_id === product.id && item.size == size)
        if (existingItemIndex !== -1) {
            const updatedItems = [...items]
            updatedItems[existingItemIndex].quantity++;
            setItems(updatedItems)
        }
        if (existingItemIndex === -1) {
            setItems([...items, newCartItem])
        }

    }

    const updateQuantity = (itemId: string, newQuantity: number, size: string) => {
        console.log('is function ke andar aagaye hain')
        const existingItemIndex = items.findIndex(item => item.id === itemId && item.size === size)
        console.log("Yeh wala hata do bhai", items[existingItemIndex])
        if (existingItemIndex !== -1) {
            if (newQuantity === -1) {
                const updatedItems = [...items]
                if (updatedItems[existingItemIndex].quantity >= 1) {
                    updatedItems[existingItemIndex].quantity = updatedItems[existingItemIndex].quantity + newQuantity;
                    setItems(updatedItems)
                }
                if (updatedItems[existingItemIndex].quantity < 1) {
                    updatedItems.splice(existingItemIndex, 1)
                    console.warn('Are you sure you want to remove this item?')

                }
            }
            if (newQuantity === 1) {
                const updatedItems = [...items]
                updatedItems[existingItemIndex].quantity = updatedItems[existingItemIndex].quantity + newQuantity;
                setItems(updatedItems)
            }
        }
    }

    const total = parseInt((items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)).toFixed(2))
    return (
        <>
            <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>{children}</CartContext.Provider>
        </>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)