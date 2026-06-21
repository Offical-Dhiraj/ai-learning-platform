// import {ToastContainer}from "react-toastify"
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./app/App";
// import "./index.css";
// import { Toaster } from "react-hot-toast";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <>
//   <App />

//   <ToastContainer position="top-right"/>

//   <Toaster
//   position="top-center"
//   toastOptions={{
//     style: {
//       background: "#0f172a",
//       color: "#fff",
//       border: "1px solid #22c55e",
//     },
//   }}
// />
//   </>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import App from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />

    <ToastContainer position="top-right" />

    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #22c55e",
        },
      }}
    />
  </BrowserRouter>,
);
