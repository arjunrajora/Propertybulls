import { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import config from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { flatMap } from "lodash";
export default function Advertisementadd() {
  const navigate = useNavigate();
  const [page, setpage] = useState("")
  const [banner_position_id, setbanner_position_id] = useState("")
  const [email, setEmail] = useState("")
  const [redirect_link, setredirect_link] = useState("")
  const [discount, setdiscount] = useState("")
  const [actual_amount, setactual_amount] = useState("")
  const [banner, setBanner] = useState("")
  const [package_amount, setpackage_amount] = useState("")
  const [duration, setduration] = useState("")
  const [durationList, setdurationList] = useState([])
  const [reference, setReference] = useState("")
  const [discount_price, setdiscount_price] = useState("")
  const [amount, setamount] = useState("")
  const [advertisement_id, setadvertisement_id] = useState("")
  const [BannerPageLocation, setBannerPageLocation] = useState([])
  const [BannerPositionList, setBannerPositionList] = useState([])
  const [banner_size, setbanner_size] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };
  var optines = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    const apI = config.API_URL + "advertisementsubscription/viewAllAdvertisement"
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setBannerPageLocation(value.data);
      });

  }, [fetch]);
  var message;
  const [selectedItem, setSelectedItem] = useState(null);
  const AgentAdd = async (event) => {
let  timer;
    event.preventDefault();
    if (duration === "Monthly") {
      const dateObject = new Date();
      dateObject.setMonth(dateObject.getMonth() + 1);
      timer= dateObject.toISOString().split(".")[0];
    }else if(duration=="Quarterly"){
      const dateObject = new Date();
      dateObject.setMonth(dateObject.getMonth() + 3);
      timer= dateObject.toISOString().split(".")[0];
    } else if(duration=="Yearly"){
      const dateObject = new Date();
      dateObject.setMonth(dateObject.getMonth() + 12);
      timer= dateObject.toISOString().split(".")[0];
    }
    else if(duration=="Half Yearly"){
      const dateObject = new Date();
      dateObject.setMonth(dateObject.getMonth() + 6);
      timer= dateObject.toISOString().split(".")[0];
    }else{
      timer=""
    }
    const body = {
      page: page,
      duration: duration,
      discount: discount,
      banner: banner,
      email: email,
      mobile: mobile,
      redirect_link: redirect_link,
      name: name,
      advertisement_id: advertisement_id,
      actual_amount: actual_amount,
      package_amount: package_amount,
      position: banner_position_id,
      reference: reference,
      end_date:timer
    }
    console.log("🚀 ~ file: add.js:90 ~ AgentAdd ~ body:", body);
    const apiUrl = config.API_URL + 'advertisementsubscription/add';
    await axios.post(apiUrl, body, options)
      .then((res) => {
        const { data, statusCode } = res.data;
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/advertisementsubscription', { replace: true });
        console.log("=>>", res);
      }).catch((err) => {
        navigate("/admin/advertisementsubscription/add", { replace: true })
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
    const api = config.API_URL + "advertisementsubscription/" + url
    await axios.get(api, options)
      .then((res) => {
        setBannerPositionList(res.data.data)
      }).catch((err) => {
        setBannerPositionList([])
      });
  }

  const handleBannerPositionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = BannerPositionList.find((value) =>   value.BannerPosition.id === Number(selectedValue));    
    setSelectedItem(selectedItem);
    setadvertisement_id(selectedItem ? selectedItem.id : "");

    setbanner_size(selectedItem ? selectedItem.banner_size : "");
    setbanner_position_id(selectedItem ? selectedItem.BannerPosition.position : "");
  };



  const handledurationChange = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = BannerPositionList.find((value) =>   value.id === Number(selectedValue));
    setpackage_amount(selectedItem ? selectedItem.amount : "");
setduration(selectedItem ? selectedItem.duration : "")
  };
  const viewDurationByBannerPosition = async (e) => {
    const id=e.target.value
    const body = {
      banner_position_id:id
    }
    const apiUrl = config.API_URL + "advertisementsubscription/viewAllduration"
    await axios.post(apiUrl,body,optines)
      .then((res) => {
      setdurationList(res.data.data)
      }).catch(err => {
        setdurationList([])
    console.log("🚀 ~ file: add.js:146 ~ .then ~ err:", err)

    
  })
}
 

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
                                      const selectedName = e.target.value; // Get the selected option's name

                                      const selectedOption = BannerPageLocation.find((item) => item.page === selectedName);
                                      if (selectedOption) {
                                        const selectedId = selectedOption.id;
                                        console.log(`Selected ID: ${selectedId}`);
                                        console.log(`Selected Name: ${selectedName}`);
                                        viewBannerPosition(selectedName); 

                                        setpage(selectedName);
                                      }
                                    }}
                                  >
                                    <option value=''>Select Page</option>
                                    {Array.from(new Set(BannerPageLocation && BannerPageLocation.map((value) => value.page)))
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
                                     onChange={viewDurationByBannerPosition}

                                  >
                                    <option value="">Select Banner Position</option>
                                    {BannerPositionList.filter((value, index, self) => {
                                      const isUnique = index === self.findIndex((item) => (
                                        item.BannerPosition !== null && item.BannerPosition.banner_location === value.BannerPosition.banner_location
                                      ));

                                      return isUnique;
                                    }).map((value) => {
                                      if (value.BannerPosition != null) {
                                        return (
                                          <option key={value.BannerPosition.id} value={value.BannerPosition.id}>{value.BannerPosition.banner_location}</option>
                                        );
                                      }
                                      return null;
                                    })}
                                  </select>

                                </div>
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
                                  name="duration"
                                  className="form-control"
                                  required="required"
                                  id="duration"
                                     onChange={handledurationChange}
                                  >
                                    <option value="">Select Duration</option>
                                    {durationList.filter((value, index, self) => {
                                      const isUnique = index === self.findIndex((item) => (
                                        item !== null && item.duration === value.duration
                                      ));

                                      return isUnique;
                                    }).map((value) => {
                                        return (
                                          <option key={value.id} value={value.id}>{value.duration}</option>
                                      
                                      
                                  
                                   ) })}
                                  </select>

                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Package Amount</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Package Price"
                                  required
                                  value={package_amount}
                                />

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
                                <label htmlFor="mobile">Discount%</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Enter Discount"
                                  required
                                  value={discount}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,30}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setdiscount(input);
                                    const values  =Math.round(input * package_amount / 100)
                                      setactual_amount(values);
                                    } else {
                                      alert('Please enter only numeric characters!');
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
                                <label htmlFor="mobile">Actual Amount</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Actual amount"
                                  required
                                  value={actual_amount}
                                />

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
                                <label htmlFor="mobile">Redirect Url</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Enter Redirect Url"
                                  required
                                  value={redirect_link}
                                  onChange={(e) => {
                                    setredirect_link(e.target.value);


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
                                <label htmlFor="mobile">Subscriber Name</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Enter Subscriber Name"
                                  required
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
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
                                <label htmlFor="mobile">Subscriber Mobile</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Subscriber Mobile"
                                  required
                                  value={mobile}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setMobile(input);
                                      
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }
                                  }}
                                />


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
                                <label htmlFor="mobile">Subscriber Email</label>
                                <input type="email"
                                  className="form-control"
                                  placeholder="Enter Subscriber Email"
                                  required
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
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
                                <label htmlFor="mobile">Reference</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Enter Reference"
                                  required
                                  value={reference}
                                  onChange={(e) => {

                                    setReference(e.target.value);


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
                                <label htmlFor="mobile">Upload Banner</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  placeholder="Upload Banner"
                                  required
                                  onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    setBanner(selectedFile); // Set the selected file in your state

                                    // if (selectedFile) {
                                    //   const fileSize = selectedFile.size; // Size in bytes
                                    //   console.log("🚀 ~ file: add.js:456 ~ Advertisementadd ~ selectedFile.size:", selectedFile.size)
                                      
                                    //   console.log("🚀 ~ file: add.js:459 ~ Advertisementadd ~ banner_size:", banner_size)
                                    //   if (selectedFile.type.startsWith('image/')) {
                                    //     if (fileSize <= banner_size) {
                                    //       console.log(`File size: ${fileSize} bytes`);
                                    //     } else {
                                    //       alert(`File size exceeds the allowed limit (1MB). Please choose a smaller file.`);
                                    //     }
                                    //   } else {
                                    //     alert(`Please choose a valid image file.`);
                                    //   }
                                    // }
                                  }}
                                />


                                <div className="emailalert" style={{ color: "red" }}>
                                  {banner_size ? 'Upload banner of' + '' + banner_size : ''}
                                </div>
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
