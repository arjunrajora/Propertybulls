import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import config from "../../../config/config";
import axios from "axios";
import { Category } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import SidePanel from "./sidepanel";

export default function Myrequirements() {
    const navigate = useNavigate()
    const [perpertyType, setPropertyType] = useState([])
    const [city, setCity] = useState([])
    const [states, setState] = useState([])
    const [location, setLocation] = useState([])
    const [p_typeid, setP_typeid] = useState("")
    const [description, setDescription] = useState("xyz")
    const [max_budget, setMax_budget] = useState("50")
    const [min_budget, setmin_budget] = useState("1")
    const [max_area, setMax_area] = useState("2000")
    const [min_area, setMin_area] = useState("1")
    const [location_id, setLocation_id] = useState("")
    const [cus_id, setCus_id] = useState("")
    const [city_id, setCity_id] = useState(27)
    const [state_id, setState_id] = useState(99)
    const [category, setCategory] = useState("")
    const [creater, setcreater] = useState("Customer")
    const [min_room, setmin_room] = useState("1")
    const [max_room, setmax_room] = useState("4")
    const [unit, setunit] = useState("")
    const [Budget, setBudget] = useState([1, 50]);
    const [Area, setArea] = useState([1, 2000]);
    const [room, setRoom] = useState([1, 4]);
    console.log(unit);
    const onupdateBudget = (event, newValue) => {
        setBudget(newValue)
        setMax_budget(Budget[1])
        setmin_budget(Budget[0])
    }
    const Id = JSON.parse(localStorage.getItem("userId"));
    const onupdateArea = (event, newValue) => {
        setArea(newValue)
        setMax_area(Area[1])
        setMin_area(Area[0])
        console.log("s", Id);
    }
    const onupdateRoom = (event, newValue) => {
        setRoom(newValue)
        setmax_room(room[1])
        setmin_room(room[0])
    }
    let EXTERIOR;
    let statees
    const PropertyTypeview = async () => {
        const api = config.API_URL + "clint/details/propertyType"
        await axios.get(api)
            .then((res) => { setPropertyType(res.data.data) }).catch((err) => console.log(err));
    }
    //view Location 
    const viewLocation = async () => {
        const api = config.API_URL + "clint/location/viewAll"
        await axios.get(api)
            .then((res) => {

                setLocation(res.data.data)

            }).catch((err) => console.log(err));
    }

    //view State 
    const viewAllState = async () => {
        const api = config.API_URL + "clint/state/viewAll"
        await axios.get(api)
            .then((res) => {
                setState(res.data.data)

            }).catch((err) => console.log(err));
    }

    //view City 
    const viewAllCity = async () => {
        const api = config.API_URL + "clint/city/viewAll"
        await axios.get(api)
            .then((res) => {
                setCity(res.data.data)

            }).catch((err) => console.log(err));
    }

    useEffect(() => {
        PropertyTypeview()
        viewLocation()
        viewAllCity()
        viewAllState()
    }, [])

    const [show, setShow] = useState("");
    const handleshow = (e) => {
        if (e) {
            const getproject = e.target.value;
            if (getproject == '321') {
                setShow(getproject);
            } else if (getproject == '320') {
                setShow(getproject);
            } else if (getproject == '319') {
                setShow(getproject);
            } else if (getproject == '322') {
                setShow(getproject);
            } else if (getproject == '324') {
                setShow(getproject);
            } else if (getproject == '325') {
                setShow(getproject);
            } else if (getproject == '326') {
                setShow(getproject);
            } else if (getproject == '327') {
                setShow(getproject);
            } else if (getproject == '342') {
                setShow(getproject);
            } else if (getproject == '352') {
                setShow(getproject);
            } else if (getproject == '356') {
                setShow(getproject);
            } else if (getproject == '357') {
                setShow(getproject);
            }
            else if (getproject == '338') {
                setShow(getproject);

            }
            else {
                setShow(0);

            }



        } else {
            setShow('0');
            setRoom([])

        }
    }
    // add requriment 
    const requirementAdd = async (event) => {
        event.preventDefault();
        let min;
        let max
        if (category == "Buy") {
            max = parseFloat(max_budget) * 100000;
            min = parseFloat(min_budget) * 100000;

        } else {
            if (max_budget >= 100 && min_budget >= 100) {
                max = parseFloat(max_budget) * 100000;
                min = parseFloat(min_budget) * 100000;

            } else {
                max = parseFloat(max_budget) * 1000;
                min = parseFloat(min_budget) * 1000;
            }


        }
        let minroom;
        let maxroom;
        if (p_typeid == "321") {
            minroom = min_room;
            maxroom = max_room;
        } else if (p_typeid == "322") {
            minroom = min_room;
            maxroom = max_room;
        }
        else if (p_typeid == "327") {
            minroom = min_room;
            maxroom = max_room;
        } else {
            minroom = 0;
            maxroom = 0;
        }
        const body = {
            category: category,
            p_typeid: p_typeid,
            state_id: state_id,
            city_id: city_id,
            location_id: location_id,
            cus_id: Id,
            min_budget: min,
            max_budget: max,
            min_area: min_area,
            max_area: max_area,
            creater: creater,
            unit: unit,
            max_room: maxroom,
            min_room: minroom,
            description: description
        }
        const apiUrl = config.API_URL + 'clint/requirement/add';
        await axios.post(apiUrl, body)
            .then((res) => {
                const { data, statusCode } = res.data;
                const msg = res.data.message;
                localStorage.setItem(
                    "staticAdded",
                    msg
                );
                console.log("=>>", res);
                navigate('/dashboard/myrequirement', { replace: true });

                console.log("=>>", res);
                setP_typeid("")
                setCategory("")
                setunit("")
                setLocation_id("")

            })
            .catch((err) => {
                let message;
                message = err.response.data.message
                toast.error(message, {
                    position: "top-right",
                    autoClose: 2000,
                    type: "error",
                    transition: Zoom,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                })
            });
    }
    const handleClick = (newValue) => {
        setCategory(newValue)
        if (newValue === "Buy") {
            setMax_budget(50);
            setmin_budget(1)
        } else {
            setMax_budget(50);
            setmin_budget(5)

        }
    }
    return (
        <div>
            <Header />
            <div className="add_requar">
                <ToastContainer />
                <div className="row">

                    <div className="col-lg-2">
                        <SidePanel />
                    </div>

                    <div className="col-lg-9">
                        <div className="sell_top_part">
                            <h3>Add New Requirement</h3>
                            <Link to="/dashboard/myrequirement"><i className="fa fa-reply"></i>Back To Dashboard </Link>
                        </div>
                        <div className="add_requar_main">
                            <form onSubmit={requirementAdd}>
                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>I am looking to</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">

                                        <div className="res-com resale-booking">
                                            <div className="radio-button">
                                                <input type="radio" id="a75" name="check-substitution-2" value={category} onClick={(e) => handleClick("Buy")} />
                                                <label className="btn btn-default" htmlFor="a75" >Buy</label>
                                            </div>
                                            <div className="radio-button">
                                                <input type="radio" id="a75" name="check-substitution-2" value={category} onClick={(e) => handleClick("Rent")} />
                                                <label className="btn btn-default" htmlFor="a75">Rent</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>Type<sup>*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_feld">
                                            <select name="data[Property][p_typeid]" className="select_click" onchange="get_field(this);" required="required" id="prop_cat" value={p_typeid}
                                                onChange={(e) => {
                                                    handleshow(e);
                                                    console.log(e.target.value);
                                                    setP_typeid(e.target.value);
                                                }}>
                                                <option value="">-Select Type-</option>
                                                {perpertyType.map((value) => {
                                                    if (value.status == "Y") {
                                                        return (
                                                            <option key={value.id} value={value.id}>{value.name}</option>
                                                        )
                                                    }

                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="rp_line"></div>
                                <div className="row g-0">
                                    <p>
                                        Property Address
                                    </p>
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>State<sup>*</sup></label>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="form_feld">
                                            <select
                                                value={state_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setState_id(e.target.value);
                                                }}
                                            >
                                                {states.map((value) => {
                                                    if (value.id == 99 && value.status == 'Y') {
                                                        statees = value.name
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                    return (
                                                        <option key={value.id} value={value.id}>{statees}</option>

                                                    )
                                                })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>City<sup >*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_feld">
                                            <select

                                                value={city_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setCity_id(e.target.value);
                                                }}
                                            >
                                                {city.map((value) => {
                                                    if (value.id == 27 && value.status == 'Y') {
                                                        EXTERIOR = value.name
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                    return <option key={value.id} value={value.id}>{EXTERIOR}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>Locality<sup >*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_feld">
                                            {/* <select  required
                                    
                                        value={location_id}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setLocation_id(e.target.value);
                                        }}>
                                        <option>Select Locality</option>
                                        {location.map((value) => {
                                            return (
                                                <option key={value.id} value={value.id}>{value.name}</option>

                                            )
                                        })}

                                    </select> */}
                                            <select name="data[Property][location_id]" className="select_click" onchange="get_field(this);" required="required" id="prop_cat"
                                                value={location_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setLocation_id(e.target.value);
                                                }}>
                                                <option value="">-Select Locality-</option>
                                                {location.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>{value.name}</option>

                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="rp_line"></div>

                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>Budget<sup >*</sup></label>
                                        </div>
                                    </div>
                                    {category == "Buy" ?

                                        <div className="col-lg-4">
                                            <div className="requarment_range">
                                                <div>{min_budget}Lacs--{max_budget}Lacs </div>

                                                <Box sx={{ width: 300 }}>
                                                    <Slider
                                                        value={Budget}
                                                        min={1}
                                                        max={1000}
                                                        onChange={onupdateBudget}
                                                    />
                                                </Box>
                                            </div>
                                        </div> :
                                        <div className="col-lg-4">
                                            <div className="requarment_range">
                                                <div>{min_budget} Thousand --{max_budget} Lacs  </div>

                                                <Box sx={{ width: 300 }}>
                                                    <Slider
                                                        value={Budget}
                                                        min={5}
                                                        max={1000}
                                                        onChange={onupdateBudget}
                                                    />
                                                </Box>
                                            </div>
                                        </div>}
                                </div>
                                <div className="row g-0">
                                    <div className="col-lg-2">
                                        <div className="form_feld">
                                            <label>Area<sup >*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="requarment_range">
                                            <div>{min_area}-{max_area} </div>

                                            <Box sx={{ width: 300 }}>
                                                <Slider
                                                    value={Area}
                                                    min={1}
                                                    max={10000}
                                                    onChange={onupdateArea}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                </div>


                                {(show === '321' || show === '327' || show === '322' || show == '0') &&

                                    <div className="row g-0">
                                        <div className="col-lg-2">
                                            <div className="form_feld">
                                                <label>Room<sup >*</sup></label>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="requarment_range">
                                                {<div>{min_room} BHK-{max_room} BHK </div>}

                                                <Box sx={{ width: 300 }}>
                                                    <Slider
                                                        value={room}
                                                        min={1}
                                                        max={10}
                                                        onChange={onupdateRoom}
                                                    />
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row g-0">
                                    <div className="col-lg-2">
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form_feld no_gap">
                                            <select className="bottom_sel_requar"
                                                required
                                                value={unit}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setunit(e.target.value);
                                                }}
                                            >
                                                <option value="">--unit--</option>
                                                <option value="Sq Ft">Sq Ft</option>
                                                <option value="Sq Mtr">Sq Mtr</option>
                                                <option value="Sq Yard">Sq Yard</option>
                                                <option value="Bigha">Bigha</option>
                                                <option value="hec">Hectare</option>
                                            </select>
                                            <div className="add_button">
                                                <button >add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}