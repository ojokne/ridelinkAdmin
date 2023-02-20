import { ACTIONS } from "./actions";

export const dataReducer = (state, payload) => {
  switch (payload.type) {
    case ACTIONS.ADD_DATA: {
      return { ...state, ...payload.data };
    }
    case ACTIONS.CLEAR_DATA: {
      return {};
    }
    default:
      return state;
  }
};
