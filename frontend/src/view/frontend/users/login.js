import React, { useState, useEffect, useRef } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from '../../../config/config';
import ClipLoader from "react-spinners/ClipLoader";

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse, Alert,
} from "@mui/material";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [country_code, setcountry_code] = useState(91)
  const [role_id, setRole_id] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setconfirm_password] = useState("")
  const [staticAdded, setStaticAdded] = useState("");
  const [otp, setOtp] = useState("");
  const [mobiles, setMobiles] = useState('')
  const [openAlert, setOpenAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [Locations, setLocation] = useState([]);
  const [propertytype, setPropertytype] = useState([]);
  const [option, setOption] = useState("Sell");
  const [location_id, setLocation_id] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [room, setRoom] = useState("");
  const [tot_price, setTot_price] = useState("");
  const StaticMessage = localStorage.getItem("staticAdded");
  const navigate = useNavigate()
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');
  const [opens, setopens] = useState(false);
  const viewLocation = config.API_URL + "clint/home/viewLocation";
  const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"
  const BuilderApi = config.API_URL + "clint/home/viewAllAssociateBuilder";
  const ArticleApi = config.API_URL + "clint/home/viewAllArticle";
  const [builder, setBuilder] = useState([]);
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total, hours, minutes, seconds
    };
  }
  var checktimer = 0
  const startTimer = (e) => {
    let { total, hours, minutes, seconds }
      = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
    else {
      if (checktimer == 0) {
        checktimer = 1
        const apiUrl = config.API_URL + "auth/remarkotp"
        const body = {
          mobile: mobiles,
        };
        axios.post(apiUrl, body)
          .then((res) => {
          })
          .catch((err) => console.log(err))
      }
    }
  }
  const clearTimer = (e) => {
    setTimer('00:59');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;

  }
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 59)
    return deadline
  }
  const options = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      900: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  }


  const register = async (event) => {
    event.preventDefault();
    if (password == confirm_password) {
      const apiUrl = config.API_URL + "auth/frontregister"
      const body = {
        name: name,
        username: username,
        mobile: mobile,
        country_code: country_code,
        role_id: role_id,
        password: password
      };
      await axios
        .post(apiUrl, body)
        .then((res) => {
          const { data, statusCode } = res.data;
          if (statusCode === '200') {
          } else {
            localStorage.setItem('userName', JSON.stringify(data.name));
          }
          setName("")
          setUsername("")
          handleotpinput(mobile);
          setMobiles(mobile);
          setopens(!opens);
          clearTimer(getDeadTime());
          setcountry_code("")
          setUsername("")
          setPassword("")
          setRole_id("")
          setconfirm_password("")
        })
        .catch((err) => {
          navigate("/users/login", { replace: true })
          const message = err.response.data.message
          toast.error(message, {
            autoClose: 5000,
            type: "error",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "custom-toast",
          });

        })
    } else {
      navigate("/users/login", { replace: true })
      const message = "Password not match"
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
        theme: "dark",
        className: "custom-toast",      })
    }
  }

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const resandotp = async (event) => {
    clearTimer(getDeadTime());
    const otp = Math.floor(100000 + Math.random() * 900000);
    const apiUrl = config.API_URL + "auth/MobileToRegister"
    const body = {
      mobile: mobiles,
      otp: otp
    };
    const res = await axios.post(apiUrl, body)
    console.log("=>>", res);
    const apiUrls = 'https://whatappapi.in/api/send';
    const number = `91${mobiles}`;
    const type = 'text';
    const message = `Dear customer, your OTP for registration is ${otp}.Use this password to validate your login.`;
    const instance_id = '64F7101C947FE';
  const access_token = '64b90ab2890d8';
    const params = {
      number: number,
      type: type,
      message: message,
      instance_id: instance_id,
      access_token: access_token,
    };
    await axios.get(apiUrls, { params: params });

  };
  const handleotpinput = async (number) => {
    if (number.length === 10) {
      setMobiles(number);
      const apiUrl = config.API_URL + "auth/MobileToRegister";
      const otp = Math.floor(100000 + Math.random() * 900000);

      const body = {
        mobile: number,
        otp: otp
      };
      try {
        const response = await axios.post(apiUrl, body);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (response.status === 200) {
          clearTimer(getDeadTime());
          setOpen(true);
          const apiUrls = 'https://whatappapi.in/api/send';
          const number = `91${body.mobile}`;
          const type = 'text';
          const message = `Dear customer, your OTP for registration is ${otp}.Use this password to validate your login.`;
          const instance_id = '64F7101C947FE';
          const access_token = '64b90ab2890d8';
          const params = {
            number: number,
            type: type,
            message: message,
            instance_id: instance_id,
            access_token: access_token,
          };
          await axios.get(apiUrls, { params: params });
        } else {
          const message = "User not found";
          toast.error(message, {
            position: "top-right",
            autoClose: 4000,
            type: "error",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "custom-toast",          });
        }
      } catch (err) {
        navigate("/users/login", { replace: true });
        const message = err.response.data.message;
        toast.error(message, {
          position: "top-right",
          autoClose: 4000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
            className: "custom-toast",        });
      }
    } else {
      setOpen(false);
    }
  };


  const MobileToregister = async (event) => {
    const apiUrl = config.API_URL + "auth/MobileTologin"
    event.preventDefault();
    const body = {
      mobile: mobile,
      otp: otp
    };
    await axios.post(apiUrl, body)
      .then((res) => {
        const { data, statusCode } = res.data;
        if (statusCode === '200') {
        } else {
          localStorage.setItem('userName', JSON.stringify(data.name));
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem('userData', JSON.stringify(data));
          const msg = res.data.message;
          navigate("/dashboard/account", { replace: true })
          localStorage.setItem("staticAdded", msg);
        }

      })
      .catch((err) => {
        navigate('/users/login', { replace: true });
        const message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 4000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
            className: "custom-toast",     
             })
      });
  }
  var message;
  const login = async (event) => {
    const apiUrl = config.API_URL + "auth/front/login"
    event.preventDefault();
    const body = {
      email: email,
      password: password
    };
    await axios
      .post(apiUrl, body)
      .then((res) => {
        const { data, statusCode } = res.data;
        if (statusCode === '200') {
        } else {
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem('userData', JSON.stringify(data));
          const msg = res.data.message;
          navigate("/dashboard/account", { replace: true })
          localStorage.setItem("staticAdded", msg);
          console.log("=>>", res);
        }

      })
      .catch((err) => {
        navigate('/users/login', { replace: true });
        const message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
         theme: "dark",
        className: "custom-toast",

        })
      });
  }
  const MobileTologin = async (event) => {
    const apiUrl = config.API_URL + "auth/MobileTologin"
    event.preventDefault();
    const body = {
      mobile: mobiles,
      otp: otp
    };
    await axios
      .post(apiUrl, body)
      .then((res) => {
        const { data, statusCode } = res.data;
        if (statusCode === '200') {
        } else {
          localStorage.setItem('userName', JSON.stringify(data.name));
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem('userData', JSON.stringify(data));
          const msg = res.data.message;
          navigate("/dashboard/account", { replace: true })
          localStorage.setItem("staticAdded", msg);
        }
      })
      .catch((err) => {
        navigate('/users/login', { replace: true });
        const message = err.response.data.message
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
          theme: "dark",
            className: "custom-toast",        })
      });
  }

  useEffect(() => {
    if (StaticMessage != null && StaticMessage !== "") {
      setOpenAlert(true);
      setStaticAdded(StaticMessage);
      setTimeout(() => {
        localStorage.setItem("staticAdded", "");
        setOpenAlert(false);
      }, 3000);
      toast.success(StaticMessage, {
        autoClose: 5000,
        type: "success",
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "custom-toast",
      });
    } else {
      setOpenAlert(false);
      setStaticAdded("");
    }
    fetch(BuilderApi)
      .then((response) => response.json())
      .then((value) => {
        setBuilder(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    fetch(ArticleApi)
      .then((response) => response.json())
      .then((value) => {
        setArticle(value.data);

      });
    fetch(viewpropertytypes)
      .then((response) => response.json())
      .then((value) => {
        setPropertytype(value.data);

      });
    fetch(viewLocation)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);

      });
  }, [StaticMessage]);


  const HandleSearch = async (event) => {
    event.preventDefault();
    const body = {
      option: option,
      location_id: location_id,
      p_typeid: p_typeid,
      room: room,
      tot_price: tot_price,
      room: room
    };
    localStorage.setItem("searchResults", JSON.stringify(body));
    navigate(option.toLowerCase() === 'rent' ? '/property/search/rent-property-in-Jaipur' : '/property/search/buy-property-in-Jaipur', { replace: true })
  };


  return (
    <div>
      <Header />
      <ToastContainer />

   
      <div className="login_top_bar">
        <div className="recent_top_form_part">
          <form>
            <div className="top_select first_select">
              <select name="category"
                value={option}
                onChange={(e) => {
                  console.log(e.target.value);
                  setOption(e.target.value);
                }}>
                <option value="Sell">Buy</option>
                <option value="Rent">Rent</option> </select>
            </div>
            <div className="top_select not_allow">
              JAIPUR, RAJASTHAN
            </div>
            <div className="top_select">

              <select name="role_id"

                value={location_id}
                onChange={(e) => {
                  console.log(e.target.value);
                  setLocation_id(e.target.value);
                }}
              >
                <option value="">Locality</option>
                {Locations.map((value) => {
                  return <option key={value.id} value={value.id}> {value.name}</option>;

                })}
              </select>
            </div>
            <div className="top_select">

              <select name="role_id"

                value={p_typeid}
                onChange={(e) => {
                  console.log(e.target.value);
                  setP_typeid(e.target.value);
                }}
              >
                <option value="">Property type</option>

                {propertytype.map((value) => {
                  return <option key={value.id} value={value.id}> {value.name}</option>;

                })}
              </select>
            </div>
            <div className="top_select">
                        <select name="room" className="select_click"
                          value={tot_price}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setTot_price(e.target.value);
                          }}
                        >
                          <option value="">Budget</option>
                          <option value="500000">5 Lacs </option>
                          <option value="1000000">10 Lacs </option>
                          <option value="2000000">20 Lacs </option>
                          <option value="3000000">30 Lacs </option>
                          <option value="4000000">40 Lacs</option>
                          <option value="5000000">50 Lacs</option>
                          <option value="6000000">60 Lacs</option>
                          <option value="7000000">70 Lacs</option>
                          <option value="8000000">80 Lacs</option>
                          <option value="9000000">90 Lacs</option>
                          <option value="10000000">1 Crore</option>
                          <option value="50000000">5 Crore</option>
                          <option value="100000000">10 Crore</option>

                        </select>
                      </div>
                      <div className="top_select">
                        <select name="room" className="select_click"
                          value={room}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setRoom(e.target.value);
                          }}
                        >
                          <option value=""> bedRooms</option>
                          <option value="1">1 </option>
                          <option value="2">2 </option>
                          <option value="3">3 </option>
                          <option value="4">4 </option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9+</option>
                        </select>
                      </div>
            <Link className="search_recent"
            onClick={HandleSearch}
            href="#">SEARCH</Link>
          </form>
        </div>
      </div>


      <div className="loginContainer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="infoBeforeLogin">
                <h3>The Search For Your Dream Property Ends Here!</h3>
                <p>
                  Are you looking for a property which is just perfect for you? Your search ends here. Our
                  exclusive plans and user-friendly features will help you meet prospective sellers across all
                  cities in rajasthan sooner than you would have ever thought of. Get ready for a classNamey
                  experience.
                </p>

                <ul className="beforeLoginTiles list-unstyled">
                  <li>
                    <img src={
                      config.SITE_URL +
                      "./images/beforeLogin-1.png"
                    } alt="Save_Properties" />
                    <p>Save Properties</p>
                  </li>
                  <li>
                    <img src={
                      config.SITE_URL +
                      "./images/beforeLogin-2.png"
                    } alt="Alerts" />
                    <p>Get Property Alerts</p>
                  </li>
                  <li>
                    <img src={
                      config.SITE_URL +
                      "./images/beforeLogin-3.png"
                    } alt="Manage" />
                    <p>Manage All your accounts at a single place</p>
                  </li>
                  <li> <img src={
                    config.SITE_URL +
                    "./images/beforeLogin-4.png"
                  } alt="Searches" />
                    <p>Save Searches</p>
                  </li>
                  <li>
                    <img src={
                      config.SITE_URL +
                      "./images/beforeLogin-5.png"
                    } alt="Receive Property" />
                    <p>Receive Property News</p>
                  </li>
                  <li>
                    <img src={
                      config.SITE_URL +
                      "./images/beforeLogin-6.png"
                    } alt="Share" />
                    <p>Share with your Google+ friends here</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="loginSignupPart">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-login-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-login" type="button" role="tab" aria-controls="pills-login"
                      aria-selected="true">Existing User? Sign In</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-signup-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-signup" type="button" role="tab" aria-controls="pills-signup"
                      aria-selected="true">Create Account</button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">

                  <div className="tab-pane fade show active" id="pills-login" role="tabpanel"
                    aria-labelledby="pills-login-tab">
                    <div className="container-fluid" >
                      {isOpen ?

                        <form className="row g-3" onSubmit={MobileTologin} >
                          {Open ?
                            <div></div>
                            :
                            <div className="col-md-12 mt-3 mb-3">
                              <Link to="#" className="clickTo" onClick={toggleForm}>Click Here To login With Your Registered Email Id
                              </Link>
                            </div>
                          }
                          <div className="col-md-12 mt-0 mb-3">
                            <input type="mobile" className="form-control" placeholder=" Enter Mobile " minLength="10" maxLength="10" required  onChange={(e) => {
                        console.log(e.target.value);
                        handleotpinput( e.target.value)
                      }} />
                          </div>
                          {Open ?
                            <div className="col-md-12 mt-0 mb-3">
                              <input type="text" className="form-control" placeholder="Enter Otp" minLength="0" maxLength="10" required onChange={(e) => {
                                setOtp(e.target.value);

                              }} />
                              <br />
                              <div className="text-dark" >
                                {timer == "00:00" ?
                                  <Link to="#" className="text-dark" onClick={resandotp}>
                                    <u>Click Here To Resend Otp</u>
                                  </Link> : <h5>{timer}
                                  </h5>}
                              </div>
                            </div>
                            :
                            <div></div>
                          }
                          <div className="col-12 mt-0 mb-3">
                            <button type="submit" className="formButton">Sign in</button>
                          </div>
                        </form>
                        :
                        <form className="row g-3" onSubmit={login}>
                          <div className="col-md-12 mt-3 mb-3">
                            <Link href="#" className="clickTo" onClick={toggleForm}> Click Here To login With Your Registered Mobile
                              Number</Link>
                          </div>
                          <div className="col-md-12 mt-0 mb-3">
                            <input type="email" className="form-control" placeholder="Email" required value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }} />
                          </div>
                          <div className="col-md-12 mt-0 mb-3"   >
                            <input type="password" className="form-control" placeholder="Password" required value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }} />
                          </div>
                          <div className="col-12 mt-0 mb-3">
                            <Link to="/users/forget" className="forgotPass">I Forgot My Password</Link>
                          </div>
                          <div className="col-12 mt-0 mb-3">
                            <button type="submit" className="formButton" >Sign in</button>
                          </div>
                        </form>


                      }
                    </div>
                  </div>

                  <div className="tab-pane fade" id="pills-signup" role="tabpanel"
                    aria-labelledby="pills-signup-tab">
                    <div className="container-fluid">
                      {opens ?

                        <form className="row g-3" onSubmit={MobileToregister}>
                          <div className="col-md-12 mt-3 mb-3">
                          </div>
                          <div className="col-md-12 mt-0 mb-3">
                            <input type="number" className="form-control" placeholder="Enter Otp" minLength="0" maxLength="10" required onChange={(e) => {
                              setOtp(e.target.value);

                            }} />
                            <br />
                            <div className="text-dark" >
                              {timer == "00:00" ?

                                <Link href="#" className="text-dark" onClick={resandotp}>
                                  <u>Click Here To Resend Otp</u>
                                </Link> : <h5>{timer}
                                </h5>}
                            </div>
                          </div>

                          <div className="col-12 mt-0 mb-3">
                            <button type="submit" className="formButton">Sign in</button>
                          </div>
                        </form>
                        :


                        <form className="row g-3 mt-3" onSubmit={register}>
                          <div className="col-md-6 mt-0 mb-3">
                            <input type="text" className="form-control" placeholder="Name" value={name}
                              required
                              onChange={(e) => {
                                setName(e.target.value);
                              }} />
                          </div>
                          <div className="col-md-6 mt-0 mb-3">
                            <input type="email" className="form-control" placeholder="Email"
                              required
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }} />
                          </div>
                          <div className="col-md-6 mt-0 mb-3">
                            <div className="row g-1">
                              <div className="col-5">
                                <select className="form-select countery-select" required value={country_code}
                                  defaultValue={"91"}
                                  onChange={(e) => {
                                    setcountry_code(e.target.value);
                                  }}>  <option value="91">IND +91</option>
                                </select>
                              </div>
                              <div className="col-7">
                                <input type="Mobile" className="form-control" placeholder="Mobile No." required minLength="1" maxLength="10" value={mobile}
                                  onChange={(e) => {
                                    setMobile(e.target.value);
                                  }} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mt-0 mb-3">
                            <select className="form-select countery-select" required value={role_id}
                              onChange={(e) => {
                                setRole_id(e.target.value);
                              }}>
                              <option value="">Select Role</option>
                              <option value="2">Owner</option>
                              <option value="3">Agent</option>
                              <option value="4">Builder</option>
                            </select>
                          </div>
                          <div className="col-md-6 mt-0 mb-3">
                            <input type="password" className="form-control" placeholder="Password" minLength="6" maxLength="15" required value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }} />
                            <span style={{ fontSize: "11px" }}>**Password Must be 6 character long</span>
                          </div>
                          <div className="col-md-6 mt-0 mb-3">
                            <input type="password" className="form-control" required placeholder="Confirm Password" minLength="6" maxLength="15" value={confirm_password} onChange={(e) => {
                              setconfirm_password(e.target.value);
                            }} />
                          </div>

                          <div className="col-12 mt-0 mb-3">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="gridCheck" required />
                              <label className="form-check-label" htmlFor="gridCheck">
                                I accept The <Link to="/term-conditions">Terms and Conditions</Link>
                              </label>
                            </div>
                          </div>
                          <div className="col-12 mt-0 mb-3">
                            <button type="submit" className="formButton"  >Submit</button>
                          </div>
                        </form>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="associat_crousel">
        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Associate Builders</h3>
          </hgroup>
          <OwlCarousel className="associat-carousel owl-theme slider-items owl-carousel" {...options}>
            {builder.map((value, index) => {
              return (

                <div className="img_box" key={index}>
                  <img alt="Image" src={config.Image_URL + value.image} />
                </div>

              )
            })}
          </OwlCarousel>
        </div>
      </section>

      {/* Article section start */}

      <section id="articles">
        {isLoading ? (
          <div className="loader inner-loader" colSpan={8}>
            <ClipLoader
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (

          <div className="container-fluid">
            <hgroup className="headings">
              <h3>Articles</h3>
            </hgroup>
            <div className="articlesContainers">
              <div className="overlayBg">
                <div className="container-fluid">
                  <div className="row">
                    {article.map((value, index) => {
                      return (
                        <div className="col-md-3" key={index}>

                          <Link to={`/article/index/${value.url}`} className="articlesTile">
                            <div className="iconContainer">
                              <img alt="Image" src={config.Image_URL + value.image} />

                            </div>
                            <h5>{value.title}</h5>

                          </Link>
                        </div>

                      )
                    })}

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}
