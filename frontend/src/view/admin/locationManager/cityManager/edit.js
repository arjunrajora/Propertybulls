import { useEffect, useState } from "react";
import config from "../../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";

const apiUrl = config.API_URL + "city/viewState";

export default function CityEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [state, setState] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  // const [lineData, setLineData] = useState("");

  const [name, setName] = useState(lineData.name);
  const [state_id, setState_id] = useState(lineData.state_id);


  // Data View
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };





  const EditCity = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      state_id: state_id,
    };
    console.log(body);
    const url = config.API_URL + "city/" + id;
    await axios
      .put(url, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);

        navigate("/admin/city", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  console.log("State", state);
  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setState(value.data);
      });
  }, [fetch]);
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
                        action="/add"
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">EDIT CITY</h2>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label>State Name</label>
                                <div className="input select">
                                  <select
                                    name="state_id"
                                    className="form-control"
                                    value={state_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setState_id(e.target.value);
                                    }}
                                  >
                                    {state.map((value) => {
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
                                <label htmlFor="name">City Name</label>
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
                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              onClick={EditCity}
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
