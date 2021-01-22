import React, { createContext, useReducer } from "react";
import _ from "lodash";

const initialState = {
  isLoading: true,
  alert: {
    open: false,
    message: "",
  },
  event: {},
  seat: [],
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
      case "SEAT_SELECT": {
        const seat = action.payload;
        // console.log("seat", seat);
        // console.log("state.seat", state.seat);
        const deDuplicated =
          state.seat.length > 0
            ? state.seat.filter((s) => {
                return !_.isEqual(s, seat);
              })
            : [];

        // console.log("lodash", _.isEqual(state.seat, deDuplicated));
        const newState = _.isEqual(state.seat, deDuplicated)
          ? { ...state, seat: [...state.seat, seat] }
          : { ...state, seat: [...deDuplicated] };

        // console.log("deDuplicated", deDuplicated.seat);
        // console.log("newState", newState.seat);
        return newState;
      }
      case "CLEAR_SEAT": {
        return { ...state, seat: [] };
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

// console.log(typeof s.section, typeof seat.section);
// console.log(s.section   !== seat.section );
// console.log(s.row, seat.row);
// console.log(s.row !== seat.row);
// console.log(s.seat, seat.seat);
// console.log(s.seat !== seat.seat);

// console.log(
//   "whole",
//   s.section * 1 !== seat.section &&
//     s.row * 1 !== seat.row &&
//     s.seat * 1 !== seat.seat
// );
// console.log(22222);
