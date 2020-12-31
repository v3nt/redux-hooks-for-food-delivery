import { LOAD_MENU, ADD_TO_CART } from "./types";

const change_diet = (state) => {
  const { diet } = state;
  const newDiet = diet === "veg" ? "all" : "veg";

  return {
    ...state,
    diet: newDiet,
    cartByIds: {},
  };
};

const load_menu = (menuList) => {
  console.log("load_menu", menuList);

  //   dispatch({
  //     type: LOAD_MENU,
  //     payload: res.data,
  //   });
};

// const setUser = (userObj) => {
//   return { type: SET_USER, payload: userObj };
// };

const add_to_cart = (state, action) => {
  const { itemId } = action.payload;
  const { cartByIds } = state;

  const cartItem = cartByIds[itemId] || {
    quantity: 0,
  };

  cartItem.quantity += 1;

  const newCart = {
    ...cartByIds,
    [itemId]: cartItem,
  };

  return {
    ...state,
    cartByIds: newCart,
  };
};

const remove_from_cart = (state, action) => {
  const { itemId } = action.payload;
  const { cartByIds } = state;

  const cartItem = cartByIds[itemId];

  if (!cartItem) {
    return state;
  }

  cartItem.quantity -= 1;

  const newCart = {
    ...cartByIds,
    [itemId]: cartItem,
  };

  return {
    ...state,
    cartByIds: newCart,
  };
};

export default {
  change_diet,
  load_menu,
  add_to_cart,
  remove_from_cart,
};
