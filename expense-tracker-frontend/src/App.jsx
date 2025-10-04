import React from "react";
import Nav from "./components/Nav";
import ExpenseTracker from "./pages/ExpenseTracker";

export default function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <ExpenseTracker />
      </div>
    </div>
  );
}