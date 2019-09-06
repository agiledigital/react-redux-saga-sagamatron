import React from "react";
import ReactDOM from "react-dom";

console.log("Hello from tsx!");

ReactDOM.render(
  <div>
    <p>Start typing!</p>
    <label>
      Repo name:
      <input />
    </label>
  </div>,
  document.getElementById("root")
);
