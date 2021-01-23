import React from "react";
import styled from "@emotion/styled";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Logo from "../assets/guts-logo.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none !important",
    flexGrow: 1,
  },
  appBar: {
    background:
      "linear-gradient(-55deg, #f5429e, #ff5252 50%, #ff5852 70%, #ff6b52 90%)",
    fontSize: "4em",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "0.7em",
    textDecoration: "none",
    color: "inherit",
  },
}));

const StyledTypography = styled(Typography)`
  text-decoration: "none" !important;
`;

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to={"/"}
          >
            <img alt="guts logo" src={Logo} width="40" />
          </IconButton>
          <StyledTypography
            variant="h6"
            className={classes.title}
            component={Link}
            to={"/"}
          >
            GUTS-FLIX
          </StyledTypography>
          <Button color="inherit" component={Link} to={"/admin-dashboard"}>
            Admin Dasboard
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
