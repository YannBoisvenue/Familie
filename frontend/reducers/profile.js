const initialState = {
  profiles: undefined
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case "set_profiles":
      return { ...state, profiles: action.profile };

    default:
      return state;
  }
}
