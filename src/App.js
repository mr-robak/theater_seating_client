import { Snackbar } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import Booking from "./pages/Booking";
import { store } from "./store/store";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const { state } = useContext(store);
  const [alert, setAlert] = useState(state.alert);

  useEffect(() => {
    setAlert(state.alert);
  }, [state.alert]);

  return (
    <div className="App">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{alert.message}</Alert>
      </Snackbar>
      <Booking />
    </div>
  );
}

export default App;
