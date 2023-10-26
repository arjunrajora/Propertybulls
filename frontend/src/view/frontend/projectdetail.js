import { React, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Header from "../../element/frontHeader";
import config from "../../config/config"
import Footer from "../../element/frontFooter";
import { Collapse, Alert, colors, } from "@mui/material";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import CartContext from "../../store/cart-context";
import ReactCaptcha from 'modern-react-captcha';
import captchImg from '../../captcha.jpg'
const locationUrl = config.API_URL + "location/viewAll";

export default function Propertydetail() {
    const navigate = useNavigate();
    const Shortlist = useContext(CartContext);
    const { url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [similarproject, setSimilar_project] = useState([]);
    const [fname, setFname] = useState("");
    const [alertname, setAlertname] = useState("");
    const [alertemail, setAlertemail] = useState("");
    const [alertphone, setAlertphone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [country_code, setCountry_code] = useState("");
    const [p_typeid, setP_typeid] = useState("");
    const [category, setCategory] = useState("Buy");
    const [min_budget, setMin_budget] = useState("");
    const [max_budget, setMax_budget] = useState("");
    const StaticMessage = localStorage.getItem("staticAdded");
    const [staticAdded, setStaticAdded] = useState("");
    const [location_id, setLocation_id] = useState("");
    const [pro_id, setPro_id] = useState("");
    const [tost, setTost] = useState(false);
    const [tostmessage, setTostmessage] = useState("");
    const [usr_id, setusr_id] = useState("0");
    const [ip_add, setip_add] = useState("");
    const Id = JSON.parse(localStorage.getItem("userId"));
    const [isOpen, setIsOpen] = useState(false);
    const [isShortlisted, setIsShortlisted] = useState(false);
    const [detail, setdetail] = useState([]);
    const [price, setprice] = useState([]);
    const [room, setroom] = useState([]);
    const [bathroom, setbathroom] = useState([]);
    const [area, setarea] = useState([]);
    const [Open, setOpen] = useState(false);
    const [Openfrom, setOpenfrom] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const Ref = useRef(null);
    const [data, setData] = useState([]);
    const [captchaError, setCaptchaError] = useState('');
    const [captchavalue, setcaptchavalue] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [ptypeid, setPtypeid] = useState("");
    const [PropertyType, setPropertyType] = useState([]);
    const [selesctimg, setselesctimg] = useState(null);
    const [openStates, setOpenStates] = useState({});
    const [activeItems, setActiveItems] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [floorimg, setfloorimg] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [other, setOther] = useState([]);
    const [option, setOption] = useState("Sell");
    const [rooms, setRoom] = useState("");
    const [tot_price, setTot_price] = useState("");
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState('00:00');

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
   
    const handleshowfloorimg = (item) => {
        console.log(item, "iuhjgf");
        setfloorimg(item.img);
    };
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setip_add(res.data.IPv4)
        setusr_id(Id)
    }
    const similarprojects = config.API_URL + "clint/similarproject/view";
    useEffect(() => {
        viewshortlist()
        fetch(locationUrl)
            .then((response) => response.json())
            .then((value) => {
                setLocations(value.data);
            })
        getData()
        generateCaptcha();
        const projectdetail = config.API_URL + "clint/project/url/" + url;
        fetch(projectdetail)
            .then((response) => response.json())
            .then((value) => {
                console.log('id', value.data.id);
                var allshortlist = activeItems.push(value.data.id);
                setActiveItems([...activeItems, allshortlist]);
                setdetail(value.data)
                fetchData(value.data.p_typeid)
                otherproperty(value.data.id)
                console.log("value.data.project_id", value.data.id)
                setPro_id(value.data.id)
                setprice(value.data.propertydetails.map((item) => item.tot_price));
                setroom(value.data.propertydetails.map((item) => item.room));
                setbathroom(value.data.propertydetails.map((item) => item.bathroom))
                setarea(value.data.propertydetails.map((item) => item.area))
                setselesctimg(value.data.featureimage)
            })
        const api = config.API_URL + "clint/details/propertyType"
        fetch(api)
            .then((response) => response.json())
            .then((value) => {
                setPropertyType(value.data)
            });
        const fetchData = async (ptypeid) => {
            try {
                const bodys = {
                    p_typeid: ptypeid
                }
                const response = await axios.post(similarprojects, bodys);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                setSimilar_project(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const otherPropertyurl = config.API_URL + "clint/project/propertyadded/projectss"
        const otherproperty = async (ptypeid) => {
            try {
                const bodys = {
                    project_id: ptypeid
                }
                const response = await axios.post(otherPropertyurl, bodys);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                // console.log("responseeeeee", response.data.data)
                setOther(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };













        if (Id != null) {
            const apiUrl = config.API_URL + "auth/";
            fetch(apiUrl + Id)
                .then((response) => response.json())
                .then((value) => {
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
    // price 
    let min = price[0], max = price[0];
    for (let i = 1; i < price.length; i++) {
        if (price[i] > max)
            max = price[i];
        if (price[i] < min)
            min = price[i];
    }
    //room
    let mins = room[0], maxs = room[0];
    for (let i = 1; i < room.length; i++) {
        if (room[i] > maxs)
            maxs = room[i];
        if (room[i] < mins)
            mins = room[i];
    }
    //area
    let areamins = area[0], areamaxs = area[0];
    for (let i = 1; i < area.length; i++) {
        if (area[i] > areamaxs)
            areamaxs = area[i];
        if (area[i] < areamins)
            areamins = area[i];
    }
    //bathroom
    let bathroommin = bathroom[0], bathroommaxs = bathroom[0];
    for (let i = 1; i < room.length; i++) {
        if (bathroom[i] > bathroommaxs)
            bathroommaxs = bathroom[i];
        if (bathroom[i] < bathroommin)
            bathroommin = bathroom[i];
    }
    const onClickShow = (itemId) => {
        setOpenStates(prevState => ({ ...prevState, [itemId]: !prevState[itemId] }));
    };
    const Similarproject = {
        loop: true,
        autoplay: true,
        dots: false,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: { items: 1 },
            1000: { items: 4 }
        }
    };
    const featureimages = {
        loop: false,
        autoplay: true,
        dots: false,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 4
            }
        }
    };

    const floorplan = {
        dots: false,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };
    const resandotp = async (event) => {
        clearTimer(getDeadTime());

        const body = {
            phone: phone,
        };
        if (captcha == captchavalue) {
            const url = config.API_URL + "clint/projectenquiry/add";
            await axios
                .post(url, body)
                .then((res) => {
                    console.log("🚀 ~ file: projectdetail.js:319 ~ .then ~ res:", res)
                    setOpen(!isOpen);
                })
                .catch((err) => {
                })
            generateCaptcha();
        } else {
            setCaptchaError('Please Enter Valid Security Code!!');
            setTimeout(() => {
                setCaptchaError(" ")
            }, 3000);
        }    
      };
    const AddEnquiry = async (event) => {
        event.preventDefault();
        const body = {
            phone: phone,
        };
        if (captcha == captchavalue) {
            const url = config.API_URL + "clint/projectenquiry/add";
            await axios
                .post(url, body)
                .then((res) => {
                    clearTimer(getDeadTime());
                    setOpen(!isOpen);
                })
                .catch((err) => {
                })
            generateCaptcha();
        } else {
            setCaptchaError('Please Enter Valid Security Code!!');
            setTimeout(() => {
                setCaptchaError(" ")
            }, 3000);
        }



    }
    const generateCaptcha = () => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptcha(captcha);
    };


    // contact now
    const Contactadd = async (event) => {
        event.preventDefault();
        const body = {
            fname: fname,
            email: email,
            phone: phone,
            message: message,
            pro_id: pro_id,
            cus_id: Id
        };
        if (captcha === captchavalue) {
            const url = config.API_URL + "clint/contactenquiry/contactadd";
            await axios.post(url, body)
                .then((res) => {
                    closeModal()
                    var message = "Thank you for send message!";
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

                    setFname("");
                    setEmail("");
                    setMessage("");
                    setPhone("")
                    setPro_id("")
                    setcaptchavalue("");

                })
                .catch((err) => {
                    setTost(true)
                    setTostmessage(err.response.data.message)
                    // console.log(Tost)
                });
            closeModal();
            generateCaptcha();
        } else {
            setCaptchaError('Invalid captcha!!');
            setTimeout(() => {
                setCaptchaError(" ")
            }, 3000);
        }
    };
    const handleChange = event => {
        setMessage(event.target.value);
    };
    // Send Your Requirement
    const AddRequirement = async (event) => {
        event.preventDefault();
        const body = {
            fname: alertname,
            email: alertemail,
            phone: alertphone,
            category: category,
            location_id: location_id,
            max_budget: max_budget,
            min_budget: min_budget,
            p_typeid: p_typeid,
        };
        if (captcha == captchavalue) {
            const url = config.API_URL + "clint/contactenquiry/add";
            await axios
                .post(url, body)
                .then((res) => {

                    setFname("");
                    setEmail("");
                    setPhone("");
                    setCategory("");
                    setLocation_id("");
                    setMax_budget("");
                    setMin_budget("");
                    setP_typeid("");
                    setcaptchavalue("");
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
                })
                .catch((err) => {
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
            setCaptchaError('Please Enter Valid Security Code!!');
            setTimeout(() => {
                setCaptchaError(" ")
            }, 3000);
        }
    };

    const viewshortlist = async () => {
        try {
            const res = await axios.get('https://geolocation-db.com/json/');
            const api = config.API_URL + "clint/shortlist/viewAll";
            const body = {
                ip_add: res.data.IPv4,
                usr_id: usr_id
            };

            const response = await axios.post(api, body);
            const shortlistData = response.data.data;
            const shortlistedIds = shortlistData.map(value => value.pro_id);
            console.log("shortlistedIds", shortlistedIds);
            setActiveItems(shortlistedIds);
        } catch (error) {
            console.log(error);
        }
    };

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
    let types
    if (detail.propertyType != null) {
        types = detail.propertyType.name
    } else {
        types = "---"
    }
    let Area;
    let unit;
    let bathrooms;
    let propertyimages;
    let username
    let feature
    let Roles
    if (detail.Builder != null) {
        username = detail.Builder.name
    } else {
        username = "--"
    }

    const HandleSearch = async (event) => {
        event.preventDefault();
        const body = {
            option: option,
            location_id: location_id,
            p_typeid: p_typeid,
            room: rooms,
            tot_price: tot_price,
        };

        localStorage.setItem("searchResults", JSON.stringify(body));
        console.log("option", option);
        navigate(option.toLowerCase() === 'rent' ? '/property/search/rent-property-in-Jaipur' : '/property/search/buy-property-in-Jaipur', { replace: true })
    };

    var propertytypes, Locationname;
    const MobileToregister = async (event) => {
        const apiUrl = config.API_URL + "clint/projectenquiry/CheckMobile"
        event.preventDefault();
        const body = {
            fname: fname,
            email: email,  
            message: "I'm Interested, Please Get In Touch With Me",
            phone: phone,
            country_code: country_code,
            pro_id: pro_id,
            otp:otp
        };
        await axios.post(apiUrl,body)
          .then((res) => {
            setOpen(false);
            setPhone("");
            setOtp("");
            setCountry_code('');
            setFname('');
            setEmail('');
            const message = res.data.message
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
                className: "custom-toast",})

          })
          .catch((err) => {
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
                className: "custom-toast",})
          });
      }

    return (
        <div >
            <Header />
            <ToastContainer />


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
            <div className="Property_detail_all">
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
                                {locations.map((value) => {
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

                                {PropertyType.map((value) => {
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
                                value={rooms}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setRoom(e.target.value);
                                }}
                            >
                                <option value=""> BedRooms</option>
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
                        <Link className="search_recent" to="#"
                            onClick={HandleSearch}
                        >Search</Link>
                    </form>
                </div>
                <div className="mid_part">
                    <div className="detail_center_menu">
                        <Link to="/">Home</Link>/{types}/{detail.address2}/{detail.name}
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="left_id_part">
                                <h5>{detail.name}</h5>


                                <div className="detail_title " >
                                    <p >
                                        <a href="#many_select_features " >   FEATURES </a>|
                                        <a href="#detail_crousel">     SIMILAR PROPERTY  </a>|
                                        <a href="#enquiryfrom">    SEND ENQUIRY  </a>|
                                        <a href="#locality_map_location">   LOCATION </a>
                                    </p>
                                </div>
                                <div>
                                    <div className="contant_side">
                                        <ul className="first_detail">
                                            {detail.rera_registration && <li>Rera Registration</li>}
                                            {detail.id && <li>Project Id</li>}
                                            <li>Price</li>
                                            {types && <li>Type:</li>}
                                            {detail.area && <li>Area:</li>}
                                            {detail.address2 && <li>Landmark:</li>}
                                            {detail.p_floor && <li>No of Floor:</li>}

                                        </ul>
                                        <ul className="sectond_detail">
                                            {detail.rera_registration && <li> {detail.rera_registration}</li>}
                                            {detail.id && <li> {detail.id}</li>}
                                            <li>
                                                {detail.tot_price
                                                    ? detail.tot_price >= 10000000
                                                        ? (detail.tot_price / 10000000).toFixed(1) + ' crore'
                                                        : detail.tot_price >= 100000
                                                            ? (detail.tot_price / 100000).toFixed(1) + ' lakh'
                                                            : detail.tot_price.toLocaleString()
                                                    : 'Price On Request'}
                                            </li>
                                            {types && <li> {types}</li>}
                                            {detail.area && <li>{detail.area} {detail.a_unit}</li>}
                                            {detail.address2 && <li> {detail.address2}</li>}
                                            {detail.p_floor && <li> {detail.p_floor}</li>}
                                        </ul>
                                    </div>
                                    <div>
                                        {activeItems.includes(detail.id) ?
                                            <div className="short_button" onClick={() => deleteshortlist(detail.id)}  >
                                                <Link to="#" >
                                                    <i className="fa fa-star fa-lg grey"></i> Shortlisted
                                                </Link>
                                                <Link className="ctform" to="#" data-bs-toggle="modal" data-bs-target="#exampleModalnine">
                                                    <i className="fa-regular fa-pen-to-square" ></i>
                                                    Contact Now</Link>
                                            </div>
                                            :

                                            <div className="short_button" >
                                                <Link to="" onClick={() => addShortlist(detail.id)}>
                                                    <i className="fa fa-star fa-lg grey"></i> Shortlist
                                                </Link>
                                                <Link className="ctform" to="#" data-bs-toggle="modal" data-bs-target="#exampleModalnine" >
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                    Contact Now</Link>
                                            </div>
                                        }
                                    </div>
                                    <div className="short_button">

                                        <ul>
                                            <li> <img src={config.SITE_URL + "images/bed.png"} className="img-fluid" alt="img" /><span>{mins}-  {maxs}</span></li>
                                            <li><img src={config.SITE_URL + "images/bath.png"} className="img-fluid" alt="img" /><span>{bathroommin} - {bathroommaxs}</span></li>
                                            <li><img src={config.SITE_URL + "images/Area.png"} className="img-fluid" alt="img" /><span>    {detail.area} -{detail.a_unit}</span>
                                            </li>
                                        </ul>
                                        <div className="email_form_by">
                                            <div className="modal fade" id="exampleModalnine" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                aria-hidden="true">
                                                <div className="modal-dialog modal-sm">
                                                    <div className="modal-content">
                                                        <div className="top_mail">
                                                            <h6>Contact</h6>
                                                            <Link className="email_close btn-close" data-bs-dismiss="modal" aria-label="Close"
                                                                href="#"><i className="fa fa-close"></i></Link>
                                                        </div>
                                                        <form onSubmit={Contactadd}>
                                                            <input type="text" className="form-control" placeholder="Name" aria-label="First name" required
                                                                value={fname}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    setFname(e.target.value)
                                                                }}
                                                            />
                                                            <input type="email" className="form-control" placeholder="Email" aria-label="First name" required
                                                                value={email}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    setEmail(e.target.value)
                                                                }}
                                                            />
                                                            <input type="text" className="form-control" placeholder="mobile" minLength="10" maxLength="10" aria-label="First name" required
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
                                                                    id="flexRadioDefault-7"
                                                                    value="Im interested, Please get in touch with me"
                                                                    checked={message === 'Im interested, Please get in touch with me'}
                                                                    onChange={handleChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    <h5>I'm Interested, Please Get In Touch With Me</h5>
                                                                </label>
                                                            </div>
                                                            <div className="form_icon">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault-8"
                                                                    value="View Contact Details"

                                                                    checked={message === 'View Contact Details'}
                                                                    onChange={handleChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="flexCheckDefault"

                                                                >
                                                                    <h5>View Contact Details</h5>
                                                                </label>

                                                            </div>
                                                            <div className="form_icon">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id="flexRadioDefault-9"
                                                                    value="I would like to call now"
                                                                    checked={message === 'I would like to call now'}
                                                                    onChange={handleChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                                    <h5>I Would Like To Call Now</h5>
                                                                </label>
                                                            </div>
                                                            <div >
                                                                <h4 style={{
                                                                    color: '#000',
                                                                }}>
                                                                    <span style={{
                                                                        display: 'inline-block',
                                                                        backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                                                                        backgroundSize: 'cover',
                                                                        padding: '0.2em 0.5em',
                                                                        borderRadius: '0.3em',
                                                                        fontSize: '20px',
                                                                        margin: '0 0.8em',
                                                                        userSelect: 'none' // Prevent text selection

                                                                    }}
                                                                        onCopy={(e) => e.preventDefault()} // Prevent default copy behavior
                                                                    >
                                                                        {captcha}
                                                                    </span><br></br>
                                                                    {captchaError || <div className="error">{captchaError}</div>}
                                                                </h4>
                                                            </div>

                                                            <input type="text" className="form-control" placeholder="Enter Security Code" required
                                                                aria-label="First name" value={captchavalue}
                                                                onChange={(e) => {
                                                                    setcaptchavalue(e.target.value)
                                                                }} />
                                                            <div className="form_icon">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" required />
                                                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                                                    <p className="agree"> I Agree To Be Contacted By Propertybull And Others For
                                                                        max
                                                                        Properties.</p>
                                                                </label>
                                                            </div>
                                                            <button className="email_detail_btn ">submit</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <h4>Description :</h4>
                                <div class="more_det">
                                    <p class="more">{detail.description}
                                    </p>
                                </div>

                                <ul className="proof_id">
                                    <li>
                                        <span>Project Id:{detail.id}</span>
                                    </li>

                                    <li>
                                        {" "}
                                        <Moment format="MMM-DD-YYYY">
                                            {detail.createdAt}
                                        </Moment>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="right_id_part">
                                <div className="top_part">
                                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" aria-selected="true"    ><Link to="#"><i className="fa-solid fa-camera"></i>Photos</Link></li>
                                        <li id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" aria-selected="false"    ><Link to="#"><i className="fa-solid fa-camera"></i>Floor Plan</Link></li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="card-wrapper">
                                            <div className="card">
                                                <div className="product-imgs">
                                                    <div className="img-display">
                                                        <Link>  <div className="img-showcase">
                                                            {selectedImage ? (
                                                                <img src={config.Image_URL + selectedImage} alt="img" data-bs-toggle="modal" data-bs-target="#expess" />
                                                            ) : (
                                                                <img src={detail.featureimage ? config.Image_URL + detail.featureimage : "https://www.propertybull.com/images/no-image.jpg"} alt="img" data-bs-toggle="modal" data-bs-target="#expess" />
                                                            )}
                                                        </div></Link>
                                                    </div>
                                                    <OwlCarousel className="owl-carousel owl-theme owl-loaded detail_crousel" {...featureimages}>
                                                        {detail.propertyImages &&
                                                            detail.propertyImages.map((item) => {
                                                                if (item.type === 1) {
                                                                    return (
                                                                        <Link>          <div className="img-select" key={item.id}>
                                                                            <div className="img-item">
                                                                                <img src={config.Image_URL + item.img} onClick={() => setSelectedImage(item.img)} alt="img" />
                                                                            </div>
                                                                        </div></Link>
                                                                    );
                                                                }
                                                                return null;
                                                            })}
                                                    </OwlCarousel>
                                                </div>


                                            </div>


                                        </div>
                                        <div className="social_icon">
                                            <p>Builder<span>: {username}</span></p>
                                            <p><span>{detail.address}  {detail.address2} Jaipur Rajasthan</span></p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"> <div className="card-wrapper">
                                        <div className="card-wrapper">
                                            <div className="card">
                                                <div className="product-imgs">
                                                    <div className="img-display">
                                                        <div className="img-showcase">


                                                            {detail.propertyImages && detail.propertyImages.map((item) => {
                                                                if (item.type === 2) {
                                                                    return (
                                                                        <img src={floorimg ? config.Image_URL + floorimg : config.Image_URL + item.img} alt="img" />
                                                                    )

                                                                }
                                                            })}

                                                        </div>
                                                    </div>
                                                    <OwlCarousel className="owl-carousel owl-theme owl-loaded detail_crousel" {...featureimages}>
                                                        {detail.propertyImages &&
                                                            detail.propertyImages.map((item) => {
                                                                if (item.type === 2) {
                                                                    return (
                                                                        <div className="img-select" key={item.id}>
                                                                            <div className="img-item">

                                                                                <img src={config.Image_URL + item.img} onClick={() => handleshowfloorimg(item)} />

                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                            })}
                                                    </OwlCarousel>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                        <div className="social_icon">
                                            <p>Builder<span>: {username}</span></p>
                                            <p><span>{detail.address}- {detail.address2} Jaipur Rajasthan</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="all_project_deals">
                    <div className="deal_border">
                        <h3>PROJECT DETAILS</h3>
                    </div>
                    <div className="deal_inner">
                        <Link to="#">All</Link>
                        <div className="deal_top_part">
                            <ul>
                                <li>AREA</li>
                                <li>UNIT PRICE</li>
                                <li>TOTAL PRICE</li>
                                <li>FLOOR PLAN</li>
                                <li>UNITS</li>
                                <li></li>
                            </ul>
                        </div>
                        {detail.propertydetails &&
                            detail.propertydetails.map((item) => {
                                let floor_img;
                                if (item.propertyImage != null) {
                                    floor_img = item.propertyImage.img;
                                }
                                var totalprice;
                                if (item.tot_price != null) {
                                    totalprice = item.tot_price;
                                } else {
                                    totalprice = "0";
                                }

                                var Perunit;
                                if (item.per_unit != null) {
                                    Perunit = item.per_unit;
                                } else {
                                    Perunit = "0";
                                }
                                const isOpen = openStates[item.id] || false;
                                return (
                                    <div className="deal_top_part second" key={item.id}>
                                        <ul>
                                            <li>
                                                {item.area}-{item.area_unit}
                                            </li>
                                            <li>{Perunit}</li>
                                            <li>
                                                {totalprice
                                                    ? totalprice >= 10000000
                                                        ? (totalprice / 10000000).toFixed(1) + ' crore'
                                                        : totalprice >= 100000
                                                            ? (totalprice / 100000).toFixed(1) + ' lakh'
                                                            : totalprice.toLocaleString()
                                                    : 'Price Not Disclosed'}</li>

                                            <div className="gallery_model">
                                                <div className="modal fade" id={`expess-${item.id}`} tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-body">
                                                                <div className="modal-header">
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="img-select">
                                                                    <div className="img-item">
                                                                        <div className="gallary_img_box">
                                                                            <img
                                                                                className="img-fluid"
                                                                                src={
                                                                                    floor_img ? config.Image_URL + floor_img : "https://www.propertybull.com/images/no-image.jpg"
                                                                                }
                                                                                alt="img"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <li>
                                                <Link to="#" className="fa fa-cube fa-lg" data-bs-toggle="modal" data-bs-target={`#expess-${item.id}`}></Link>
                                            </li>
                                            <li>Sq Ft</li>
                                            <li className="all_icon_plus-two">
                                                <Link>   <i className="fa fa-plus fa-lg" onClick={() => onClickShow(item.id)}></i></Link>
                                            </li>
                                        </ul>

                                        {isOpen && (
                                            <div className="deal_top_part bg" id="open_show_box">
                                                <ul>
                                                    <li>
                                                        OWNERSHIP <span>Builder</span>
                                                    </li>
                                                    <li>
                                                        Project FOR <span>{detail.option}</span>
                                                    </li>
                                                    <li>
                                                        BATHROOMS <span>{item.bathroom}</span>
                                                    </li>
                                                    <li>
                                                        PARKING <span>{item.carparking}</span>
                                                    </li>
                                                    <li>
                                                        Description <span>Not Mention</span>
                                                    </li>
                                                    <li></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="Locality_map" id="locality_map_location">
                    <h3>Locality Info</h3>
                    <ul>
                        <li><i className="fa fa-user"></i>Nearby</li>
                    </ul>

                    <div className="map_deta">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56904.02189652055!2d75.7457565672076!3d26.951017844112883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db418a06f8561%3A0xd0f299d7610399c0!2sdaac!5e0!3m2!1sen!2sin!4v1677239848000!5m2!1sen!2sin"
                            width="100%" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>

                        <div className="radio_cantant">
                            <form>
                                <div className="form_icon">
                                    <input className="form-check-input map_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <i className="fa fa-graduation-cap pink"></i>Schools and Colleges
                                    </label>

                                </div>
                                <div className="form_icon">
                                    <input className="form-check-input map_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <i className="fa fa-plus-circle red"></i>Schools and Colleges
                                    </label>

                                </div>
                                <div className="form_icon">
                                    <input className="form-check-input map_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <i className="fa fa-bus green"></i>Schools and Colleges
                                    </label>
                                </div>
                                <div className="form_icon">
                                    <input className="form-check-input map_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <i className="fa fa-film grey"></i>Schools and Colleges
                                    </label>

                                </div>
                                <div className="form_icon">
                                    <input className="form-check-input map_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <i className="fa fa-money yellow"></i>Schools and Colleges
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="many_select" id="many_select_features">
                    <h3>FEATURES  </h3>
                    <div className="Features">
                        <h6> <img src={config.SITE_URL + "images/car-parking.png"} className="img-fluid" alt="img" /> Exterior Features</h6>
                    </div>
                    <div className="row g-0">

                        {detail.Propertyfeatures && detail.Propertyfeatures.map((item) => {
                            if (item.Feature && item.Feature != null) {
                                feature = item.Feature.name;
                            } else {
                                feature = "---";
                            }
                            if (item.Feature && item.Feature.type == "3") {
                                feature = item.Feature.name;
                            }
                            else {
                                return null

                            }
                            return (

                                <div className="col-lg-4" key={item.id}>
                                    <div className="chack_point">
                                        <h5><i className="fa fa-check-square fa-lg"></i>{feature}</h5>
                                    </div>
                                </div>

                            )
                        })}

                    </div>
                    <div className="Features bottom">
                        <h6><img src={config.SITE_URL + "images/car-parking.png"} className="img-fluid" alt="img" /> Interior Features</h6>
                    </div>
                    <div className="row g-0">

                        {detail.Propertyfeatures && detail.Propertyfeatures.map((item) => {
                            if (item.Feature && item.Feature != null) {
                                feature = item.Feature.name;
                            } else {
                                feature = "---";
                            }
                            if (item.Feature && item.Feature.type == "4") {
                                feature = item.Feature.name;
                            }
                            else {
                                return null

                            }
                            return (

                                <div className="col-lg-4" key={item.id}>
                                    <div className="chack_point">
                                        <h5><i className="fa fa-check-square fa-lg"></i>{feature}</h5>
                                    </div>
                                </div>

                            )
                        })}




                    </div>
                </div>
                <div className="Enquiry" id="enquiryfrom">
                    <h3>
                        SEND ENQUIRY FOR THIS PROJECT

                    </h3>
                    {Open? 
                    <form onSubmit={MobileToregister}>
                    <div className="bg_box">
                        <div className="row align-items-center">
                        <div className="col enquiry_boxes">
                                <div className="enquiry_form">
                                   <label>Check  whatsapp for Otp</label>
                                </div>
                                {timer == "00:00" ?
                                  <Link to="#" className="text-dark" onClick={resandotp}>
                                    <u>Click Here To Resend Otp</u>
                                  </Link> : <h5>{timer}
                                  </h5>}
                            </div>
                            <div className="col enquiry_boxes">
                                <div className="enquiry_form">
                                    <input type="text" className="form-control" maxLength="6" minLength="6"  placeholder="Enter otp" aria-label="First name" required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col enquiry_boxes">
                                <div className="enquiry_form">
                                    <button href="#">send enquiry</button >
                                </div>
                            </div>
                        </div>
                    </div>
                </form>:
                    <form onSubmit={AddEnquiry}>
                        <div className="bg_box">
                            <div className="row align-items-center">
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="text" className="form-control" placeholder="name" aria-label="First name" required
                                            value={fname}
                                            onChange={(e) => setFname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="Email" className="form-control" placeholder="Email" aria-label="First name" required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="text" className="form-control" placeholder="Country Code"
                                            aria-label="First name" required
                                            value={country_code}
                                            onChange={(e) => setCountry_code(e.target.value)}


                                        />
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="text" className="form-control" minLength='10' maxLength="10" placeholder="Phone" aria-label="First name" required
                                                                value={phone}
                                                                onChange={(e) => {
                                                const input = e.target.value;
                                                const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                                if (regex.test(input)) {
                                                    setPhone(input)                                                } else {
                                                    alert('Please enter only 10 numeric characters!');
                                                }

                                            }}
                                            />
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <div>
                                            <h5 style={{
                                                color: '#000',
                                            }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                                                    backgroundSize: 'cover',
                                                    padding: '0.2em 0.5em',
                                                    borderRadius: '0.1em',
                                                    margin: '0 0.2em',
                                                    userSelect: 'none'

                                                }}>
                                                    {captcha}
                                                </span><br></br>
                                                {captchaError || <div className="error" style={{ fontSize: '0.8em', color: 'red' }}>{captchaError}</div>}
                                            </h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="text" className="form-control" placeholder="Enter Security Code"
                                            aria-label="First name"
                                            value={captchavalue}
                                            onChange={(e) => {
                                                setcaptchavalue(e.target.value)

                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <button href="#">send enquiry</button >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>}
                </div>
                <section id="detail_crousel">
                    <h5>
                        Similar Project
                    </h5>
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
                        <OwlCarousel className="owl-carousel owl-theme owl-loaded detail_crousel" {...Similarproject}>
                            <div className="owl-stage-outer">
                                <div className="owl-stage">
                                    {similarproject && similarproject.map((value) => (

                                        <div className="owl-item" key={value.id}>
                                            <div className="crsl_det"><Link to={"/projectshow/" + value.url} target="_blank" >
                                                <img alt="Image" src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/images/no-image.jpg"} />
                                                {value.name}
                                            </Link>
                                                <p>
                                                    <span>Project Id: {value.id}</span>
                                                </p>
                                                <p>
                                                    <span>Type: {types}</span>
                                                </p>
                                                <p>
                                                    <span>Total Area: {value.area_in_sqft} sq Ft</span>
                                                </p>
                                                <p>
                                                    <span>Land Mark: {value.address2}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </OwlCarousel>
                    )}


                </section>
                <div className="rp_detail">
                    <h6><img src={config.SITE_URL + "images/model_bel.jpg"} alt="img" /> Get Personalized Email Alerts that match your requirement
                    </h6>
                </div>
                <div className="Requirement">
                    <h3>Send Your Requirement</h3>
                    <div className="recent_top_form_part  flexwrapform">

                        <form onSubmit={AddRequirement}>
                            <div className="formgapdiv">
                                <div className="top_select">
                                    <select name="category"
                                        value={category}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setCategory(e.target.value);
                                        }}>
                                        <option value="Sell">Buy</option>
                                        <option value="Rent">Rent</option> </select>
                                </div>

                                <div className="top_select">
                                    <select required
                                        name="role_id" className="form-control"
                                        value={p_typeid}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setP_typeid(e.target.value);
                                        }}
                                    >
                                        <option value="">--select Type--</option>
                                        {PropertyType.map((value) => {
                                            return <option key={value.id} value={value.id}> {value.name}</option>;

                                        })}
                                    </select>

                                </div>
                                <div className="top_select">
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
                                </div>
                                <div className="top_select">
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
                                </div>
                                <div className="top_select">
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
                            </div>
                            <div className="bg_boxform">
                                <p>
                                    Contact Details
                                </p>


                                <div className="row align-items-center">
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="text" className="form-control" placeholder="name" aria-label="First name" required
                                                value={alertname}
                                                onChange={(e) => {
                                                    setAlertname(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="Email" className="form-control" placeholder="Email" aria-label="First name" required
                                                value={alertemail}
                                                onChange={(e) => {
                                                    setAlertemail(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="text" className="form-control" placeholder="Country Code" required
                                                aria-label="First name"
                                                value={country_code}
                                                onChange={(e) => {
                                                    const input = e.target.value;
                                                    const regex = /^[0-9]{0,4}$/; // Regex to match only 0 to 4 digit numbers
                                                    if (regex.test(input)) {
                                                        setCountry_code(input);
                                                    } else {
                                                        alert('Please enter only 0 to 4 numeric characters!');
                                                    }
                                                }}


                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="text" className="form-control" placeholder="Phone" aria-label="First name" maxLength="10" minLength="10" required
                                                value={alertphone}
                                                onChange={(e) => {
                                                    const input = e.target.value;
                                                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                                    if (regex.test(input)) {
                                                        setAlertphone(input);
                                                    } else {
                                                        alert('Please enter only 10 numeric characters!');
                                                    }

                                                }}

                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
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
                                                        fontSize: '20px',
                                                        margin: '0 0.8em',
                                                        userSelect: 'none' // Prevent text selection

                                                    }}
                                                        onCopy={(e) => e.preventDefault()} // Prevent default copy behavior

                                                    >
                                                        {captcha}
                                                    </span><br></br>
                                                    {captchaError || <div className="error">{captchaError}</div>}
                                                </h4>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="text" className="form-control" placeholder="Enter Security Code"
                                                aria-label="First name" required
                                                value={captchavalue}
                                                onChange={(e) => {
                                                    setcaptchavalue(e.target.value)

                                                }}


                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="enquiry_form">
                                <button className="recent_section_bottom_sbmit_btn" href="jbuttonvascript:void(0);">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>


                <section className="mt-5">

                    {other.length > 0 && (
                        <hgroup class="headings">
                            <h3>Other Property in {detail.name}</h3>
                        </hgroup>
                    )}


                    <section class="proerty_extera_box">
                        <div className="proerty_extera">
                            <div className="row">
                                {other.map((value) => {

                                    if (value.propertyType != null) {
                                        propertytypes = value.propertyType.name
                                    }
                                    else {
                                        propertytypes = "---"
                                    }
                                    if (value.Location != null) {
                                        Locationname = value.Location.name
                                    } else {
                                        Locationname = "----"
                                    }



                                    return (
                                        <div className="col-lg-6 mb-3">
                                            <div className="Other_Property">
                                                <div className="row pro-det">
                                                    <div className="col-sm-6 image align-item-center">
                                                        {/* <img src={config.Image_URL + value.featureimage} alt="img" /> */}
                                                        <img src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/images/no-image.jpg"} alt="img" data-bs-toggle="modal" data-bs-target="#expess" />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div class="abc_appartment">
                                                            <Link to={"/propertyshow/" + value.url} target="_blank" >
                                                                {value.name}
                                                            </Link>
                                                            <p class="mb-1 fw-bold">{propertytypes} </p>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <ul>
                                                                        <li>
                                                                            <span>Property Id </span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Locality</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>Total Area</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <ul>
                                                                        <li>
                                                                            <span>:   {value.id}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>:   {Locationname}</span>
                                                                        </li>
                                                                        <li>
                                                                            <span>:  {value.area} {value.ship}</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                            </div>
                        </div>
                    </section>
                </section>














            </div>
            <Footer />
        </div>
    )
}
