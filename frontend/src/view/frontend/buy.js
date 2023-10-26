import { React, useState, useEffect, useContext } from "react";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from '../../config/config'
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import CartContext from "../../store/cart-context";
import SearchContext from "../../store/search-context";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Add } from "@mui/icons-material";
const URL = config.API_URL + "clint/property/Allproperty";
const ProjectURL = config.API_URL + "clint/property/Allproject";
const viewLocation = config.API_URL + "clint/home/viewLocation";
const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"
const PostedbyAgents = config.API_URL + "clint/property/viwpostbyagent";

export default function Buy() {
  const navigate = useNavigate();

  const Shortlist = useContext(CartContext);
  const SearchList = useContext(SearchContext);
  const searchResults = JSON.parse(localStorage.getItem("searchResults"));
  window.onbeforeunload = function () {
    localStorage.removeItem("searchResults");
  };
  const [category, setcategory] = useState("");
  const [p_typeid, setp_typeid] = useState("");
  const [min_price, setmin_price] = useState("");
  const [tot_price, settot_price] = useState("");
  const [max_price, setmax_price] = useState("");
  const [description, setdescription] = useState("");
  const [location_id, setlocation_id] = useState("");
  const [min_area, setmin_area] = useState("");
  const [max_area, setmax_area] = useState("");
  const [unit, setunit] = useState("");
  const [age, setage] = useState("");
  const [min_floor, setmin_floor] = useState("");
  const [max_floor, setmax_floor] = useState("");
  const [max_room, setmax_room] = useState("");
  const [min_room, setmin_room] = useState("");
  const [property, setProperty] = useState([]);
  const [project, setProject] = useState([]);
  const [projectcount, setprojectcount] = useState([]);
  const [property_id, setProperty_id] = useState("");
  const [check_list, setCheck_list] = useState([])
  const [propertyType_list, setpropertyType_list] = useState([])
  const [propertyAge_list, setPropertyAge_list] = useState([]);
  const [propertbadroom_list, setpropertbadroom_list] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setcount] = useState([]);
  const [location, setLocation] = useState([]);
  const [propertytype, setPropertytype] = useState([]);
  const [postedbyProperty, setPostedbyProperty] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(10);
  const itemsPerLoad = 10;
  const [showLoader, setShowLoader] = useState(false);
  const [tost, setTost] = useState(false);
  const [tostmessage, setTostmessage] = useState("");
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("I'm Interested, Please Get In Touch With Me");
  const [phone, setPhone] = useState("");
  const [cus_id, setCus_id] = useState("");
  const [ip_add, setip_add] = useState("");
  const [usr_id, setusr_id] = useState("0");
  const [type, setType] = useState("1");
  const [pro_id, setPro_id] = useState("");
  const [title, setTitle] = useState("");
  const [section1Data, setSection1Data] = useState('');
  const [section2Data, setSection2Data] = useState('');
  const [propertyname, setPropertyname] = useState("");
  const Id = JSON.parse(localStorage.getItem("userId"));
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setip_add(res.data.IPv4)
    console.log(Id)
    setusr_id(Id)
  }
  const propertyAge = [
    'Under Construction',
    '1', '2', '5', '10'

  ]

  const Propertbedroom = [
    '1', '2', '3', '4', '5', '6', '7',

  ]
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
        console.log(res, "res");
        Shortlist.addItem({
          pro_id: pro_id,
          ip_add: ip_add,
          usr_id: usr_id
        });
        const index = activeItems.indexOf(pro_id);
        console.log(index);
        if (index === -1) {
          setActiveItems([...activeItems, pro_id]);
          console.log('firsttime');
        } else {
          console.log('secondtime');
          setActiveItems(activeItems.filter((i) => i !== pro_id));
        }
        console.log(activeItems, "add shortlist");
      })
      .catch((err) => console.log(err))
  };
  const deleteshortlist = async (pro_id) => {
    const api = config.API_URL + "clint/shortlist/delete"
    const body = {
      pro_id: pro_id
    }
    await axios.post(api, body)
      .then((res) => {
        Shortlist.removeItem({
          pro_id: pro_id,
        });
        console.log(">>", res);
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

  useEffect(() => {
    viewshortlist();
    getData();
    generateCaptcha();

    const fetchData = async () => {
      let searchDataPromise = Promise.resolve(); // Placeholder promise if searchResults is not available
      if (searchResults) {
        const SearchUrl = config.API_URL + "clint/home/search";
        const idsArray = searchResults.location_id ? searchResults.location_id.split(",").map(id => parseInt(id)) : [];
        setCheck_list(idsArray);
        const protypes = searchResults.p_typeid ? searchResults.p_typeid.split(",").map(id => parseInt(id)) : [];
        setpropertyType_list(protypes);
        // const parsedAges = Age?Age.split(",").map(id => id.trim()): [];// Trim whitespace
        // setPropertyAge_list(parsedAges);
        const bedroomes = searchResults.room ? searchResults.room.split(",").map(id => id.trim()) : []; // Trim whitespace
        setpropertbadroom_list(bedroomes);
        setSelectedMinPrice(searchResults.tot_price);
        setcategory(searchResults.option)
        const body = {
          option: searchResults.option,
          location_id: searchResults.location_id,
          p_typeid: searchResults.p_typeid,
          tot_price: searchResults.tot_price,
          room: searchResults.room,
        };
        searchDataPromise = axios.post(SearchUrl, body)
          .then((res) => {
            console.log("=>>", res);
            setProperty(res.data.data);
          })
          .catch((err) => console.log(err));
      }

      const propertyDataPromise = fetch(URL)
        .then((response) => response.json())
        .then((value) => {
          setProperty(value.data.allproperty);
          console.log(value.data.data);
          setcount(value.data.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });

      await Promise.all([searchDataPromise, propertyDataPromise]);
    };

    fetchData();

    fetch(ProjectURL)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data);
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

    fetch(ProjectURL)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data.allproject);
        setprojectcount(value.data.data)
      });

    fetch(PostedbyAgents)
      .then((response) => response.json())
      .then((value) => {
        setPostedbyProperty(value.data);

      });



    const viewbanerlocation = config.API_URL + "clint/advertisementsubscription/bannerposition"
    // after 10 property by banners
    const body = {
      page: "Buy Page",
      banner_location: "After Every 10  Properties"
    }
    axios.post(viewbanerlocation, body)
      .then((response) => {
        console.log("🚀 ~ file: index.js:257 ~ .then ~ response:", response.data.data)
        setSection1Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 1 data:', error);
      });

    const body2 = {
      page: "Buy Page",
      banner_location: "Below Filter Form"
    }
    axios.post(viewbanerlocation, body2)
      .then((response) => {
        setSection2Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 2 data:', error);
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
  var LocationState, StateLocation, RoleData, PropertyTypeData;

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
      cus_id: Id ? Id : 0,


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
        })
        .catch((err) => {
          setTost(true)
          setTostmessage(err.response.data.message)
          // console.log(Tost)
        });
      closeModal();
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

  // Advanced sarch
  const [id, setId] = useState("");
  const HandleSearch = (p_typeid, location_id, tot_price, age, room, area, id, option) => {
    setIsLoading(true);
    setp_typeid(p_typeid);
    setlocation_id(location_id);
    setage(age);
    setmax_room(room);
    setmin_room(room);
    const SearchUrl = config.API_URL + "clint/home/search";
    const body = {
      p_typeid: p_typeid,
      location_id: location_id,
      tot_price: tot_price,
      age: age,
      room: room,
      area: area,
      id: id,
      option: option
    };
    console.log("body", body)
    axios.post(SearchUrl, body)
      .then(response => {
        const data = response.data.data;
        setProperty(data);
        console.log("🚀 ~ file: buy.js:447 ~ HandleSearch ~ data:", data)
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        // Call your rendering function or update state with the received data
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error(error);
      });
  };

  //Min and Max price  functionality for Advance searching
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

  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');

  const handleMinPriceChange = (e) => {
    const selectedMinPrice = e.target.value;
    setSelectedMinPrice(selectedMinPrice);
    setmin_price(selectedMinPrice);
    const selectedMinIndex = minPrices.indexOf(Number(selectedMinPrice));
    const updatedMaxPrices = maxPrices.slice(selectedMinIndex + 1);
    const updatedSelectedMaxPrice = updatedMaxPrices[0].toString();
    setSelectedMaxPrice(updatedSelectedMaxPrice);
    const priceRangeArray = [selectedMinPrice, updatedSelectedMaxPrice];
    settot_price(priceRangeArray);
    HandleSearch(p_typeid, location_id, priceRangeArray, age, max_room, min_area, '', category);
  };
  const handleMaxPriceChange = (e) => {
    const selectedMaxPrice = e.target.value;
    setSelectedMaxPrice(selectedMaxPrice);
    setmax_price(selectedMaxPrice);
    const priceRangeArray = [selectedMinPrice, selectedMaxPrice];
    HandleSearch(p_typeid, location_id, priceRangeArray, age, max_room, min_area, '', category);
  };
  const minarea = [
    10, 50, 75, 100, 125, 150, 175, 200, 250, 300,
    400, 500, 750, 1000, 1250, 1500, 2000, 2500, 3000
  ];

  const maxarea = [
    10, 50, 75, 100, 125, 150, 175, 200, 250, 300,
    400, 500, 750, 1000, 1250, 1500, 2000, 2500, 3000
  ];

  const [selectedMinArea, setSelectedMinArea] = useState('');
  const [selectedMaxArea, setSelectedMaxArea] = useState('');


  const handleMinAreaChange = (e) => {
    const selectedMinarea = e.target.value;
    setSelectedMinArea(selectedMinarea);
    const selectedMinIndex = minarea.indexOf(Number(selectedMinarea));
    const updatedMaxPrices = maxarea.slice(selectedMinIndex + 1);
    setSelectedMaxArea(updatedMaxPrices[0].toString());
    HandleSearch(p_typeid, location_id, tot_price, age, max_room, selectedMaxArea, '', category);
    const priceRangeArray = [selectedMinarea, selectedMaxArea];
    setmin_area(priceRangeArray);
    HandleSearch(p_typeid, location_id, tot_price, age, max_room, priceRangeArray, '', category);
  };
  const handleMaxAreaChange = (e) => {
    const selectedMaxPrice = e.target.value;
    setSelectedMaxArea(selectedMaxPrice);
    HandleSearch(p_typeid, location_id, tot_price, age, max_room, selectedMaxPrice, '', category);
    setmin_area(selectedMaxPrice);
  };
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  const savesearchdata = async (pro_id) => {
    const apiUrl = config.API_URL + "clint/savesearch/add"
    const selectedLocationsString = check_list ? check_list.join(',') : "-"
    const selectedpropertytypeString = propertyType_list ? propertyType_list.join(',') : "-"
    const selectedbadroom = propertbadroom_list ? propertbadroom_list.join(',') : "-"
    const selectedAge = propertyAge_list ? propertyAge_list.join(',') : "-"
    const selectedmin_area = min_area ? min_area.join(',') : "-"
    const body = {
      title: title,
      property_name: property_id,
      category: category,
      p_typeid: selectedpropertytypeString,
      state_id: 99,
      min_price: min_price,
      max_price: max_price,
      description: description,
      city_id: 27,
      min_area: selectedmin_area ? selectedmin_area : "",
      max_area: max_area ? max_area : "",
      unit: unit ? unit : "",
      cus_id: Id,
      room: selectedbadroom ? selectedbadroom : "",
      location_id: selectedLocationsString ? selectedLocationsString : "",
      age: selectedAge ? selectedAge : "",
    };
    await axios.post(apiUrl, body)
      .then((res) => {
        const id = res.data.data.id;
        SearchList.addItem({
          id: id,
        });
        closeModals()
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
        setTitle("")
        HandleSearch("")
      })
      .catch((err) => console.log(err))
  };


  const closeModals = () => {
    const modal = document.getElementById("exampleModalctsave");
    const backdrop = document.getElementsByClassName("modal-backdrop")[0];

    modal.classList.remove("show");
    modal.style.display = "none";

    backdrop.parentNode.removeChild(backdrop); // Remove the backdrop element

    // Enable scrolling
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
  };
  let packageName;

  return (
    <div>
      <Header />
      <ToastContainer />
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
                      aria-label="First name"
                      value={title}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setTitle(e.target.value)
                      }} />
                  </div>
                  <Link className="model_but" onClick={savesearchdata}>Save Search</Link>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="modelprject">
        <div class={tost == true ? "modal fade show" : "modal fade"} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: tost == true ? "block" : "none" }}>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header" style={{ background: "#2E5B6E", color: "white" }}>
                <a href="#"> <div class="projectmodelclose" onClick={(e) => {
                  setTost(e.target.value);
                  console.log(e.target.value);
                }}></div></a>
              </div>
              <div class="modal-body">
                {tostmessage}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn " style={{ background: "rgb(136 172 46)", color: "white", padding: ' 5px 15px' }} data-bs-dismiss="modal" value="false" onClick={(e) => {
                  setTost(e.target.value);
                  console.log(e.target.value);
                }}>Close</button>
                <Link to="/subscription" >  <button type="button" class="btn " style={{ background: "#2fa6b1", color: "white", padding: ' 5px 15px', marginLeft: "15px" }}>Update</button></Link>
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
                <h6>Contact ({propertyname})</h6>
                <Link className="email_close btn-close" data-bs-dismiss="modal" aria-label="Close"
                  to="#"></Link>
              </div>
              <form onSubmit={AddContact}>

                <input type="text" className="form-control" placeholder="Name" maxLength="30" required
                  value={fname}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFname(e.target.value)
                  }}
                />

                <input type="email" className="form-control" placeholder="Email" maxLength="30" required
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
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault11"
                    value="Im interested, Please get in touch with me"
                    checked={message === "Im interested, Please get in touch with me"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault11">
                    <h5>I'm interested, Please get in touch with me</h5>
                  </label>
                </div>

                <div className="form_icon">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault13"
                    value="View Contact Details"
                    checked={message === 'View Contact Details'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault13">
                    <h5>View Contact Details</h5>
                  </label>
                </div>

                <div className="form_icon">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault13"
                    value="I Would Like To Call Now"
                    checked={message === 'I Would Like To Call Now'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault13">
                    <h5>I Would Like To Call Now</h5>
                  </label>
                </div>


                <div>
                  <h4 style={{
                    color: '#000',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                      backgroundSize: 'cover',
                      padding: '0.2em 0.5em',
                      borderRadius: '0.3em',
                      margin: '0 0.2em',
                      userSelect: 'none' // Prevent text selection
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
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" required />
                  <label className="form-check-label" htmlFor="flexCheckIndeterminate" required>
                    <p className="agree"> I Agree To Be Contacted By Propertybull And Others For
                      Similar
                      Properties.</p>
                  </label>
                </div>
                <button className="email_detail_btn">submit</button>
              </form>
              {success && (
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <h4>Thankyou for Contact your request send to Admin!!
                    </h4></div>
                </div>
              )}

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
            <img src={config.SITE_URL + "images/bell-ring.gif"} alt="img" />
            <Link
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              to="#">Set Property Alerts for this Search</Link>
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
                    <input type="text" className="form-control" placeholder="Search Id" aria-label="First name"
                      value={id}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setId(e.target.value);
                        setProperty_id(e.target.value)
                        HandleSearch('', '', '', '', '', '', e.target.value)
                      }}
                    />
                  </div>
                  <h5>
                    Property Category
                  </h5>
                  <div className="by_chack">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="sell" id="flexCheckChecked"
                        checked={category == "sell"}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setcategory(e.target.value)
                          HandleSearch(p_typeid, location_id, tot_price, age, max_room, min_area, '', e.target.value,)
                        }}
                      />
                      <label className="form-check-label" htmlFor="flexCheckChecked">
                        For Buy
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Rent" id="flexCheckDefault"
                        checked={category == "Rent"}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setcategory(e.target.value)
                          HandleSearch(p_typeid, location_id, tot_price, age, max_room, min_area, '', e.target.value,)
                        }}
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
                    {location.map((value) => (
                      <div className="form-check" key={value.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={value.id}
                          value={value.id}
                          checked={check_list.includes(value.id)}
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            const isChecked = e.target.checked;

                            let updatedList = [...check_list]; // Create a copy of the current check_list

                            if (isChecked) {
                              updatedList.push(id); // Add the ID to the list
                            } else {
                              updatedList = updatedList.filter((item) => item !== id); // Remove the ID from the list
                            }

                            setCheck_list(updatedList); // Update the state
                            HandleSearch(p_typeid, updatedList, tot_price, age, max_room, min_area, '', category,)
                          }}
                        />
                        <label className="lables" htmlFor={`feature-${value.id}`}>
                          {value.name}
                        </label>
                      </div>
                    ))}
                  </div>


                  <h5>
                    Price
                  </h5>

                  <div className="sele_cover_box">
                    <div className="row g-0">
                      <div className="col-lg-6 by_se_box">
                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                          <InputLabel id="demo-select-small-label">Max Price</InputLabel>
                          <Select value={selectedMinPrice} onChange={handleMinPriceChange}
                          >
                            {minPrices.map((price) => (
                              <MenuItem key={price} value={price.toString()}>
                                {price
                                  ? price >= 10000000
                                    ? (price / 10000000).toFixed(1) + ' crore'
                                    : price >= 100000
                                      ? (price / 100000).toFixed(1) + '  Lacs'
                                      : price.toLocaleString()
                                  : 'Price Not Disclosed'}
                              </MenuItem>
                            ))}

                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-lg-6 by_se_box">
                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                          <InputLabel id="demo-simple-select-label">Max Price</InputLabel>
                          <Select value={selectedMaxPrice} onChange={handleMaxPriceChange}
                          >
                            {maxPrices
                              .filter((price) => price > Number(selectedMinPrice))
                              .map((price) => (
                                <MenuItem key={price} value={price.toString()}>
                                  {price
                                    ? price >= 10000000
                                      ? (price / 10000000).toFixed(1) + ' crore'
                                      : price >= 100000
                                        ? (price / 100000).toFixed(1) + '  Lacs'
                                        : price.toLocaleString()
                                    : 'Price Not Disclosed'}
                                </MenuItem>
                              ))}

                          </Select>
                        </FormControl>

                      </div>
                    </div>
                  </div>
                  <h5>
                    Built Up (Sq-Ft)
                  </h5>
                  <div className="sele_cover_box">
                    <div className="row g-0">

                      <div className="col-lg-6 by_se_box">
                        {/* <select className="by_select" value={selectedMinArea} onChange={handleMinAreaChange}>
                          <option>Least</option>
                          {minarea.map((area) => (
                            <option key={area} value={area.toString()}>
                              {area} Sq Ft
                            </option>
                          ))}
                        </select> */}

                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                          <InputLabel id="demo-simple-select-label">Least</InputLabel>
                          <Select value={selectedMinArea} onChange={handleMinAreaChange}
                          >
                            {minarea.map((area) => (
                              <MenuItem key={area} value={area.toString()}>  {area} Sq Ft</MenuItem>
                            ))}

                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-lg-6 by_se_box">

                        <FormControl sx={{ m: 1, width: '100%' }} size="small">
                          <InputLabel id="demo-simple-select-label">Most</InputLabel>
                          <Select value={selectedMaxArea} onChange={handleMaxAreaChange}
                          >
                            {maxarea.map((area) => (
                              <MenuItem key={area} value={area.toString()}>  {area} Sq Ft</MenuItem>


                            ))}

                          </Select>
                        </FormControl>
                        {/* <select className="by_select" value={selectedMaxArea} onChange={handleMaxAreaChange}>
                          <option>Most</option>
                          {maxarea
                            .filter((area) => area > Number(selectedMinArea))
                            .map((area) => (
                              <option key={area} value={area.toString()}>
                                {area} Sq Ft
                              </option>
                            ))}
                        </select> */}
                      </div>
                    </div>
                  </div>
                  <h5>
                    No of Bedrooms
                  </h5>
                  <div className="by_chack">
                    <div className="row g-0">
                      <div className="col-lg-6 by_se_box">
                        {Propertbedroom.map((value, index) => (
                          <div className="form-check" key={`age-${index}`}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={value}
                              id={`propertyAge-${index}`}
                              checked={propertbadroom_list.includes(value)}
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const isChecked = e.target.checked;
                                let updatedList = isChecked
                                  ? [...propertbadroom_list, selectedValue]
                                  : propertbadroom_list.filter((item) => item !== selectedValue);
                                setpropertbadroom_list(updatedList);
                                HandleSearch(p_typeid, location_id, tot_price, age, updatedList, min_area, '', category);
                              }}
                            />
                            <label className="form-check-label" htmlFor={`propertyAge-${index}`}>
                              {value}
                            </label>
                          </div>
                        ))}


                      </div>


                    </div>
                  </div>
                  <h5>
                    Property Type
                  </h5>
                  <div className="by_chack scroll">
                    {propertytype.map((value) => (
                      <div className="form-check" key={value.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={value.id}
                          value={value.id}
                          checked={propertyType_list.includes(value.id)} // Check if this checkbox should be checked
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            const isChecked = e.target.checked;
                            let updatedListes = [...propertyType_list]; // Create a copy of the current check_list

                            if (isChecked) {
                              updatedListes.push(id); // Add the ID to the list
                            } else {
                              updatedListes = updatedListes.filter((item) => item !== id); // Remove the ID from the list
                            }
                            setpropertyType_list(updatedListes)
                            HandleSearch(updatedListes, location_id, tot_price, age, max_room, min_area, '', category);
                          }}
                        />
                        <label className="lables" htmlFor={`feature-${value.id}`}>
                          {value.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h5>
                    Age of Building
                  </h5>

                  <div className="by_chack ">
                    {propertyAge.map((value, index) => (
                      <div className="form-check" key={`age-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={value}
                          id={`propertyAge-${index}`}
                          checked={propertyAge_list.includes(value)}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const isChecked = e.target.checked;

                            let updatedList = isChecked
                              ? [...propertyAge_list, selectedValue]
                              : propertyAge_list.filter((item) => item !== selectedValue);

                            setPropertyAge_list(updatedList); // Update the state

                            HandleSearch(p_typeid, location_id, tot_price, updatedList, max_room, min_area, '', category);
                          }}
                        />
                        <label className="form-check-label" htmlFor={`propertyAge-${index}`}>
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="by_popup_button">

                    {Id ? <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModalctsave"><i
                      className="fa-regular fa-floppy-disk"></i>
                      <span>Save</span></Link> :
                      <Link to="/users/login"><i className="fa-regular fa-floppy-disk"></i>
                        <span>Save</span></Link>}
                    {/* <Link className="share_soc" to="#" data-bs-toggle="dropdown"
                      aria-expanded="false"><i className="fa fa-share-alt fa-lg"></i><span>Share</span></Link> */}

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
              <div className="pt-5">


{section2Data == null ? (
  ""
) : (
  section2Data.status == "Y" ? (
    <img
      alt="Image"
      src={config.Image_URL + section2Data.banner}
      style={{
        width: section2Data.Advertisement ? section2Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
        height: section2Data.Advertisement ? section2Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
      }}
    />
  ) : ""
)}
              </div>

            </div>
            <div className="col-lg-9">
              <div className="by_right_part">
                <div className="right_top_part">
                  <ul>
                    <Link to="/property/search/1/all-property-buy">
                      <li> Properties ({property.length})</li></Link>
                    <Link to="/property/search/1/project-buy/">
                      <li> Projects({projectcount})</li></Link>
                    <Link to="/property/search/1/agent/" >
                      <li> Posted By Agents:({postedbyProperty.length})</li></Link>
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
                    {property.slice(0, displayedItems).map((value, index) => {
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
                      } if (value.propertyType != null) {
                        PropertyTypeData = value.propertyType.name;
                      } else {
                        PropertyTypeData = "---";
                      }
                      if (value.SaveOrder != null) {
                        packageName = value.SaveOrder.Subscription.package_name
                      } else {
                        packageName = "-"
                      }
                      if ((index + 1) % 10 === 0 && section1Data && section1Data.status === "Y") {
                        return (
                          <div>
                            <div className="cover_box" key={value.id}>
                              <div class="product">
                                <div class="ribbon-wrapper">
                                  <div class="ribbon">{packageName}</div>
                                </div>
                              </div>
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

                                      <Link to={`/propertyshow/${value.url}`} className="abc_click">
                                        {value.name}
                                      </Link>
                                      <p>
                                        {PropertyTypeData} <span>Property Id : {value.id}</span> <span>Locality :
                                          {StateLocation}</span>
                                        <span> <b className="text-dark">Total Area</b> : {value.area} {value.a_unit}</span>
                                      </p>
                                    </div>



                                    <div className="short_right">


                                      {activeItems.includes(value.id) ?
                                        <div className="short_button">
                                          <Link to="#" className='fdsffdsaf' onClick={() => deleteshortlist(value.id)}>
                                            <i className="fa fa-star fa-lg black"></i> Shortlisted

                                          </Link>
                                        </div>
                                        :
                                        <div className="short_button" >
                                          <Link to="#" onClick={() => addShortlist(value.id)}>
                                            <i className="fa fa-star text-dark  fa-lg grey"></i>   Shortlist
                                          </Link>
                                        </div>
                                      }

                                      <h4>
                                        {/* 2.2 Lacs */}
                                        {/* {(value.tot_price / 100000).toFixed(1) + ' Lacs'} */}
                                        {value.tot_price
                                          ? value.tot_price >= 10000000
                                            ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                            : value.tot_price >= 100000
                                              ? (value.tot_price / 100000).toFixed(1) + '  Lacs'
                                              : value.tot_price.toLocaleString()
                                          : 'Price Not Disclosed'}

                                      </h4>

                                    </div>
                                  </div>
                                  <div className="by_page_buttons">
                                    <Link to={`/propertyshow/${value.url}`}>
                                      More Detail</Link>

                                    {/* <a className="now_button ctform ">Contact
                              Now</a> */}
                                    {/* <a type="button" className="now_button ctform" data-bs-toggle="modal" data-bs-target="#exampleModalnine" onClick={() => setPro_id(value.id)} > */}


                                    <a type="button" className="now_button ctform" data-bs-toggle="modal" data-bs-target="#exampleModalnine" onClick={() => {
                                      setPro_id(value.id);
                                      setPropertyname(value.name);
                                    }}>
                                      Contact Now
                                    </a>
                                  </div>
                                </div>

                              </div>

                            </div>
                            <div className="pt-2">
                            {section1Data == null ? (
                              ""
                            ) : (
                              section1Data.status == "Y" ?

                                <img
                                  alt="Image"
                                  src={config.Image_URL + section1Data.banner}
                                  style={{
                                    width: section1Data.Advertisement ? section1Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
                                    height: section1Data.Advertisement ? section1Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
                                  }}
                                /> : ""
                            )}
                          </div>
                          </div>

                        )
                      } else {

                        return (
                          <div>
                            <div className="cover_box" key={value.id}>
                              <div class="product">
                                <div class="ribbon-wrapper">
                                  <div class="ribbon">{packageName}</div>
                                </div>
                              </div>
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

                                      <Link to={`/propertyshow/${value.url}`} className="abc_click">
                                        {value.name}
                                      </Link>
                                      <p>
                                        {PropertyTypeData} <span>Property Id : {value.id}</span> <span>Locality :
                                          {StateLocation}</span>
                                        <span> <b className="text-dark">Total Area</b> : {value.area} {value.a_unit}</span>
                                      </p>
                                    </div>



                                    <div className="short_right">


                                      {activeItems.includes(value.id) ?
                                        <div className="short_button">
                                          <Link to="#" className='fdsffdsaf' onClick={() => deleteshortlist(value.id)}>
                                            <i className="fa fa-star fa-lg black"></i> Shortlisted

                                          </Link>
                                        </div>
                                        :
                                        <div className="short_button" >
                                          <Link to="#" onClick={() => addShortlist(value.id)}>
                                            <i className="fa fa-star text-dark  fa-lg grey"></i>   Shortlist
                                          </Link>
                                        </div>
                                      }

                                      <h4>
                                        {/* 2.2 Lacs */}
                                        {/* {(value.tot_price / 100000).toFixed(1) + ' Lacs'} */}
                                        {value.tot_price
                                          ? value.tot_price >= 10000000
                                            ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                            : value.tot_price >= 100000
                                              ? (value.tot_price / 100000).toFixed(1) + '  Lacs'
                                              : value.tot_price.toLocaleString()
                                          : 'Price Not Disclosed'}

                                      </h4>

                                    </div>
                                  </div>
                                  <div className="by_page_buttons">
                                    <Link to={`/propertyshow/${value.url}`}>
                                      More Detail</Link>

                                    {/* <a className="now_button ctform ">Contact
                  Now</a> */}
                                    {/* <a type="button" className="now_button ctform" data-bs-toggle="modal" data-bs-target="#exampleModalnine" onClick={() => setPro_id(value.id)} > */}


                                    <a type="button" className="now_button ctform" data-bs-toggle="modal" data-bs-target="#exampleModalnine" onClick={() => {
                                      setPro_id(value.id);
                                      setPropertyname(value.name);
                                    }}>
                                      Contact Now
                                    </a>
                                  </div>
                                </div>

                              </div>

                            </div>

                          </div>

                        )
                      }
                    })}
                  </div>


                )}
              </div>


              {
                showLoader ? (
                  <div className="loader">Loading...</div>
                ) : (
                  <button className="loader_bottam_btn mt-4 " onClick={handleLoadMore} >Load More.....</button>
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