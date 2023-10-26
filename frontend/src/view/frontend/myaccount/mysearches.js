import React, { useState, useEffect, useContext } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config"
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";

import { Link, useNavigate } from "react-router-dom";
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
import SearchContext from "../../../store/search-context";
import SidePanel from "./sidepanel";

export default function Dashboard() {
    const StaticMessage = localStorage.getItem("staticAdded");
    const [staticAdded, setStaticAdded] = useState("");
    const SearchList = useContext(SearchContext);
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

    const [openAlert, setOpenAlert] = useState(false);
    const Id = JSON.parse(localStorage.getItem("userId"));

    useEffect(() => {
        const api = config.API_URL + "clint/savesearch/id"
        const body = {
            cus_id: Id,
        }
        axios.post(api, body)
            .then((res) => {
                setProperties(res.data.data);

            }).catch((err) => console.log(err));
    }, [fetch]);


    const deletes = async (id) => {
        try {
            const urls = config.API_URL + "clint/savesearch/"
            const res = await axios.delete(urls + id);
            SearchList.removeSearchItem({
                id: id,
            });
            const api = config.API_URL + "clint/savesearch/id"
            const body = {
                cus_id: Id,
            }
            axios.post(api, body)
                .then((res) => {
                    setProperties(res.data.data);
                }).catch((err) => console.log(err));
        } catch (err) {
        }
    }
    const deleteconfirmation = (id, message) => {
        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deletes(id),
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

    // const handleClick = (es) => {
    //     encodedParams = Object.entries(es)
    //         .filter(([key, value]) => value !== null) // Exclude null values
    //         .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    //         .join('&');

    // }
    // const routePath = `/dashboard/filter/${queryParams}`;

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
                                    <button className="nav-link" id="pills-requirements-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                                        aria-selected="false">My Requirements</button>
                                </li>
                            </Link>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-searches-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                                    aria-selected="false">My Searches</button>
                            </li>
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

                            {roleId == 1 ?
                                <li className="nav-item" role="presentation">
                                    <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                                </li> : ""}
                        </ul> */}
                        </div> : <div></div>}
                    {roleId == 1 ?
                        <div className="col-lg-10" >
                             <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-searches" role="tabpanel" aria-labelledby="pills-searches-tab">
                                    <div className="tabtitle_top">
                                        <a href="#">Clear Search History</a>
                                    </div>
                                    <div className="new_add_property_scroll Saved_Searches">
                                        <a href="#"> Saved Searches({Properties.length})</a>
                                    </div>
                                    <div className="new_add_property">

                                        <nav>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">




                                            {Properties.map((e, index) => {
                                                const queryParamsArray = Object.entries(e)
                                                    .map(([key, value]) => {
                                                        if (value !== null) {
                                                            if (Array.isArray(value)) {
                                                                return `${key}=${value.join(',')}`;
                                                            } else {
                                                                return `${key}=${encodeURIComponent(value)}`;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                    .filter(query => query !== null);

                                                const queryParams = queryParamsArray.join('&');
                                                const routePath = `/dashboard/filter/?${queryParams}`.replace(/%2C/g, ',');

                                                return (

                                                    <div className="new_add_property_scroll" >
                                                        <a className="left_deta_text" href="#">
                                                            <span>{e.title} </span>
                                                        </a>
                                                        <ul>
                                                            <li>

                                                                <Link key={index} to={routePath}>
                                                                    <i className="fa fa-search" title="View Result" aria-hidden="true"></i>
                                                                </Link>                                                </li>

                                                            <li>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                    deleteconfirmation(e.id,
                                                                        "Are you sure you want to Delete ?"
                                                                    );
                                                                }}
                                                                >
                                                                    <i className="fa fa-close fa-lg"

                                                                    ></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                )
                                            })}

                                        </div>



                                    </div>

                                </div>
                            </div></div></div> : ""}
                </div>












                <div className="row">
                    {roleId == 2 ?
                        <div className="col-lg-2">
                            {/* <h5>Welcome to {allData.name} </h5> */}
                            {staticAdded != null && openAlert === true && (
                                <Collapse in={openAlert}>
                                    <Alert aria-hidden={true} severity="success">
                                        {staticAdded}
                                    </Alert>
                                </Collapse>
                            )}
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
                                    <button className="nav-link" id="pills-requirements-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                                        aria-selected="false">My Requirements</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/search">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-searches-tab" data-bs-toggle="pill"
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
                            <SidePanel />
                        </div> : <div></div>}
                    {roleId == 2 ?
                        <div className="col-lg-10">
                    <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-searches" role="tabpanel" aria-labelledby="pills-searches-tab">
                                    <div className="tabtitle_top">
                                        <a href="#">Clear Search History</a>
                                    </div>
                                    <div className="new_add_property_scroll Saved_Searches">
                                        <a href="#"> Saved Searches({Properties.length})</a>
                                    </div>
                                    <div className="new_add_property">

                                        <nav>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">




                                            {Properties.map((e, index) => {
                                                const queryParamsArray = Object.entries(e)
                                                    .map(([key, value]) => {
                                                        if (value !== null) {
                                                            if (Array.isArray(value)) {
                                                                return `${key}=${value.join(',')}`;
                                                            } else {
                                                                return `${key}=${encodeURIComponent(value)}`;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                    .filter(query => query !== null);

                                                const queryParams = queryParamsArray.join('&');
                                                const routePath = `/dashboard/filter/?${queryParams}`.replace(/%2C/g, ',');

                                                return (

                                                    <div className="new_add_property_scroll" >
                                                        <a className="left_deta_text" href="#">
                                                            <span>{e.title} </span>
                                                        </a>
                                                        <ul>
                                                            <li>

                                                                <Link key={index} to={routePath}>
                                                                    <i className="fa fa-search" title="View Result" aria-hidden="true"></i>
                                                                </Link>                                                </li>

                                                            <li>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                    deleteconfirmation(e.id,
                                                                        "Are you sure you want to Delete ?"
                                                                    );
                                                                }}
                                                                >
                                                                    <i className="fa fa-close fa-lg"

                                                                    ></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                )
                                            })}

                                        </div>



                                    </div>

                                </div>

                            </div></div></div>
                             : ""}

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
                                    <button className="nav-link" id="pills-requirements-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                                        aria-selected="false">My Requirements</button>
                                </li>
                            </Link>
                            <Link to="/dashboard/search">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-searches-tab" data-bs-toggle="pill"
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
                        </div> : <div></div>
                        
                        
                        }

                    {roleId == 3 ?
                        <div className="col-lg-10">
                             <div className="side_right">

                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-searches" role="tabpanel" aria-labelledby="pills-searches-tab">
                                    <div className="tabtitle_top">
                                        <a href="#">Clear Search History</a>
                                    </div>
                                    <div className="new_add_property_scroll Saved_Searches">
                                        <a href="#"> Saved Searches({Properties.length})</a>
                                    </div>
                                    <div className="new_add_property">

                                        <nav>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">




                                            {Properties.map((e, index) => {
                                                const queryParamsArray = Object.entries(e)
                                                    .map(([key, value]) => {
                                                        if (value !== null) {
                                                            if (Array.isArray(value)) {
                                                                return `${key}=${value.join(',')}`;
                                                            } else {
                                                                return `${key}=${encodeURIComponent(value)}`;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                    .filter(query => query !== null);

                                                const queryParams = queryParamsArray.join('&');
                                                const routePath = `/dashboard/filter/?${queryParams}`.replace(/%2C/g, ',');

                                                return (

                                                    <div className="new_add_property_scroll" >
                                                        <a className="left_deta_text" href="#">
                                                            <span>{e.title} </span>
                                                        </a>
                                                        <ul>
                                                            <li>

                                                                <Link key={index} to={routePath}>
                                                                    <i className="fa fa-search" title="View Result" aria-hidden="true"></i>
                                                                </Link>                                                </li>

                                                            <li>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                    deleteconfirmation(e.id,
                                                                        "Are you sure you want to Delete ?"
                                                                    );
                                                                }}
                                                                >
                                                                    <i className="fa fa-close fa-lg"

                                                                    ></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                )
                                            })}

                                        </div>



                                    </div>

                                </div>

                            </div></div></div> : ""}
                </div>

                <div className="row">
                    {roleId == 4 ?
                        <div className="col-lg-2">
                            {/* <h5>Welcome to {allData.name}</h5> */}

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
                            <Link to="/dashboard/myproperties">    <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-properties-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-properties" type="button" role="tab" aria-controls="pills-properties"
                                    aria-selected="false">My Projects</button>
                            </li>
                            </Link>
                            <Link to="/dashboard/search">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-searches-tab" data-bs-toggle="pill"
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
                        </ul> */}
                        </div> : <div></div>}
                    {roleId == 4 ?
                        <div className="col-lg-10">
                   <div className="side_right">

                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-searches" role="tabpanel" aria-labelledby="pills-searches-tab">
                                    <div className="tabtitle_top">
                                        <a href="#">Clear Search History</a>
                                    </div>
                                    <div className="new_add_property_scroll Saved_Searches">
                                        <a href="#"> Saved Searches({Properties.length})</a>
                                    </div>
                                    <div className="new_add_property">

                                        <nav>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">




                                            {Properties.map((e, index) => {
                                                const queryParamsArray = Object.entries(e)
                                                    .map(([key, value]) => {
                                                        if (value !== null) {
                                                            if (Array.isArray(value)) {
                                                                return `${key}=${value.join(',')}`;
                                                            } else {
                                                                return `${key}=${encodeURIComponent(value)}`;
                                                            }
                                                        }
                                                        return null;
                                                    })
                                                    .filter(query => query !== null);

                                                const queryParams = queryParamsArray.join('&');
                                                const routePath = `/dashboard/filter/?${queryParams}`.replace(/%2C/g, ',');

                                                return (

                                                    <div className="new_add_property_scroll" >
                                                        <a className="left_deta_text" href="#">
                                                            <span>{e.title} </span>
                                                        </a>
                                                        <ul>
                                                            <li>

                                                                <Link key={index} to={routePath}>
                                                                    <i className="fa fa-search" title="View Result" aria-hidden="true"></i>
                                                                </Link>                                                </li>

                                                            <li>
                                                                <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                    deleteconfirmation(e.id,
                                                                        "Are you sure you want to Delete ?"
                                                                    );
                                                                }}
                                                                >
                                                                    <i className="fa fa-close fa-lg"

                                                                    ></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                )
                                            })}

                                        </div>



                                    </div>

                                </div>
                            </div></div> </div>: ""}
                </div>

            </div>


            <Footer />
        </div>




    )
}