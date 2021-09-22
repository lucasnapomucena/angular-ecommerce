import { Actions, ActionTypes } from './actions';

export const initialState = {
  items: [],
  cart: [],
  wishlist: []
};

export function ShopReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };
    case ActionTypes.Add:
      const validateAdd = state.cart.filter(
        (item) => item?.id == action.payload?.id
      );

      if (validateAdd.length <= 0) {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }
      return state;
    case ActionTypes.Remove:
      return {
        ...state,
        cart: [...state.cart.filter((item) => item.id !== action.payload.id)]
      };
    case ActionTypes.AddWishlist:
      const validateWishlist = state.wishlist.filter(
        (item) => item?.id == action.payload?.id
      );

      if (validateWishlist.length <= 0) {
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      }
      return state;

    case ActionTypes.RemoveWishlist:
      return {
        ...state,
        wishlist: [
          ...state.wishlist.filter((item) => item.id !== action.payload.id)
        ]
      };

    default:
      return state;
  }
}
