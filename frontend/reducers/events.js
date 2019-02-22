const initialState = {
  events: []
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case "setEvents":
      return { ...state, events: action.event };

    default:
      return state;
  }
}
