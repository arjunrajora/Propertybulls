import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, Alert } from "@mui/material";

const apiUrl = config.API_URL + "auth/";

export default function Profile() {
  const navigate = useNavigate();
  const [allData, setallData] = useState([]);
  const [staticAdded, setStaticAdded] = useState("");
  const StaticMessage = localStorage.getItem("staticAdded");
  const [openAlert, setOpenAlert] = useState(false);
  // var options = {
  //   headers: {
  //     'Authorization': localStorage.getItem('accessToken')

  //   }
  // }
  useEffect(() => {
    if (StaticMessage != null && StaticMessage !== "") {
      setOpenAlert(true);
      setStaticAdded(StaticMessage);
      setTimeout(() => {
        localStorage.setItem("staticAdded", "");
        setOpenAlert(false);
      }, 3000);
    } else {
      setOpenAlert(false);
      setStaticAdded("");
    }
  }, [StaticMessage]);
  useEffect(() => {
    const Id = JSON.parse(localStorage.getItem("userId"));
    // console.log(Id, "ad");
    fetch(apiUrl + Id)
      .then((response) => response.json())
      .then((value) => {
        setallData(value.data);
      });
  }, [fetch]);
  console.log(allData);


  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">
                <div className="card">
                {staticAdded != null && openAlert === true && (
                  <Collapse in={openAlert}>
                    <Alert aria-hidden={true} severity="success">
                      {staticAdded}
                    </Alert>
                  </Collapse>
                )}
                  <div className="card-header p-0">
                    <h4 className="card-title">CURRENT USERS PROFILE </h4>
                    <br />
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <a
                       onClick={(e) => {
                              navigate("/admin/users/changepasswords", {
                                state: {
                                  lineData: allData,
                                  id: allData.id,
                                },
                              });
                            }}
                            type="button"
                            className="btn btn-outline-primary btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i>{" "}
                            <span>Change Password</span>
                          </a>
                        </li>
                        <li>
                          <a
                            type="button"
                            className="btn btn-outline-primary btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                            onClick={(e) => {
                              navigate("/admin/users/Edit", {
                                state: {
                                  lineData: allData,
                                  id: allData.id,
                                },
                              });
                            }}
                          >
                            <i className="la la-plus"></i> <span>Edit </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <div>
                        <label className="th_width-4">
                          <h5>UserName:-</h5>
                        </label>
                        {allData.username}
                        <br />
                        <label className="th_width-4">
                          <h5>Name:-</h5>
                        </label>
                        {allData.name}
                        <br />
                        <label className="th_width-4">
                          <h5>Created:-</h5>
                        </label>
                        {allData.created}16-02-2023
                        <br />
                        <label className="th_width-4">
                          <h5>Mobile:-</h5>
                        </label>
                        {allData.mobile}
                        <br />
                        <label className="th_width-4">
                          <h5>Address :-</h5>
                        </label>
                        {allData.address}
                        <br />
                        <label className="th_width-4">
                          <h5>Role:-</h5>
                        </label>
                        Admin
                        <br />
                        <label className="th_width-4">
                          <h5>Facebook url: -</h5>
                        </label>
                        https://www.facebook.com/Property-Bull-1949692818599462/?ref=aymt_homepage_panel
                        <br />
                        <label className="th_width-4">
                          <h5>Twitter url: -</h5>
                        </label>
                        https://twitter.com/Contact_propert
                        <br />
                        <label className="th_width-4">
                          <h5>Youtube url: -</h5>
                        </label>
                        https://www.youtube.com/channel/UCsUFNZH_NX1PKWaAxk9lHvg
                        <br />
                        <label className="th_width-4">
                          <h5>Image: -</h5>
                        </label>
                        <img
                                          alt="Image"
                                          src={config.Image_URL + allData.Image}
                                          height="100px"
                                          width="100px"
                                        />
                      </div>
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

// export default React.memo(Profile)
