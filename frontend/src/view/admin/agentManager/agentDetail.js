import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
export default function Propertydetail() {
    const { id } = useParams();
    const [agentDetail, setagentDetail] = useState([]);
    const apI = config.API_URL + "agent/"+id;

    var options = {  
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }
    useEffect(() => {
      fetch(apI,options)
        .then((response) => response.json())
        .then((value) => {
          setagentDetail(value.data);
          console.log(value.data,"sass");
        });
   
    }, [fetch]);
  
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
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                       <td>{agentDetail.name}</td>
                       <td>{agentDetail.username}</td>
                       <td>{agentDetail.mobile}</td>
                       

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
    )
}
