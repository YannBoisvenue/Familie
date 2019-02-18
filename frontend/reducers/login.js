import { LOGIN_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  loggedIn: ''
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true };

    default:
      return state;
  }
}
