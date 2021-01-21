import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { API_URL } from "../secrets/secrets";
import axios from "axios";
import { store } from "../store/store";

const useStyles = makeStyles({
  formControl: {
    margin: 5,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 5,
  },
  Button: { margin: 30 },
});

export default function OptionsPanel() {
  const [preferences, setPreferences] = useState({ rank: 1, tickets: 1 });
  const [openR, setOpenR] = useState(false);
  const [openT, setOpenT] = useState(false);

  const { dispatch } = useContext(store);

  const classes = useStyles();

  const orderTickets = (order) => {
    axios({
      method: "post",
      url: `${API_URL}/bookings`,
      data: order,
    })
      .then(function (response) {
        if (response.status === 200) {
          dispatch({
            type: "ALERT",
            payload: "Ticket reservation successful!",
          });

          dispatch({ type: "EVENT_FETCHED", payload: response.data });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Rank</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openR}
            onClose={() => {
              setOpenR(false);
            }}
            onOpen={() => {
              setOpenR(true);
            }}
            value={preferences.rank}
            onChange={(e) => {
              setPreferences({ ...preferences, rank: e.target.value });
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Tickets:
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openT}
            onClose={() => {
              setOpenT(false);
            }}
            onOpen={() => {
              setOpenT(true);
            }}
            value={preferences.tickets}
            onChange={(e) => {
              setPreferences({ ...preferences, tickets: e.target.value });
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        className={classes.Button}
        variant="contained"
        color="primary"
        onClick={() => orderTickets(preferences)}
      >
        Order tickets
      </Button>
    </div>
  );
}