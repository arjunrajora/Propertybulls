import React from "react";
import { Helmet } from "react-helmet";
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const config = require("../../config/config");

let message = '';
// Admin login
export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = config.API_URL + 'auth/login';
    await axios.post(apiUrl, formik.values)
      .then((res) => {
        const { message, data, statusCode } = res.data;
        //console.log(res.data);
        if (statusCode === '200') {


        } else {

          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem('userData', JSON.stringify(data));
          navigate('/admin/dashboard', { replace: true });
        }
      }).catch((err) => {
        navigate('/admin', { replace: true });
        message = 'Invalid credentials !!';
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }
  });

  return (
    <div>
      {<Helmet>

        <link
          rel="apple-touch-icon"
          href={config.SITE_URL +"theme-assets/images/ico/apple-icon-120.png"}
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={config.SITE_URL + "theme-assets/images/ico/favicon.ico"}
        />


        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/vendors.css"}
        />

        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/app-lite.css"}
        />


        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/design.css"}
        />

      </Helmet>}
      {/* <Helmet>
        <link
          rel="apple-touch-icon"
          href="/theme-assets/images/ico/apple-icon-120.png"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/theme-assets/images/ico/favicon.ico"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Muli:300,300i,400,400i,600,600i,700,700i%7CComfortaa:300,400,700"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/vendors.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/vendors/css/charts/chartist.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/app-lite.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/lightgallery.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/owl.theconsole.log(req.body);me.default.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/core/menu/menu-types/vertical-menu.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/core/colors/palette-gradient.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/pages/dashboard-ecommerce.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/theme-assets/css/design.css"
        />
        <script
          src="/theme-assets/front/js/jquery-3.3.1.min.js"
          type="text/javascript"
        ></script>
      </Helmet> */}

      <div className="content modern-content container-fluid login">
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section className="basic-inputs h-100">
              <div className="row match-height h-100 justify-content-center align-items-center">
                <div className="col-xl-4 col-md-4">
                  <FormikProvider value={formik}>

                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <div className="admin_all_ribben">
                        <div className="card">
                          <div className="card-content">
                            <div className="card-body">
                              <a href="/">
                                <img
                                  style={{ width: "284px" }}
                                  className="brand-logo"
                                  alt="Admin logo"
                                  src={config.SITE_URL+"/theme-assets/images/logo/logo.png"}
                                />
                              </a>
                            </div>
                            <div className="card-body">
                              <div className="form-body">

                                <ToastContainer />
                                <p className="form_h">
                                  To keep connected with us please login with your
                                  personal info
                                </p>
                                <div className="form-group">
                                  <label htmlFor="donationinput3" className="sr-only">
                                    E-mail
                                  </label>
                                  <input
                                    type="email"
                                    id="donationinput3"
                                    className="form-control"
                                    required
                                    placeholder="E-mail"
                                    name="email"
                                    values={formik.values.email}
                                    onChange={formik.handleChange}
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>

                                <div className="form-group">
                                  <label htmlFor="donationinput4" className="sr-only">
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    required
                                    className="form-control"
                                    id="donationinput4"
                                    name="password"
                                    placeholder="Enter Password"
                                    values={formik.values.password}
                                    onChange={formik.handleChange}
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>
                              </div>
                              <ul className="d-flex justify-content-between align-items-center list-unstyled w-100">
                                <li className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="customCheck1"
                                  >
                                    Remember me
                                  </label>
                                </li>
                                <li>
                                  <a href="/">Forgot your password?</a>
                                </li>
                              </ul>

                              <div className="d-flex justify-content-between align-items-center list-unstyled w-100">

                                <div className="form-actions center">
                                  {/* <input type="submit" value="Submit" /> */}
                                  <button type="submit" className="btn btn-primary">
                                    Login !
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </FormikProvider>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* <Helmet>
        <script
          src="/theme-assets/vendors/js/vendors.min.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/vendors/js/charts/chartist.min.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/core/app-menu-lite.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/core/app-lite.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/app-menu.min.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/app.min.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/customizer.min.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/core/app-lite.js"
          type="text/javascript"
        ></script>
        <script
          src="/theme-assets/js/scripts/pages/dashboard-lite.js"
          type="text/javascript"
        ></script>
        <script src="/assets/js/lightgallery.js"></script>
        <script src="/assets/js/jquery.dataTables.js"></script>
        <script src="/assets/js/datatable-basic.init.js"></script>
        <script src="/assets/js/owl.carousel.min.js"></script>
        <script src="/assets/js/d3.min.js"></script>
      </Helmet> */}

    </div>
  );
}
