import { useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';

export default function CustomerEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  console.log("linedata", lineData)
  const { id } = location.state;
  const [name, setName] = useState(lineData.name);
  // const [lname, setLname] = useState(lineData.lname);
  const [username, setUsername] = useState(lineData.username);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [description, setDescription] = useState(lineData.description);
  const [image, setImage] = useState("");

  // const [password, setPassword] = useState(lineData.password);

  const [state, setState] = useState({
    name: false,
    // lname: false,
    username: false,
    mobile: false,
    description: false,
    password: false,
    created: false,
    status: false,
  });

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };


  const UpdateCustomer = async (event) => {
    event.preventDefault();
    if (mobile.length < 10) {
      alert('Mobile number must be at least 10 digits');
      return;
    }
    const body = {
      // id: lineData.id,
      name: name,
      // lname: lname,
      username: username,
      mobile: mobile,
      description: description,
      image: image,
      // password: password,
    };
    const apiUrl = config.API_URL + "customer/" + id;

    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/users/customer", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => {
        let message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })

  };

  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <ToastContainer />

                <div className="card">
                  {/* <div className="card-header">
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li>
                          <a data-action="collapse">
                            <i className="ft-minus"></i>
                          </a>
                        </li>
                        <li>
                          <a data-action="reload">
                            <i className="ft-rotate-cw"></i>
                          </a>
                        </li>
                        <li>
                          <a data-action="expand">
                            <i className="ft-maximize"></i>
                          </a>
                        </li>
                        <li>
                          <a data-action="close">
                            <i className="ft-x"></i>
                          </a> 
                        </li>
                      </ul>
                    </div>
                  </div> */}
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        onSubmit={UpdateCustomer}
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i>
                            EDIT CUSTOMER
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">First Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="name"
                                  required
                                  value={name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setName(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              {/* <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                  type="text"
                                  id="lname"
                                  className="form-control currency"
                                  maxLength="12"
                                  name="lname"
                                  required
                                  value={lname}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLname(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div> */}

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">
                                  User Name/Email
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control currency"
                                  maxLength="30"
                                  name="email"
                                  required
                                  value={username}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setUsername(e.target.value);
                                  }}
                                />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>

                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="phone">Mobile</label>
                                <input
                                  type="text"
                                  id="phone"
                                  className="form-control currency"
                                  maxLength="10"
                                  name="mobile"
                                  required
                                  value={mobile}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMobile(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  className="form-control"
                                  id="floatingTextarea"
                                  value={description}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value);
                                  }}
                                ></textarea>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">

                                <label htmlFor="image">Upload Image</label>
                                <input
                                  type="file"
                                  id="image"
                                  className="form-control"
                                  name="image"

                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setImage(e.target.files[0])
                                  }}
                                /><br />
                                <img
                                  alt="Image"
                                  src={config.Image_URL + lineData.image}
                                  height="100px"
                                  width="100px"
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4 col-5">
                            {/* <Link to={"/admin/customer/changepassword/" + id}><h6 >click here to change your password</h6></Link> */}
                            <Link to={"/admin/customer/changepassword/" + id} style={{ textDecoration: 'underline' }}><h6>Click Here To Change Your Password</h6></Link>                          </div>
                          <div className="form-actions">
                            <button
                              type="submit"

                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table head options end  */}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
