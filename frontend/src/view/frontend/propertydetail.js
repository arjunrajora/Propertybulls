import { React, useState, useEffect, useRef, useContext } from "react";
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
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";

import { ToastContainer, toast, Zoom } from 'react-toastify';
import CartContext from "../../store/cart-context";

// import { userId} from '../../../src/utils/Auth/token_utils'
const locationUrl = config.API_URL + "location/viewAll";
const propertytypess = config.API_URL + "clint/property/viewAllPropertytypes"
const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"
const viewLocation = config.API_URL + "clint/home/viewLocation";


export default function Propertydetail({ imageUrl }) {
    const Shortlist = useContext(CartContext);

    const navigate = useNavigate();

    const { url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState([]);
    const [propertytypes, setPropertytypes] = useState([]);

    const [propertytype, setPropertytype] = useState([]);
    const [similarproject, setSimilarproject] = useState([]);
    const [propertyname, setPropertyname] = useState("");
    const [fname, setFname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [alertemail, setAlertemail] = useState("");
    const [message, setMessage] = useState("I am interested, Please get in touch with me");
    const [phone, setPhone] = useState("");
    const [alertphone, setAlertphone] = useState("");
    const [country_code, setCountry_code] = useState("");
    const [alertcountry_code, setAlertcountry_code] = useState("");
    const [p_typeid, setP_typeid] = useState("");
    const [category, setCategory] = useState("Buy");
    const [min_budget, setMin_budget] = useState("");
    const [max_budget, setMax_budget] = useState("");
    const [option, setOption] = useState("Sell");
    const [room, setRoom] = useState("");
    const [tot_price, setTot_price] = useState("");
    const StaticMessage = localStorage.getItem("staticAdded");
    const [staticAdded, setStaticAdded] = useState("");
    const [location_id, setLocation_id] = useState("");
    const [pro_id, setPro_id] = useState("");
    const [cus_id, setCus_id] = useState("");
    const [usr_id, setusr_id] = useState("0");
    const [ip_add, setip_add] = useState("");
    const Id = JSON.parse(localStorage.getItem("userId"));
    const [isOpen, setIsOpen] = useState(false);
    const [isShortlisted, setIsShortlisted] = useState(false);
    const [detail, setdetail] = useState([]);
    const [Open, setOpen] = useState(false);
    const Ref = useRef(null);
    const [captchaError, setCaptchaError] = useState('');
    const [captchavalue, setcaptchavalue] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [ptypeid, setPtypeid] = useState("");
    const [tost, setTost] = useState(false);
    const [tostmessage, setTostmessage] = useState("");
    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setip_add(res.data.IPv4)
        console.log(Id)
        setusr_id(Id)
    }

    // console.log("urlsssss", detail.url)

    useEffect(() => {
        fetch(locationUrl)
            .then((response) => response.json())
            .then((value) => {
                setLocations(value.data);
            })

        const similarprojects = config.API_URL + "clint/similarproject/view"
        const fetchData = async (ptypeid) => {
            try {
                const bodys = {
                    p_typeid: ptypeid
                }
                const response = await axios.post(similarprojects, bodys);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                setSimilarproject(response.data.data);

            } catch (error) {
                console.log(error);
            }
        };



        fetchData();

        generateCaptcha();
        const propertydetail = config.API_URL + "clint/details/" + url;
        getData()
        viewshortlist();
        fetch(propertydetail)

            .then((response) => response.json())
            .then((value) => {
                console.log("property data", value.data);
                setdetail(value.data)
                setPro_id(value.data.id)
                setPropertyname(value.data.name);
                console.log(value.data);
                setPtypeid(value.data.p_typeid)
                fetchData(value.data.p_typeid)
            })


        fetch(propertytypess)
            .then((response) => response.json())
            .then((value) => {
                setPropertytype(value.data);
            })

        fetch(viewLocation)
            .then((response) => response.json())
            .then((value) => {
                setLocation(value.data);
            })
        fetch(viewpropertytypes)
            .then((response) => response.json())
            .then((value) => {
                setPropertytypes(value.data);
            })

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










    }, [fetch]);


    const onClickshow = () => {
        setOpen(!Open);
    }

    // const Similarproject = {
    //     loop: false,
    //     autoplay: false,
    //     autoplayTimeout: 5000,
    //     smartSpeed: 2500,
    //     dots: false,
    //     margin: 10,
    //     nav: true,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // };
    const Similarproject = {
        loop: false,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 2500,
        dots: false,
        margin: 10,
        nav: true,
        slideBy: 4, // Set to 4 to scroll 4 images at a time
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

    // SEND ENQUIRY FOR THIS property
    const AddEnquiry = async (event) => {
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
            country_code: country_code,
            pro_id: pro_id,

        };

        if (captcha == captchavalue) {
            const url = config.API_URL + "clint/projectenquiry/add";
            await axios
                .post(url, body)
                .then((res) => {
                    const msg = res.data.message;
                    localStorage.setItem("staticAdded", msg);

                    // navigate("/", { replace: true });

                    // Clear input fields
                    setFname("");
                    setEmail("");
                    // setMessage("");
                    setPhone("");
                    setCountry_code("");
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
                })
                .catch((err) => console.log(err))
            generateCaptcha();
        } else {
            console.log('Invalid Captcha !!');
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

    // contact now
    const Contactadd = async (event) => {
        if (phone.length < 10) {
            alert('Mobile number must be at least 10 digits');
            return;
        }
        event.preventDefault();
        const body = {
            fname: fname,
            email: email,
            phone: phone,
            message: message,
            pro_id: pro_id,
            cus_id: Id,
        };
        console.log(body);
        if (captcha === captchavalue) {
            const url = config.API_URL + "clint/contactenquiry/contactadd";
            await axios
                .post(url, body)
                .then((res) => {
                    setFname("");
                    setEmail("");
                    setMessage("");
                    setPhone("")
                    setPro_id("")
                    setCus_id("")
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



                    closeModal(); // Call function to close the modal after successful submission
                })
                .catch((err) => {
                    setTost(true)
                    setTostmessage(err.response.data.message)
                    // console.log(Tost)
                });
            closeModal();
            generateCaptcha();

        } else {
            console.log('Invalid Captcha !!')
            setCaptchaError('Invalid captcha!!');
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

    // Send Your Requirement

    const AddContactdetails = async (event) => {
        event.preventDefault();
        if (phone.length < 10) {
            alert('Mobile number must be at least 10 digits');
            return;
        }
        const body = {
            fname: name,
            email: alertemail,
            phone: alertphone,
            category: category,
            location_id: location_id,
            country_code: alertcountry_code,
            // message:message,
            max_budget: max_budget,
            min_budget: min_budget,
            p_typeid: p_typeid,
        };
        if (captcha == captchavalue) {
            const url = config.API_URL + "clint/contactenquiry/alert";
            await axios
                .post(url, body)
                .then((res) => {
                    const msg = res.data.message;
                    // localStorage.setItem("staticAdded", msg);
                    // clear input
                    setName("");
                    setAlertemail("");
                    setAlertphone("");
                    setCategory("");
                    setLocation_id("");
                    setMax_budget("");
                    setMin_budget("");
                    setCountry_code("");
                    setP_typeid("");
                    setcaptchavalue("");

                    var message = "Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner!";
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
                })
                .catch((err) => {

                    var message = "You have already shown intrested in this category";
                    toast.success(message, {
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
    const [activeItems, setActiveItems] = useState([]);

    //add shortlist
    // setMessage
    // const deleteshortlist = async (event) => {
    //     event.preventDefault();
    //     const api = config.API_URL + "clint/shortlist/delete"
    //     const body = {
    //         pro_id: pro_id
    //     }
    //     await axios.post(api, body)
    //         .then((res) => {
    //             Shortlist.removeItem({
    //                 pro_id: pro_id,
    //             });
    //             setOpen(!Open);
    //         })
    //         .catch((err) => console.log(err));
    // };
    // const addShortlist = async (event) => {
    //     event.preventDefault();
    //     const api = config.API_URL + "clint/shortlist/add"
    //     const body = {
    //         pro_id: pro_id,
    //         ip_add: ip_add,
    //         usr_id: usr_id
    //     }
    //     await axios.post(api, body)
    //         .then((res) => {
    //             setOpen(!Open);
    //             Shortlist.addItem({
    //                 pro_id: pro_id,
    //                 ip_add: ip_add,
    //                 usr_id: usr_id
    //             });
    //         })
    //         .catch((err) => console.log(err));
    // }
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

    // const viewshortlist = async () => {
    //     const res = await axios.get('https://geolocation-db.com/json/')
    //     const api = config.API_URL + "clint/shortlist/viewAll"
    //     const body = {
    //         ip_add: res.data.IPv4,
    //         usr_id: usr_id
    //     }
    //     await axios.post(api, body)
    //         .then((res) => {
    //             console.log("response", res)
    //             var shortlistData = res.data.data;
    //             shortlistData.map((value) => {
    //                 var allshortlist = activeItems.push(value.pro_id);
    //                 setActiveItems([...activeItems, allshortlist]);
    //             })
    //         }).catch((err) => console.log(err));
    // }

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












    let types
    if (detail.propertyType != null) {
        types = detail.propertyType.name
    } else {
        types = "---"
    }
    let Area;
    let unit;
    let bathrooms;
    let parking;
    let username
    let feature
    let Roles
    if (detail.User != null) {
        username = detail.User.name

    } else {
        username = "--"

    }

    // console.log("hyyyy", detail)

    // if (detail.User != null) {
    //     Roles = detail.User.Role.title
    // } else {
    //     Roles = "---"
    // }

    if (detail.User != null) {
        if (detail.User.Role != null) {
            Roles = detail.User.Role.title;
        } else {
            Roles = "---";
        }
    } else {
        Roles = "---";
    }
    //  Searching property

    const HandleSearch = async (event) => {
        event.preventDefault();
        //  console.log("test",startDate);
        const body = {
            option: option,
            location_id: location_id,
            p_typeid: p_typeid,
            room: room,
            tot_price: tot_price

        };

        localStorage.setItem("searchResults", JSON.stringify(body));
        console.log("option", option);
        navigate(option.toLowerCase() === 'rent' ? '/property/search/rent-property-in-Jaipur' : '/property/search/buy-property-in-Jaipur', { replace: true })
    };



    // image view onClick view
    const [selectedImage, setSelectedImage] = useState(detail.featureimage);
    const [selectedFloor, setSelectedFloor] = useState(detail)
    const handleImageClick = (item) => {
        setSelectedImage(item.img);
    };


    const [currentURL, setCurrentURL] = useState("");

    useEffect(() => {
        // Fetch the current URL when the component mounts
        setCurrentURL(window.location.href);
    }, []);

    console.log("currentURL", currentURL)



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
                                {location.map((value) => {
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
                                <option value="">--Select Propertytype--</option>

                                {propertytypes.map((value) => {
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
                        {/* <Link className="search_recent" to="#" >Search</Link> */}
                        <button
                            type="submit"

                            onClick={HandleSearch}
                            className="search_recent"
                        >
                            Search
                        </button>
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
                                            {detail.id && <li>Property Id</li>}
                                            {detail.tot_price && <li>Price</li>}
                                            {types && <li>Type</li>}
                                            {detail.area && <li>Total Area</li>}
                                            {detail.address2 && <li>Landmark</li>}
                                            {detail.room && <li>Rooms</li>}
                                            {detail.bath && <li>Bathroom</li>}
                                            {detail.flooring && <li>Flooring</li>}
                                            {detail.floor && <li>Total Floor</li>}
                                            {detail.p_floor && <li>Property on Floor</li>}
                                        </ul>
                                        <ul className="sectond_detail">
                                            {detail.id && <li>{detail.id}</li>}
                                            {/* {detail.tot_price && <li>{detail.tot_price}</li>} */}
                                            {detail.tot_price && (
                                                <li>
                                                    {detail.tot_price >= 100000 ? `${detail.tot_price / 100000} lac` : detail.tot_price.toLocaleString()}
                                                </li>
                                            )}
                                            {types && <li>{types}</li>}
                                            {detail.area && <li>{detail.area} {detail.a_unit}</li>}
                                            {detail.address2 && <li>{detail.address2}</li>}
                                            {detail.room && <li>{detail.room}</li>}
                                            {detail.bath && <li>{detail.bath}</li>}
                                            {detail.flooring && <li>{detail.flooring}</li>}
                                            {detail.floor && <li>{detail.floor}</li>}
                                            {detail.p_floor && <li>{detail.p_floor == 0 ? "Ground Floor" : detail.p_floor}</li>}
                                        </ul>
                                    </div>
                                    <div>
                                        {activeItems.includes(detail.id) ?
                                            <div className="short_button" onClick={() => deleteshortlist(detail.id)}  >
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
                                    {/* <div>
                                        {Open ?
                                            <div className="short_button" onClick={deleteshortlist}  >
                                                <Link to="#" >
                                                    <i className="fa fa-star fa-lg grey"></i> Shortlisted
                                                </Link>
                                                <Link className="ctform" to="#" data-bs-toggle="modal" data-bs-target="#exampleModalnine">
                                                    <i className="fa-regular fa-pen-to-square" ></i>
                                                    Contact Now</Link>
                                            </div>
                                            :

                                            <div className="short_button" >
                                                <Link to="" onClick={addShortlist}>
                                                    <i className="fa fa-star fa-lg grey"></i> Shortlist
                                                </Link>
                                                <Link className="ctform" to="#" data-bs-toggle="modal" data-bs-target="#exampleModalnine" >
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                    Contact Now</Link>
                                            </div>
                                        }
                                    </div> */}
                                    <div className="short_button">


                                        <div className="email_form_by">
                                            <div className="modal fade" id="exampleModalnine" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                aria-hidden="true">
                                                <div className="modal-dialog modal-sm">
                                                    <div className="modal-content">
                                                        <div className="top_mail">
                                                            <h6>Contact: ({propertyname})</h6>
                                                            <Link className="email_close btn-close" data-bs-dismiss="modal" aria-label="Close"
                                                                href="javascript:void(0);"><i className="fa fa-close"></i></Link>
                                                        </div>
                                                        <form onSubmit={Contactadd}>
                                                            <input type="text" className="form-control" placeholder="Name" aria-label="First name" maxLength="255" required
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
                                                            <input type="text" className="form-control" placeholder="mobile" aria-label="First name" maxLength="10" required
                                                                value={phone}
                                                                // onChange={(e) => {
                                                                //     console.log(e.target.value)
                                                                //     setPhone(e.target.value)
                                                                // }}
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
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                                                            <input type="text" className="form-control" placeholder="Enter Security Code"
                                                                aria-label="First name" required
                                                                value={captchavalue}
                                                                onChange={(e) => {
                                                                    setcaptchavalue(e.target.value)

                                                                }}
                                                            />
                                                            <div className="form_icon">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" required />
                                                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
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
                                    </div>
                                </div>
                                <h4>Description :</h4>
                                <div className="more_det">
                                    <p className="more">
                                        {detail.description}
                                    </p>

                                </div>
                                <ul className="proof_id">
                                    <li>
                                        <span>Property Id:{detail.id}</span>  | |  Last Updated:
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
                                                        {/* <div className="img-showcase">
                                                            {selectedImage ? (
                                                                <img src={config.Image_URL + selectedImage} alt="img" />
                                                            ) : (
                                                                <img src={config.Image_URL + detail.featureimage} alt="img" />
                                                            )}
                                                        </div> */}
                                                        <div className="img-showcase">
                                                            {selectedImage ? (
                                                                <img src={config.Image_URL + selectedImage} alt="img" />
                                                            ) : (
                                                                <img src={detail.featureimage ? config.Image_URL + detail.featureimage : "https://www.propertybull.com/images/no-image.jpg"} alt="img" />
                                                            )}
                                                        </div>

                                                    </div>
                                                    <OwlCarousel className="owl-carousel owl-theme owl-loaded detail_crousel" {...Similarproject}>
                                                        {detail.propertyImages &&
                                                            detail.propertyImages.map((item) => {
                                                                if (item.type === 1) {
                                                                    return (
                                                                        <div className="img-select" key={item.id}>
                                                                            <div className="img-item">
                                                                                <Link>
                                                                                    <img src={config.Image_URL + item.img} onClick={() => handleImageClick(item)} alt="img" />
                                                                                </Link>
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

                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"> <div className="card-wrapper">
                                        <div className="card">
                                            <div className="product-imgs">
                                                <div className="img-display">
                                                    <div className="img-showcase">
                                                        {detail.propertyImages && detail.propertyImages.map((item) => {
                                                            if (item.type === 2) {
                                                                return (
                                                                    <img src={config.Image_URL + item.img} alt="img" />


                                                                )

                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                                <OwlCarousel className="owl-carousel owl-theme owl-loaded detail_crousel" {...Similarproject}>

                                                    {detail.propertyImages && detail.propertyImages.map((item,) => {
                                                        if (item.type === 2) {
                                                            return (
                                                                <div className="img-item">
                                                                    <Link> <img src={config.Image_URL + item.img} alt="img" /></Link>


                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </OwlCarousel>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="social_icon">
                                    <p>{Roles}<span>: {username}</span></p>

                                    <p><span>{detail.address}- {detail.address2}</span></p>

                                    <ul>
                                        <li><i className="fa-solid fa-location-dot"></i>{detail.address2}</li>
                                        <li>

                                            <div>
                                                <Link className="share_soc" to="javascript:void(0);" data-bs-toggle="dropdown"
                                                    aria-expanded="false"><i className="fa fa-share-alt fa-lg"></i>Share</Link>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton-2">
                                                    <ul className="soci_serch">
                                                        {/* <li><Link to="/"><i className="fa-brands fa-google-plus-g"></i></Link></li> */}
                                                        {/* <li><Link to={`/propertyshow/${detail.url}`} target="_blank"><i className="fa-brands fa-google-plus-g"></i></Link></li> */}

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
                                        </li>
                                        <li>
                                            <div>
                                                <Link className="open_popup" to="" data-bs-toggle="dropdown"
                                                    aria-expanded="false"><i className="fa fa-envelope fa-lg"></i> Email to Friend
                                                </Link>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton-2">
                                                    <div className="email_form">
                                                        <div className="top_mail">
                                                            <h6>Email To Friend</h6>
                                                            <Link className="email_close" to=""><i
                                                                className="fa fa-close"></i></Link>
                                                        </div>
                                                        <form>
                                                            <input type="text" className="form-control" placeholder="Your Name"
                                                                aria-label="First name" required />
                                                            <input type="text" className="form-control" placeholder="Your Email"
                                                                aria-label="First name" required />
                                                            <input type="text" className="form-control" placeholder="Friend Name"
                                                                aria-label="First name" required />
                                                            <input type="text" className="form-control" placeholder="Friend Email"
                                                                aria-label="First name" required />
                                                            <Link to="#" data-bs-dismiss="modal" aria-label="Close">submit</Link>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>




                        </div>
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
                    <h3>

                        Details & Amenities
                    </h3>

                    <div className="Features">
                        {detail.Propertyfeatures && detail.Propertyfeatures.length > 0 && (
                            <h6>
                                <img
                                    src={config.SITE_URL + "images/car-parking.png"}
                                    className="img-fluid"
                                    alt="img"
                                />
                                Exterior Features
                            </h6>
                        )}
                    </div>
                    <div className="row g-0">
                        {detail.Propertyfeatures &&
                            detail.Propertyfeatures.map((item) => {
                                if (item.Feature != null) {
                                    feature = item.Feature.name;
                                } else {
                                    feature = "---";
                                }
                                if (item.Feature.type == "3") {
                                    feature = item.Feature.name;
                                } else {
                                    return null;
                                }
                                return (
                                    <div className="col-lg-4" key={item.id}>
                                        <div className="chack_point">
                                            <h5>
                                                <i className="fa fa-check-square fa-lg"></i>
                                                {feature}
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>



                    <div className="Features bottom">
                        <h6><img src={config.SITE_URL + "images/car-parking.png"} className="img-fluid" alt="img" /> Interior Features</h6>
                    </div>
                    <div className="row g-0">
                        {detail.Propertyfeatures && detail.Propertyfeatures.map((item) => {
                            if (item.Feature != null) {
                                feature = item.Feature.name;
                            } else {
                                feature = "---";
                            }
                            if (item.Feature.type == "4") {
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
                        {/* SEND ENQUIRY FOR THIS PROJECT */}
                        Send Enquiry For This Property
                    </h3>
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
                                        <input type="email" className="form-control" placeholder="Email" aria-label="First name" required
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
                                        <input type="text" className="form-control" placeholder="Phone" aria-label="First name" maxLength="10" required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)} />
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
                                                    margin: '-12px 2.2em',
                                                    userSelect: 'none' // Prevent text selection

                                                }}
                                                    onCopy={(e) => e.preventDefault()} // Prevent default copy behavior
                                                >
                                                    {captcha}
                                                </span><br></br>
                                                {/* {captchaError || <div className="error">{captchaError}</div>} */}
                                                {captchaError || <div className="error" style={{ fontSize: '0.8em', color: 'red' }}>{captchaError}</div>}
                                            </h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="col enquiry_boxes">
                                    <div className="enquiry_form">
                                        <input type="text" className="form-control" placeholder="Enter Security Code" required
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
                    </form>
                </div>



                <section id="detail_crousel"  >

                    {similarproject.length > 0 && (
                        <h5> Similar property</h5>
                    )}
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

                                    {similarproject.map((value) => {
                                        if (value.type === 0) {


                                            return (
                                                <div className="owl-item">
                                                    <div className="crsl_det">

                                                        {/* <Link to={`/propertyshow/${value.url}`} className="img-fluid" alt="img">  <img alt="Image" src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/pro_images/570ff61067e2d9d9b40517cf2052b592265093555.png"} />

                                                            {value.name} </Link> */}
                                                        <Link to={`/propertyshow/${value.url}`} className="img-fluid" alt="img" target="_blank">
                                                            <img
                                                                alt="Image"
                                                                src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/pro_images/570ff61067e2d9d9b40517cf2052b592265093555.png"}
                                                            />
                                                            {value.name}
                                                        </Link>
                                                        <p>
                                                            <span>Property Id : {value.id}</span>
                                                            <span>Total Price : {value.tot_price
                                                                ? value.tot_price >= 10000000
                                                                    ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                                                    : value.tot_price >= 100000
                                                                        ? (value.tot_price / 100000).toFixed(1) + ' lakh'
                                                                        : value.tot_price.toLocaleString()
                                                                : 'Price Not Disclosed'} </span>
                                                        </p>
                                                        <p>
                                                            <span>Type:{value.propertyType.name}</span>
                                                        </p>
                                                        <p>
                                                            <span>Total Area : {value.area} {value.a_unit}</span>
                                                        </p>
                                                        <p>
                                                            <span>Land Mark : {value.address2}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        } else {

                                            return null;
                                        }
                                    })}
                                </div>


                            </div>

                        </OwlCarousel>
                    )}
                </section>

                {/* <div className="rp_detail">
                    <h6><img src={config.SITE_URL + "images/model_bel.jpg"} alt="img" /> Get Personalized Email Alerts that match your requirement
                    </h6>
                </div> */}





                <div className="Requirement">
                    <h3>

                        Send Your Requirement
                    </h3>
                    <div className="recent_top_form_part  flexwrapform">

                        <form onSubmit={AddContactdetails}>
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
                                    <select name="role_id" className="form-control"
                                        value={p_typeid}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setP_typeid(e.target.value);
                                        }} required>
                                        <option value="">--Select Propertytype--</option>
                                        {propertytype.map((value) => {

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
                                    <select
                                        name="max_budget"
                                        value={max_budget}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setMax_budget(e.target.value);
                                        }} required>
                                        <option value="">Max Price</option>
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
                                    <select name="role_id"

                                        value={location_id}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setLocation_id(e.target.value);
                                        }} required
                                    >
                                        <option value="">--Select Locality--</option>
                                        {location.map((value) => {
                                            return <option key={value.id} value={value.id}> {value.name}</option>;

                                        })}
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
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="email" className="form-control" placeholder="Email" aria-label="First name" required
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
                                                value={alertcountry_code}
                                                onChange={(e) => {
                                                    setAlertcountry_code(e.target.value);
                                                }}


                                            />
                                        </div>
                                    </div>
                                    <div className="col enquiry_boxes">
                                        <div className="enquiry_form">
                                            <input type="text" className="form-control" placeholder="Phone" aria-label="First name" maxLength="10" required
                                                value={alertphone}
                                                onChange={(e) => {
                                                    setAlertphone(e.target.value);
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
                                                        borderRadius: '0.1em',
                                                        margin: '0 0.5em',
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


            </div>

            <Footer />
        </div>
    )
}
