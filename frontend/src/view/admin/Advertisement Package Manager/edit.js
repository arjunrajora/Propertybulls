import { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import config from "../../../config/config";
import { useNavigate, useLocation } from "react-router-dom";
export default function AdvertisementEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  console.log("🚀 ~ file: edit.js:13 ~ AdvertisementEdit ~ lineData:", lineData)
  const { id } = location.state;
  const [page, setpage] = useState(lineData.page)
  const [banner_position_id, setbanner_position_id] = useState(lineData.banner_position_id);
  const [duration, setduration] = useState(lineData.duration)
  const [discount_price, setdiscount_price] = useState(lineData.discount_price)
  const [amount, setamount] = useState(lineData.amount)
  const [BannerPageLocation, setBannerPageLocation] = useState([])
  const [BannerPositionList, setBannerPositionList] = useState([])
  const [banner_size, setbanner_size] = useState(lineData.banner_size);
  const [isLoading, setIsLoading] = useState(true);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    viewBannerPosition(page);
    const apI = config.API_URL + "advertisementpackage/viewAllBannerPosition"
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setBannerPageLocation(value.data);

      });
  }, [fetch]);
  var message;
  const [selectedItem, setSelectedItem] = useState(null);

  const AgentAdd = async (event) => {
    event.preventDefault();
    const body = {
      page: page,
      banner_position_id: banner_position_id,
      duration: duration,
      discount_price: discount_price,
      amount: amount,
      banner_size: banner_size,
    }
    console.log("🚀 ~ file: edit.js:52 ~ AgentAdd ~ body:", body)
    const apiUrl = config.API_URL + 'advertisementpackage/' + id;
    await axios.put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/advertisement/index", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => {
        let message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })

  }
  var states;
  var EXTERIOR

  const viewBannerPosition = async (url) => {
    console.log("🚀 ~ file: add.js:89 ~ .then ~ res:")
    const api = config.API_URL + "advertisementpackage/" + url
    await axios.get(api, options)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        setBannerPositionList(res.data.data)
        return null
      }).catch((err) => {


      });
  }
  const handleBannerPositionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = BannerPositionList.find((value) => value.id === Number(selectedValue));
    setSelectedItem(selectedItem);
    setbanner_size(selectedItem ? selectedItem.banner_size : "")
  };
  return (
    <div>
      <AdminHeader />
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            <ToastContainer />

            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">

                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        onSubmit={AgentAdd}
                        className="form-horizontal needs-validation"

                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            Update Package    </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Select Banner Page Location</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={page}
                                    onChange={(e) => {
                                      viewBannerPosition(page)
                                      console.log(e.target.value);
                                      setpage(e.target.value);
                                    }}
                                  >
                                    <option value=''>Select Page</option>
                                    {Array.from(new Set(BannerPageLocation && BannerPageLocation.map((value) => value.page))) // Use Set to filter unique names
                                      .map((uniqueName) => (
                                        <option key={uniqueName} value={uniqueName}>
                                          {uniqueName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Banner Position</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={banner_position_id}
                                    onClick={handleBannerPositionChange}
                                    onChange={(e) => {
                                      setbanner_position_id(e.target.value)
                                      console.log(e.target.value);
                                    }}
                                  >
                                    <option value="">Select Banner Positions</option>
                                    {BannerPositionList.map((value) => (
                                      <option key={value.id} value={value.id}>
                                        {value.banner_location}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Display selected item properties if an item is selected */}

                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="LastName">Banner Size</label>
                                <input
                                  type="text"
                                  id="LastName"
                                  className="form-control"
                                  name="name"
                                  required
                                  value={banner_size}

                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">Duration</label>

                                <select
                                  name="duration" class="form-control"
                                  required="required" id="duration"
                                  value={duration}

                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setduration(e.target.value);
                                  }}
                                >
                                  <option value="">Select Duration</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Quarterly">Quarterly</option>
                                  <option value="Half Yearly">Half Yearly</option>
                                  <option value="Yearly">Yearly</option></select>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Price</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Package Price"
                                  required
                                  value={amount}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,5}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setamount(input);
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }

                                  }} />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <div
                                  className="emailalert"
                                  style={{ color: "red" }}
                                ></div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Discount Price</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Package Discount Price"
                                  required
                                  value={discount_price}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,3}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setdiscount_price(input);
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }

                                  }} />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <div
                                  className="emailalert"
                                  style={{ color: "red" }}
                                ></div>
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
