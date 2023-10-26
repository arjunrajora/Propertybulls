import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import config from "../../../config/config";




export default function ViewDetails() {

  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);

  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  useEffect(() => {
    const apI = config.API_URL + "customer/requirement/" + id;
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        console.log("kamal", value.data);
        setDetail(value.data);
      });
  }, [])
  let locationName, ResponseCount;



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
                      {/* <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>
                            <th scope="col">Alternative Email</th>
                            <th scope="col">	Description</th>

                          </tr>
                        </thead>
                        <tbody>
                          <td>{detail.name}</td>
                          <td>{detail.username}</td>
                          <td>{detail.mobile}</td>
                          <td>{detail.mobile}</td>
                          <td>{detail.altemail}</td>
                          <td>{detail.description}</td>


                        </tbody>
                      </table> */}

                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          {(detail.name || detail.username || detail.mobile || detail.mobile || detail.description || detail.altemail) && (
                            <tr>
                              {detail.name && <th >Name</th>}
                              {detail.username && <th >Email</th>}
                              {detail.mobile && <th >Mobile</th>}
                              {detail.address && <th >Address</th>}
                              {detail.altemail && <th >Alternative Email</th>}
                              {detail.description && <th >	Description</th>}

                            </tr>
                          )}
                        </thead>
                        <tbody>
                          {(detail.name || detail.username || detail.mobile || detail.mobile || detail.description || detail.altemail) && (
                            <tr>
                              {detail.name && <td>{detail.name}</td>}
                              {detail.username && <td>{detail.username}</td>}
                              {detail.mobile && <td>{detail.mobile}</td>}
                              {detail.address && <td>{detail.address}</td>}
                              {detail.altemail && <td>{detail.altemail}</td>}
                              {detail.description && <td>{detail.description}</td>}

                            </tr>
                          )}
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
