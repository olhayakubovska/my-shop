import { ACTION_TYPE } from "../api/action";

const initialStateProducts = {
  products: [],
};

export const productsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload, 
      };

    default:
      return state;
  }
};
