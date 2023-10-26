import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config"
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";

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
                setfeatured_mobile(value.data.featured_mobile);
                var location_id = value.data.loc_ids
                const loc_ids_array = location_id ? location_id.split(",") : ''
                setloc_ids(loc_ids_array);
                if(value.data.featured_mobile==1){
                    handleCheckboxChange();
                }else{
                   
                }
            });
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

    }, [fetch]);
    var options = {
        headers: {
            Authorization: localStorage.getItem("accessToken"),
            'Content-Type': 'multipart/form-data',
        },
    };
    const EditProfile = async (event) => {
        event.preventDefault();
        const selectedLocationsString = loc_ids.join(',');
        const body = {
            name: name,
            mobile: mobile,
            address: address,
            country_code: country_code,
            loc_ids: selectedLocationsString,
            description: description,
            mobileno: mobileno,
            altemail: altemail,
            Image: Image,
            featured_mobile: featured_mobile
        };
        const apiUrl = config.API_URL + "auth/updateprofile/" + Id
        await axios
            .put(apiUrl, body, options)
            .then((res) => {
                const msg = res.data.message;
                localStorage.setItem("staticAdded", msg);
                navigate("/", { replace: true });
            }).catch((err) => console.log(err));
    };

    var message;

    const changePasswords = async (event) => {
        event.preventDefault();
        const body = {
            password: password
        };
        if (password == newpassword) {

            const Url = config.API_URL + 'auth/changepassword/' + Id;
            await axios
                .put(Url, body)
                .then((res) => {
                    const msg = res.data.message;
                    localStorage.setItem("staticAdded", msg);
                    navigate("/", { replace: true });
                })
                .catch((err) => console.log(err));
        } else {
            toast.error(message = "password invalid", {
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

    const [isHidden, setIsHidden] = useState(false);
    const [featured_mobile, setfeatured_mobile] = useState('');
    const handleCheckboxChange = () => {
        setIsHidden(!isHidden);
        setfeatured_mobile(isHidden ? 0 : 1);
    };

    var EXTERIOR;
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
                            {/* <h5>Welcome to {allData.name} </h5>
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
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile-search" type="button" role="tab"
                                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                            </li>
                            {roleId == 1 ?
                                <li className="nav-item" role="presentation">
                                    <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                                </li> : ""}
                        </ul> */}
                        </div> : <div></div>}

                    {roleId == 1 ?
                        <div className="col-lg-10">
                            <div className="side_right">
                                <div className="tab-content dashboardTab" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="profile_form_tab">

                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                        aria-selected="true">General</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                        aria-selected="false">Change
                                                        Password</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div className="profile_form_contant">
                                                        {/* <div className="tabtitle_top">
                                                        <h6>
                                                            General
                                                        </h6>
                                                    </div> */}
                                                        <div className="container-fluid">
                                                            <form onSubmit={EditProfile}
                                                                className="form-horizontal needs-validation" encType="multipart/form-data">
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Logo<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                            <input
                                                                                type="file"
                                                                                id="description"
                                                                                className="form-control"
                                                                                name="image"

                                                                                onChange={(e) => {
                                                                                    setImage(e.target.files[0])
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <ul>
                                                                                <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <ul>
                                                                                <li><label> Admin</label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Working Area<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <select required
                                                                                name="data[User][location][]"
                                                                                className="inner_select"
                                                                                multiple={true}
                                                                                id="UserLocation"
                                                                                value={loc_ids}
                                                                                onChange={(e) => {
                                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                                    setloc_ids(selectedValues);
                                                                                }}
                                                                            >
                                                                                {Locations.map((value, index) => {
                                                                                    if (value.status === "Y") {
                                                                                        EXTERIOR = value.name;
                                                                                    } else {
                                                                                        return null;
                                                                                    }
                                                                                    return (
                                                                                        <option key={value.id} value={value.id}>
                                                                                            {EXTERIOR}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <label>{allData.username}</label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="email" className="form-control" id="inputEmail3"
                                                                                value={altemail}
                                                                                onChange={(e) => {
                                                                                    setaltemail(e.target.value);
                                                                                }}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Name<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="text" className="form-control" id="inputEmail3" required
                                                                                value={name}
                                                                                onChange={(e) => {
                                                                                    setName(e.target.value);
                                                                                }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="row ">
                                                                            <div className="col-lg-4 profile_mobile_input">
                                                                                <div className="right_sideform">
                                                                                    <select className="form-select mobile_select" value={country_code || ''}

                                                                                        onChange={(e) => {
                                                                                            setcountry_code(e.target.value);
                                                                                        }}>
                                                                                        <option value="91">IND +91</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="right_sideform">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        minLength="10"
                                                                                        maxLength="10"
                                                                                        id="input"
                                                                                        required
                                                                                        value={isHidden ? '*'.repeat(mobile.length) : mobile}
                                                                                        onChange={(e) => {
                                                                                          setmobile(e.target.value);
                                                                                        }}
                                                                                        />

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">



                                                                            <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                                value={mobileno}
                                                                                onChange={(e) => {
                                                                                    setmobileno(e.target.value);
                                                                                }} />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label> Hide Mobile Number
                                                                              </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="" style={{ width: "70px", }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isHidden}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Address<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                                onChange={(e) => {
                                                                                    setaddress(e.target.value);
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Description<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea value={description}
                                                                                onChange={(e) => {
                                                                                    setdescription(e.target.value);
                                                                                }} ></textarea>
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                                    <div className="profile_form_contant">
                                                        {/* <div className="tabtitle_top">
                                                        <h6>
                                                            Change Password
                                                        </h6>
                                                    </div> */}
                                                        <div className="container-fluid">
                                                            <form onSubmit={changePasswords}>

                                                                <div className="row ">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>
                                                                                New Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                                setnewPassword(e.target.value);
                                                                            }}

                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>

                                                                                Confirm Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                                onChange={(e) => {
                                                                                    setPassword(e.target.value);
                                                                                }} />
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div></div> : ""}</div>

                <div className="row">
                    {roleId == 2 ?
                        <div className="col-lg-2">
                            {/* <h5>Welcome to {allData.name} </h5> */}
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




                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile-search" type="button" role="tab"
                                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                            </li>


                            <li className="nav-item" role="presentation">
                                <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                            </li>

                        </ul> */}
                        </div> : <div></div>}
                    {roleId == 2 ?
                        <div className="col-lg-10">
                            <div className="side_right">
                                <div className="tab-content dashboardTab" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="profile_form_tab">

                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                        aria-selected="true">General</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                        aria-selected="false">Change
                                                        Password</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div className="profile_form_contant">
                                                        {/* <div className="tabtitle_top">
                                                <h6>
                                                    General
                                                </h6>
                                            </div> */}
                                                        <div className="container-fluid">
                                                            <form onSubmit={EditProfile}
                                                                className="form-horizontal needs-validation" encType="multipart/form-data">
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Logo<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                            <input
                                                                                type="file"
                                                                                id="description"
                                                                                className="form-control"
                                                                                name="image"
                                                                                onChange={(e) => {
                                                                                    setImage(e.target.files[0])
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <ul>
                                                                                <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <ul>
                                                                                <li><label>Owner</label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Working Area<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <select required
                                                                                name="data[User][location][]"
                                                                                className="inner_select"
                                                                                multiple={true}
                                                                                id="UserLocation"
                                                                                value={loc_ids}
                                                                                onChange={(e) => {
                                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                                    setloc_ids(selectedValues);
                                                                                }}
                                                                            >
                                                                                {Locations.map((value, index) => {
                                                                                    if (value.status === "Y") {
                                                                                        EXTERIOR = value.name;
                                                                                    } else {
                                                                                        return null;
                                                                                    }
                                                                                    return (
                                                                                        <option key={value.id} value={value.id}>
                                                                                            {EXTERIOR}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <label>{allData.username}</label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id(Alternative)<sup className="sub"
                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="email" className="form-control" id="inputEmail3"
                                                                                value={altemail}
                                                                                onChange={(e) => {
                                                                                    setaltemail(e.target.value);
                                                                                }}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Name<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="text" className="form-control" id="inputEmail3" required
                                                                                value={name}
                                                                                onChange={(e) => {
                                                                                    setName(e.target.value);
                                                                                }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="row ">
                                                                            <div className="col-lg-4 profile_mobile_input">
                                                                                <div className="right_sideform">
                                                                                    <select className="form-select mobile_select" value={country_code || ''}

                                                                                        onChange={(e) => {
                                                                                            setcountry_code(e.target.value);
                                                                                        }}>
                                                                                        <option value="91">IND +91</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="right_sideform">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        minLength="10"
                                                                                        maxLength="10"
                                                                                        id="input"
                                                                                        required
                                                                                        value={isHidden ? '*'.repeat(mobile.length) : mobile}
                                                                                        onChange={(e) => {
                                                                                          setmobile(e.target.value);
                                                                                        }}
                                                                                        />

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">



                                                                            <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                                value={mobileno}
                                                                                onChange={(e) => {
                                                                                    setmobileno(e.target.value);
                                                                                }} />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label> Hide Mobile Number
                                                                               </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="" style={{ width: "70px", }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isHidden}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Address<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                                onChange={(e) => {
                                                                                    setaddress(e.target.value);
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Description<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea value={description}
                                                                                onChange={(e) => {
                                                                                    setdescription(e.target.value);
                                                                                }} ></textarea>
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                                    <div className="profile_form_contant">
                                                        <div className="container-fluid">
                                                            <form onSubmit={changePasswords}>

                                                                <div className="row ">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>
                                                                                New Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                                setnewPassword(e.target.value);
                                                                            }}

                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>

                                                                                Confirm Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                                onChange={(e) => {
                                                                                    setPassword(e.target.value);
                                                                                }} />
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div></div> </div> : ""}
                </div>
                <div className="row">
                    {roleId == 3 ?
                        <div className="col-lg-2">
                            <SidePanel />
                            {/* <h5>Welcome to {allData.name} </h5>

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


                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile-search" type="button" role="tab"
                                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                            </li>
                            {roleId == 3 ?
                                <li className="nav-item" role="presentation">
                                    <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                                </li> : ""}
                        </ul> */}
                        </div> : <div></div>}
                    {roleId == 3 ?
                        <div className="col-lg-10">
                            <div className="tab-content dashboardTab" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className="profile_form_tab">

                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                    aria-selected="true">General</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                    aria-selected="false">Change
                                                    Password</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="profile_form_contant">
                                                    {/* <div className="tabtitle_top">
                                                        <h6>
                                                            General
                                                        </h6>
                                                    </div> */}
                                                    <div className="container-fluid">
                                                        <form onSubmit={EditProfile}
                                                            className="form-horizontal needs-validation" encType="multipart/form-data">
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Logo<sup className="sub"></sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                        <input
                                                                            type="file"
                                                                            id="description"
                                                                            className="form-control"
                                                                            name="image"

                                                                            onChange={(e) => {
                                                                                setImage(e.target.files[0])
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <ul>
                                                                            <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <ul>
                                                                            <li><label>Agent</label></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Working Area<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <select required
                                                                            name="data[User][location][]"
                                                                            className="inner_select"
                                                                            multiple={true}
                                                                            id="UserLocation"
                                                                            value={loc_ids}
                                                                            onChange={(e) => {
                                                                                const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                                setloc_ids(selectedValues);
                                                                            }}
                                                                        >
                                                                            {Locations.map((value, index) => {
                                                                                if (value.status === "Y") {
                                                                                    EXTERIOR = value.name;
                                                                                } else {
                                                                                    return null;
                                                                                }
                                                                                return (
                                                                                    <option key={value.id} value={value.id}>
                                                                                        {EXTERIOR}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Email Id<sup className="sub"></sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">

                                                                        <label>{allData.username}</label>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Email Id(Alternative)<sup className="sub"
                                                                        ></sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">

                                                                        <input type="email" className="form-control" id="inputEmail3"
                                                                            value={altemail}
                                                                            onChange={(e) => {
                                                                                setaltemail(e.target.value);
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Name<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <input type="text" className="form-control" id="inputEmail3" required
                                                                            value={name}
                                                                            onChange={(e) => {
                                                                                setName(e.target.value);
                                                                            }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Mobile No<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                        <div className="row ">
                                                                            <div className="col-lg-4 profile_mobile_input">
                                                                                <div className="right_sideform">
                                                                                    <select className="form-select mobile_select" value={country_code || ''}

                                                                                        onChange={(e) => {
                                                                                            setcountry_code(e.target.value);
                                                                                        }}>
                                                                                        <option value="91">IND +91</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="right_sideform">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        minLength="10"
                                                                                        maxLength="10"
                                                                                        id="input"
                                                                                        required
                                                                                        value={isHidden ? '*'.repeat(mobile.length) : mobile}
                                                                                        onChange={(e) => {
                                                                                          setmobile(e.target.value);
                                                                                        }}
                                                                                        />

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">



                                                                            <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                                value={mobileno}
                                                                                onChange={(e) => {
                                                                                    setmobileno(e.target.value);
                                                                                }} />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label> Hide Mobile Number
                                                                               </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="" style={{ width: "70px", }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isHidden}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Address<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <textarea type="email" className="form-control" id="inputEmail3" required value={address}
                                                                            onChange={(e) => {
                                                                                setaddress(e.target.value);
                                                                            }}
                                                                        ></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>Description<sup className="sub"></sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <textarea value={description}
                                                                            onChange={(e) => {
                                                                                setdescription(e.target.value);
                                                                            }} ></textarea>
                                                                        <input className="submit_click" type="submit" value="Update" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                                <div className="profile_form_contant">
                                                    {/* <div className="tabtitle_top">
                                                        <h6>
                                                            Change Password
                                                        </h6>
                                                    </div> */}
                                                    <div className="container-fluid">
                                                        <form onSubmit={changePasswords}>

                                                            <div className="row ">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>
                                                                            New Password*<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">

                                                                        <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                            setnewPassword(e.target.value);
                                                                        }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <div className="left_sideform">
                                                                        <label>

                                                                            Confirm Password*<sup className="sub">*</sup></label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="right_sideform">
                                                                        <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                            onChange={(e) => {
                                                                                setPassword(e.target.value);
                                                                            }} />
                                                                        <input className="submit_click" type="submit" value="Update" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div></div> : ""}
                </div>


                <div className="row">
                    {roleId == 4 ?
                        <div className="col-lg-2">

                            {/* <h5>Welcome to {allData.name}</h5> */}

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
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile-search" type="button" role="tab"
                                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                            </li>

                        </ul> */}
                            <SidePanel />


                        </div> : <div></div>}

                    {roleId == 4 ?
                        <div className="col-lg-10">
                            <div className="side_right">
                                <div className="tab-content dashboardTab" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="profile_form_tab">

                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                        aria-selected="true">General</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                        aria-selected="false">Change
                                                        Password</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                    <div className="profile_form_contant">
                                                        {/* <div className="tabtitle_top">
                                                        <h6>
                                                            General
                                                        </h6>
                                                    </div> */}
                                                        <div className="container-fluid">
                                                            <form onSubmit={EditProfile}
                                                                className="form-horizontal needs-validation" encType="multipart/form-data">
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Logo<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                            <input
                                                                                type="file"
                                                                                id="description"
                                                                                className="form-control"
                                                                                name="image"

                                                                                onChange={(e) => {
                                                                                    setImage(e.target.files[0])
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <ul>
                                                                                <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <ul>
                                                                                <li><label>Builder</label></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Working Area<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <select required
                                                                                name="data[User][location][]"
                                                                                className="inner_select"
                                                                                multiple={true}
                                                                                id="UserLocation"
                                                                                value={loc_ids}
                                                                                onChange={(e) => {
                                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                                    setloc_ids(selectedValues);
                                                                                }}
                                                                            >
                                                                                {Locations.map((value, index) => {
                                                                                    if (value.status === "Y") {
                                                                                        EXTERIOR = value.name;
                                                                                    } else {
                                                                                        return null;
                                                                                    }
                                                                                    return (
                                                                                        <option key={value.id} value={value.id}>
                                                                                            {EXTERIOR}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <label>{allData.username}</label>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Email Id(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="email" className="form-control" id="inputEmail3"
                                                                                value={altemail}
                                                                                onChange={(e) => {
                                                                                    setaltemail(e.target.value);
                                                                                }}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Name<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="text" className="form-control" id="inputEmail3" required
                                                                                value={name}
                                                                                onChange={(e) => {
                                                                                    setName(e.target.value);
                                                                                }} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="row ">
                                                                            <div className="col-lg-4 profile_mobile_input">
                                                                                <div className="right_sideform">
                                                                                    <select className="form-select mobile_select" value={country_code || ''}

                                                                                        onChange={(e) => {
                                                                                            setcountry_code(e.target.value);
                                                                                        }}>
                                                                                        <option value="91">IND +91</option>

                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <div className="right_sideform">

                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        minLength="10"
                                                                                        maxLength="10"
                                                                                        id="input"
                                                                                        required
                                                                                        value={isHidden ? '*'.repeat(mobile.length) : mobile}
                                                                                        onChange={(e) => {
                                                                                          setmobile(e.target.value);
                                                                                        }}
                                                                                        />

                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Mobile No(Alternative)<sup className="sub"

                                                                            ></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">



                                                                            <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                                value={mobileno}
                                                                                onChange={(e) => {
                                                                                    setmobileno(e.target.value);
                                                                                }} />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label> Hide Mobile Number
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="" style={{ width: "70px", }}>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isHidden}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Address<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                                onChange={(e) => {
                                                                                    setaddress(e.target.value);
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>Description<sup className="sub"></sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <textarea value={description}
                                                                                onChange={(e) => {
                                                                                    setdescription(e.target.value);
                                                                                }} ></textarea>
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                                    <div className="profile_form_contant">
                                                        {/* <div className="tabtitle_top">
                                                        <h6>
                                                            Change Password
                                                        </h6>
                                                    </div> */}
                                                        <div className="container-fluid">
                                                            <form onSubmit={changePasswords}>

                                                                <div className="row ">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>
                                                                                New Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">

                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                                setnewPassword(e.target.value);
                                                                            }}

                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-2">
                                                                        <div className="left_sideform">
                                                                            <label>

                                                                                Confirm Password*<sup className="sub">*</sup></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="right_sideform">
                                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                                onChange={(e) => {
                                                                                    setPassword(e.target.value);
                                                                                }} />
                                                                            <input className="submit_click" type="submit" value="Update" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>    </div></div> : ""}
                </div>



                {/* {roleId == 1 ? <div className="tab-content dashboardTab" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="profile_form_tab">

                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                        aria-selected="true">General</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">Change
                                        Password</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="profile_form_contant">
                                        <div className="tabtitle_top">
                                            <h6>
                                                General
                                            </h6>
                                        </div>
                                        <div className="container-fluid">
                                            <form onSubmit={EditProfile}
                                                className="form-horizontal needs-validation" encType="multipart/form-data">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Logo<sup className="sub"></sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">

                                                            <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                            <input
                                                                type="file"
                                                                id="description"
                                                                className="form-control"
                                                                name="image"

                                                                onChange={(e) => {
                                                                    setImage(e.target.files[0])
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <ul>
                                                                <li><label>User Type <sup className="sub">*</sup></label></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <ul>
                                                                <li><label> Admin</label></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Working Area<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <select required
                                                                name="data[User][location][]"
                                                                className="inner_select"
                                                                multiple={true}
                                                                id="UserLocation"
                                                                value={loc_ids}
                                                                onChange={(e) => {
                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                    setloc_ids(selectedValues);
                                                                }}
                                                            >
                                                                {Locations.map((value, index) => {
                                                                    if (value.status === "Y") {
                                                                        EXTERIOR = value.name;
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                    return (
                                                                        <option key={value.id} value={value.id}>
                                                                            {EXTERIOR}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Email Id<sup className="sub"></sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">

                                                            <label>{allData.username}</label>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Email Id(Alternative)<sup className="sub"

                                                            ></sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">

                                                            <input type="email" className="form-control" id="inputEmail3"
                                                                value={altemail}
                                                                onChange={(e) => {
                                                                    setaltemail(e.target.value);
                                                                }}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Name<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <input type="text" className="form-control" id="inputEmail3" required
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Mobile No<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="row ">
                                                            <div className="col-lg-4 profile_mobile_input">
                                                                <div className="right_sideform">
                                                                    <select className="form-select mobile_select" value={country_code || ''}

                                                                        onChange={(e) => {
                                                                            setcountry_code(e.target.value);
                                                                        }}>
                                                                        <option value="91">IND +91</option>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8">
                                                                <div className="right_sideform">

                                                                    <input type="number" className="form-control" id="input" maxLength="10" minLength="10" required
                                                                        value={mobile}
                                                                        onChange={(e) => {
                                                                            setmobile(e.target.value);
                                                                        }}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Mobile No(Alternative)<sup className="sub"

                                                            ></sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">



                                                            <input type="text" className="form-control" id="input"
                                                                value={mobileno}
                                                                onChange={(e) => {
                                                                    setmobileno(e.target.value);
                                                                }} />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Address<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                onChange={(e) => {
                                                                    setaddress(e.target.value);
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>Description<sup className="sub"></sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <textarea value={description}
                                                                onChange={(e) => {
                                                                    setdescription(e.target.value);
                                                                }} ></textarea>
                                                            <input className="submit_click" type="submit" value="Update" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                    <div className="profile_form_contant">
                                        <div className="tabtitle_top">
                                            <h6>
                                                Change Password
                                            </h6>
                                        </div>
                                        <div className="container-fluid">
                                            <form onSubmit={changePasswords}>

                                                <div className="row ">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>
                                                                New Password*<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">

                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                setnewPassword(e.target.value);
                                                            }}

                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-2">
                                                        <div className="left_sideform">
                                                            <label>

                                                                Confirm Password*<sup className="sub">*</sup></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="right_sideform">
                                                            <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                onChange={(e) => {
                                                                    setPassword(e.target.value);
                                                                }} />
                                                            <input className="submit_click" type="submit" value="Update" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div> : ""} */}

                {/* {roleId == 2 ?
                    <div className="tab-content dashboardTab" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="profile_form_tab">

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                            aria-selected="true">General</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                            aria-selected="false">Change
                                            Password</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    General
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={EditProfile}
                                                    className="form-horizontal needs-validation" encType="multipart/form-data">
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Logo<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                <input
                                                                    type="file"
                                                                    id="description"
                                                                    className="form-control"
                                                                    name="image"
                                                                    onChange={(e) => {
                                                                        setImage(e.target.files[0])
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <ul>
                                                                    <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <ul>
                                                                    <li><label>Owner</label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Working Area<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <select required
                                                                    name="data[User][location][]"
                                                                    className="inner_select"
                                                                    multiple={true}
                                                                    id="UserLocation"
                                                                    value={loc_ids}
                                                                    onChange={(e) => {
                                                                        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                        setloc_ids(selectedValues);
                                                                    }}
                                                                >
                                                                    {Locations.map((value, index) => {
                                                                        if (value.status === "Y") {
                                                                            EXTERIOR = value.name;
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                        return (
                                                                            <option key={value.id} value={value.id}>
                                                                                {EXTERIOR}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <label>{allData.username}</label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id(Alternative)<sup className="sub"
                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="email" className="form-control" id="inputEmail3"
                                                                    value={altemail}
                                                                    onChange={(e) => {
                                                                        setaltemail(e.target.value);
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Name<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="text" className="form-control" id="inputEmail3" required
                                                                    value={name}
                                                                    onChange={(e) => {
                                                                        setName(e.target.value);
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="row ">
                                                                <div className="col-lg-4 profile_mobile_input">
                                                                    <div className="right_sideform">
                                                                        <select className="form-select mobile_select" value={country_code || ''}

                                                                            onChange={(e) => {
                                                                                setcountry_code(e.target.value);
                                                                            }}>
                                                                            <option value="91">IND +91</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className="right_sideform">

                                                                        <input type="text" minLength='10' maxLength="10" className="form-control" id="input" required
                                                                            value={mobile}
                                                                            onChange={(e) => {
                                                                                setmobile(e.target.value);
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No(Alternative)<sup className="sub"

                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">



                                                                <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                    value={mobileno}
                                                                    onChange={(e) => {
                                                                        setmobileno(e.target.value);
                                                                    }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Address<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                    onChange={(e) => {
                                                                        setaddress(e.target.value);
                                                                    }}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Description<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea value={description}
                                                                    onChange={(e) => {
                                                                        setdescription(e.target.value);
                                                                    }} ></textarea>
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    Change Password
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={changePasswords}>

                                                    <div className="row ">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>
                                                                    New Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                    setnewPassword(e.target.value);
                                                                }}

                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>

                                                                    Confirm Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                    onChange={(e) => {
                                                                        setPassword(e.target.value);
                                                                    }} />
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> : ""} */}

                {/* {roleId == 3 ?
                    <div className="tab-content dashboardTab" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="profile_form_tab">

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                            aria-selected="true">General</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                            aria-selected="false">Change
                                            Password</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    General
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={EditProfile}
                                                    className="form-horizontal needs-validation" encType="multipart/form-data">
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Logo<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                <input
                                                                    type="file"
                                                                    id="description"
                                                                    className="form-control"
                                                                    name="image"

                                                                    onChange={(e) => {
                                                                        setImage(e.target.files[0])
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <ul>
                                                                    <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <ul>
                                                                    <li><label>Agent</label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Working Area<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <select required
                                                                    name="data[User][location][]"
                                                                    className="inner_select"
                                                                    multiple={true}
                                                                    id="UserLocation"
                                                                    value={loc_ids}
                                                                    onChange={(e) => {
                                                                        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                        setloc_ids(selectedValues);
                                                                    }}
                                                                >
                                                                    {Locations.map((value, index) => {
                                                                        if (value.status === "Y") {
                                                                            EXTERIOR = value.name;
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                        return (
                                                                            <option key={value.id} value={value.id}>
                                                                                {EXTERIOR}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <label>{allData.username}</label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id(Alternative)<sup className="sub"
                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="email" className="form-control" id="inputEmail3"
                                                                    value={altemail}
                                                                    onChange={(e) => {
                                                                        setaltemail(e.target.value);
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Name<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="text" className="form-control" id="inputEmail3" required
                                                                    value={name}
                                                                    onChange={(e) => {
                                                                        setName(e.target.value);
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="row ">
                                                                <div className="col-lg-4 profile_mobile_input">
                                                                    <div className="right_sideform">
                                                                        <select className="form-select mobile_select" value={country_code || ''}

                                                                            onChange={(e) => {
                                                                                setcountry_code(e.target.value);
                                                                            }}>
                                                                            <option value="91">IND +91</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className="right_sideform">

                                                                        <input type="text" minLength='10' maxLength="10" className="form-control" id="input" required
                                                                            value={mobile}
                                                                            onChange={(e) => {
                                                                                setmobile(e.target.value);
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No(Alternative)<sup className="sub"

                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">



                                                                <input type="text" maxLength="10" minLength="10" className="form-control" id="input"
                                                                    value={mobileno}
                                                                    onChange={(e) => {
                                                                        setmobileno(e.target.value);
                                                                    }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Address<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea type="email" className="form-control" id="inputEmail3" required value={address}
                                                                    onChange={(e) => {
                                                                        setaddress(e.target.value);
                                                                    }}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Description<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea value={description}
                                                                    onChange={(e) => {
                                                                        setdescription(e.target.value);
                                                                    }} ></textarea>
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    Change Password
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={changePasswords}>

                                                    <div className="row ">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>
                                                                    New Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                    setnewPassword(e.target.value);
                                                                }}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>

                                                                    Confirm Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                    onChange={(e) => {
                                                                        setPassword(e.target.value);
                                                                    }} />
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> : ""} */}
                {/* {roleId == 4 ?
                    <div className="tab-content dashboardTab" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-profile-search" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div className="profile_form_tab">

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active general_btn" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                            aria-selected="true">General</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link  general_btn" id="profile-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                            aria-selected="false">Change
                                            Password</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    General
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={EditProfile}
                                                    className="form-horizontal needs-validation" encType="multipart/form-data">
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Logo<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                                                <input
                                                                    type="file"
                                                                    id="description"
                                                                    className="form-control"
                                                                    name="image"

                                                                    onChange={(e) => {
                                                                        setImage(e.target.files[0])
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <ul>
                                                                    <li><label>User Type <sup className="sub">*</sup></label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <ul>
                                                                    <li><label>Builder</label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Working Area<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <select required
                                                                    name="data[User][location][]"
                                                                    className="inner_select"
                                                                    multiple={true}
                                                                    id="UserLocation"
                                                                    value={loc_ids}
                                                                    onChange={(e) => {
                                                                        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                        setloc_ids(selectedValues);
                                                                    }}
                                                                >
                                                                    {Locations.map((value, index) => {
                                                                        if (value.status === "Y") {
                                                                            EXTERIOR = value.name;
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                        return (
                                                                            <option key={value.id} value={value.id}>
                                                                                {EXTERIOR}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <label>{allData.username}</label>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Email Id(Alternative)<sup className="sub"

                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="email" className="form-control" id="inputEmail3"
                                                                    value={altemail}
                                                                    onChange={(e) => {
                                                                        setaltemail(e.target.value);
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Name<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="text" className="form-control" id="inputEmail3" required
                                                                    value={name}
                                                                    onChange={(e) => {
                                                                        setName(e.target.value);
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="row ">
                                                                <div className="col-lg-4 profile_mobile_input">
                                                                    <div className="right_sideform">
                                                                        <select className="form-select mobile_select" value={country_code || ''}

                                                                            onChange={(e) => {
                                                                                setcountry_code(e.target.value);
                                                                            }}>
                                                                            <option value="91">IND +91</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                    <div className="right_sideform">

                                                                        <input type="text" minLength='10' maxLength="10" className="form-control" id="input" required
                                                                            value={mobile}
                                                                            onChange={(e) => {
                                                                                setmobile(e.target.value);
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Mobile No(Alternative)<sup className="sub"

                                                                ></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">



                                                                <input type="text" minLength='10' maxLength="10" className="form-control" id="input"
                                                                    value={mobileno}
                                                                    onChange={(e) => {
                                                                        setmobileno(e.target.value);
                                                                    }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Address<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea type="text" className="form-control" id="inputEmail3" required value={address}
                                                                    onChange={(e) => {
                                                                        setaddress(e.target.value);
                                                                    }}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>Description<sup className="sub"></sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <textarea value={description}
                                                                    onChange={(e) => {
                                                                        setdescription(e.target.value);
                                                                    }} ></textarea>
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                        <div className="profile_form_contant">
                                            <div className="tabtitle_top">
                                                <h6>
                                                    Change Password
                                                </h6>
                                            </div>
                                            <div className="container-fluid">
                                                <form onSubmit={changePasswords}>

                                                    <div className="row ">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>
                                                                    New Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">

                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={newpassword} onChange={(e) => {
                                                                    setnewPassword(e.target.value);
                                                                }}

                                                                />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <div className="left_sideform">
                                                                <label>

                                                                    Confirm Password*<sup className="sub">*</sup></label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="right_sideform">
                                                                <input type="password" className="form-control" id="inputEmail3" required minLength="6" maxLength="15" value={password}
                                                                    onChange={(e) => {
                                                                        setPassword(e.target.value);
                                                                    }} />
                                                                <input className="submit_click" type="submit" value="Update" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> : ""} */}


            </div>


            <Footer />
        </div>




    )
}