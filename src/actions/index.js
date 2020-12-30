import { FETCH_FOOD } from "./types";

export const change_diet = () => {
  const { diet } = state;
  const newDiet = diet === "veg" ? "all" : "veg";

  return {
    ...state,
    diet: newDiet,
    cartByIds: {},
  };
};

export const load_menu = () => {
  const { menu } = action.payload;

  const menuById = {};
  menu.forEach((item) => {
    menuById[item.id] = item;
  });
  const allMenuId = menu.map((item) => item.id);
  const vegMenuId = menu
    .filter((item) => item.diet === "veg")
    .map((item) => item.id);

  return {
    ...state,
    menuById,
    menuIdList: {
      all: allMenuId,
      veg: vegMenuId,
    },
  };
};

export const add_to_cart = () => {
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

export const remove_from_cart = () => {
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
