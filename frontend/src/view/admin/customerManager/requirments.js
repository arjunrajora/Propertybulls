import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";

import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import config from "../../../config/config";


export default function Requirments() {


  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);

  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }

  useEffect(() => {
    const apiUrl = config.API_URL + "customer/requirement/" + id;
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setDetail(value.data.Requirements
        );
      });
  }, [fetch]);
  console.log("hello", detail)

  var RequirmentType, LocationName, UserName, UserMobile;

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

                    <h4 className="card-title">ALL DETAILS </h4>


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
                            <th scope="col">Type</th>
                            <th scope="col">Location</th>
                            <th scope="col">Owner Detail</th>
                            <th scope="col">	Features</th>
                            <th scope="col">Budget</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.map((value, index) => {
                            if (value.propertyType != null) {
                              RequirmentType = value.propertyType.name;
                            } else {
                              RequirmentType = "---"
                            } if (value.Location != null) {
                              LocationName = value.Location.name;
                            } else {
                              LocationName = "---"
                            } if (value.User != null) {
                              UserName = value.User.username;
                            } else {
                              UserName = "---"
                            } if (value.User != null) {
                              UserMobile = value.User.mobile;
                            } else {
                              UserMobile = "---"
                            }

                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>ID:{value.id}<br />
                                  {RequirmentType}<br />
                                  <Moment format="DD-MM-YYYY">
                                    {value.createdAt}
                                  </Moment>
                                </td>
                                <td>{LocationName}<br />Jaipur<br />Rajasthan</td>
                                <td>{UserName}<br />{UserMobile}</td>
                                <td>Option:{value.category}</td>
                                <td>

                                  Min-budget {value.min_budget.toLocaleString("en-IN")}
                                  <br />
                                  Max-budget {value.max_budget.toLocaleString("en-IN")}

                                  {/* Min price: {value.min_budget
                                    ? value.min_budget >= 10000000
                                      ? (value.min_budget / 10000000).toFixed(1) + ' crore'
                                      : value.min_budget >= 100000
                                        ? (value.min_budget / 100000).toFixed(0) + ' lac'
                                        : value.min_budget.toLocaleString('en-IN')
                                    : 'Price Not Disclosed'}
                                  <br />
                                  Max price: {value.max_budget
                                    ? value.max_budget >= 10000000
                                      ? (value.max_budget / 10000000).toFixed(1) + ' crore'
                                      : value.max_budget >= 100000
                                        ? (value.max_budget / 100000).toFixed(0) + ' lac'
                                        : value.max_budget.toLocaleString('en-IN')
                                    : 'Price Not Disclosed'} */}

                                </td>


                              </tr>)
                          })}
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
