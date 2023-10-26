import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

const Roles = config.API_URL + "subscription/roles/View"
export default function PackageAdd() {

  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [package_name, setPackage_name] = useState("");
  const [package_price, setPackage_price] = useState("");
  const [package_validity, setPackage_validity] = useState("");
  const [package_discount, setPackage_discount] = useState("");
  const [role_id, setRole_id] = useState("");
  const [f1, setF1] = useState("0");
  const [f2, setF2] = useState("0");
  const [f3, setF3] = useState("0");
  const [f4, setF4] = useState("0");
  const [f5, setF5] = useState("0");
  const [f6, setF6] = useState("0");
  const [f7, setF7] = useState("0");
  const [f8, setF8] = useState("0");
  const [f9, setF9] = useState("0");
  const [f10, setF10] = useState("0");

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };


  useEffect(() => {
    fetch(Roles, options)
      .then((res) => res.json())
      .then((value) => {
        console.log("value.data", value.data)
        setRole(value.data)
      })
  }, [fetch])


  const AddPackage = async (event) => {
    event.preventDefault();
    const body = {
      role_id: role_id,
      package_name: package_name,
      package_price: package_price,
      package_discount: package_discount,
      package_validity: package_validity,
      f1: f1,
      f2: f2,
      f3: f3,
      f4: f4,
      f5: f5,
      f6: f6,
      f7: f7,
      f8: f8,
      f9: f9,
      f10: f10,
    };
    console.log(body);
    const url = config.API_URL + "subscription/add";
    await axios
      .post(url, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/package", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
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
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        className="form-horizontal needs-validation"
                        onSubmit={AddPackage}
                      >
                        <div className="form-body">
                          <h2 className="form-section">ADD PACKAGE</h2>
                          <div className="form-group">

                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Package For</label>
                                <select
                                  name="role_id"
                                  className="form-control"
                                  value={role_id}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setRole_id(e.target.value);
                                  }} required
                                >
                                  <option value="">--Select Creator--</option>
                                  {role.map((value) => {
                                    return (
                                      <option key={value.id} value={value.id}>
                                        {value.title}
                                      </option>
                                    );
                                  })}
                                </select>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Package Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="name"
                                  placeholder="Package Name"
                                  required
                                  value={package_name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPackage_name(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="package_price">Package price</label>
                                <input
                                  type="number"
                                  id="package_price"
                                  className="form-control"
                                  name="package_price"
                                  placeholder="Price"
                                  maxLength="6"
                                  required
                                  value={package_price}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPackage_price(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="package_validity">Package validity</label>
                                <input
                                  type="number"
                                  id="package_validity"
                                  className="form-control"
                                  name="package_validity"
                                  placeholder="Days"
                                  required
                                  maxLength="3"
                                  value={package_validity}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPackage_validity(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="package_discount">Package discount</label>
                                <input
                                  type="number"
                                  id="package_discount"
                                  className="form-control"
                                  name="package_discount"
                                  placeholder="Discount"
                                  required
                                  maxLength={2}
                                  value={package_discount}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPackage_discount(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              {/* Customer */}
                              {role_id == 2 && ( // Conditionally render based on role_id
                                <>
                                  <div className="col-sm-6 col-md-4 col-5">

                                    <label htmlFor="f1">No of property post</label>
                                    <input
                                      type="number"
                                      id="f1"
                                      className="form-control"
                                      name="f1"
                                      placeholder="No of property post"
                                      required
                                      value={f1}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF1(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                  </div>


                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f2">No of propety featured</label>
                                    <input
                                      type="number"
                                      id="f2"
                                      className="form-control"
                                      name="f2"
                                      placeholder="No of propety featured"
                                      required
                                      value={f2}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF2(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f3">No of contact enquiry</label>
                                    <input
                                      type="number"
                                      id="f3"
                                      className="form-control"
                                      name="f3"
                                      placeholder="No of contact enquiry"
                                      required
                                      value={f3}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF3(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                </>
                              )}
                              {/* Agent */}

                              {role_id == 3 && ( // Conditionally render based on role_id
                                <>
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f1">No of propety post</label>
                                    <input
                                      type="number"
                                      id="f1"
                                      className="form-control"
                                      name="f1"
                                      placeholder="No of propety post"
                                      required
                                      value={f1}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF1(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f2">No of propety featured</label>
                                    <input
                                      type="number"
                                      id="f2"
                                      className="form-control"
                                      name="f2"
                                      placeholder="No of propety featured"
                                      required
                                      value={f2}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF2(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f3">No of contact enquiry</label>
                                    <input
                                      type="number"
                                      id="f3"
                                      className="form-control"
                                      name="f3"
                                      placeholder="No of contact enquiry"
                                      required
                                      value={f3}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF3(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                </>
                              )}
                              {/* Builder */}

                              {role_id == 4 && ( // Conditionally render based on role_id
                                <>
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f1">No of propety post</label>
                                    <input
                                      type="number"
                                      id="f1"
                                      className="form-control"
                                      name="f1"
                                      placeholder="No of propety post"
                                      required
                                      value={f1}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF1(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f2">No of propety featured</label>
                                    <input
                                      type="number"
                                      id="f2"
                                      className="form-control"
                                      name="f2"
                                      placeholder="No of propety featured"
                                      required
                                      value={f2}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF2(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f3">No of project post</label>
                                    <input
                                      type="number"
                                      id="f3"
                                      className="form-control"
                                      name="f3"
                                      placeholder="No of project post"
                                      required
                                      value={f3}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF3(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>



                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="f4">No of project featured</label>
                                    <input
                                      type="number"
                                      id="f4"
                                      className="form-control"
                                      name="f4"
                                      placeholder="No of project featured"
                                      required
                                      value={f4}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setF4(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                </>
                              )}
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
