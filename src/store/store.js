import React, { createContext, useReducer } from "react";

const initialState = {
  isLoading: true,
  alert: {
    open: false,
    message: "",
  },
  event: {},
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "EVENT_FETCHED": {
        // console.log(action.payload);
        const newState = { ...state, isLoading: false, event: action.payload };
        return newState;
      }
      case "LOADING": {
        const newState = {};
        return newState;
      }

      case "ALERT": {
        const newState = {
          ...state,
          alert: { open: true, message: action.payload },
        };
        return newState;
      }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
