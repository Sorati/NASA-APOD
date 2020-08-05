import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Route component={Main} path="/" />
      </div>
    </BrowserRouter>
  );
}
