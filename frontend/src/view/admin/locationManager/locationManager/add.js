import { useEffect, useState } from "react";
import config from "../../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
// var options = [];

const StateUrl = config.API_URL + "city/viewState";
const CityUrl = config.API_URL + "location/viewCity";

export default function LocationAdd() {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [state_id, setState_id] = useState("99");
  const [city_id, setCity_id] = useState("27");
  const [name, setName] = useState("");

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };


  const AddLocation = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      city_id: city_id,
      state_id: state_id,
    };
    const apiUrl = config.API_URL + "location/add";
    await axios
      .post(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/location", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    fetch(StateUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setState(value.data);
      });

    fetch(CityUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setCity(value.data);
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
                        onSubmit={AddLocation}
                      >
                        <div className="form-body">
                          <h2 className="form-section">ADD LOCATION</h2>
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
                                      //console.log(e.target.value);
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
                                <label>City Name</label>
                                <div className="input select">
                                  <select
                                    name="city_id"
                                    className="form-control"
                                    value={city_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setCity_id(e.target.value);
                                    }}
                                  >
                                    {city.map((value) => {
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
                                <label htmlFor="location">Location Name</label>
                                <input
                                  type="text"
                                  id="location"
                                  className="form-control"
                                  name="location"
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
                              //  onClick={"spinner()"}
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
