import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';

// var options = [];

export default function BuilderEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [Location, setLocation] = useState([]);

  const [name, setName] = useState(lineData.name);
  const [altemail, setAltemail] = useState(lineData.altemail);
  const [lname, setLname] = useState(lineData.lname);
  const [username, setUsername] = useState(lineData.username);
  console.log(lineData.password);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [occu, setOccu] = useState(lineData.occu);
  const [loc_ids, setLoc_ids] = useState(lineData.loc_ids ? lineData.loc_ids.split(",") : []);
  const [image, setImage] = useState(lineData.image);
  const [description, setDescription] = useState(lineData.description);
  console.log(image);
  const apiUrl = config.API_URL + "location/viewAll";
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };

  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
        console.log("obj=>>", Location);
      });
  }, [fetch]);

  const EditBuilder = async (event) => {
    event.preventDefault();
    setName(lineData.name);
    const selectedLocationsString = loc_ids.join(',');
    const body = {
      name: name,
      lname: lname,
      username: username,
      mobile: mobile,
      occu: occu,
      description: description,
      loc_ids: selectedLocationsString,
      altemail: altemail,
      image: image,
    };
    const apiUrl = config.API_URL + "builder/" + id;
    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/builder", { replace: true });
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
            <ToastContainer />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        action="/add"
                        method="post"
                        className="form-horizontal needs-validation" encType="multipart/form-data"
                        onSubmit={EditBuilder}
                      >
                        <div className="form-body">
                          <h2 className="form-section">BUILDER CREATE FORM</h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Name">First Name</label>
                                <input
                                  className="form-control"
                                  type="text"
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
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Name">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
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
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="Email"
                                  className="form-control"
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
                                <label htmlFor="Email">Email(Alternative)</label>
                                <input
                                  type="email"
                                  className="form-control"

                                  value={altemail}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAltemail(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>


                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Mobile</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  minLength="10"
                                  maxLength="10"
                                  required
                                  value={mobile}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setMobile(input);
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }

                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="occupation">Occupation</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  value={occu}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setOccu(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>


                              <div className="col-sm-6 col-md-4 col-5">
                                                        <div className="input select">
                                                        <label htmlFor="loc_ids">Working Localities</label>
                                                            <select required
                                                                name="data[User][location][]"
                                                                className="form-control"   
                                                                   multiple={true}
                                                                id="UserLocation"
                                                                value={loc_ids}
                                                                onChange={(e) => {
                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                    setLoc_ids(selectedValues);
                                                                }}
                                                            >
                                                                {Location.map((value, index) => {
                                                                   
                                                                    return (
                                                                        <option key={value.id} value={value.id}>
                                                                            {value.name}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>

                                                    </div>
                            </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="image">Company Logo</label>
                                <input

                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setImage(e.target.files[0])
                                    console.log(e.target.value);
                                  }}

                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>


                              <div className="col-sm-6 col-md-4 col-5">
                                <img
                                  alt="Image"
                                  src={config.Image_URL + lineData.image}
                                  height="100px"
                                  width="100px"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-12 col-5">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  className="form-control"
                                  id="floatingTextarea"
                                  required
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
                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"

                              className="btn btn-primary pull-right d-flex align-items-center sub-btn"
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
