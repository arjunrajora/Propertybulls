import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../../../../config/config";

export default function StateAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [name, setName] = useState(lineData.name);

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const UpdateState = async (event) => {
    event.preventDefault();

    const body = {
      name: name,
    }
    const apiUrl = config.API_URL + 'State/' + id;

    await axios.put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/state', { replace: true });
        console.log("=>>", res);
      }).catch((err) => console.log(err));
  }
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
                        onSubmit={UpdateState}

                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            EDIT STATE
                          </h2>

                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Name</label>
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
