import React from "react";
import { Link } from "react-router-dom";
import FrontHeader from "../../element/frontHeader";
import FrontFooter from "../../element/frontFooter";

export default function category() {
  return (
    <div>
      <FrontHeader />

      <div id="error_page">

        {/* <a href="/">Back To Home</a> */}
        <Link to="/">Back To Home</Link>
      </div>

      <FrontFooter />
    </div>
  );
}
