import React from "react";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <div className="brand">ExpenseTracker</div>
        <div className="nav-right">
          <a href="#add" onClick={(e)=>{e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" });}}>Add</a>
          <a href="#list" onClick={(e)=>{e.preventDefault(); document.getElementById("list")?.scrollIntoView({behavior:"smooth"})}}>List</a>
          <a href="#summary" onClick={(e)=>{e.preventDefault(); document.getElementById("summary")?.scrollIntoView({behavior:"smooth"})}}>Summary</a>
        </div>
      </div>
    </nav>
  );
}