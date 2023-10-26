import { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import config from "../../../config/config";
import { useNavigate } from "react-router-dom";
export default function Advertisementadd() {
  const navigate = useNavigate();
  const [page, setpage] = useState("")
  const [banner_position_id, setbanner_position_id] = useState("")
  const [duration, setduration] = useState("")
  const [discount_price, setdiscount_price] = useState("")
  const [amount, setamount] = useState("")
  const [BannerPageLocation, setBannerPageLocation] = useState([])
  const [BannerPositionList, setBannerPositionList] = useState([])
  const [banner_size, setbanner_size] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    const apI = config.API_URL + "advertisementpackage/viewAllBannerPosition"
    fetch(apI,options)
      .then((response) => response.json())
      .then((value) => {
        console.log("🚀 ~ file: add.js:34 ~ .then ~ value:", value)
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
    const apiUrl = config.API_URL + 'advertisementpackage/add';
    await axios.post(apiUrl, body, options)
      .then((res) => {
        navigate('/admin/advertisement/index', { replace: true });
        const { data, statusCode } = res.data;
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
      }).catch((err) => {
        navigate("/admin/advertisement/add", { replace: true })
        message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
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
    console.log('elloi');
    const api = config.API_URL + "advertisementpackage/" + url
    await axios.get(api,options)
      .then((res) => {    
        setBannerPositionList(res.data.data)
      }).catch((err) => {
        setBannerPositionList([])
      });
  }
  const handleBannerPositionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = BannerPositionList.find((value) => value.id === Number(selectedValue));
    setSelectedItem(selectedItem);
    setbanner_size(selectedItem?selectedItem.banner_size:"")
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
                            Create Package    </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Select Banner Page Location</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    onClick={(e) => {
                                      viewBannerPosition(e.target.value)
                                      console.log(e.target.value);
                                      setpage(e.target.value);
                                    }}
                                  >
                                    <option value=''>Select Page</option>
                                    {Array.from(new Set(BannerPageLocation&&BannerPageLocation.map((value) => value.page))) // Use Set to filter unique names
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
                                    onClick={handleBannerPositionChange}
                                    value={banner_position_id}
                                   onChange ={(e) => {
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
                                      alert('Please enter only  numeric characters!');
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
                                      alert('Please enter only numeric characters!');
                                    }
                                  
                                }}  />

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
