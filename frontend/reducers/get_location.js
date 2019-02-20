import { SIGN_IN_EMAIL_CHANGED } from "../constants/ActionTypes";

const initialState = {
  coordinates: {
    latitude: 0,
    longitude: 0
  } //*k1
};

export default function authentication(state = initialState, action) {
  console.log("in redux");
  switch (action.type) {
    case "get_location":
      return { ...state, coordinates: action.payload.coords };

    default:
      return state;
  }
}
