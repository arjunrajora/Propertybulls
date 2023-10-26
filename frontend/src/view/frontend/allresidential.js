import { React, useState, useEffect, useContext } from "react";
import CartContext from "../../store/cart-context";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from '../../config/config'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import captchaImg from '../../captcha.jpg';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

const URL = config.API_URL + "clint/property/Residential";

const ProjectURL = config.API_URL + "clint/property/Allproject";


export default function AllResidential() {
  const viewLocation = config.API_URL + "clint/home/viewLocation";
  const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes";
  const Shortlist = useContext(CartContext);

  const [property, setProperty] = useState([]);
  const [project, setProject] = useState([]);
  const [projectcount, setprojectcount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(10);
  const itemsPerLoad = 10;
  const [showLoader, setShowLoader] = useState(false);
  const [propertyname, setPropertyname] = useState("");
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const [ip_add, setip_add] = useState("");
  const [usr_id, setusr_id] = useState("0");

  const [type, setType] = useState("1");
  const [pro_id, setPro_id] = useState("");
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedP_typeid, setselectedP_typeid] = useState('');
  const [selectedage, setselectedage] = useState('');
  const [selectedroom, setselectedroom] = useState('');
  const [selectedoption, setselectedoption] = useState('');
  const [cus_id, setCus_id] = useState("");

  const Id = JSON.parse(localStorage.getItem("userId"));
  const [location, setLocation] = useState([]);
  const [propertytype, setPropertytype] = useState([]);

  const HandleSearch = (id, option, location_id, tot_price, area, room, p_typeid, age) => {
    setIsLoading(true); // Set loading state to true before making the API call
    setSelectedLocation(location_id);
    setselectedoption(option)
    setselectedP_typeid(p_typeid);
    setselectedage(age);
    setselectedroom(room)

    const SearchUrl = config.API_URL + "clint/home/search";
    const body = {
      id: id,
      option: option,
      location_id: location_id,
      tot_price: tot_price,
      area: area,
      room: room,
      p_typeid: p_typeid,
      age: age
    };
    axios.post(SearchUrl, body)
      .then(response => {
        const data = response.data.data;
        console.log("API Response:", data);
        setProperty(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });

  }

  var proertytypes;
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

  const minarea = [
    10, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400,
    500, 600, 750, 1000,
  ];
  const maxarea = [
    10, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400,
    500, 600, 750, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000
  ];
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [selectedMinArea, setSelectedMinArea] = useState('');
  const [selectedMaxArea, setSelectedMaxArea] = useState('');
  const handleMinPriceChange = (e) => {
    const selectedMinPrice = e.target.value;
    setSelectedMinPrice(selectedMinPrice);
    const selectedMinIndex = minPrices.indexOf(Number(selectedMinPrice));
    const updatedMaxPrices = maxPrices.slice(selectedMinIndex + 1);
    setSelectedMaxPrice(updatedMaxPrices[0].toString());

    HandleSearch('', '', '', selectedMinPrice);
  };
  const handleMaxPriceChange = (e) => {
    const selectedMaxPrice = e.target.value;
    setSelectedMaxPrice(selectedMaxPrice);
    HandleSearch('', '', '', selectedMaxPrice);
  };

  const handleMinAreaChange = (e) => {
    const selectedMinPrice = e.target.value;
    setSelectedMinArea(selectedMinPrice);
    const selectedMinIndex = minPrices.indexOf(Number(selectedMinPrice));
    const updatedMaxPrices = maxPrices.slice(selectedMinIndex + 1);
    setSelectedMaxArea(updatedMaxPrices[0].toString());

    HandleSearch('', '', '', '', selectedMinPrice);
  };
  const handleMaxAreaChange = (e) => {
    const selectedMaxPrice = e.target.value;
    setSelectedMaxArea(selectedMaxPrice);
    HandleSearch('', '', '', '', selectedMaxPrice);
  };


  useEffect(() => {
    getData();
    viewshortlist();
    generateCaptcha();

    fetch(URL)
      .then((response) => response.json())
      .then((value) => {
        setProperty(value.data.residential);
        console.log(value.data.data);
        setcount(value.data.data)
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    fetch(ProjectURL)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data.allproject);
        setprojectcount(value.data.data)


      });
    fetch(viewLocation)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });

    fetch(viewpropertytypes)
      .then((response) => response.json())
      .then((value) => {
        setPropertytype(value.data);
      });

    if (Id != null) {
      const apiUrl = config.API_URL + "auth/";
      fetch(apiUrl + Id)
        .then((response) => response.json())
        .then((value) => {
          console.log("🚀 ~ file: buy.js:224 ~ .then ~ value:", value.data.name);
          setFname(value.data.name);
          setEmail(value.data.username);
          setPhone(value.data.mobile);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });

    }
    else {
    }






  }, []);


  const handleLoadMore = () => {
    setDisplayedItems(displayedItems + itemsPerLoad);
  }
  const [isActive, setIsActive] = useState(false);
  const handleenqiry = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  }
  var LocationState, StateLocation, RoleData;

  // success msg in form
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

  // Share functionality
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    // Fetch the current URL when the component mounts
    setCurrentURL(window.location.href);
  }, []);












  // Contact Now 
  const AddContact = async (event) => {
    event.preventDefault();
    if (phone.length < 10) {
      alert('Mobile number must be at least 10 digits');
      return;
    }
    const body = {
      fname: fname,
      email: email,
      message: message,
      phone: phone,
      pro_id: pro_id,
      cus_id: Id ? Id : 0


    };

    if (captcha == captchavalue) {
      const url = config.API_URL + "clint/contactenquiry/contactadd";
      await axios
        .post(url, body)
        .then((res) => {

          console.log("=>>", res);
          // Clear input fields for form
          setFname("");
          setEmail("");
          setMessage("");
          setPhone("");
          setPro_id("");
          setCus_id("");
          setSuccess(true);
          setcaptchavalue("");
          var message = "Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner.!";
          toast.success(message, {
            autoClose: 3000,
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
          closeModal();
        })
        .catch((err) => console.log(err));
      generateCaptcha();

    } else {
      console.log('Invalid Captcha !!');
      setCaptchaError('Please Enter Valid Security Code');
      setTimeout(() => {
        setCaptchaError(" ")
      }, 3000);
    }
  };
  const closeModal = () => {
    const modal = document.getElementById("exampleModalnine");
    const backdrop = document.getElementsByClassName("modal-backdrop")[0];

    modal.classList.remove("show");
    modal.style.display = "none";

    backdrop.parentNode.removeChild(backdrop); // Remove the backdrop element

    // Enable scrolling
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
  };


  const handleChange = event => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };


  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setip_add(res.data.IPv4)
    console.log(Id)
    setusr_id(Id)
  }


  //add shortlist
  const [activeItems, setActiveItems] = useState([]);
  const addShortlist = async (pro_id) => {
    const apiUrl = config.API_URL + "clint/shortlist/add"
    const body = {
      pro_id: pro_id,
      ip_add: ip_add,
      usr_id: usr_id
    };
    await axios.post(apiUrl, body)
      .then((res) => {
        Shortlist.addItem({
          pro_id: pro_id,
          ip_add: ip_add,
          usr_id: usr_id
        });
        const index = activeItems.indexOf(pro_id);
        console.log(index);
        if (index === -1) {
          setActiveItems([...activeItems, pro_id]);
          console.log('firsttime')
        } else {
          console.log('secondtime')
          setActiveItems(activeItems.filter((i) => i !== pro_id));
        }
        console.log(activeItems, "add shortlist");

      })
      .catch((err) => console.log(err))
  };

  //delete shortlist
  const deleteshortlist = async (pro_id) => {
    const api = config.API_URL + "clint/shortlist/delete"
    const body = {
      pro_id: pro_id
    }
    await axios.post(api, body)
      .then((res) => {
        console.log(">>", res);
        Shortlist.removeItem({
          pro_id: pro_id,
        });
        const index = activeItems.indexOf(pro_id);

        if (index === -1) {
          setActiveItems([...activeItems, pro_id]);
        } else {
          setActiveItems(activeItems.filter((i) => i !== pro_id));
        }
      })
      .catch((err) => console.log(err));
  };

  const viewshortlist = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const api = config.API_URL + "clint/shortlist/viewAll"

    const body = {
      ip_add: res.data.IPv4,
      usr_id: usr_id
    }
    await axios.post(api, body)
      .then((res) => {
        var shortlistData = res.data.data;
        shortlistData.map((value) => {
          var allshortlist = activeItems.push(value.pro_id);
          setActiveItems([...activeItems, allshortlist]);
        })
      }).catch((err) => console.log(err));


  }











  return (
    <div>
      <Header />

      {/* <!-- save_modal --> */}
      <div className="by_save_model">
        <div className="modal fade" id="exampleModalctsave" tabIndex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="center_model">
                    <h4>SAVED SEARCH</h4>
                    <input type="text" className="form-control" placeholder="Enter Your Title Saved property"
                      aria-label="First name" />
                  </div>
                  <a className="model_but" href="#">Save Search</a>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* <!-- save_modal --> */}



      <div className="short_model">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="modal-content">
              <div className="modal-body">
                <h6><img src="images/model_bel.jpg" alt="img" /> Get Personalized Email Alerts that
                  match your
                  requirement</h6>
                <form>
                  <div className="center_model">
                    <p>
                      Your Requirement
                    </p>

                    <div className="form_sel">
                      <select className="searchSelect">
                        <option value="">Buy</option>
                        <option value="1">Rent</option>
                      </select>
                      <select className="searchSelect">
                        <option value="">Select Type</option>
                        <option value="321">Residential Flat</option>
                        <option value="320">Residential House</option>
                        <option value="319">Residential Plot</option>
                        <option value="322">Builder Floor Apartment</option>
                        <option value="324">Commercial Land</option>
                        <option value="325">Commercial Office Space</option>
                        <option value="326">Commercial Shop</option>
                        <option value="327">Commercial Showroom</option>
                        <option value="342">Residential Villa / Duplex</option>
                        <option value="352">Industrial Plot</option>
                        <option value="356">Commercial Warehouse</option>
                        <option value="357">Affordable Housing Project</option>
                      </select>

                      <select className="searchSelect">
                        <option value="">-Min Price-</option>
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
                      <select className="searchSelect">
                        <option value="">-Max Price-</option>
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
                      <select className="searchSelect">
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
                        <input type="text" className="form-control" placeholder="name"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Email"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Country Code"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Phone"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">

                        <img src="images/form_img.jpg" className="img-fluid" alt="img" />

                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Enter Security Code"
                          aria-label="First name" />
                      </div>
                    </div>
                  </div>
                  <a className="model_but" href="#">submit</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="email_form_by">
        <div className="modal fade" id="exampleModalnine" tabIndex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">

              <div className="top_mail">
                <h6>contact ({propertyname})</h6>
                <a className="email_close btn-close" data-bs-dismiss="modal" aria-label="Close"
                ></a>
              </div>
              <form onSubmit={AddContact}>

                <input type="text" className="form-control" placeholder="Name" maxLength="30" required
                  value={fname}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFname(e.target.value)
                  }}
                />

                <input type="Email" className="form-control" placeholder="Email" maxLength="30" required
                  value={email}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setEmail(e.target.value)
                  }}
                />

                <input type="text" className="form-control" placeholder="Mobile" maxLength="10" required
                  value={phone}
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                    if (regex.test(input)) {
                      setPhone(input);
                    } else {
                      alert('Please enter only 10 numeric characters!');
                    }
                  }}
                />

                <div className="form_icon">
                  <input className="form-check-input" type="radio" name="flexRadioDefault"
                    id="flexRadioDefault11"
                    value="Im interested, Please get in touch with me"
                    checked={message === 'Im interested, Please get in touch with me'}
                    onChange={handleChange}

                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    <h5>I'm interested, Please get in touch with me</h5>
                  </label>

                </div>


                <div className="form_icon">
                  <input className="form-check-input" type="radio" name="flexRadioDefault"
                    id="flexRadioDefault13" value="View Contact Details"
                    checked={message === 'View Contact Details'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1"

                  >
                    <h5>View Contact Details</h5>
                  </label>

                </div>
                <div className="form_icon">
                  <input className="form-check-input" type="radio" name="flexRadioDefault"
                    id="flexRadioDefault13" value="I Would Like To Call Now"
                    checked={message === 'I Would Like To Call Now'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1"

                  >
                    <h5>I Would Like To Call Now</h5>
                  </label>

                </div>

                <div>
                  <h4 style={{
                    color: '#000',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundImage: 'url(https://c1.wallpaperflare.com/preview/870/79/678/banner-header-graph-paper-squared-paper.jpg)',
                      backgroundSize: 'cover',
                      padding: '0.2em 0.5em',
                      borderRadius: '0.3em',
                      margin: '0 0.2em',
                      userSelect: 'none'
                    }}
                      onCopy={(e) => e.preventDefault()} // Prevent default copy behavior

                    >
                      {captcha}
                    </span><br></br>
                    {captchaError || <div className="error">{captchaError}</div>}
                  </h4>

                </div>
                <input type="text" className="form-control" placeholder="Enter Security Code"
                  aria-label="First name" required
                  value={captchavalue}
                  onChange={(e) => {
                    setcaptchavalue(e.target.value)

                  }}



                />
                <div className="form_icon">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" required
                  />
                  <label className="form-check-label" htmlFor="flexCheckIndeterminate" required>
                    <p className="agree"> I Agree To Be Contacted By Propertybull And Others For
                      Similar
                      Properties.</p>
                  </label>
                </div>
                {/* <a href="#" data-bs-dismiss="modal" aria-label="Close" onClick={AddContact}  >submit</a> */}
                <button className="email_detail_btn">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="by_all">

        <div className="top_part">
          <div className="img_left">
            <h6>
              Related Properties
            </h6>
          </div>

          <div className="img_left">
            <img src={config.SITE_URL + "images/bell-ring.gif"} alt="img" /><a data-bs-toggle="modal" data-bs-target="#exampleModal"
              href="#">Set Property Alerts for this Search</a>
          </div>
        </div>


        <div className="by_right_deta">
          <div className="row">
            <div className="col-lg-3">
              <form>
                <div className="lefserch">
                  <p>Advanced Search:</p>
                  <h5>
                    Search By Id
                  </h5>
                  <div className="top_input">
                    <input type="text" className="form-control"
                      placeholder="Search Id" aria-label="First name" onChange={(e) => {
                        console.log(e.target.value)
                        HandleSearch(e.target.value, "", '');
                        console.log(e.target.value);
                      }}
                    />
                  </div>

                  <h5>
                    Property Category
                  </h5>
                  <div className="by_chack">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Sell" id="Sell" checked={selectedoption === "Sell"}
                        onChange={(event) => HandleSearch('', event.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        For Sell
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Rent" id="Rent" checked={selectedoption === "Rent"}
                        onChange={(event) => HandleSearch('', event.target.value)}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        For Rent
                      </label>
                    </div>
                  </div>
                  <h5>
                    Localities
                  </h5>
                  <div className="by_chack scroll">
                    {location.map((value) => {
                      return (
                        <div className="form-check" key={value.id}>

                          <input className="form-check-input" type="checkbox"
                            checked={selectedLocation === value.id}
                            value={value.id} id={value.id} onChange={(event) => HandleSearch('', "", value.id)}
                          />
                          <label className="form-check-label" htmlFor={value.id}>{value.name}
                          </label>

                        </div>
                      )
                    })}

                  </div>
                  <h5>
                    Price
                  </h5>
                  <div className="sele_cover_box">
                    <div className="row g-0">
                      <div className="col-lg-6 by_se_box">
                        <select className="by_select" value={selectedMinPrice} onChange={handleMinPriceChange}>
                          <option>-Min Price-</option>
                          {minPrices.map((price) => (
                            <option key={price} value={price.toString()}>
                              {price ? price >= 10000000 ? (price / 10000000).toFixed(1) + ' crore'
                                : price >= 100000
                                  ? (price / 100000).toFixed(1) + ' Lacs'
                                  : price.toLocaleString()
                                : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-6 by_se_box">
                        <select className="by_select" value={selectedMaxPrice} onChange={handleMaxPriceChange}>
                          <option>-Max Price-</option>
                          {maxPrices
                            .filter((price) => price > Number(selectedMinPrice))
                            .map((price) => (
                              <option key={price} value={price.toString()}>
                                {price ? price >= 10000000 ? (price / 10000000).toFixed(1) + ' crore'
                                  : price >= 100000
                                    ? (price / 100000).toFixed(1) + ' Lacs'
                                    : price.toLocaleString()
                                  : ''}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <h5>
                    Built Up (sq-ft)
                  </h5>

                  <div className="sele_cover_box">
                    <div className="row g-0">
                      <div className="col-lg-6 by_se_box">
                        <select className="by_select" value={selectedMinArea} onChange={handleMinAreaChange}>
                          <option>-Min Area-</option>
                          {minarea.map((area) => (
                            <option key={area} value={area.toString()}>
                              {area} Sq Ft
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-6 by_se_box">
                        <select className="by_select" value={selectedMaxArea} onChange={handleMaxAreaChange}>
                          <option>-Max Area-</option>
                          {maxarea
                            .filter((area) => area > Number(selectedMinArea))
                            .map((area) => (
                              <option key={area} value={area.toString()}>
                                {area} Sq Ft
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <h5>
                    No of Bedrooms
                  </h5>
                  <div className="by_chack">
                    <div className="row g-0">
                      <div className="col-lg-6 by_se_box">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="1" checked={selectedroom === "1"}
                            id="1" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)}
                          />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            1
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="3"
                            id="3" checked={selectedroom === "3"}
                            onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)}
                          />
                          <label className="form-check-label" htmlFor="flexCheckDefault" >
                            3
                          </label>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="5" checked={selectedroom === "5"}
                            id="5" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            5
                          </label>
                        </div><div className="form-check">
                          <input className="form-check-input" type="checkbox" value="7" checked={selectedroom === "7"}
                            id="7" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            7
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 by_se_box">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="2" checked={selectedroom === "2"}
                            id="2" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            2
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="4" checked={selectedroom === "4"}
                            id="4" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            4
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" checked={selectedroom === "6"}

                            value="6"
                            id="6" onChange={(event) => HandleSearch('', "", '', '', '', event.target.value)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            6
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5>
                    Property Type
                  </h5>
                  <div className="by_chack scroll">
                    {propertytype.map((e) => {
                      return (
                        <div className="form-check" key={e.id}>

                          <input className="form-check-input" type="checkbox"
                            checked={selectedP_typeid === e.id}
                            value={e.id} id={e.id} onChange={(event) => HandleSearch('', '', '', '', '', '', e.id)} />
                          <label className="form-check-label" htmlFor="flexCheckDefault">{e.name}
                          </label>

                        </div>
                      )
                    })}

                  </div>
                  <h5>
                    Age of building
                  </h5>


                  <div className="by_chack ">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Under Construction" id="Under Construction" checked={selectedage == "Under Construction"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Under Construction
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox"
                        value="1" id="1" checked={selectedage == "1"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        1
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="2" id="2" checked={selectedage == "2"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        2
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="3" id="3" checked={selectedage == "3"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        3
                      </label>
                    </div> <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="4" id="4" checked={selectedage == "4"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        4
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="5" id="5" checked={selectedage == "5"} onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        5
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" checked={selectedage == "6"} value="6" id="6" onChange={(event) => HandleSearch('', '', '', '', '', '', '', event.target.value)} />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        5-10
                      </label>
                    </div>
                  </div>
                  <div className="by_popup_button">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModalctsave"><i
                      className="fa-regular fa-floppy-disk"></i>
                      <span>save</span></a>
                    <Link className="share_soc" to="#" data-bs-toggle="dropdown"
                      aria-expanded="false"><i className="fa fa-share-alt fa-lg"></i><span>Share</span></Link>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton-2">
                      <ul className="soci_serch">
                        <li><a href={`https://plus.google.com/share?url=${window.location.origin.replace(
                        )}${window.location.pathname}`}
                          target="_blank"><i className="fa-brands fa-google-plus-g"></i>
                        </a></li>


                        <TwitterShareButton url={currentURL} >
                          <TwitterIcon size={25} round={true} />
                        </TwitterShareButton>


                        <FacebookShareButton url={currentURL}>
                          <FacebookIcon size={25} round={true} />
                        </FacebookShareButton>
                      </ul>
                    </div>
                  </div>
                  <div className="by_bottom_form">
                    <Link to="#" onClick={(event) =>

                      HandleSearch('', '', '', "", '', '', '')} >Reset</Link>
                  </div>


                </div>
              </form>
            </div>

            <div className="col-lg-9">
              <div className="by_right_part">
                <div className="right_top_part">
                  <ul>
                    <Link to="/property/search/1/all-property-buy">
                      <li> Properties ({count})</li></Link>
                    <Link to="/property/search/1/project-buy/">
                      <li> Projects({projectcount})</li></Link>
                    {/* <li><a href="./by.html"> Posted By Agents (305)</a></li> */}
                  </ul>
                </div>
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
                  <div>
                    {property.slice(0, displayedItems).map((value) => {
                      if (value.User != null) {
                        LocationState = value.User.name;
                      } else {
                        LocationState = "---";
                      }

                      if (value.Location != null) {
                        StateLocation = value.Location.name;
                      } else {
                        StateLocation = "---";
                      } if (value.User != null) {
                        RoleData = value.User.role_id;
                      } else {
                        RoleData = "---";
                      }
                      if (value.propertyType != null) {
                        proertytypes = value.propertyType.name
                      } else {
                        proertytypes = "-"
                      }
                      return (
                        <div key={value.id} className="cover_box">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="totle_area">
                                <div className="img-overflow">
                                  <Link to={`/propertyshow/${value.url}`}>


                                    <img alt="Image" src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/images/no-image.jpg"} />

                                  </Link>

                                </div>
                                <div className="Individual">
                                  <h6>{RoleData === 1 ? "Admin" : RoleData === 4 ? "Builder" : RoleData === 2 ? "Owner" : RoleData === 3 ? "Agent" : null}</h6>
                                  <span>{LocationState}</span>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-8">
                              <div className="by_right_main">
                                <div className="abc_appartment">

                                  <Link to={`/projectshow/${value.url}`} className="abc_click">
                                    {value.name}
                                  </Link>
                                  <p>
                                    {proertytypes} <span>Property Id : {value.id}</span> <span>Locality :
                                      {StateLocation}</span>
                                    <span> <b className="text-dark">Total Area</b> : {value.area} sq Ft</span>
                                  </p>
                                </div>



                                <div className="short_right">


                                  {activeItems.includes(value.id) ?
                                    <div className="short_button">
                                      <Link className='fdsffdsaf' onClick={() => deleteshortlist(value.id)}>
                                        <i className="fa fa-star fa-lg black"></i> Shortlisted

                                      </Link>
                                    </div>
                                    :
                                    <div className="short_button" >
                                      <Link onClick={() => addShortlist(value.id)}>
                                        <i className="fa fa-star text-dark  fa-lg grey"></i>   Shortlist
                                      </Link>
                                    </div>
                                  }

                                  <h4>

                                    {(value.tot_price / 100000).toFixed(1) + ' Lacs'}

                                  </h4>

                                </div>
                              </div>
                              <div className="by_page_buttons">
                                <Link to={`/projectshow/${value.url}`}>
                                  More Detail</Link>


                                <a type="button" className="now_button ctform" data-bs-toggle="modal" data-bs-target="#exampleModalnine" onClick={() => {
                                  setPro_id(value.id);
                                  setPropertyname(value.name);
                                }} >
                                  Contact Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {
                showLoader ? (
                  <div className="loader">Loading...</div>
                ) : (
                  <button className="loader_bottam_btn" onClick={handleLoadMore} >Load More.....</button>
                )
              }
            </div>
          </div>
        </div>


      </div>





      <Footer />
    </div>
  )
}