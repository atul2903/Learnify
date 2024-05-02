import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],

  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,

  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    settotalItems(state, value) {
      state.totalItems = value.payload;
    },

    addToCart(state, value) {
      const course = value.payload;

      const index = state.cart.findIndex((item) => item._id === course._id);
      if (index >= 0) {
        //course is already added to cart

        toast.error("course is already added in the cart");
        return;
      }
      state.cart.push(course);

      state.totalItems++;
      state.total += course.price;

      //update local storage

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("course added to the cart");
    },
    removeFromCart(state, value) {
      //find the course if exist or not

      const course = value.payload;

      const index = state.cart.findIndex((e) => e._id === course);

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // show toast
        toast.success("Course removed from cart");
      }
    },

    resetCart(state, value) {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { settotalItemss, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
