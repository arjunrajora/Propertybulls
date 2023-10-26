import React from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function RequirementAlertsResponse() {
  return (

    <div>
      <AdminHeader />


      <div className="app-content content">
        <div className="content-wrapper">
          <div className="heading-elements">
          </div>
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">

                <div>
                  <div className="card-header p-0">

                    <h2 className="">REQUIREMENT ALERTS RESPONSE LIST </h2>


                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li></li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">Property Owner</th>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Location</th>
                            <th scope="col">Property Price</th>
                            <th scope="col">Response Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <td>Kamal Rajora</td>
                          <td>Type</td>
                          <td>Category</td>
                          <td>Location</td>
                          <td>10,00000</td>
                          <td>31-Dec-2022</td> */}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
