import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from "../store/cart-context";
import SearchContext from "../store/search-context";

export default function Header() {
  const Shortlist = useContext(CartContext);
  const SearchList = useContext(SearchContext);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate()
  const [allData, setallData] = useState([]);
  const [seo, setSeo] = useState([]);
  const [urls, seturls] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const Id = JSON.parse(localStorage.getItem("userId"));
  const count = JSON.parse(localStorage.getItem("username_count"));
  const [staticAdded, setStaticAdded] = useState("");
  const roleId = JSON.parse(localStorage.getItem('roleId'));
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Buy");
  const [phone, setPhone] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [max_budget, setMax_budget] = useState("");
  const [min_budget, setMin_budget] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [country_code, setCountry_code] = useState("91");
  const [data, setData] = useState([]);
  const [usr_id, setusr_id] = useState("");
  const [ip_add, setip_add] = useState("");
  const [Properties, setProperties] = useState([]);

  // ........
  const [usernameError, setUsernameError] = useState('');

  const [success, setSuccess] = useState(false);
  useEffect(() => {
    generateCaptcha();

    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    if (usernameError) {
      timer = setTimeout(() => {
        setUsernameError('');
      }, 3000); // Set the timer to 3 seconds
    }
    return () => clearTimeout(timer);
  }, [success, usernameError]);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setip_add(res.data.IPv4)
    if (Id === null) {
      setusr_id("0")

    } else {
      setusr_id(Id)
    }
  }
  const view = async () => {
    const api = config.API_URL + "clint/shortlist/viewAll"
    const body = {
      ip_add: ip_add,
      usr_id: Id
    }
    await axios.post(api, body)
      .then((res) => {
        setData(res.data.data);
        Shortlist.setItems(res.data.data);
      }).catch((err) => console.log(err));


  }

  const clearUserData = () => {
    localStorage.clear();
    Shortlist.clear();
    SearchList.clear();
    navigate("/", { res: true });
    return true;
  };
  useEffect(() => {
    let urls;
    const seourl = window.location.pathname;
    if (seourl == "/") {
      urls = "home";
    } else {
      urls = seourl.substring(1);
    }


    if (Id != null) {
      const apiUrl = config.API_URL + "auth/";
      fetch(apiUrl +Id)
        .then((response) => response.json())
        .then((value) => {
          setallData(value.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });

    }
    else {
    }



    const seobody = {
      location: urls,
    }
    axios.post(Seoview, seobody)
      .then((res) => {
        if (res.data.data != null) {
          setSeo(res.data.data)
        }
        else {
          console.log("");
        }
      }).catch((err) => console.log(err));

    getData()
    view()
    if (Id != null) {

      const api = config.API_URL + "clint/savesearch/id"
      const body = {
        cus_id: Id,
      }
      axios.post(api, body)
        .then((res) => {
          SearchList.setSearchItems(res.data.data);
          setProperties(res.data.data);
        }).catch((err) => console.log(err));
    }
    else {
    }
  }, [fetch]);
  const Seoview = config.API_URL + "clint/seo/ViewAll";


  // captcha ...
  const [captchaError, setCaptchaError] = useState('');
  const [captchavalue, setcaptchavalue] = useState("");

  const [captcha, setCaptcha] = useState("");
  const generateCaptcha = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captcha);
  };

  const Alert = async (event) => {
    event.preventDefault();
    const body = {
      fname: fname,
      email: email,
      category: category,
      phone: phone,
      p_typeid: p_typeid,
      max_budget: max_budget,
      min_budget: min_budget,
      location_id: location_id,
      country_code: country_code,

    };

    if (captcha == captchavalue) {
      const alerturl = config.API_URL + "clint/contactenquiry/alert";
      await axios
        .post(alerturl, body)
        .then((res) => {
          closeModal()
          var message = "Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner";
          toast.success(message, {
            autoClose: 2000,
            type: "success",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "custom-toast",
          });
          setFname("");
          setEmail("");
          setCategory("");
          setPhone("");
          setP_typeid("");
          setMax_budget("");
          setMin_budget("");
          setLocation_id("");
          setCountry_code("");
          setSuccess(true);
          setcaptchavalue("")


        })
        .catch((err) => {
          closeModal()
          var message = "You have already shown intrested in this category";
          toast.success(message, {
            autoClose: 2000,
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
        });
      generateCaptcha();

    } else {
      console.log('Invalid Captcha !!');
      setCaptchaError('Invalid captcha!!');
      setTimeout(() => {
        setCaptchaError(" ")
      }, 3000);
    }

  };
  const closeModal = () => {
    const modal = document.getElementById("exampleModal");
    const backdrop = document.getElementsByclassName("modal-backdrop")[0];

    modal.classNameList.remove("show");
    modal.style.display = "none";

    backdrop.parentNode.removeChild(backdrop); // Remove the backdrop element

    // Enable scrolling
    document.body.classNameList.remove("modal-open");
    document.body.style.overflow = "auto";
  };
  const handleMinPriceChange = (e) => {
    const selectedMinPrice = e.target.value;
    setSelectedMinPrice(selectedMinPrice);
    const selectedMinIndex = minPrices.indexOf(Number(selectedMinPrice));
    const updatedMaxPrices = maxPrices.slice(selectedMinIndex + 1);
    setSelectedMaxPrice(updatedMaxPrices[0].toString());
    setMin_budget(selectedMinPrice)
  };
  const handleMaxPriceChange = (e) => {
    const selectedMaxPrice = e.target.value;
    setSelectedMaxPrice(selectedMaxPrice);
    setMax_budget(selectedMaxPrice)
  };

  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const minPrices = [
    2000, 5000, 10000, 20000, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
    500000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000, 10000000, 50000000
  ];
  const maxPrices = [
    2000, 5000, 10000, 20000, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
    500000, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000, 10000000, 50000000, 100000000
  ];
  return (
    <React.Fragment>
      <Helmet>
        <title>{seo.title ? seo.title : ''}</title>
        <meta name="description" content={seo.description ? seo.description : ''} /> :
        <meta name="keywords" content={seo.keyword ? seo.keyword : ''} />
        <link rel="stylesheet" href={config.SITE_URL + "/css/bootstrap.min.css"} type="text/css" />
        <link rel="stylesheet" href={config.SITE_URL + "/css/all.min.css"} type="text/css" />
        <link rel="stylesheet" href={config.SITE_URL + "/css/owl.carousel.min.css"} type="text/css" />
        <link rel="stylesheet" href={config.SITE_URL + "/css/owl.theme.default.css"} type="text/css" />
        <link rel="stylesheet" href={config.SITE_URL + "/css/font.css"} type="text/css" />
        <link rel="stylesheet" href={config.SITE_URL + "/css/style.css"} type="text/css" />
      </Helmet>
      <div className="header">

        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand logo_bull" ><img className="img-fluid" src={config.SITE_URL + "images/logo.png"} alt="logo" /></Link>
            <div className="mobile_header">
              <ul className="right_part">
                <li className="second_list">
                  <Link to="/shortlist"><img src={config.SITE_URL + "images/head_07.png"} alt="heart" /><span>
                    shortlist
                  </span>
                  </Link>
                  <div className="badch">
                    {Shortlist.items.length}
                  </div>
                </li>
                <li className="second_list">
                  <Link href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={config.SITE_URL + "images/head_09.png"}
                    alt="heart" /><span>
                      alerts
                    </span>
                  </Link>

                </li>
                {Id ?
                  (<li className="second_list">
                    <Link to="/dashboard/search"><img src={config.SITE_URL + "images/head_08.png"} alt="heart" /><span>
                      My searches
                    </span>
                    </Link>
                    <div className="badch">
                      {SearchList.Searchitems.length}

                    </div>
                  </li>) :

                  (<li className="second_list">
                    <Link to="/users/login"><img src={config.SITE_URL + "images/head_08.png"} alt="heart" /><span>
                      My searches
                    </span>
                    </Link>
                    <div className="badch">
                      1
                    </div>
                  </li>)}
              </ul>
              <div className="form_contant">
                {Id
                  ? (<div className="d-flex ">
                    <div className="hover_button">
                      <Link to="#" className="btn btn-outline-success form_btn " type="submit">{allData.name}</Link>
                      <Link to="/" className="logout_click" onClick={clearUserData} >logout</Link>
                    </div>
                    <Link to="/dashboard/account" className="control_btn">My Account <span></span> </Link>
                  </div>
                  )
                  :
                  (<div className="d-flex ">
                    <div className="hover_button">
                      <Link to="/users/login" className="btn btn-outline-success form_btn " type="submit">Sign
                        in</Link>
                    </div>
                    <Link to="/users/login" className="control_btn" >Post Property  <span>free</span> </Link>
                  </div>)

                }
              </div>
            </div>


            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">

                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div className="collapse navbar-collapse menu_bar" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item list">

                  <Link to="/property/search/buy-property-in-Jaipur" className="nav-link click" aria-current="page" href="#">Buy</Link>

                </li>
                {Id ?
                  (<li className="nav-item list">
                    {
                      roleId == 4 ?
                        (<Link to="/dashboard/addporject" className="nav-link click" >ADD PROJECT</Link>) :
                        (<Link to="/dashboard/addproperty" className="nav-link click" >Sell</Link>)}
                  </li>) :
                  (<li className="nav-item list">
                    <Link to="/users/login" className="nav-link click">sell</Link>
                  </li>)}

                <li className="nav-item list">

                  <Link to="/property/search/rent-property-in-Jaipur" className="nav-link click" href="#">Rent</Link>

                </li>
                <li className="nav-item list">
                  <Link to="/real-estate-projects-in-Jaipur" className="nav-link click" href="#">Recent Projects</Link>
                </li>
                <li className="nav-item list">

                  <Link to="/homeloan-for-Property" className="nav-link click" href="#">Home loan</Link>

                </li>
                <li className="nav-item list">
                 <Link to="/subscription" className="nav-link click" >Subscription</Link> </li>
              </ul>
              <ul className="right_part hide">
                <li className="second_list">
                  <Link to="/shortlist"><img src={config.SITE_URL + "images/head_07.png"} alt="heart" /><span>
                    shortlist
                  </span>
                  </Link>
                  <div className="badch">
                    {Shortlist.items.length}
                  </div>
                </li>
                <li className="second_list">
                  <Link href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src={config.SITE_URL + "images/head_09.png"}
                    alt="heart" /><span>
                      alerts
                    </span>
                  </Link>

                </li>
                {Id ?
                  (<li className="second_list">
                    <Link to="/dashboard/search"><img src={config.SITE_URL + "images/head_08.png"} alt="heart" /><span>
                      My searches
                    </span>
                    </Link>
                    <div className="badch">
                      {SearchList.Searchitems.length}
                    </div>
                  </li>) :

                  (<li className="second_list">
                    <Link to="/users/login"><img src={config.SITE_URL + "images/head_08.png"} alt="heart" /><span>
                      My searches
                    </span>
                    </Link>
                    <div className="badch">
                      0
                    </div>
                  </li>)}
              </ul>
              <div className="form_contant">
                {Id
                  ? (<div className="d-flex ">
                    <div className="hover_button">
                      <Link to="#" className="btn btn-outline-success form_btn " type="submit">{allData.name}</Link>
                      <Link to="/" className="logout_click" onClick={clearUserData} >logout</Link>
                    </div>
                    <Link to="/dashboard/account" className="control_btn">My Account <span></span> </Link>
                  </div>
                  )
                  :
                  (<div className="d-flex ">
                    <div className="hover_button">
                      <Link to="/users/login" className="btn btn-outline-success form_btn " type="submit">Sign
                        in</Link>
                    </div>
                    <Link to="/users/login" className="control_btn" >Post Property  <span>free</span> </Link>
                  </div>)

                }
              </div>
            </div>
          </div>
        </nav>
      </div>


      <div className="short_model">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-body_clg">
                  <h6><img src={config.SITE_URL + "images/model_bel.jpg"} /> Get Personalized Email Alerts that
                    match your
                    requirement</h6>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form onSubmit={Alert}>
                  <div className="center_model">
                    <p>
                      Your Requirement
                    </p>

                    <div className="form_sel">
                      <select name="category"
                        value={category}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setCategory(e.target.value);
                        }}>
                        <option value="Buy">Buy</option>
                        <option value="Rent">Rent</option> </select>




                      <select name="p_typeid"
                        value={p_typeid}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setP_typeid(e.target.value);
                        }} required>
                        <option value="">
                          Select Type
                        </option>
                        <option value="319">Residential plot</option>
                        <option value="320">Residential House</option>
                        <option value="321">Residential Flat</option>
                        <option value="322">Builder Floor Apartment</option>
                        <option value="324">Commercial Land</option>
                        <option value="325">Commercial office space</option>
                        <option value="326">Commercial Shop</option>
                        <option value="327">Commercial Showroom</option>
                        <option value="342">Residential vila/Duplex</option>
                        <option value="352">Indestrial Plot</option>
                        <option value="356">Commercial Warehouse</option>
                        <option value="357">Affordable Housing Project</option>
                      </select>


                      <select
                        name="min_budget"
                        value={min_budget}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setMin_budget(e.target.value);
                        }} required>
                        <option value="">Min Price</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>
                        <option value="100000">1 Lacs</option>
                        <option value="150000">1.5 Lacs</option>
                        <option value="200000">2 Lacs</option>
                        <option value="250000">2.5 Lacs</option>
                        <option value="300000">3 Lacs</option>
                        <option value="350000">3.5 Lacs</option>
                        <option value="500000">5 Lacs</option>
                      </select>
                      <select
                        name="max_budget"
                        value={max_budget}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setMax_budget(e.target.value);
                        }} required>
                        <option value="">Max Price</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>
                        <option value="100000">1 Lacs</option>
                        <option value="150000">1.5 Lacs</option>
                        <option value="200000">2 Lacs</option>
                        <option value="250000">2.5 Lacs</option>
                        <option value="300000">3 Lacs</option>
                        <option value="350000">3.5 Lacs</option>
                        <option value="500000">5 Lacs</option>
                      </select>





                      <select

                        name="location_id"
                        value={location_id}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setLocation_id(e.target.value);
                        }}
                        required
                      >
                        <option value="">Select Location</option>
                        <option value="711">22 Godown Industrial Area</option>
                        <option value="437">Agra Road</option>
                        <option value="424">Ajmer Road</option>
                        <option value="436">Bani Park</option>
                        <option value="458">Bapu Nagar</option>
                        <option value="718">Benad Road Jhotwara</option>
                        <option value="719">Bhanpur Kalan</option>
                        <option value="461">C-Scheme</option>
                        <option value="435">Chitrakoot</option>
                        <option value="441">Civil Lines</option>
                        <option value="698">Delhi Road</option>
                        <option value="452">Durgapura</option>
                        <option value="445">Gopalpura By Pass</option>
                        <option value="427">Jagatpura</option>
                        <option value="713">Jawahar Circle</option>
                        <option value="447">Jawahar Nagar</option>
                        <option value="434">Jhotwara</option>
                        <option value="431">Kalwar Road</option>
                        <option value="429">Malviya Nagar</option>
                        <option value="428">Mansarovar</option>
                        <option value="712">Mansarovar Extension</option>
                        <option value="450">Muralipura</option>
                        <option value="443">New Sanganer Road</option>
                        <option value="716">Nirman Nagar</option>
                        <option value="481">Niwaru Road</option>
                        <option value="444">Patrakar Colony</option>
                        <option value="430">Pratap Nagar</option>
                        <option value="455">Raja Park</option>
                        <option value="501">Sachivalaya Nagar</option>
                        <option value="701">Sahakar Marg</option>
                        <option value="693">Sanganer</option>
                        <option value="717">Shastri Nagar</option>
                        <option value="446">Shyam Nagar</option>
                        <option value="470">Sidharth Nagar</option>
                        <option value="432">Sikar Road</option>
                        <option value="433">Sirsi Road</option>
                        <option value="438">Sodala</option>
                        <option value="462">Tilak Nagar</option>
                        <option value="425">Tonk Road</option>
                        <option value="426">Vaishali Nagar</option>
                        <option value="454">Vatika</option>
                        <option value="440">Vidhyadhar Nagar</option>
                      </select>
                    </div>
                    <div className="rp"></div>
                    <p>Contact Details</p>
                    <div className="row">
                      <div className="col-lg-6">

                        <input type="text" placeholder="Name" className="form-control" aria-label="First name" required
                          value={fname}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFname(e.target.value)

                          }}

                        />
                      </div>
                      <div className="col-lg-6">

                        <input type="email" className="form-control" placeholder="Email" aria-label="First name" required
                          value={email}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setEmail(e.target.value)

                          }}


                        />
                      </div>

                      <div className="col-lg-6">
                        <div className="alert_popup_select">

                          <select value={country_code}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCountry_code(e.target.value);
                            }}>
                            <option value="91">IND +91</option>
                            <option value="1">USE +1</option>
                            <option value="971">ARE +971</option>
                            <option value="65">SGP +65</option>
                            <option value="966">SAU +966</option>
                            <option value="1">CAN +1</option>
                            <option value="61">AUS +61</option>
                            <option value="974">QAT +974</option>
                            <option value="968">OMN +968</option>
                            <option value="852">HKG +852</option>
                            <option value="93">AFG +93</option>
                            <option value="244">AGO +244</option>
                            <option value="264">AIA +264</option>
                            <option value="355">ALB +355</option>
                            <option value="376">AND +376</option>
                            <option value="599">ANT +599</option>
                            <option value="54">ARG +54</option>
                            <option value="374">ARM +374</option>
                            <option value="684">ASM +684</option>
                            <option value="268">ATG +268</option>
                            <option value="994">AZE +994</option>
                            <option value="257">BDI +257</option>
                            <option value="226">BFA +226</option>
                            <option value="880">BGD +880</option>
                            <option value="973">BHR +973</option>
                            <option value="1242">BHS +1242</option>
                            <option value="387">BIH +387</option>
                            <option value="375">BLR +375</option>
                            <option value="501">BLZ +501</option>
                          </select>
                        </div>

                      </div>


                      <div className="col-lg-6">

                        <input type="text" className="form-control" placeholder="Phone" aria-label="First name" maxLength="10" required
                          value={phone}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setPhone(e.target.value)

                          }}
                        />
                      </div>
                      <div className="col-lg-6">

                        <h4 style={{
                          color: '#000',
                        }}>
                          <span style={{
                            display: 'inline-block',
                            backgroundImage: 'url(https://c1.wallpaperflare.com/preview/870/79/678/banner-header-graph-paper-squared-paper.jpg)',
                            backgroundSize: 'cover',
                            padding: '0.2em 0.5em',
                            borderRadius: '0.3em',
                            margin: '0 0.2em'
                          }}>
                            {captcha}
                          </span>
                          {captchaError || <div className="error">{captchaError}</div>}
                        </h4>
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Enter Security Code" aria-label="First name"
                          value={captchavalue}
                          onChange={(e) => {
                            setcaptchavalue(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="model_but" href="#" >submit</button>
                </form>
                {success && (
                  <div>
                    <div style={{ textAlign: 'center' }}>
                      <h4>Thankyou for Send Alert Confirmation !
                        Your Confirmation Alert Send Admin !
                      </h4></div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
};



