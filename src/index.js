import { auth } from "fBase";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// 로그인 유저 판별
console.log(auth.currentUser);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <App />
  </>
  // </React.StrictMode>
);
