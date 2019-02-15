import { SIGN_IN_EMAIL_CHANGED } from "../constants/ActionTypes";

const initialState = {
  email: ""
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_EMAIL_CHANGED:
      return { ...state, email: action.payload.email };

    default:
      return state;
  }
}
