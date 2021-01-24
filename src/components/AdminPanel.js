import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../secrets/secrets";
import axios from "axios";
import { store } from "../store/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "@emotion/styled";

const Root = styled.div`
  margin: 1em 2em;
  padding: 1em 2em 1.5em;
  background: white;

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
  Button: { marginTop: 30, background: "#5e5d5d" },
  boxTitle: { fontSize: "1.3em", width: "190px" },
  ticketList: { padding: "0.5em", listStyle: "none" },
  boxSelect: {
    maxWidth: "170px",
    fontSize: "1em",
    margin: "3em 0em",
    padding: "0.3em",
    border: "2px dotted #BFBFBF",
  },
  chip: { margin: "2px", background: "#f77248", color: "#fff" },
  accordion: {
    width: "255px",
    position: "relative",
    left: "2em",
    borderRadius: "5px",
    boxShadow: "2px 1px 11px 0px rgba(0, 0, 0, 0.35)",
  },
  heading: { marginLeft: "3.2em" },
  clearButton: { marginLeft: "1em" },
});

export default function OptionsPanel(props) {
  const { state, dispatch } = useContext(store);
  const [eventId, setEventId] = useState(1);
  const [openR, setOpenR] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [seats, setSeats] = useState(state.seat);

  const classes = useStyles();

  const toggleOptions = () => {
    setExpanded(expanded ? false : true);
  };

  useEffect(() => {
    setSeats(state.seat);
  }, [state.seat, seats, expanded]);

  const blockTickets = (seats) => {
    axios({
      method: "post",
      url: `${API_URL}/admin/block/${eventId}`,
      data: seats,
    })
      .then(function (response) {
        if (response.status === 200) {
          dispatch({
            type: "ALERT",
            payload: "Seats blocked/unblocked successfully!",
          });
          dispatch({ type: "EVENT_FETCHED", payload: response.data });
          dispatch({ type: "CLEAR_SEAT" });
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const resetLayout = () => {
    const check = window.confirm(
      "Are you sure you want to clear all bookings?"
    );

    if (check) {
      toggleOptions();
      axios({
        method: "post",
        url: `${API_URL}/admin/clear/${eventId}`,
        data: { secret: "123456" },
      })
        .then(function (response) {
          if (response.status === 200) {
            dispatch({
              type: "ALERT",
              payload: "All bookings has been canceled",
            });
            dispatch({ type: "EVENT_FETCHED", payload: response.data });
            setExpanded(false);
            dispatch({ type: "CLEAR_SEAT" });
            props.selectEvent(eventId);
            // props.triggerReload();
            window.location.reload(false);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  };

  const renderTickets = (seats) => {
    return seats.map((seat, i) => {
      const { section, row } = seat;
      const label = `Section:${section} Row:${row} Seat:${seat.seat}`;
      return (
        <li key={i}>
          <Chip size="small" label={label} className={classes.chip} />
        </li>
      );
    });
  };

  return (
    <div>
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
              value={eventId}
              onChange={(e) => {
                setEventId(e.target.value);
                props.selectEvent(e.target.value);
                dispatch({ type: "CLEAR_SEAT" });
              }}
            >
              {state.movieData
                ? state.movieData.map((movie) => {
                    return <MenuItem value={movie.id}>{movie.title}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>
        </div>
        <Typography className={classes.boxSelect}>
          Select seats you want to block or unblock on the theater plan.
        </Typography>
        {seats && seats.length > 0 ? (
          <div>
            <Paper component="ul" className={classes.ticketList}>
              {renderTickets(seats)}
            </Paper>

            <Button
              className={classes.Button}
              variant="contained"
              color="secondary"
              onClick={() => blockTickets(seats)}
            >
              Update seats
            </Button>
          </div>
        ) : null}
      </Root>
      <Accordion
        className={classes.accordion}
        expanded={expanded}
        onChange={toggleOptions}
      >
        <AccordionSummary
          className={classes.heading}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            className={classes.clearButton}
            variant="contained"
            color="secondary"
            onClick={resetLayout}
          >
            Clear all bookings
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
