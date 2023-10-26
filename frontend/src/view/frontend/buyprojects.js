import { React, useState, useEffect, useContext } from "react";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from '../../config/config'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import CartContext from "../../store/cart-context";


import { Add } from "@mui/icons-material";
const URL = config.API_URL + "clint/property/Allproperty";
const ProjectURL = config.API_URL + "clint/property/Allproject";
const viewLocation = config.API_URL + "clint/home/viewLocation";
const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"

export default function BuyProjects() {
    const Shortlist = useContext(CartContext);
    const [max_room, setmax_room] = useState("");
    const [min_room, setmin_room] = useState("");
    const [property, setProperty] = useState([]);
    const [project, setProject] = useState([]);
    const [projectcount, setprojectcount] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setcount] = useState([]);
    const [location, setLocation] = useState([]);
    const [propertytype, setPropertytype] = useState([]);
    const [displayedItems, setDisplayedItems] = useState(10);
    const itemsPerLoad = 10;
    const [showLoader, setShowLoader] = useState(false);
    const [propertyname, setPropertyname] = useState("");
    const [location_id, setlocation_id] = useState("");
    const [min_area, setmin_area] = useState("");
    const [max_area, setmax_area] = useState("");
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [pro_id, setPro_id] = useState("");
    const [cus_id, setCus_id] = useState("");
    const [propertbadroom_list, setpropertbadroom_list] = useState([]);
    const [category, setcategory] = useState("");
    const [p_typeid, setp_typeid] = useState("");
    const [min_price, setmin_price] = useState("");
    const [tot_price, settot_price] = useState("");
    const [ip_add, setip_add] = useState("");
    const [usr_id, setusr_id] = useState("0");
    const [type, setType] = useState("1");
    const [age, setage] = useState("");
    const Id = JSON.parse(localStorage.getItem("userId"));
    const [propertyType_list, setpropertyType_list] = useState([])
    const [check_list, setCheck_list] = useState([])
    const [propertyAge_list, setPropertyAge_list] = useState([]);
    const [max_price, setmax_price] = useState("");



    let packageName;
    useEffect(() => {
        getData();
        viewshortlist();
        generateCaptcha();
        fetch(URL)
            .then((response) => response.json())
            .then((value) => {
                setProperty(value.data.allproperty);
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




    }, []);

    const handleLoadMore = () => {
        setDisplayedItems(displayedItems + itemsPerLoad);
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



    const propertyAge = [
        'Under Construction',
        '1', '2', '5', '10'

    ]

    const Propertbedroom = [
        '1', '2', '3', '4', '5', '6', '7',

    ]





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


    // Contact Now 
    const AddContact = async (event) => {
        event.preventDefault();
        const body = {
            fname: fname,
            email: email,
            message: message,
            phone: phone,
            pro_id: pro_id,
            cus_id: Id

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



                })
                .catch((err) => console.log(err));
            generateCaptcha();
        }
        else {
            console.log('Invalid Captcha !!');
            setCaptchaError('Please Enter Valid Security Code');
            setTimeout(() => {
                setCaptchaError(" ")
            }, 3000);
        }

    }

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

    // Advanced sarch
    const [id, setId] = useState("");
    const HandleSearch = (p_typeid, location_id, tot_price, age, room, area, id,option) => {
        const SearchUrl = config.API_URL + "clint/home/search";
        setp_typeid(p_typeid);
        setlocation_id(location_id);
        setage(age);
        setmax_room(room);
        setmin_room(room);
        const body = {
            p_typeid: p_typeid,
            location_id: location_id,
            tot_price: tot_price,
            age: age,
            room: room,
            area: area,
            id: id,
            type: 1,
            option:option
                };
        console.log("🚀 ~ file: buyprojects.js:300 ~ HandleSearch ~ body:", body)
        axios.post(SearchUrl, body)
            .then(response => {
                const data = response.data.data;
                setProject(data);
                console.log("🚀 ~ file: buyprojects.js:315 ~ HandleSearch ~ data:", data)
            })
            .catch(error => {
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







    return (
        <div>
            <Header />
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

                                <input type="text" className="form-control" placeholder="Email" maxLength="30" required
                                    value={email}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setEmail(e.target.value)
                                    }}
                                />
                                <input type="text" className="form-control" placeholder="Mobile" maxLength="10" required
                                    value={phone}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setPhone(e.target.value)
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
                                            backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                                            backgroundSize: 'cover',
                                            padding: '0.2em 0.5em',
                                            borderRadius: '0.3em',
                                            margin: '0 0.2em'
                                        }}>
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
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate" required>
                                        <p className="agree"> I Agree To Be Contacted By Propertybull And Others For
                                            Similar
                                            Properties.</p>
                                    </label>
                                </div>
                                {/* <a href="#" data-bs-dismiss="modal" aria-label="Close" onClick={AddContact}  >submit</a> */}
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
                                        <input type="text" className="form-control" placeholder="Search Id" aria-label="First name" id={id}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                HandleSearch('', '', '', '', '', '',e.target.value)
                                            }} />
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
                                                <select className="by_select" value={selectedMinPrice} onChange={handleMinPriceChange}>
                                                    <option>-Min Price-</option>
                                                    {minPrices.map((price) => (
                                                        <option key={price} value={price.toString()}>
                                                            {price
                                                                ? price >= 10000000
                                                                    ? (price / 10000000).toFixed(1) + ' crore'
                                                                    : price >= 100000
                                                                        ? (price / 100000).toFixed(1) + '  Lacs'
                                                                        : price.toLocaleString()
                                                                : 'Price Not Disclosed'}
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
                                                                {price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + '  Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price Not Disclosed'}
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
                                                    <option>-least-</option>
                                                    {minarea.map((area) => (
                                                        <option key={area} value={area.toString()}>
                                                            {area} Sq Ft
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-6 by_se_box">
                                                <select className="by_select" value={selectedMaxArea} onChange={handleMaxAreaChange}>
                                                    <option>-Most-</option>
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
                                        Age of building
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

                                        <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModalctsave"><i
                                            className="fa-regular fa-floppy-disk"></i>
                                            <span>save</span></Link>
                                        <Link className="share_soc" to="#" data-bs-toggle="dropdown"
                                            aria-expanded="false"><i className="fa fa-share-alt fa-lg"></i><span>Share</span></Link>

                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton-2">
                                            <ul className="soci_serch">
                                                <li><Link to="https://plus.google.com/share?url=https://www.propertybull.com/property/search/buy-property-in-Jaipur"><i className="fa-brands fa-google-plus-g"></i></Link></li>
                                                <li><Link className="blue_ico" to="https://twitter.com/intent/tweet?url=https://www.propertybull.com/property/search/buy-property-in-Jaipur"><i className="fa-brands fa-twitter"></i></Link></li>
                                                <li><Link className="sky_ico" to="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fwww.propertybull.com%252Fproperty%252Fsearch%252Fbuy-property-in-Jaipur&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-9">

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

                                <div className="by_right_part">
                                    <div className="right_top_part">
                                        <ul>
                                            <Link to="/property/search/1/all-property-buy">
                                                <li> Properties ({count})</li></Link>
                                            <Link to="/property/search/1/project-buy/">
                                                <li> Projects({projectcount})</li></Link>
                                            <Link to="/property/search/1/agent/" >
                                                <li> Posted By Agents (305)</li></Link>
                                        </ul>
                                    </div>

                                    {project.slice(0, displayedItems).map((value) => {

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
                                        if (value.SaveOrder != null) {
                                            packageName = value.SaveOrder.Subscription.package_name
                                        } else {
                                            packageName = "-"
                                        }



                                        return (
                                            <div key={value.id} className="cover_box">
                                                <div class="product">
                                                    <div class="ribbon-wrapper">
                                                        <div class="ribbon">{packageName}</div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="totle_area">
                                                            <div className="img-overflow">
                                                                <Link to={`/projectshow/${value.url}`}>
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
                                                                    {value.propertyType.name} <span>Property Id : {value.id}</span> <span>Locality :
                                                                        {StateLocation}</span>
                                                                    <span> <b className="text-dark">Total Area</b> : {value.area_in_sqft} sq Ft</span>
                                                                </p>
                                                            </div>



                                                            <div className="short_right">


                                                                {activeItems.includes(value.id) ?
                                                                    <div className="short_button">
                                                                        <Link class='fdsffdsaf' onClick={() => deleteshortlist(value.id)}>
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