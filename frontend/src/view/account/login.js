import React from "react";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
// import {Helmet} from "react-helmet";

export default function Login() {
  return (
    <div>
      <Header />
      <section id="loginSec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="loginImg">
                <img src="images/login-image.png" alt="Login" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="loginCnt">
                <hgroup>
                  <h4>Welcome Back</h4>
                  <p>Login Your Account</p>
                </hgroup>
                <form
                  className="row g-3 needs-validation"
                  id="contactFrm"
                  noValidate
                >
                  <div className="col-md-12">
                    <div className="form-floating">
                      <img src="images/formEmailIco.png" alt="User" />
                      <input
                        type="email"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Name"
                        required
                      />
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Email
                      </label>
                      <div className="invalid-feedback">
                        Please Fill Your Email
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <img src="images/formPasswordIco.png" alt="Password" />
                      <input
                        type="password"
                        className="form-control"
                        id="validationCustom03"
                        placeholder="Email"
                        required
                      />
                      <label
                        htmlFor="validationCustom03"
                        className="form-label"
                      >
                        Password
                      </label>
                      <div className="invalid-feedback">
                        Please Provide a Valid Password
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="d-flex justify-content-between">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          Remember Me
                        </label>
                      </div>

                      <a href="/">Forgot Password ?</a>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-block  text-center">
                      <input
                        className="siteBtn border-0 d-block w-100"
                        onSubmit="return false;"
                        type="submit"
                        value="Submit form"
                      />
                    </div>

                    <p className="text-center mt-2">
                      Don't Have any Accout ? <a href="signup.html">Sign Up</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
