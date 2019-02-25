import { SIGN_IN_EMAIL_CHANGED } from "../constants/ActionTypes";

const initialState = {
  profiles: undefined
};

export default function authentication(state = initialState, action) {
  console.log("action.payload", action);
  switch (action.type) {
    case "set_profiles":
      return { ...state, profiles: action.profile };

    default:
      return state;
  }
}
