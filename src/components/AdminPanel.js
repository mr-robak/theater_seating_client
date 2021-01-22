import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../secrets/secrets";
import axios from "axios";
import { store } from "../store/store";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import styled from "@emotion/styled";

const Root = styled.div`
  margin: 1em 2em;
  height: 100%;
  padding: 1em 2em 1.5em;
  border-radius: 5px;
  box-shadow: 2px 1px 11px 0px rgba(0, 0, 0, 0.35);
`;

const useStyles = makeStyles({
  formControl: {
    marginTop: 38,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 5,
  },
  Button: { marginTop: 30 },
  boxTitle: { fontSize: "1.3em", width: "190px" },
  ticketList: { padding: "0.5em", listStyle: "none" },
  boxSelect: { maxWidth: "130px", fontSize: "1em", margin: "2em 1em" },
  chip: { margin: "2px", background: "#2da84e", color: "#fff" },
});

export default function OptionsPanel() {
  const [preferences, setPreferences] = useState({ rank: 1, tickets: 1 });
  const [openR, setOpenR] = useState(false);

  const { state, dispatch } = useContext(store);
  // console.log("state.seat", state.seat);

  // const demo = [
  //   { section: 1, row: 1, seat: 1 },
  //   { section: 1, row: 1, seat: 1 },
  // ];

  const [seats, setSeats] = useState(state.seat);
  // console.log(seats);

  const classes = useStyles();

  useEffect(() => {
    setSeats(state.seat);
  }, [state.seat, seats]);

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

  const renderTickets = (seats) => {
    return seats.map((seat, i) => {
      const { section, row } = seat;
      const label = `Section:${section} Row:${row} Seat:${seat.seat}`;
      return (
        <li key={i}>
          <Chip
            size="small"
            label={label}
            // onDelete={handleDelete(seat)}
            className={classes.chip}
          />
        </li>
      );
    });
  };

  // const handleDelete = (chipToDelete) => () => {
  //   dispatch({ type: "SEAT_SELECT", payload: chipToDelete });
  // };

  return (
    <Root>
      <Typography className={classes.boxTitle}>Block seats</Typography>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Select an event
          </InputLabel>
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
            <MenuItem value={1}>Event 1</MenuItem>
            <MenuItem value={2}>Event 2</MenuItem>
            <MenuItem value={3}>Event 3</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Typography className={classes.boxSelect}>
        Select seats you want to block on the theater plan:
      </Typography>
      <Paper component="ul" className={classes.ticketList}>
        {renderTickets(seats)}
      </Paper>
      <Button
        className={classes.Button}
        variant="contained"
        color="primary"
        onClick={() => orderTickets(preferences)}
      >
        Order tickets
      </Button>
    </Root>
  );
}
