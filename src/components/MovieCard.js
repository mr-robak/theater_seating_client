import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    marginTop: "2em",
    marginLeft: "1em",
    width: 300,
    minWidth: 250,
    // minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    /* border-radius: 5px; */
    boxShadow: "2px 1px 11px 0px rgba(0, 0, 0, 0.35)",
  },
  media: { height: 400 },
  content: {
    // padding: "1em",
  },
  // year: { marginBottom: "0.8em" },
  button: {
    background: "#ff6b52",
    bottom: "1em",
    left: "5em",
    color: "#ffffff",
    fontWeight: "bolder",
  },
});

const MovieCard = (props) => {
  const classes = useStyles();

  const { id, image, title, year, description } = props.data;

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => {}} href={`/booking/${id}`} target="_self">
        <CardMedia
          className={classes.media}
          image={`/assets/${image}`}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {year}
          </Typography>
          <Typography
            className={classes.year}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          className={classes.button}
          variant="contained"
          component="a"
          href={`/booking/${id}`}
          target="_self"
          size="big"
          color="secondary"
        >
          Get tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
