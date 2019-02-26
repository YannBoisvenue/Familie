import { SET_USERID, PROFILE_COMPLETE } from "../constants/ActionTypes";

const initialState = {
  userId: "",
  profileComplete: false
};

export default function userId(state = initialState, action) {
  switch (action.type) {
    case SET_USERID:
      return { ...state, userId: action.payload };

    case PROFILE_COMPLETE:
      return { ...state, profileComplete: true };

    default:
      return state;
  }
}
