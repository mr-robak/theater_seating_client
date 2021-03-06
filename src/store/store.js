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
  movieData: [
    {
      id: 1,
      image: "blade.jpg",
      title: "Blade Runner",
      year: "1982",
      description:
        "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    },
    {
      id: 2,
      image: "starwars.jpg",
      title: "Star Wars",
      year: 1977,
      description:
        "Luke joins forces with a Jedi, a cocky pilot, a Wookiee and droids to save the galaxy from the Empire's world-destroying battle station.",
    },
    {
      id: 3,
      image: "alien.jpg",
      title: "Alien",
      year: 1979,
      description:
        "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form.",
    },
  ],
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "EVENT_FETCHED": {
        const newState = { ...state, isLoading: false, event: action.payload };

        return newState;
      }
      case "SEAT_SELECT": {
        const seat = action.payload;
        const deDuplicated =
          state.seat.length > 0
            ? state.seat.filter((s) => {
                return !_.isEqual(s, seat);
              })
            : [];

        const newState = _.isEqual(state.seat, deDuplicated)
          ? { ...state, seat: [...state.seat, seat] }
          : { ...state, seat: [...deDuplicated] };

        return newState;
      }
      case "CLEAR_SEAT": {
        return { ...state, seat: [] };
      }

      case "LOADING": {
        const loading = action.payload;
        const newState = { ...state, loading: loading };
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
