import { SET_USERID } from "../constants/ActionTypes";

const initialState = {
  userId: ""
};

export default function userId(state = initialState, action) {
  switch (action.type) {
    case SET_USERID:
      return { ...state, userId: action.payload };

    default:
      return state;
  }
}
