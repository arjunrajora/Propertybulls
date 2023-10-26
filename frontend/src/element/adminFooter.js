import React from "react";
import { Helmet } from "react-helmet";
const config = require("../config/config");
export default function AdminFooter() {
  return (
    <React.Fragment>
      <footer className=" footer footer-static footer-light navbar-border navbar-shadow ">
        <div className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2 ">
          <span className="float-md-left d-block d-md-inline-block ">
            ©2023 Propertybull.com, All Rights Reserved
          </span>
        </div>
      </footer>
      <Helmet>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"> </script>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" ></script>
      </Helmet>
    </React.Fragment>
  );
};
