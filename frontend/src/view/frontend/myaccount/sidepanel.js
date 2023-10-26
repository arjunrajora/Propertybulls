import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, usez } from "react-router-dom";
import config from "../../../config/config";
export default function SidePanel() {

    const [allData, setAllData] = useState([])
    const [ip_add, setip_add] = useState("");
    const [usr_id, setusr_id] = useState("");
    const [loc_ids, setloc_ids] = useState([])
    const [cus_id, setCus_id] = useState("")

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setip_add(res.data.IPv4)
        setusr_id(Id)
    }

    const Id = JSON.parse(localStorage.getItem("userId"));
    const roleId = JSON.parse(localStorage.getItem('roleId'));


    console.log("Roleidd", roleId)

    useEffect(() => {
        getData()
        const Url = config.API_URL + "auth/";
        setCus_id(Id)

        fetch(Url + Id)
            .then((response) => response.json())
            .then((value) => {
                // console.log("Dataaaa", value.data)
                setAllData(value.data)

                var location_id = value.data.loc_ids
                const loc_ids_array = location_id ? location_id.split(",") : ''
                setloc_ids(loc_ids_array);
            });
        const apiUrl = config.API_URL + "auth/";
        fetch(apiUrl + Id)
            .then((response) => response.json())
            .then((value) => {
                setAllData(value.data);
            })
    }, [fetch]);

    // console.log("AllData", allData)
    // console.log("@@@@@@@@@@", allData.name)

    return (



        <div className="ivar" style={{ height: "100%", background: "#2fa6b1", marginLeft: "-16px" }}>
            <div className="myAccountPage">
                <div className="AccountTabBar">
                    <div className="sidebar  flex-nowrap">
                        <div class=" aside pb-4 text-white">
                            <div class="profiles">
                                <img alt="Image" src={allData.Image ? config.Image_URL + allData.Image : "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} width={70} />

                                {/* <img
                                        src="https://uploads-ssl.webflow.com/5c2de41639a288ba395e3f58/606efbcd7bd6a6653e89655e_Madison-Leclef_2021_square-256px.jpg"
                                        alt="profile_picture"
                                    /> */}
                                <div class="profile_contant">
                                    <p>Welcome back !</p>
                                    <h6>{allData.name ? allData.name : "-----"}</h6>
                                    {/* <p>{allData.Role.title ? allData.Role.title : "-----"}</p> */}
                                    <p>{roleId === 1 ? "Admin" : roleId === 4 ? "Builder" : roleId === 2 ? "Owner" : roleId === 3 ? "Agent" : null}</p>

                                </div>
                            </div>
                            <div>
                                <ul
                                    class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start pt-4"
                                    id="menu"
                                >
                                    <li>
                                        <Link to="/dashboard">
                                            <div
                                                className="d-flex nav-link"
                                                id="pills-dashboard-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-dashboard"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-dashboard"
                                                aria-selected="true"
                                            >
                                                <i class="fa-solid fa-house"></i> <span className="bord">Dashboard</span>
                                            </div>
                                        </Link>
                                    </li>
                                    {/*  jhfkasdf */}



                                    {roleId === 4 ?
                                        <li>
                                            <Link to="/dashboard/myproperties">
                                                <div
                                                    className="d-flex nav-link"
                                                    id="pills-dashboard-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-dashboard"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-dashboard"
                                                    aria-selected="true"
                                                >
                                                    <i class="leftMenuIcon fas fa-building"></i> <span className="bord">My project</span>
                                                </div>
                                            </Link>
                                        </li> :
                                        <li>
                                            <div class="accordion" id="accordionExample">
                                                <div class="accordion-item">
                                                    <h2 class=" accordion-header" id="headingOne">
                                                        <button
                                                            class="d-flex accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                            aria-expanded="true"
                                                            aria-controls="collapseOne"
                                                        >
                                                            <i class="leftMenuIcon fas fa-building"></i>
                                                            <span className="bord">My Properties</span>
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        class="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div class="accordion-body">
                                                            <Link to="/dashboard/myproperties">
                                                                <span>My Property</span>
                                                            </Link>
                                                            <Link to="/dashboard/addproperty">
                                                                <span>Add Property</span>
                                                            </Link>

                                                            {/* <Link to="/dashboard/addporject">
                                                                <span>Add project</span>
                                                            </Link> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>}

                                    {roleId !== 4 && (
                                        <li>
                                            <div class="accordion" id="accordionExample">
                                                <div class="accordion-item">
                                                    <h2 class=" accordion-header" id="headingTwo">
                                                        <button
                                                            class="accordion-button collapsed"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseTwo"
                                                            aria-expanded="false"
                                                            aria-controls="collapseTwo"
                                                        >
                                                            <i> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"></path></svg></i> <span className="bord"> Requirements</span>
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseTwo"
                                                        class="accordion-collapse collapse"
                                                        aria-labelledby="headingTwo"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div class="accordion-body">
                                                            <Link to="/dashboard/myrequirement">
                                                                <span>My Requirement</span>
                                                            </Link>
                                                            <Link to="/dashboard/AddRequriment">
                                                                <span>Add New Requirement</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    <li>
                                        <Link to="/dashboard/search">
                                            <div
                                                className="d-flex nav-link"
                                                id="pills-searches-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-searches"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-searches"
                                                aria-selected="false"
                                            >
                                                <i class="fa-solid fa-bell"></i> <span class="bord" >My Searches</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/mysubscription">
                                            <div
                                                className="d-flex nav-link"
                                                id="pills-searches-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-searches"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-searches"
                                                aria-selected="false"
                                            >
                                                <i class="fa-solid fa-bell"></i> <span class="bord" >My Subscription</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/account">
                                            <div
                                                className="d-flex nav-link"
                                                id="pills-dashboard-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-dashboard"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-dashboard"
                                                aria-selected="true"
                                            >
                                                <i class="fa-solid fa-user"></i> <span className="bord">Profile</span>
                                            </div>
                                        </Link>
                                    </li>

                                    {roleId !== 4 && (
                                        <li>
                                            <Link to="/dashboard/addproperty">
                                                <div
                                                    className="nav-link "
                                                    id="pills-profile-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-profile-search"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-profile-search"
                                                    aria-selected="false"
                                                >
                                                    <i class="fa-solid fa-hotel"></i> <span className="add_property">Add Property</span>
                                                </div>
                                            </Link>
                                        </li>)}


                                </ul>
                            </div>
                        </div>
                    </div>
                </div></div></div>





    )
}