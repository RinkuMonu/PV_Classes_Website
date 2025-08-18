"use client";
import toast from "react-hot-toast";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../app/axios/axiosInstance";
// import { headers } from "next/headers";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(null);

  const [storageCart, setStorageCart] = useState(null);
  const [loading, setLoading] = useState(false);  

  // 🛒 Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        const cartData = localStorage.getItem("guestCart");
        setStorageCart(cartData ? JSON.parse(cartData) : []);
        return;
      }

      const { data } = await axiosInstance.get(`/cart/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(data?.cart?.items); 
      setCartCount(data?.cart?.items?.length || 0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Cart not found, setting empty cart.");
        setCart([]); // agar user ke liye cart na ho
      } else {
        console.error("Error fetching cart:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  // 🛒 Add to cart
  const addToCart = async ({ itemType, itemId }) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      if (token) {
        const { data } = await axiosInstance.post(
          `/cart/add`,
          { itemType, itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchCart();
        return { success: true, message: data.message };
      } else {
        let localCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists
        const existingItemIndex = localCart.findIndex(
          (item) => item.itemType === itemType && item.itemId === itemId
        );
        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity += 1;
        } else {
          localCart.push({ itemType, itemId, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
        return { success: true, message: "Item added to local cart" };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to add to cart",
      };
    } finally {
      setLoading(false);
    }
  };
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axiosInstance.delete(`/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: error.response?.data?.message || "Failed to remove" };
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Update item quantity
  const updateQuantity = async (change,current, itemId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 👇 new quantity = current + change
      const newQuantity = (current || 0) + change;
      if (newQuantity < 1) return; // safeguard

      const { data } = await axiosInstance.put(
        `/cart/update`,
        {
          itemId: itemId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating quantity:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update quantity",
      };
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
        storageCart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
