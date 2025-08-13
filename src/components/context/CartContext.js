"use client";
import toast from "react-hot-toast";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../app/axios/axiosInstance";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // 🛒 Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const { data } = await axiosInstance.get(`/api/cart/${userId}`);
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Add to cart
    const addToCart = async ({ itemType, itemId, quantity = 1, extra = {} }) => {
    try {
        setLoading(true);
        const userId = localStorage.getItem("userId");

        if (!userId) {
            let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
            const existingItemIndex = guestCart.findIndex(
                (item) => item.itemId === itemId && item.itemType === itemType
            );

            if (existingItemIndex > -1) {
                guestCart[existingItemIndex].quantity += quantity;
            } else {
                guestCart.push({ itemType, itemId, quantity, extra });
            }

            localStorage.setItem("guestCart", JSON.stringify(guestCart));           
            return { success: true, message: "Item added to cart" };
        }

        const { data } = await axiosInstance.post(`/cart/add`, {
            userId,
            itemType,
            itemId,
            quantity,
            extra,
        });

        setCart({
            ...data.cart,
            subtotal: data.subtotal,
            tax: data.tax,
            total: data.total,
        });

       
       
        return { success: true, message: data.message };
    } catch (error) {
        console.error("Error adding to cart:", error);        
        return { success: false, message: error.response?.data?.message || "Failed to add to cart" };
    } finally {
        setLoading(false);
    }
    };


  // 🛒 Remove item from cart
  const removeFromCart = async ({ itemType, itemId }) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      const { data } = await axiosInstance.delete(`/api/cart/remove`, {
        data: { userId, itemType, itemId },
      });
      setCart({ ...data.cart, subtotal: data.subtotal, tax: data.tax, total: data.total });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: error.response?.data?.message || "Failed to remove" };
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Update item quantity
  const updateQuantity = async ({ itemType, itemId, quantity }) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      const { data } = await axiosInstance.put(`/api/cart/update-quantity`, {
        userId,
        itemType,
        itemId,
        quantity,
      });
      setCart({ ...data.cart, subtotal: data.subtotal, tax: data.tax, total: data.total });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating quantity:", error);
      return { success: false, message: error.response?.data?.message || "Failed to update quantity" };
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      const { data } = await axiosInstance.post(`/api/cart/clear`, { userId });
      setCart({ items: [], subtotal: 0, tax: 0, total: 0 });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, message: error.response?.data?.message || "Failed to clear cart" };
    } finally {
      setLoading(false);
    }
  };

  // Load cart when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
