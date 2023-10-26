import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config"
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";
import SidePanel from "./sidepanel";

import { Link, useNavigate, usez } from "react-router-dom";
import { set } from "lodash";
import jsPDF from "jspdf";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import {
    Collapse,
    Alert,
    Switch,
    TablePagination,
    Button,
    Tooltip,
    IconButton
} from "@mui/material";
export default function Dashboard() {
    const StaticMessage = localStorage.getItem("staticAdded");
    const [staticAdded, setStaticAdded] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [newpassword, setnewPassword] = useState("")
    const [altemail, setaltemail] = useState("")
    const [mobileno, setmobileno] = useState("")
    const [mobile, setmobile] = useState("")
    const [description, setdescription] = useState("")
    const [loc_ids, setloc_ids] = useState([])
    const [address, setaddress] = useState("")
    const [country_code, setcountry_code] = useState("91")
    const [Locations, setLocations] = useState([])
    const Locationapi = config.API_URL + "location/viewAll";
    const [allData, setallData] = useState([])
    const [Image, setImage] = useState("");
    const roleId = JSON.parse(localStorage.getItem('roleId'));
    const [cus_id, setCus_id] = useState("")
    const [buy, setBuy] = useState([])
    const [rent, setRent] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [usr_id, setusr_id] = useState("");
    const [ip_add, setip_add] = useState("");
    const [requriment, setRequriment] = useState([])
    const [data, setData] = useState([]);
    const [pro_id, setPro_id] = useState("");
    const [Properties, setProperties] = useState([]);
    const [property, setProperty] = useState([]);
    const [shortlist, setshortlist] = useState([]);
    const [contactDatil, setcontactDatil] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    //add s
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setip_add(res.data.IPv4)
        setusr_id(Id)
    }

    const Id = JSON.parse(localStorage.getItem("userId"));
    const getrequirementbyId = async () => {
        const api = config.API_URL + "clint/requirement/id"
        const body = {
            cus_id: Id
        }
        await axios.post(api, body)
            .then((res) => {
                console.log(res.data.data);
                setRequriment(res.data.data)

            }).catch((err) => console.log(err));

    }
    useEffect(() => {
        if (StaticMessage != null && StaticMessage !== "") {
            setOpenAlert(true);
            setStaticAdded(StaticMessage);
            setTimeout(() => {
                localStorage.setItem("staticAdded", "");
                setOpenAlert(false);
            }, 3000);
        } else {
            setOpenAlert(false);
            setStaticAdded("");
        }
    }, [StaticMessage]);

    function numDifferentiation(val) {
        if (val >= 10000000) {
            val = (val / 10000000).toFixed(2) + ' Crore';
        } else if (val >= 100000) {
            val = (val / 100000).toFixed(1) + ' Lacs';
        }
        else if (val >= 1000) val = (val).toFixed() + ' thousand';
        return val;
    }




    // view data by sell 
    const getrequirementSell = async (category) => {
        const api = config.API_URL + "clint/requirement/category"
        const body = {
            cus_id: Id,
            category: "Buy"
        }
        await axios.post(api, body)
            .then((res) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                if (res.data.data != null) {
                    setBuy(res.data.data)
                }
                return null
            }).catch((err) => console.log(err));
    }


    useEffect(() => {
        getData()
        getrequirementSell("Buy")
        const Url = config.API_URL + "auth/";
        setCus_id(Id)

        fetch(Url + Id)
            .then((response) => response.json())
            .then((value) => {
                setallData(value.data)
                setName(value.data.name)
                setdescription(value.data.description)
                setaddress(value.data.address)
                setmobile(value.data.mobile)
                setcountry_code(value.data.country_code)
                setaltemail(value.data.altemail)
                setmobileno(value.data.mobileno)

                var location_id = value.data.loc_ids
                const loc_ids_array = location_id ? location_id.split(",") : ''

                setloc_ids(loc_ids_array);
            });
        getrequirementbyId()
        fetch(Locationapi)
            .then((response) => response.json())
            .then((value) => {
                setLocations(value.data);
            });

        const apiUrl = config.API_URL + "auth/";
        fetch(apiUrl + Id)
            .then((response) => response.json())
            .then((value) => {
                setallData(value.data);

            })
        const api = config.API_URL + "clint/shortlist/viewAll"
        const body = {
            ip_add: ip_add,
            usr_id: Id
        }
        axios.post(api, body)
            .then((res) => {
                setshortlist(res.data.data)
                console.log(res.data.data);

            }).catch((err) => console.log(err));
        const Resentpropertyview = config.API_URL + "clint/property/resentproperty"
        const bodys = {
            cus_id: Id
        }
        axios.post(Resentpropertyview, bodys)
            .then((res) => {
                setProperties(res.data.data)
            }).catch((err) => console.log(err));

        const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
        const bodyss = {
            cus_id: Id
        }
        axios.post(ADDEDPROPERTIES, bodyss)
            .then((res) => {
                setProperty(res.data.data)
            }).catch((err) => console.log(err));
        //view contact in property/project
        const contactdetail = config.API_URL + "clint/contactenquiry/id";
        const bodyes = {
            cus_id: Id,
        }
        axios.post(contactdetail, bodyes)
            .then((res) => {
                console.log(res.data.data, "contact");
                setcontactDatil(res.data.data)
            }).catch((err) => console.log(err));
    }, [fetch]);
    var options = {
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data',
        },
    };

    var EXTERIOR;

    const deleteProject = async (id) => {
        const urls = config.API_URL + 'clint/project/delete/'
        const res = await axios.delete(urls + id);
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
        const bodyss = {
            cus_id: Id
        }
        axios.post(ADDEDPROPERTIES, bodyss)
            .then((res) => {
                setProperty(res.data.data)
            }).catch((err) => console.log(err));


    }
    const deleteconfirmationes = (id, message) => {
        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteProject(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    let images;
    let area;
    let types;
    let propertyname;
    let price
    let urls;
    let Roles;
    let username;
    return (
        <div>
            <Header />
            <div className="myAccountPage">
                <ToastContainer />

                <div className="row">
                    {roleId == 1 ?
                        <div className="col-lg-2">                            
                            <SidePanel />
                    
                        </div> : <div></div>}

                    {roleId == 1 ?
                        <div className="col-lg-10">
                            <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Requirements ({requriment.length})</h3>
                                    <ul className="residential_contant">
                                        {
                                            requriment.map((value) => {
                                                var formattedAmount
                                                if (value.propertyType != null) {
                                                    types = value.propertyType.name
                                                    formattedAmount = (value.min_budget === 1 ? 1000 : value.min_budget).toLocaleString('en-IN');
                                                }
                                                return (

                                                    <li key={value.id}>{types} for {value.category} in Rajasthan  between,
                                                        {value.min_budget
                                                            ? value.min_budget >= 10000000
                                                                ? (value.min_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.min_budget >= 100000
                                                                    ? (value.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                    : value.min_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                        --
                                                        {value.max_budget
                                                            ? value.max_budget >= 10000000
                                                                ? (value.max_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.max_budget >= 100000
                                                                    ? (value.max_budget / 100000).toFixed(1) + ' lacs'
                                                                    : value.max_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <h3>My Properties ({property.length})</h3>
                                    <ul className="nav nav-pills mb-3 my_ajax_tab" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                                aria-selected="true">Recently Added Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                                aria-selected="false">Shortlisted Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                                aria-selected="false">Contacted Properties</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content bottom_tabs" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                            aria-labelledby="pills-home-tab">
                                            <ul className="bottom_tabs_deta">
                                                {Properties.map((value) => {
                                                    return (

                                                        value.status == "Y" ? (<li key={value.id}>
                                                            <Link to={value.type === 1 ? `/projectshow/${value.url}` : `/propertyshow/${value.url}`}>
                                                                <span>{value.name}</span>
                                                                <span>
                                                                {value.tot_price
                                                            ? value.tot_price >= 10000000
                                                                ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                                                : value.tot_price >= 100000
                                                                    ? (value.tot_price / 100000).toFixed(1) + ' lacs'
                                                                    : value.tot_price.toLocaleString()
                                                            : 'Price Not Disclosed'}


                                                                </span>
                                                                <span>Jaipur, Rajasthan</span>
                                                            </Link>

                                                        </li>) : (<li key={value.id}><Link
                                                        ><span>{value.name}</span> <span> 
                                                                {value.tot_price >= 100000 ? `${value.tot_price / 100000} lac` : value.tot_price.toLocaleString()}

                                                            
                                                            
                                                            </span> <span>Jaipur,Rajasthan</span></Link>
                                                        </li>)

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                            {shortlist.map((item, index) => {
                                                if (item.Property != null) {
                                                    images = item.Property.featureimage;
                                                    area = item.Property.area_in_sqft;
                                                    propertyname = item.Property.name;
                                                    price = item.Property.tot_price
                                                    urls = item.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "--";
                                                    urls = "--";
                                                }

                                                return (


                                                    <ul className="bottom_tabs_deta" key={item.id}>
                                                        <li><Link to={"/propertyshow/" + urls}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span> 
                                                            <span> {price
                                                            ? price >= 10000000
                                                                ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lacs'
                                                                    : price.toLocaleString()
                                                            : 'Price Not Disclosed'}</span>                                                             
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                            {contactDatil.map((value) => {
                                                if (value.Property != null) {
                                                    images = value.Property.featureimage;
                                                    area = value.Property.area_in_sqft;
                                                    propertyname = value.Property.name;
                                                    price = value.Property.tot_price
                                                    urls = value.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "on requrid";
                                                    urls = "--";
                                                }

                                                return (

                                                    <ul className="bottom_tabs_deta" key={value.id}>
                                                        <li><Link to={"/propertyshow/" + urls}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span>  <span>
                                                            {price >= 100000 ? `${price / 100000} lac` : price.toLocaleString()}
                                                                
                                                                </span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                            </div> : ""}
                </div>

                <div className="d-flex">

                    {roleId == 2 ?
                        <div className="col-lg-2">

                            <SidePanel />
                          
                        </div> : <div></div>}
                    {roleId == 2 ?
                        <div
                            className="col-lg-10 bbox"  >
                                  <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Requirements ({requriment.length})</h3>
                                    <ul className="residential_contant">
                                        {
                                            requriment.map((value) => {
                                                var formattedAmount
                                                if (value.propertyType != null) {
                                                    types = value.propertyType.name
                                                    formattedAmount = (value.min_budget === 1 ? 1000 : value.min_budget).toLocaleString('en-IN');
                                                }
                                                return (

                                                    <li key={value.id}>{types} for {value.category} in Rajasthan  between,
                                                        {value.min_budget
                                                            ? value.min_budget >= 10000000
                                                                ? (value.min_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.min_budget >= 100000
                                                                    ? (value.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                    : value.min_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                        --
                                                        {value.max_budget
                                                            ? value.max_budget >= 10000000
                                                                ? (value.max_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.max_budget >= 100000
                                                                    ? (value.max_budget / 100000).toFixed(1) + ' lacs'
                                                                    : value.max_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <h3>My Properties ({property.length})</h3>
                                    <ul className="nav nav-pills mb-3 my_ajax_tab" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                                aria-selected="true">Recently Added Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                                aria-selected="false">Shortlisted Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                                aria-selected="false">Contacted Properties</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content bottom_tabs" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                            aria-labelledby="pills-home-tab">
                                            <ul className="bottom_tabs_deta">
                                                {Properties.map((value) => {
                                                    return (

                                                        <li key={value.id}><Link to={`/propertyshow/${value.url}`}  ><span>{value.name}</span> <span>    {numDifferentiation(value.tot_price)}</span> <span>Jaipur,Rajasthan</span></Link>
                                                        </li>

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                            {shortlist.map((item, index) => {
                                                if (item.Property != null) {
                                                    images = item.Property.featureimage;
                                                    area = item.Property.area_in_sqft;
                                                    propertyname = item.Property.name;
                                                    price = item.Property.tot_price
                                                    urls = item.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "--";
                                                    urls = "--";
                                                }

                                                return (


                                                    <ul className="bottom_tabs_deta" key={item.id}>
                                                        <li><Link to={"/propertyshow/" + urls}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span> 

                                                            <span> {price
                                                            ? price >= 10000000
                                                                ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lacs'
                                                                    : price.toLocaleString()
                                                            : 'Price Not Disclosed'}</span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>

                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                            {contactDatil.map((value) => {
                                                if (value.Property != null) {
                                                    images = value.Property.featureimage;
                                                    area = value.Property.area_in_sqft;
                                                    propertyname = value.Property.name;
                                                    price = value.Property.tot_price
                                                    urls = value.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "on requrid";
                                                    urls = "--";
                                                }

                                                return (

                                                    <ul className="bottom_tabs_deta" key={value.id}>
                                                        <li><Link to={"/propertyshow/" + urls}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span>  <span>{numDifferentiation(price)}</span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>


                            </div></div></div> : ""}



                </div>



                <div className="row">
                    {roleId == 3 ?
                        <div className="col-lg-2">
                            <SidePanel />
                        </div> : <div></div>}

                    {roleId == 3 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Requirements ({requriment.length})</h3>
                                    <ul className="residential_contant">
                                        {
                                            requriment.map((value) => {
                                                var formattedAmount
                                                if (value.propertyType != null) {
                                                    types = value.propertyType.name
                                                    formattedAmount = (value.min_budget === 1 ? 1000 : value.min_budget).toLocaleString('en-IN');
                                                }
                                                return (

                                                    <li key={value.id}>{types} for {value.category} in Rajasthan  between,
                                                        {value.min_budget
                                                            ? value.min_budget >= 10000000
                                                                ? (value.min_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.min_budget >= 100000
                                                                    ? (value.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                    : value.min_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                        --
                                                        {value.max_budget
                                                            ? value.max_budget >= 10000000
                                                                ? (value.max_budget / 10000000).toFixed(1) + ' crore'
                                                                : value.max_budget >= 100000
                                                                    ? (value.max_budget / 100000).toFixed(1) + ' lacs'
                                                                    : value.max_budget.toLocaleString()
                                                            : 'Price Not Disclosed'}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <h3>My Properties ({property.length})</h3>
                                    <ul className="nav nav-pills mb-3 my_ajax_tab" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                                aria-selected="true">Recently Added Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                                aria-selected="false">Shortlisted Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                                aria-selected="false">Contacted Properties</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content bottom_tabs" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                            aria-labelledby="pills-home-tab">
                                            <ul className="bottom_tabs_deta">
                                                {Properties.map((value) => {
                                                    return (

                                                        <li key={value.id}><Link to={value.status == "Y" ? `/propertyshow/${value.url}` : "#"}  ><span>{value.name}</span> <span>   {numDifferentiation(value.tot_price)}</span> <span>Jaipur,Rajasthan</span></Link>
                                                        </li>

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                            {shortlist.map((item, index) => {
                                                if (item.Property != null) {
                                                    images = item.Property.featureimage;
                                                    area = item.Property.area_in_sqft;
                                                    propertyname = item.Property.name;
                                                    price = item.Property.tot_price
                                                    urls = item.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "--";
                                                    urls = "--";
                                                }

                                                return (


                                                    <ul className="bottom_tabs_deta" key={item.id}>
                                                        <li><Link to={item.status == "Y" ? `/propertyshow/${urls}` : "#"}>
                                                            <img alt="Image" src={images ? config.Image_URL + images : "https://www.propertybull.com/pro_images/570ff61067e2d9d9b40517cf2052b592265093555.png"} />

                                                            <span>{propertyname}</span>
                                                            <span> {price
                                                            ? price >= 10000000
                                                                ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lacs'
                                                                    : price.toLocaleString()
                                                            : 'Price Not Disclosed'}</span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                            {contactDatil.map((value) => {
                                                if (value.Property != null) {
                                                    images = value.Property.featureimage;
                                                    area = value.Property.area_in_sqft;
                                                    propertyname = value.Property.name;
                                                    price = value.Property.tot_price
                                                    urls = value.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "on requrid";
                                                    urls = "--";
                                                }

                                                return (

                                                    <ul className="bottom_tabs_deta" key={value.id}>
                                                        <li><Link to={value.status == "Y" ? "/propertyshow/" + urls : "#"}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span>  <span>{numDifferentiation(price)}</span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
                                    <div className="tabtitle_top">



                                    </div>
                                    <div className="new_add_property">

                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-home-tab-ten" data-bs-toggle="tab"
                                                    data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                                    aria-selected="true">ADDED PROPERTIES ({property.length})</button>
                                                <button className="nav-link" id="nav-profile-tab-twenty" data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                                    aria-selected="false">SHORTLISTED PROPERTIES ({shortlist.length})</button>
                                                <button className="nav-link" id="nav-contact-tab-thirty" data-bs-toggle="tab"
                                                    data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact"
                                                    aria-selected="false">CONTACTED PROPERTIES</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                aria-labelledby="nav-home-tab-ten">

                                                {property.map((e) => {
                                                    return (

                                                        <div className="new_add_property_scroll" key={e.id}>
                                                            <Link className="left_deta_text" to={"/propertyshow/" + e.url}><span>{e.name} </span> <span>   {(e.tot_price / 100000).toFixed(1) + ' Lacs'} </span> <span>
                                                                Jaipur,Rajasthan </span></Link>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                                        title="Upload Video">
                                                                        <i className="fa fa-upload fa-lg"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                        <i className="fa fa-edit fa-lg" onClick={(es) => {
                                                                            navigate("/dashboard/edit_property/" + e.id)
                                                                        }}

                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmationes(e.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
                                                                        <i className="fa fa-close fa-lg"></i>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    )
                                                })}


                                            </div>



                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                                                aria-labelledby="nav-profile-tab-twenty">
                                                {shortlist.map((item, index) => {
                                                    if (item.Property != null) {
                                                        images = item.Property.featureimage;
                                                        area = item.Property.area_in_sqft;
                                                        propertyname = item.Property.name;
                                                        price = item.Property.latitude
                                                        urls = item.Property.url;
                                                    } else {
                                                        images = "---";
                                                        area = "---";
                                                        propertyname = "--";
                                                        price = "--";
                                                        urls = "--";
                                                    }

                                                    return (
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>   {price?price.toFixed(2) + ' Lacs':""}</span> <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                                                                        <i className="fa fa-close fa-lg"

                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })
                                                }


                                            </div>

                                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                                {contactDatil.map((value) => {
                                                    if (value.Property != null) {
                                                        images = value.Property.featureimage;
                                                        area = value.Property.area_in_sqft;
                                                        propertyname = value.Property.name;
                                                        price = value.Property.tot_price
                                                        urls = value.Property.url;
                                                    } else {
                                                        images = "---";
                                                        area = "---";
                                                        propertyname = "--";
                                                        price = "on requrid";
                                                        urls = "--";
                                                    }

                                                    return (

                                                        <ul className="bottom_tabs_deta" key={value.id}>
                                                            <li><Link to={"/projectshow/" + urls}>
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname}</span>  <span>{numDifferentiation(price)}</span>
                                                                <span>Jaipur,Rajasthan</span></Link></li>

                                                        </ul>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </div>


                                </div>



                            </div></div></div> : ""}
                </div>

                <div className="row">
                    {roleId == 4 ?
                        <div className="col-lg-2">
                            <SidePanel />
                           
                        </div> : <div></div>}
                    {roleId == 4 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Properties({property.length})</h3>

                                    <ul className="nav nav-pills mb-3 my_ajax_tab" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                                aria-selected="true">Recently Added Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                                aria-selected="false">Shortlisted Properties</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                                aria-selected="false">Contacted Properties</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content bottom_tabs" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                            aria-labelledby="pills-home-tab">
                                            <ul className="bottom_tabs_deta">
                                                {Properties.map((value) => {
                                                    return (

                                                        <li key={value.id}><Link to={value.status == "Y" ?value.type==1? "/projectshow/" + value.url:"/propertyshow/" + value.url : "#"}><span>{value.name}</span> <span>   {value.tot_price ? value.tot_price >= 10000000 ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                                            : value.tot_price >= 100000
                                                                ? (value.tot_price / 100000).toFixed(1) + ' lakh'
                                                                : value.tot_price.toLocaleString()
                                                            : 'price On Request'}</span> <span>Jaipur,Rajasthan</span></Link>
                                                        </li>

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                            {shortlist.map((item, index) => {
                                                if (item.Property != null) {
                                                    images = item.Property.featureimage;
                                                    area = item.Property.area_in_sqft;
                                                    propertyname = item.Property.name;
                                                    price = item.Property.tot_price
                                                    urls = item.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "--";
                                                    urls = "--";
                                                }



                                                return (

                                                    <ul className="bottom_tabs_deta" key={item.id}>
                                                        <li><Link>
                                                            <img src={config.Image_URL + images} alt="img" />

                                                            <span>{propertyname}</span>  <span> {price ? price >= 10000000 ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lakh'
                                                                    : price.toLocaleString()
                                                                : 'Price On Request'}</span> <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">

                                            {contactDatil.map((value) => {
                                                if (value.Property != null) {
                                                    images = value.Property.featureimage;
                                                    area = value.Property.area_in_sqft;
                                                    propertyname = value.Property.name;
                                                    price = value.Property.tot_price
                                                    urls = value.Property.url;
                                                } else {
                                                    images = "---";
                                                    area = "---";
                                                    propertyname = "--";
                                                    price = "on requrid";
                                                    urls = "--";
                                                }

                                                return (

                                                    <ul className="bottom_tabs_deta" key={value.id}>
                                                        <li><Link to={value.type==1?"/projectshow/" + urls:"/propertyshow/" + urls}>
                                                            <img src={config.Image_URL + images} alt="img" />
                                                            <span>{propertyname}</span>  <span>{numDifferentiation(price)}</span>
                                                            <span>Jaipur,Rajasthan</span></Link></li>

                                                    </ul>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div></div> </div> : ""}</div>
            </div>
            <Footer />
        </div>
    )
}