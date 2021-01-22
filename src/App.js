import { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { store } from "./store/store";
import { Snackbar } from "@material-ui/core";
import "./App.css";
import MuiAlert from "@material-ui/lab/Alert";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import NavBar from "./components/NavBar";

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
      <NavBar />
      <Snackbar
        style={{ opacity: "0.9", marginTop: "3em" }}
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{alert.message}</Alert>
      </Snackbar>

      <Switch>
        <Route path="/admin-dashboard">
          <AdminDashboard />
        </Route>
        <Route path="/">
          <Booking />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
