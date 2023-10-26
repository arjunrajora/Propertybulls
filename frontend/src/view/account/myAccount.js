import React from "react";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
// import {Helmet} from "react-helmet";

export default function Login() {
  return (
    <div>
      <Header />

      <section id="frontProfile">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="frontProfileLeft sticky-top">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="true"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                      </svg>
                      Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-order-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-order"
                      type="button"
                      role="tab"
                      aria-controls="pills-order"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
                      </svg>
                      Orders
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-myaddress-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-myaddress"
                      type="button"
                      role="tab"
                      aria-controls="pills-myaddress"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 12 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
                        ></path>
                      </svg>
                      My Address
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-changepass-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-changepass"
                      type="button"
                      role="tab"
                      aria-controls="pills-changepass"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Change Password
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-carddetail-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-carddetail"
                      type="button"
                      role="tab"
                      aria-controls="pills-carddetail"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"></path>
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"></path>
                      </svg>
                      Card Detail
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-settings-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-settings"
                      type="button"
                      role="tab"
                      aria-controls="pills-settings"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"></path>
                      </svg>
                      Settings
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      type="button"
                      aria-selected="false"
                      tabIndex="-1"
                      role="tab"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"></path>
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* col-md-3  */}

            <div className="col-md-9">
              <div className="myAccountRight">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    tabIndex="0"
                  >
                    <h2>Hello, Deepak !</h2>
                    <div className="checkoutFrm">
                      <form className="editProFrm">
                        <div className="row">
                          <div className="col-md-6">
                            <label
                              htmlFor="validationCustom01"
                              className="form-label"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              value="Deepak"
                              required=""
                            />
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="validationCustom02"
                              className="form-label"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom02"
                              value="Athwani"
                              required=""
                            />
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="exampleDataList1"
                              className="form-label"
                            >
                              Country
                            </label>
                            <input
                              className="form-control"
                              list="datalistOptions"
                              id="exampleDataList1"
                              value="India"
                              placeholder="Type to search..."
                              required=""
                            />
                            <datalist id="datalistOptions">
                              <option value="India" />
                              <option value="Russia" />
                              <option value="USA" />
                              <option value="Bangladesh" />
                              <option value="Shreelanka" />
                            </datalist>
                            <div className="invalid-feedback">
                              Please Provide Country Name
                            </div>
                          </div>
                          <div className="col-md-12">
                            <label
                              htmlFor="validationCustom03"
                              className="form-label"
                            >
                              Street Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom03"
                              value="Mansarover"
                              required=""
                            />
                          </div>

                          <div className="col-md-12">
                            <label
                              htmlFor="exampleDataList2"
                              className="form-label"
                            >
                              State
                            </label>
                            <input
                              className="form-control"
                              list="datalistOptions2"
                              id="exampleDataList2"
                              value="Rajasthan"
                              placeholder="Type to search..."
                              required=""
                            />
                            <datalist id="datalistOptions2">
                              <option value="Rajasthan" />
                              <option value="Utter Pradesh" />
                              <option value="Delhi" />
                              <option value="Gujrat" />
                              <option value="Maharastra" />
                            </datalist>
                          </div>

                          <div className="col-md-12">
                            <label
                              htmlFor="exampleDataList3"
                              className="form-label"
                            >
                              City
                            </label>
                            <input
                              className="form-control"
                              list="datalistOptions3"
                              id="exampleDataList3"
                              value="Jaipur"
                              placeholder="Type to search..."
                              required=""
                            />
                            <datalist id="datalistOptions3">
                              <option value="Jaipur" />
                              <option value="Ajmer" />
                              <option value="Bilwada" />
                              <option value="Kota" />
                              <option value="Udaipur" />
                            </datalist>
                          </div>

                          <div className="col-md-12">
                            <label
                              htmlFor="validationCustom05"
                              className="form-label"
                            >
                              Zipcode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              value="000000"
                              required=""
                            />
                          </div>

                          <div className="col-md-12">
                            <label
                              htmlFor="validationCustom05"
                              className="form-label"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              value="8003244587"
                              required=""
                            />
                          </div>

                          <div className="col-md-12">
                            <label
                              htmlFor="validationCustom05"
                              className="form-label"
                            >
                              Email Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              value="deepak@doomshell.com"
                              required=""
                            />
                          </div>

                          <div className="col-md-12">
                            <div className="text-center">
                              <input
                                type="submit"
                                value="Save Changes"
                                className="siteBtn border-0"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-order"
                    role="tabpanel"
                    aria-labelledby="pills-order-tab"
                    tabIndex="0"
                  >
                    <h2>Your Orders</h2>
                    <table className="table W-100">
                      <thead>
                        <tr>
                          <th scope="col" width="15%">
                            Order
                          </th>
                          <th scope="col" width="20%">
                            Date
                          </th>
                          <th scope="col" width="20%">
                            Status
                          </th>
                          <th scope="col" width="30%">
                            Total
                          </th>
                          <th scope="col" width="15%">
                            actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">#1357 </th>
                          <td>March 45, 2020 </td>
                          <td>Processing</td>
                          <td>$125.00 for 2 item</td>
                          <td>
                            <a href="/">view</a>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#1357 </th>
                          <td>March 45, 2020 </td>
                          <td>Processing</td>
                          <td>$125.00 for 2 item</td>
                          <td>
                            <a href="/">view</a>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#1357 </th>
                          <td>March 45, 2020 </td>
                          <td>Processing</td>
                          <td>$125.00 for 2 item</td>
                          <td>
                            <a href="/">view</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-myaddress"
                    role="tabpanel"
                    aria-labelledby="pills-myaddress-tab"
                    tabIndex="0"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="billingAdrs">
                          <h2>Billing address</h2>
                          <pre>
                            3522 Interstate 75 Business Spur, Sault Ste. Marie,
                            MI 49783 New York
                          </pre>
                          <a href="">Edit</a>
                        </div>
                      </div>
                      {/* col-md-6  */}

                      <div className="col-md-6">
                        <div className="billingAdrs">
                          <h2>Shipping address</h2>
                          <pre>
                            3522 Interstate 75 Business Spur, Sault Ste. Marie,
                            MI 49783 New York
                          </pre>
                          <a href="">Edit</a>
                        </div>
                      </div>
                      {/* col-md-6  */}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-changepass"
                    role="tabpanel"
                    aria-labelledby="pills-changepass-tab"
                    tabIndex="0"
                  >
                    ...
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-carddetail"
                    role="tabpanel"
                    aria-labelledby="pills-carddetail-tab"
                    tabIndex="0"
                  >
                    ...
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-settings"
                    role="tabpanel"
                    aria-labelledby="pills-settings-tab"
                    tabIndex="0"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
            {/* col-md-9  */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
