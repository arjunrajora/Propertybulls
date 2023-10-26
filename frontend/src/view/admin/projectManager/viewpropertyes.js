import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import config from "../../../config/config";
import axios from "axios";




export default function ViewPropertyes() {

  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);

  const body = {
    project_id: id
  }
  useEffect(() => {
    const apI = config.API_URL + "clint/project/propertyadded/projectss";
    axios.post(apI, body)
      .then((value) => {
        console.log("value.data", value.data.data)
        setDetail(value.data.data);
      });
  }, [])
  console.log("detail", detail)


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

                    <h4 className="card-title">ALL PROPERTYES THIS PROJECTS </h4>


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
                            <th >S.No</th>
                            <th >Property Name</th>
                            {/* <th >Property Image</th> */}
                            <th >Price</th>
                            <th >Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.map((e, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{e.name}</td>
                                {/* <td>  <img src={config.Image_URL + e.featureimage} alt="img" style={{ width: "100" }} /></td> */}
                                <td>{e.tot_price}</td>
                                <td>{e.address} {e.address2}</td>

                              </tr>
                            )
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
