import {
  CHANGE_DIET,
  LOAD_MENU,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/types";

const initialState = {
  diet: "all",
  menuById: {},
  menuIdList: {
    all: [],
    veg: [],
  },
  cartByIds: {},
};

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DIET: {
      const { diet } = state;
      const newDiet = diet === "veg" ? "all" : "veg";

      return {
        ...state,
        diet: newDiet,
        cartByIds: {},
      };
    }
    case LOAD_MENU: {
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
    }
    case ADD_TO_CART: {
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
    }
    case REMOVE_FROM_CART: {
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
    }
    default:
      return state;
  }
}

export default foodReducer;
