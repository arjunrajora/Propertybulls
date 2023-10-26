import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config"
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";

import { Link, useNavigate, usez } from "react-router-dom";
import { set, values } from "lodash";
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
import SidePanel from "./sidepanel";
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
    const [country_code, setcountry_code] = useState("91");
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


    // view data by sell 
    const getrequirementSell = async (category) => {
        const api = config.API_URL + "clint/requirement/category"
        const body = {
            cus_id: Id,
            category: "buy"
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


    const getrequirementRent = async (category) => {
        const api = config.API_URL + "clint/requirement/category"
        const body = {
            cus_id: Id,
            category: "Rent"
        }
        await axios.post(api, body)
            .then((res) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                if (res.data.data != null) {
                    setRent(res.data.data)
                }
                return null
            }).catch((err) => console.log(err));
    }
    function numDifferentiations(val) {
        if (val >= 100) {
            val = (val / 100).toFixed(1) + ' Crore';
        } else if (val >= 10) {
            val = (val / 1).toFixed(1) + ' Lacs';
        }
        else if (val >= 1) {
            val = val + ' Lacs';
        }
        return val;
    }



    useEffect(() => {
        getData()
        getrequirementSell("buy")
        getrequirementRent("Rent")
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

        const apiUrl = config.API_URL + "auth/";
        fetch(apiUrl + Id)
            .then((response) => response.json())
            .then((value) => {
                setallData(value.data);

            })

    }, [fetch]);
    var options = {
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data',
        },
    };

    var message;

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






    const Delete = async (id) => {
        const urls = config.API_URL + 'clint/requirement/'
        const res = await axios.delete(urls + id);
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        fetch(Locationapi)
            .then((response) => response.json())
            .then((value) => {
                setLocations(value.data);
            });

        getrequirementSell("buy")
        getrequirementRent("Rent")
    }
    const deleteconfirmation = (id, message) => {
        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => Delete(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const deleteshortlist = async (pro_id) => {

        const api = config.API_URL + "clint/shortlist/delete"
        const body = {
            pro_id: pro_id
        }

        const res = await axios.post(api, body);
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        const short_list = config.API_URL + "clint/shortlist/viewAll"
        const bodyss = {
            ip_add: ip_add,
            usr_id: Id
        }
        axios.post(short_list, bodyss)
            .then((res) => {
                setshortlist(res.data.data)
            }).catch((err) => console.log(err));

    }
    const deleteconfirmations = (pro_id, message) => {
        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteshortlist(pro_id),
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
                            {/* <h5>Welcome to {allData.name} </h5> */}
                            {staticAdded != null && openAlert === true && (
                                <Collapse in={openAlert}>
                                    <Alert aria-hidden={true} severity="success">
                                        {staticAdded}
                                    </Alert>
                                </Collapse>
                            )}
                            <SidePanel />

    
                        </div> : <div></div>}
                    {roleId == 1 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Requirements ({requriment.length})</h3>
                                    <ul className="residential_contant">
                                        {
                                            requriment.map((value) => {

                                                if (value.propertyType != null) {
                                                    types = value.propertyType.name
                                                } else {
                                                    return null
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

                                                        <li><Link to={`/projectshow/${value.url}`}  ><span>{value.name}</span> <span>   {(value.tot_price / 100000).toFixed(1) + ' Lacs'}</span> <span>Jaipur,Rajasthan</span></Link>
                                                        </li>

                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
                                    <div className="tabtitle_top">

                                        <Link to="/dashboard/addporject">Add New Project</Link>
                                        <Link to="/dashboard/addproperty" className="nav-link">Add New Property</Link>

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

                                    </div>


                                </div>


                                <div className="tab-pane fade show active" id="pills-requirements" role="tabpanel" aria-labelledby="pills-requirements-tab">

                                    <div className="tabtitle_top">
                                        <Link to="/dashboard/AddRequriment">Add New Requirement</Link>
                                    </div>
                                    <div className="new_add_property">
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-home-tab-ten" data-bs-toggle="tab"
                                                    data-bs-target="#nav-home-buy" type="button" role="tab" aria-controls="nav-home-buy"
                                                    aria-selected="true" onClick={((e) => {
                                                        getrequirementSell("buy")
                                                    })}>Buy ({buy.length})</button>
                                                <button className="nav-link" id="nav-profile-tab-twenty" data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile-rent" type="button" role="tab"
                                                    aria-controls="nav-profile-rent" aria-selected="false" onClick={((e) => {
                                                        getrequirementRent("Rent")
                                                    })} > Rent ({rent.length})

                                                </button>

                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
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
                                                <div className="tab-pane fade show active" id="nav-home-buy" role="tabpanel"
                                                    aria-labelledby="nav-home-tab-ten">
                                                    {buy && buy.map((e) => {
                                                        if (e.propertyType != null) {
                                                            types = e.propertyType.name
                                                        }
                                                        else {
                                                            return null
                                                        }
                                                        return (
                                                            <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                                <p>
                                                                    <a href="#">{types} for {e.category} in Jaipur -Rajesthan</a>
                                                                    <span>
                                                                        {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                    </span>
                                                                    <span>    {e.min_budget
                                                                        ? e.min_budget >= 10000000
                                                                            ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                            : e.min_budget >= 100000
                                                                                ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                                : e.min_budget.toLocaleString()
                                                                        : 'Price Not Disclosed'}
                                                                        --
                                                                        {e.max_budget
                                                                            ? e.max_budget >= 10000000
                                                                                ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                                : e.max_budget >= 100000
                                                                                    ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                    : e.max_budget.toLocaleString()
                                                                            : 'Price Not Disclosed'}</span>
                                                                    <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>

                                                                    <span>Room{e.min_room} BHk {e.max_room}</span>
                                                                    <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>

                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                            <i className="fa fa-search fa-lg"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                            deleteconfirmation(
                                                                                e.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}>
                                                                            <i className="fa fa-close fa-lg" ></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            <div className="tab-pane fade" id="nav-profile-rent" role="tabpanel"
                                                aria-labelledby="nav-profile-tab-twenty">
                                                {rent && rent.map((e) => {
                                                    if (e.propertyType != null) {
                                                        types = e.propertyType.name
                                                    }
                                                    return (
                                                        <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                            <p>
                                                                <a href="#">{types} for {e.category} in Jaipur -Rajesthan</a>
                                                                <span>
                                                                    {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                </span>
                                                                <span>
                                                                    <span>    {e.min_budget
                                                                        ? e.min_budget >= 10000000
                                                                            ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                            : e.min_budget >= 100000
                                                                                ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                                : e.min_budget.toLocaleString()
                                                                        : 'Price Not Disclosed'}
                                                                        --
                                                                        {e.max_budget
                                                                            ? e.max_budget >= 10000000
                                                                                ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                                : e.max_budget >= 100000
                                                                                    ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                    : e.max_budget.toLocaleString()
                                                                            : 'Price Not Disclosed'}</span>

                                                                </span>
                                                                <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>
                                                                <span>Room{e.min_room} BHk {e.max_room}</span>

                                                                <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>                                                </p>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                        <i className="fa fa-search fa-lg"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                                                                        <i className="fa fa-close fa-lg" onClick={(ee) => {
                                                                            deleteconfirmation(
                                                                                e.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>


                                        </div>
                                    </div>

                                </div>


                            </div></div> </div> : ""}</div>





                <div className="row">
                    {roleId == 2 ?
                        <div className="col-lg-2">
                            {/* <h5>Welcome to {allData.name} </h5> */}
                            <SidePanel />
                            {/* {staticAdded != null && openAlert === true && (
                            <Collapse in={openAlert}>
                                <Alert aria-hidden={true} severity="success">
                                    {staticAdded}
                                </Alert>
                            </Collapse>
                        )}
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <Link to="/dashboard">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-dashboard-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard"
                                        aria-selected="true">Dashboard</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/myproperties">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-properties-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-properties" type="button" role="tab" aria-controls="pills-properties"
                                        aria-selected="false">My Properties</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/myrequirement">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-requirements-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                                        aria-selected="false">My Requirements</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/search">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                                        aria-selected="false">My Searches</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/mysubscription">

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile-search" type="button" role="tab"
                                        aria-controls="pills-profile-search" aria-selected="false">My Subscription</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/account">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile-search" type="button" role="tab"
                                        aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                                </li>
                            </Link>
                            <li className="nav-item" role="presentation">
                                <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                            </li>

                        </ul> */}
                        </div> : <div></div>}

                    {roleId == 2 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">
                                    <h3>My Requirements ({requriment.length})</h3>

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
                                </div>



                                <div className="tab-pane fade show active" id="pills-requirements" role="tabpanel" aria-labelledby="pills-requirements-tab">

                                    <div className="tabtitle_top">
                                        <Link to="/dashboard/AddRequriment">Add New Requirement</Link>
                                    </div>
                                    <div className="new_add_property">
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-home-tab-ten" data-bs-toggle="tab"
                                                    data-bs-target="#nav-home-buy" type="button" role="tab" aria-controls="nav-home-buy"
                                                    aria-selected="true" onClick={((e) => {
                                                        getrequirementSell("buy")
                                                    })}>Buy ({buy.length})</button>
                                                <button className="nav-link" id="nav-profile-tab-twenty" data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile-rent" type="button" role="tab"
                                                    aria-controls="nav-profile-rent" aria-selected="false" onClick={((e) => {
                                                        getrequirementRent("Rent")
                                                    })} > Rent ({rent.length})

                                                </button>

                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
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
                                                <div className="tab-pane fade show active" id="nav-home-buy" role="tabpanel"
                                                    aria-labelledby="nav-home-tab-ten">
                                                    {buy && buy.map((e) => {

                                                        if (e.propertyType != null) {
                                                            types = e.propertyType.name
                                                        } return (
                                                            <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                                <p>
                                                                    <a href="#"> {types} for {e.category} in Jaipur -Rajesthan</a>
                                                                    <span>
                                                                        <span>
                                                                            {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                        </span>
                                                                        <span>    {e.min_budget
                                                                            ? e.min_budget >= 10000000
                                                                                ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                                : e.min_budget >= 100000
                                                                                    ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                                    : e.min_budget.toLocaleString()
                                                                            : 'Price Not Disclosed'}
                                                                            --
                                                                            {e.max_budget
                                                                                ? e.max_budget >= 10000000
                                                                                    ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                                    : e.max_budget >= 100000
                                                                                        ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                        : e.max_budget.toLocaleString()
                                                                                : 'Price Not Disclosed'}</span>

                                                                    </span>
                                                                    <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>
                                                                    <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>

                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                            <i className="fa fa-search fa-lg"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                            deleteconfirmation(
                                                                                e.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}>
                                                                            <i className="fa fa-close fa-lg" ></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            <div className="tab-pane fade" id="nav-profile-rent" role="tabpanel"
                                                aria-labelledby="nav-profile-tab-twenty">
                                                {rent && rent.map((e) => {
                                                    if (e.propertyType != null) {
                                                        types = e.propertyType.name
                                                    }
                                                    return (
                                                        <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                            <p>
                                                                <a href="#">{types} for {e.category} in Jaipur -Rajesthan</a>
                                                                <span>
                                                                    {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                </span>
                                                                <span>    {e.min_budget
                                                                    ? e.min_budget >= 10000000
                                                                        ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                        : e.min_budget >= 100000
                                                                            ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                            : e.min_budget.toLocaleString()
                                                                    : 'Price Not Disclosed'}
                                                                    --
                                                                    {e.max_budget
                                                                        ? e.max_budget >= 10000000
                                                                            ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                            : e.max_budget >= 100000
                                                                                ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                : e.max_budget.toLocaleString()
                                                                        : 'Price Not Disclosed'}</span>
                                                                <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>
                                                                <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>                                                    </p>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                        <i className="fa fa-search fa-lg"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                                                                        <i className="fa fa-close fa-lg" onClick={(ee) => {
                                                                            deleteconfirmation(
                                                                                e.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="tab-pane fade" id="nav-contact-maching" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div></div></div> : ""}
                </div>

                <div className="row">
                    {roleId == 3 ?
                        <div className="col-lg-2">
                            {/* <h5>Welcome to {allData.name} </h5> */}
                            {staticAdded != null && openAlert === true && (
                                <Collapse in={openAlert}>
                                    <Alert aria-hidden={true} severity="success">
                                        {staticAdded}
                                    </Alert>
                                </Collapse>
                            )}
                            <SidePanel />
                            {/* <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <Link to="/dashboard">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-dashboard-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard"
                                        aria-selected="true">Dashboard</button>
                                </li>
                            </Link>

                            <Link to="/dashboard/myproperties">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-properties-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-properties" type="button" role="tab" aria-controls="pills-properties"
                                        aria-selected="false">My Properties</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/myrequirement">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-requirements-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                                        aria-selected="false">My Requirements</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/search">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                                        aria-selected="false">My Searches</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/mysubscription">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile-search" type="button" role="tab"
                                        aria-controls="pills-profile-search" aria-selected="false">My Subscription</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/account">

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile-search" type="button" role="tab"
                                        aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                                </li>
                            </Link>
                            {roleId == 3 ?
                                <li className="nav-item" role="presentation">
                                    <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                                </li> : ""}
                        </ul> */}
                        </div> : <div></div>}
                    {roleId == 3 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show " id="pills-dashboard" role="tabpanel"
                                    aria-labelledby="pills-dashboard-tab">

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

                                </div>
                                <div className="tab-pane fade show active" id="pills-requirements" role="tabpanel" aria-labelledby="pills-requirements-tab">

                                    <div className="tabtitle_top">
                                        <Link to="/dashboard/AddRequriment">Add New Requirement</Link>
                                    </div>
                                    <div className="new_add_property">
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-home-tab-ten" data-bs-toggle="tab"
                                                    data-bs-target="#nav-home-buy" type="button" role="tab" aria-controls="nav-home-buy"
                                                    aria-selected="true" onClick={((e) => {
                                                        getrequirementSell("buy")
                                                    })}>Buy ({buy.length})</button>
                                                <button className="nav-link" id="nav-profile-tab-twenty" data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile-rent" type="button" role="tab"
                                                    aria-controls="nav-profile-rent" aria-selected="false" onClick={((e) => {
                                                        getrequirementRent("Rent")
                                                    })} > Rent ({rent.length})

                                                </button>

                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
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
                                                <div className="tab-pane fade show active" id="nav-home-buy" role="tabpanel"
                                                    aria-labelledby="nav-home-tab-ten">
                                                    {buy && buy.map((e) => {

                                                        if (e.propertyType != null) {
                                                            types = e.propertyType.name
                                                        }
                                                        return (
                                                            <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                                <p>
                                                                    <a href="#">{types} for {e.category} in Jaipur -Rajesthan</a>
                                                                    <span>
                                                                        {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                    </span>
                                                                    <span>
                                                                        {e.min_budget
                                                                            ? e.min_budget >= 10000000
                                                                                ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                                : e.min_budget >= 100000
                                                                                    ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                                    : e.min_budget.toLocaleString()
                                                                            : 'Price Not Disclosed'}
                                                                        --
                                                                        {e.max_budget
                                                                            ? e.max_budget >= 10000000
                                                                                ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                                : e.max_budget >= 100000
                                                                                    ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                    : e.max_budget.toLocaleString()
                                                                            : 'Price Not Disclosed'}
                                                                    </span>
                                                                    <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>
                                                                    <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>

                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                            <i className="fa fa-search fa-lg"></i>
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                            deleteconfirmation(
                                                                                e.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}
                                                                        >
                                                                            <i className="fa fa-close fa-lg" ></i>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            <div className="tab-pane fade" id="nav-profile-rent" role="tabpanel"
                                                aria-labelledby="nav-profile-tab-twenty">
                                                {rent && rent.map((e) => {
                                                    if (e.propertyType != null) {
                                                        types = e.propertyType.name
                                                    }
                                                    return (
                                                        <div className="new_add_property_scroll buy_contant" key={e.id}>
                                                            <p>
                                                                <a href="#">{types} for {e.category} in Jaipur -Rajesthan</a>
                                                                <span>
                                                                    {e.min_room > 0 ? 'Room' + e.min_room + ' BHK' : ''} {e.max_room > 0 ? e.max_room + ' BHK' : ''}
                                                                </span>                                                    <span>    {e.min_budget
                                                                    ? e.min_budget >= 10000000
                                                                        ? (e.min_budget / 10000000).toFixed(1) + ' crore'
                                                                        : e.min_budget >= 100000
                                                                            ? (e.min_budget / 100000).toFixed(1) + ' Lacs'
                                                                            : e.min_budget.toLocaleString()
                                                                    : 'Price Not Disclosed'}
                                                                    --
                                                                    {e.max_budget
                                                                        ? e.max_budget >= 10000000
                                                                            ? (e.max_budget / 10000000).toFixed(1) + ' crore'
                                                                            : e.max_budget >= 100000
                                                                                ? (e.max_budget / 100000).toFixed(1) + ' lacs'
                                                                                : e.max_budget.toLocaleString()
                                                                        : 'Price Not Disclosed'}</span>
                                                                <span> Min {e.min_area} - Max {e.max_area} {e.unit}</span>
                                                                <span>{<Moment format="DD-MMM-YYYY">{e.createdAt}</Moment>}</span>                                                </p>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit">
                                                                        <i className="fa fa-search fa-lg"></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmation(
                                                                            e.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
                                                                        <i className="fa fa-close fa-lg" ></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="tab-pane fade" id="nav-contact-maching" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div></div></div> : ""}</div>



            </div>


            <Footer />
        </div>




    )
}