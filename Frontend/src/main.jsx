import {ToastContainer}from "react-toastify"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <App />
  <ToastContainer position="top-right"/>
  </>
);