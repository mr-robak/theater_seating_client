import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./store/store.js";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <StateProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
