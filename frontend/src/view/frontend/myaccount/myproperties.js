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
const apiFeature = config.API_URL + 'clint/property/propertyfeatured/';
const featuredPost = config.API_URL + "clint/project/featuredpost/";

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
    const [openAlert, setOpenAlert] = useState(false);
    const [contactDatil, setcontactDatil] = useState([]);
 
    const [Tost, SetTost] = useState(false);
    const [Tostmessage, SetTostmessage] = useState(null);
    let message;

    //add s
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setip_add(res.data.IPv4)
        setusr_id(Id)
    }

    const Id = JSON.parse(localStorage.getItem("userId"));

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

    useEffect(() => {
        getData()
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
        const api = config.API_URL + "clint/shortlist/viewAll"
        const body = {
            ip_add: ip_add,
            usr_id: Id
        }
        axios.post(api, body)
            .then((res) => {
                setshortlist(res.data.data)
            }).catch((err) => console.log(err));
        const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
        const bodyss = {
            cus_id: Id
        }
        axios.post(ADDEDPROPERTIES, bodyss)
            .then((res) => {
                setProperty(res.data.data)
            }).catch((err) => console.log(err));
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
    //delete contact 

    const deletecontact = async (id) => {
        const urls = config.API_URL + 'clint/contactenquiry/'
        const res = await axios.delete(urls + id);
        const msg = res.data.message;
        let message;
        toast.success(message = "The  Contacted  deleted successfully! ", {
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
        })
        const contactdetail = config.API_URL + "clint/contactenquiry/id";
        const bodyes = {
            cus_id: Id,
        }
        axios.post(contactdetail, bodyes)
            .then((res) => {
                setcontactDatil(res.data.data)
            }).catch((err) => console.log(err));
    }
    const deleteconfirmation = (id, message) => {
        confirmAlert({
            title: "Confirm to submit",
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deletecontact(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };
    const deleteProject = async (id) => {
        try {
            const urls = config.API_URL + 'clint/project/delete/'
            const res = await axios.delete(urls + id);
            const msg = res.data.message;
            let message;
            toast.success(message = "The  properties  deleted successfully! ", {
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
            })
            const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
            const bodyss = {
                cus_id: Id
            }
            axios.post(ADDEDPROPERTIES, bodyss)
                .then((res) => {
                    setProperty(res.data.data)
                }).catch((err) => console.log(err));

        } catch (err) {
            let message
            toast.error(message = "The  properties is approved, so it cannot be deleted  ", {
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
            })
        }
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
    function numDifferentiation(val) {
        if (val >= 10000000) {
            val = (val / 10000000).toFixed(2) + ' Crore';
        } else if (val >= 100000) {
            val = (val / 100000).toFixed(1) + ' Lacs';
        }
        else if (val >= 1000) {
            val = (val).toFixed() + ' thousand';
            return val;

        }
        else if (val <= 0) {
            val = "Price Not Disclosed"
        }
    }
    return (
        <div>
            <Header />
            <div className="myAccountPage">
                <ToastContainer />

                <div className="row">
                    {roleId == 1 ?
                        <div className="col-lg-2">
    <div className="modelprject">
                    <div class={Tost == true ? "modal fade show" : "modal fade"} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: Tost == true ? "block" : "none" }}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header" style={{ background: "#2E5B6E", color: "white" }}>
                                    <a href="#"> <div class="projectmodelclose" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}></div></a>
                                </div>
                                <div class="modal-body">
                                    {Tostmessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn " style={{ background: "rgb(136 172 46)", color: "white", padding: ' 5px 15px' }} data-bs-dismiss="modal" value="false" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}>Close</button>
                                    <Link to="/subscription" >  <button type="button" class="btn " style={{ background: "#2fa6b1", color: "white", padding: ' 5px 15px', marginLeft: "15px" }}>Update</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                <div className="tab-pane fade show active" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
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
                                                    aria-selected="false">CONTACTED PROPERTIES({contactDatil.length})</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                aria-labelledby="nav-home-tab-ten">

                                                {property.map((value) => {
                                                    return (
                                                        <div className="new_add_property_scroll" key={value.id}>

                                                            <Link
                                                                to={
                                                                    value.status === 'N' ? '#' : value.type === 0 ? `/propertyshow/${value.url}` : `/Projectshow/${value.url}`

                                                                }
                                                                className="left_deta_text"
                                                            >
                                                                <span>{value.name}</span>
                                                                <span>
                                                                    {value.tot_price ? (
                                                                        value.tot_price >= 100000
                                                                            ? (value.tot_price / 100000).toFixed(0) + ' Lacs'
                                                                            : value.tot_price.toLocaleString('en-IN')
                                                                    ) : (
                                                                        'Price Not Disclosed'
                                                                    )}
                                                                </span>
                                                                <span>Jaipur, Rajasthan</span>
                                                            </Link>
                                                            <ul>

                                                                <li>
                                                                    {value.featured_post == "Y" ?
                                                                        <Link style={{ color: "#88ac2e" }} title="Project featured_post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );
                                                                                if (res.status == 200) {
                                                                                    toast.success(message = "Update Featured Post in Project successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} >
                                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                                        </svg></Link> :

                                                                        <Link onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );

                                                                                if (res.status == 200) {
                                                                                    toast.success(message = "Update Featured Post in Project successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} ><i class="fa fa-star" title=" Unfeatured_post" style={{ fontSize: "16px" }} ></i></Link>}
                                                                </li>
                                                                <li>
                                                                    {value.status === 'N' ? (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Unapproved">
                                                                            <i className="fa fa-ban fa-lg"></i>
                                                                        </a>
                                                                    ) : (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Approved">
                                                                            <i className="fa fa-check"></i>
                                                                        </a>
                                                                    )}
                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" onClick={(es) => {
                                                                        navigate(value.type === 1 ? "/dashboard/edit_project/" + value.id : "/dashboard/edit_property/" + value.id, {
                                                                            state: {

                                                                                id: value.id
                                                                            }
                                                                        })
                                                                    }}>
                                                                        <i className="fa fa-edit fa-lg"

                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmationes(value.id,
                                                                            "Do you want to delete this property ?"
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>     {price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request '}</span> <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>  <Link to={"/projectshow/" + urls}>   <i class="fa fa-search" title="View Resullt" aria-hidden="true"></i>  </Link>

                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmations(item.Property.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
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

                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                                {contactDatil && contactDatil.map((item) => {
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>{price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request '}</span>
                                                                <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmation(item.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
                                                                        <i className="fa fa-close fa-lg"

                                                                        ></i>
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
                                </div></div></div> : ""}</div>

                <div className="row">
                    {roleId == 2 ?
                        <div className="col-lg-2">
    <div className="modelprject">
                    <div class={Tost == true ? "modal fade show" : "modal fade"} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: Tost == true ? "block" : "none" }}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header" style={{ background: "#2E5B6E", color: "white" }}>
                                    <a href="#"> <div class="projectmodelclose" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}></div></a>
                                </div>
                                <div class="modal-body">
                                    {Tostmessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn " style={{ background: "rgb(136 172 46)", color: "white", padding: ' 5px 15px' }} data-bs-dismiss="modal" value="false" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}>Close</button>
                                    <Link to="/subscription" >  <button type="button" class="btn " style={{ background: "#2fa6b1", color: "white", padding: ' 5px 15px', marginLeft: "15px" }}>Update</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

                    {roleId == 2 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">

                                <div className="tab-pane fade show active" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
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
                                                    aria-selected="false">CONTACTED PROPERTIES({contactDatil.length})</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                aria-labelledby="nav-home-tab-ten">

                                                {property.map((value) => {
                                                    return (

                                                        <div className="new_add_property_scroll" key={value.id}>

                                                            <Link to={value.status === 'N' ? '#' : `/propertyshow/${value.url}`} className="left_deta_text">
                                                                <span>{value.name}</span>              <span>
                                                                    {value.tot_price
                                                                        ? value.tot_price >= 10000000
                                                                            ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                                                            : value.tot_price >= 100000
                                                                                ? (value.tot_price / 100000).toFixed(1) + ' Lacs'
                                                                                : value.tot_price.toLocaleString()
                                                                        : 'Price On Request'}
                                                                </span>  <span>Jaipur, Rajasthan</span>
                                                            </Link>



                                                            <ul>
                                                                <li>
                                                                    {value.featured_post == "Y" ?
                                                                        <Link style={{ color: "#88ac2e" }} title="Project featured_post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );
                                                                                if (res.status == 200) {

                                                                                    toast.success(message = "Update Featured Post in Property successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} >
                                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                                        </svg></Link> :

                                                                        <Link onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );

                                                                                if (res.status == 200) {
                                                                                    toast.success(message = "Update Featured Post in Property successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} ><i class="fa fa-star" title=" Unfeatured_post" style={{ fontSize: "16px" }} ></i></Link>}
                                                                </li>






                                                                <li>
                                                                    {value.status === 'N' ? (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Unapproved">
                                                                            <i className="fa fa-ban fa-lg"></i>
                                                                        </a>
                                                                    ) : (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Approved">
                                                                            <i className="fa fa-check"></i>
                                                                        </a>
                                                                    )}
                                                                </li>


                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" onClick={(es) => {
                                                                        navigate("/dashboard/edit_property/" + value.id, {
                                                                            state: {
                                                                                lineData: value,
                                                                                id: value.id
                                                                            }
                                                                        })
                                                                    }}>
                                                                        <i className="fa fa-edit fa-lg"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmationes(value.id,
                                                                            "Do you want to delete this property ?"
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>   {price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request '}</span> <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>  <Link to={item.type == '0' ? "/propertyshow/" + urls : "/projectshow/" + urls}>   <i class="fa fa-search" title="View Resullt" aria-hidden="true"></i>  </Link>

                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                                                                        <i className="fa fa-close fa-lg" onClick={(ee) => {
                                                                            deleteconfirmations(item.Property.id,
                                                                                "Are you sure you want to Delete ?"
                                                                            );
                                                                        }}

                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })
                                                }


                                            </div>

                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                                {contactDatil && contactDatil.map((item) => {
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>

                                                                    {price
                                                                        ? price >= 10000000
                                                                            ? (price / 10000000).toFixed(1) + ' crore'
                                                                            : price >= 100000
                                                                                ? (price / 100000).toFixed(1) + ' Lacs'
                                                                                : price.toLocaleString()
                                                                        : 'Price On Request'} </span>



                                                                <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmation(item.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
                                                                        <i className="fa fa-close fa-lg"

                                                                        ></i>
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
                                </div>   </div> </div> : ""}
                </div>

                <div className="row">
                    {roleId == 3 ?
                        <div className="col-lg-2">
         <div className="modelprject">
                    <div class={Tost == true ? "modal fade show" : "modal fade"} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: Tost == true ? "block" : "none" }}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header" style={{ background: "#2E5B6E", color: "white" }}>
                                    <a href="#"> <div class="projectmodelclose" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}></div></a>
                                </div>
                                <div class="modal-body">
                                    {Tostmessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn " style={{ background: "rgb(136 172 46)", color: "white", padding: ' 5px 15px' }} data-bs-dismiss="modal" value="false" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}>Close</button>
                                    <Link to="/subscription" >  <button type="button" class="btn " style={{ background: "#2fa6b1", color: "white", padding: ' 5px 15px', marginLeft: "15px" }}>Update</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                            {staticAdded != null && openAlert === true && (
                                <Collapse in={openAlert}>
                                    <Alert aria-hidden={true} severity="success">
                                        {staticAdded}
                                    </Alert>
                                </Collapse>
                            )}
                            <SidePanel />

                        </div> : <div></div>}
                    {roleId == 3 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
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
                                                    aria-selected="false">CONTACTED PROPERTIES({contactDatil.length})</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                aria-labelledby="nav-home-tab-ten">


                                                {property.map((value) => {
                                                    return (

                                                        <div className="new_add_property_scroll" key={value.id}>

                                                            <Link to={value.status === 'N' ? '#' : `/projectshow/${value.url}`} className="left_deta_text">
                                                                <span>{value.name}</span>{"  "}
                                                                <span>

                                                                    {value.tot_price
                                                                        ? value.tot_price >= 10000000
                                                                            ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                                                            : value.tot_price >= 100000
                                                                                ? (value.tot_price / 100000).toFixed(1) + ' Lacs'
                                                                                : value.tot_price.toLocaleString()
                                                                        : 'Price On Request'}
                                                                </span>
                                                                <span>Jaipur, Rajasthan</span>
                                                            </Link>
                                                            <ul>











                                                                <li>
                                                                    {value.featured_post == "Y" ?
                                                                        <Link style={{ color: "#88ac2e" }} title="Project featured_post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );
                                                                                if (res.status == 200) {
                                                                                 
                                                                                    toast.success(message = "Update Featured Post in Property successfully", {
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
                                                                                    })

                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} >
                                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                                        </svg></Link> :

                                                                        <Link onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: value.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + value.id,
                                                                                    body
                                                                                );

                                                                                if (res.status == 200) {
                                                                                    toast.success(message = "Update Featured Post in Property successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} ><i class="fa fa-star" title=" Unfeatured_post" style={{ fontSize: "16px" }} ></i></Link>}
                                                                </li>

                                                                <li>
                                                                    {value.status === 'N' ? (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Unapproved">
                                                                            <i className="fa fa-ban fa-lg"></i>
                                                                        </a>
                                                                    ) : (
                                                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Approved">
                                                                            <i className="fa fa-check"></i>
                                                                        </a>
                                                                    )}
                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit"
                                                                        onClick={(es) => {
                                                                            navigate("/dashboard/edit_property/" + value.id, {
                                                                                state: {
                                                                                    lineData: value,
                                                                                    id: value.id
                                                                                }
                                                                            })
                                                                        }}
                                                                    >
                                                                        <i className="fa fa-edit fa-lg"
                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmationes(value.id,
                                                                            "Do you want to delete this property ?"
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>  {price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request  '}</span> <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>

                                                                <li>  <Link to={"/projectshow/" + urls}>   <i class="fa fa-search" title="View Resullt" aria-hidden="true"></i>  </Link>

                                                                </li>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmations(item.Property.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
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

                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                                {contactDatil && contactDatil.map((item) => {
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>{numDifferentiation(price)}</span>
                                                                <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <a href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmation(item.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}


                                                                    >
                                                                        <i className="fa fa-close fa-lg"

                                                                        ></i>
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
                            </div></div> </div>: ""}
                </div>

                <div className="row">
                    {roleId == 4 ?
                        <div className="col-lg-2">
    <div className="modelprject">
                    <div class={Tost == true ? "modal fade show" : "modal fade"} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: Tost == true ? "block" : "none" }}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header" style={{ background: "#2E5B6E", color: "white" }}>
                                    <a href="#"> <div class="projectmodelclose" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}></div></a>
                                </div>
                                <div class="modal-body">
                                    {Tostmessage}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn " style={{ background: "rgb(136 172 46)", color: "white", padding: ' 5px 15px' }} data-bs-dismiss="modal" value="false" onClick={(e) => {
                                        SetTost(e.target.value);
                                        console.log(e.target.value);
                                    }}>Close</button>
                                    <Link to="/subscription" >  <button type="button" class="btn " style={{ background: "#2fa6b1", color: "white", padding: ' 5px 15px', marginLeft: "15px" }}>Update</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                            {staticAdded != null && openAlert === true && (
                                <Collapse in={openAlert}>
                                    <Alert aria-hidden={true} severity="success">
                                        {staticAdded}
                                    </Alert>
                                </Collapse>
                            )}
                            <SidePanel />

                        </div> : <div></div>}
                    {roleId == 4 ?
                        <div className="col-lg-10">
                              <div className="side_right">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active " id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">

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
                                                    aria-selected="false">CONTACTED PROPERTIES({contactDatil.length})</button>
                                            </div>
                                        </nav>
                                        <div className="tab-content " id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                                aria-labelledby="nav-home-tab-ten">

                                                {property.map((e) => {
                                                    return (

                                                        <div className="new_add_property_scroll" key={e.id}>
                                                            {e.status == "Y" ?
                                                                <Link className="left_deta_text" to={ e.type==1?"/projectshow/" + e.url:"/propertyshow/"+ e.url}><span>{e.name} </span>
                                                                    <span>
                                                                        {e.tot_price
                                                                            ? e.tot_price >= 10000000
                                                                                ? (e.tot_price / 10000000).toFixed(1) + ' crore'
                                                                                : e.tot_price >= 100000
                                                                                    ? (e.tot_price / 100000).toFixed(1) + ' Lacs'
                                                                                    : e.tot_price.toLocaleString()
                                                                            : 'Price On Request'}
                                                                    </span>
                                                                    {"-"}
                                                                    <span>
                                                                        Jaipur,Rajasthan </span>


                                                                </Link>
                                                                :
                                                                <Link className="left_deta_text" ><span>{e.name} </span>

                                                                    <span>

                                                                        {e.tot_price
                                                                            ? e.tot_price >= 10000000
                                                                                ? (e.tot_price / 10000000).toFixed(1) + ' crore'
                                                                                : e.tot_price >= 100000
                                                                                    ? (e.tot_price / 100000).toFixed(1) + ' Lacs'
                                                                                    : e.tot_price.toLocaleString()
                                                                            : 'Price On Request'}
                                                                    </span>
                                                                    {"-"}
                                                                    <span>
                                                                        Jaipur,Rajasthan </span>



                                                                </Link>}
                                                            <ul>
                                                                <li>
                                                                    {e.featured_post == "Y" ?
                                                                        <Link style={{ color: "#88ac2e" }} title="Project featured_post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: e.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + e.id,
                                                                                    body
                                                                                );
                                                                                console.log(res, "resresresres");
                                                                                if (res.status == 200) {
                                                                                    console.log(res.status);

                                                                                    toast.success(message = "Update Featured Post in Project successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} >
                                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                                        </svg></Link> :

                                                                        <Link onClick={async (es) => {
                                                                            try {
                                                                                const body = { featured_post: e.featured_post };
                                                                                var res = await axios.put(
                                                                                    featuredPost + e.id,
                                                                                    body
                                                                                );

                                                                                if (res.status == 200) {
                                                                                    toast.success(message = "Update Featured Post in Project successfully", {
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
                                                                                    })
                                                                                    const ADDEDPROPERTIES = config.API_URL + "clint/property/viewpropertybyuser"
                                                                                    const bodyss = {
                                                                                        cus_id: Id
                                                                                    }

                                                                                    axios.post(ADDEDPROPERTIES, bodyss)
                                                                                        .then((res) => {
                                                                                            setProperty(res.data.data)
                                                                                        }).catch((err) => console.log(err));
                                                                                }

                                                                            } catch (error) {
                                                                                SetTost(true);
                                                                                SetTostmessage(error.response.data.message)
                                                                            }

                                                                        }} ><i class="fa fa-star" title=" Unfeatured_post" style={{ fontSize: "16px" }} ></i></Link>}
                                                                </li>
                                                                <li>
                                                                    {e.status == "Y" ?
                                                                        <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Approved">
                                                                            <i class="fa fa-check"></i>

                                                                        </a>
                                                                        : <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Unapproved">
                                                                            <i className="fa fa-ban fa-lg"></i>
                                                                        </a>}
                                                                </li>



                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" onClick={(es) => {
                                                                        navigate( e.type==1?"/dashboard/edit_project/" + e.id:"/dashboard/edit_property/" + e.id)
                                                                    }}>
                                                                        <i className="fa fa-edit fa-lg"

                                                                        ></i>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <Link data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmationes(e.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
                                                                        <i className="fa fa-close fa-lg"
                                                                        ></i>
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>

                                                    )
                                                })}
                                            </div>



                                            <div className="tab-pane fade " id="nav-profile" role="tabpanel"
                                                aria-labelledby="nav-profile-tab-twenty">
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>{price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request '}</span>

                                                                <span> Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <Link to={item.type==1?"/projectshow/" + urls:"/propertyshow/" + urls}>   <i class="fa fa-search" title="View Resullt" aria-hidden="true"></i>  </Link>
                                                                </li>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmations(item.Property.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}>
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

                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                                aria-labelledby="nav-contact-tab-thirty">

                                                {contactDatil && contactDatil.map((item) => {
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
                                                        <div className="new_add_property_scroll" key={item.id}>
                                                            <a className="left_deta_text" href="#">
                                                                <img src={config.Image_URL + images} alt="img" />
                                                                <span>{propertyname} </span> <span>{price
                                                                    ? price >= 10000000
                                                                        ? (price / 10000000).toFixed(1) + ' crore'
                                                                        : price >= 100000
                                                                            ? (price / 100000).toFixed(1) + ' Lacs'
                                                                            : price.toLocaleString()
                                                                    : 'Price On Request '}</span>
                                                                <span>
                                                                    Jaipur,Rajasthan </span></a>
                                                            <ul>
                                                                <li>
                                                                    <a data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={(ee) => {
                                                                        deleteconfirmation(item.id,
                                                                            "Are you sure you want to Delete ?"
                                                                        );
                                                                    }}
                                                                    >
                                                                        <i className="fa fa-close fa-lg"
                                                                        ></i>
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

                            </div></div></div> : ""}
                </div>






        
            </div>


            <Footer />
        </div>




    )
}