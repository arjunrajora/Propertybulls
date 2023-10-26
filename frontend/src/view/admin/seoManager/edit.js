import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";



export default function SeoEdit() {

  const navigate = useNavigate();
  const Location = useLocation();
  const { lineData } = Location.state;
  const { id } = Location.state;
  const [page, setPage] = useState(lineData.page);
  const [location, setLocation] = useState(lineData.location);
    const [title, setTitle] = useState(lineData.title);
  const [keyword, setKeyword] = useState(lineData.keyword);
  const [description, setDescription] = useState(lineData.description);

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const UpdateSeo = async (event) => {
    event.preventDefault();
    const body = {
      page:page,
      location:location,
      title:title,
      description:description,
      keyword:keyword,
    }
    const apiUrl= config.API_URL + 'seo/'+id ;
    await axios.put(apiUrl, body,options)
    .then((res) => {
      const msg = res.data.message;
      localStorage.setItem(
        "staticAdded",
        msg
      );
      navigate('/admin/seo', { replace: true });
      console.log("=>>",res);
    }).catch((err) => console.log(err));
    }



  return (
    <div>
    <AdminHeader />
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
                      onSubmit={UpdateSeo}
                        className="form-horizontal needs-validation"
                        novalidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">EDIT FORM</h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="Page Location">Page </label>
                                <textarea
                                  type="text"
                                  id="Page Location"
                                  className="form-control"
                                  FirstName="Page Location"
                                  required
                                  value={page}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPage(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="Page Location">Page Location</label>
                                <textarea
                                  type="text"
                                  id="Page Location"
                                  className="form-control"
                                  FirstName="Page Location"
                                  required
                                  value={location}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLocation(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="title">Title</label>
                                <textarea
                                  type="text"
                                  id="title"
                                  className="form-control"
                                  FirstName="title"
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
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="Page Keywords">Keywords</label>
                                <textarea
                                  type="text"
                                  id="Page Keywords"
                                  className="form-control"
                                  FirstName="Page Keywords"
                                  required
                                  value={keyword}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setKeyword(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="Page Description">Description</label>
                                <textarea
                                  type="text"
                                  id="Page Description"
                                  className="form-control"
                                  FirstName="Page Description"
                                  required
                                  value={description}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value);
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
                              onclick="spinner()"
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
    <AdminFooter />
  </div>
  );
}
