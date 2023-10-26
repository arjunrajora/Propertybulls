import { useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
const config = require("../../../config/config");

export default function SliderAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState(null);

      const AddSlider = async (event) => {
      event.preventDefault();
      const body = {
      name: name,
      title: title,
      }
      const apiUrl = config.API_URL + 'slider/add';
      await axios.post(apiUrl, body, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
      }).then((res) => {
      const msg = res.data.message;
      localStorage.setItem(
      "staticAdded",
      msg
      );
      navigate('/admin/slider', { replace: true });
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
                      <form method="post" onSubmit={AddSlider} className="form-horizontal needs-validation" enctype="multipart/form-data" novalidate>
                        <div className="form-body">
                          <h4 className="form-section">ADD SLIDER</h4>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Title</label>
                                <input
                                  type="text"
                                  id="title"
                                  className="form-control"
                                  name="title"
                                  required
                                  value={title}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setTitle(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="logo">Upload Image</label>

                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="name"
                                  required
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setName( e.target.files[0])
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
                              // onClick={"spinner()"}
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
