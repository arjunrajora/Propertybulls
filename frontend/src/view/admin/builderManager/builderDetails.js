import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { useNavigate,useLocation } from "react-router-dom";
import config from "../../../config/config";
export default function AllDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  console.log(lineData);
  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">
                <div>
                  <div className="card-header p-0">
                    <h4 className="card-title">CUSTOMER DETAILS </h4>
                    <br />

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
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                           


                           
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th scope="row">1.</th>
                            <td>{lineData.name}</td>
                            <td>{lineData.username}</td>
                            <td>{lineData.mobile}</td>
                         
                               </tr>
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
