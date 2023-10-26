import React from "react";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
// import {Helmet} from "react-helmet";

export default function Signup() {
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
            {/* col-md-6 */}
            <div className="col-md-5">
              <div className="loginCnt">
                <hgroup>
                  <h4>Sign Up</h4>
                </hgroup>
                <form
                  className="row g-3 needs-validation"
                  id="contactFrm"
                  noValidate
                >
                  <div className="col-md-12">
                    <div className="form-floating">
                      <img src="images/formUserIco.png" alt="User" />
                      <input
                        type="name"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Name"
                        required
                      />
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Name
                      </label>
                      <div className="invalid-feedback">
                        Please Fill Your Name
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <img src="images/formEmailIco.png" alt="Email" />
                      <input
                        type="email"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Email"
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
                      <img src="images/formPhoneIco.png" alt="Phone" />
                      <input
                        type="email"
                        className="form-control"
                        id="validationCustom01"
                        placeholder="Mobile No."
                        required
                      />
                      <label
                        htmlFor="validationCustom01"
                        className="form-label"
                      >
                        Mobile No.
                      </label>
                      <div className="invalid-feedback">
                        Please Fill Your Mobile No.
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
                        placeholder="Password"
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
                    <div className="form-floating">
                      <img src="images/formPasswordIco.png" alt="Password" />
                      <input
                        type="password"
                        className="form-control"
                        id="validationCustom03"
                        placeholder="Confirm Password"
                        required
                      />
                      <label
                        htmlFor="validationCustom03"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <div className="invalid-feedback">
                        Please Provide a Valid Password
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-block  text-center">
                      <input
                        className="siteBtn border-0 d-block w-100"
                        onSubmit="return false;"
                        type="Sign Up"
                        value="Submit form"
                      />
                    </div>

                    <p className="text-center mt-2">
                      You Have Already an Account ?
                      <a href="login.html">Login</a>
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
