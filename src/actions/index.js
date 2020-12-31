const change_diet = (state) => {
  const { diet } = state;
  const newDiet = diet === "veg" ? "all" : "veg";

  return {
    ...state,
    diet: newDiet,
    cartByIds: {},
  };
};

const load_menu = (state, action) => {
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
