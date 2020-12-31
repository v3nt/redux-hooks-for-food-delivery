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

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_DIET:
      return action.payload;
    case LOAD_MENU:
      return action.payload;
    case ADD_TO_CART:
      return action.payload;
    case REMOVE_FROM_CART:
      return action.payload;
    default:
      return state;
  }
}
