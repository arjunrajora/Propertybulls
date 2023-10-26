import React, { useState, useEffect } from "react";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import config from "../../config/config";
import axios from "axios";
import { Add, Category } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Sidepanel from "./myaccount/sidepanel"
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";





export default function Myrequirements() {
    const navigate = useNavigate()
    const [perpertyType, setPropertyType] = useState([])
    const [city, setCity] = useState([])
    const [states, setState] = useState([])
    const [location, setLocation] = useState([])
    const [project, setProject] = useState([]);
    const [pro_name, setPro_name] = useState("");
    const [project_id, setProject_id] = useState("0");
    const [other, setOther] = useState("");
    const [alert, setAlert] = useState("")
    const [city_id, setCity_id] = useState(27)
    const [state_id, setState_id] = useState(99)
    const [p_typeid, setP_typeid] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [pincode, setPincode] = useState("");
    const [area, setArea] = useState('');
    const [a_unit, setA_unit] = useState('');
    const [p_unit, setP_unit] = useState("");
    const [tot_price, setTot_price] = useState("");
    const [room, setRoom] = useState('');
    const [bath, setBath] = useState('');
    const [floor, setFloor] = useState('');
    const [p_floor, setP_floor] = useState('');
    const [subscription_order_id, setSubscription_order_id] = useState("");
    const [selectedPropertyFloor, setSelectedPropertyFloor] = useState([]);
    const [face, setFace] = useState([]);
    const [faceid, setFaceid] = useState('');
    const [description, setDescription] = useState("");
    const [remark, setRemark] = useState("");
    const [t_type, setT_type] = useState("");
    const [deposit, setDeposit] = useState(0);
    const [flooring, setFlooring] = useState("");
    const [age, setAge] = useState("");
    const [rent, setRent] = useState("");
    const [security_deposit, setsecurity_deposit] = useState("");
    const [type, setType] = useState("")
    const [option, setOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [location_id, setLocation_id] = useState("");
    const [tost, setTost] = useState(false);
    const [alerttost, setAlertost] = useState(false);
    const [tostmessage, setTostmessage] = useState("");
    const [alertmessage, setAlertmessage] = useState("");

    let EXTERIOR;
    let statees

    const faceapi = config.API_URL + "clint/property/viewPropertyface"
    const Projects = config.API_URL + "clint/property/project"




    const handleOption = (value) => {
        setOption(value)
        console.log(value);

    }

    const handleTransaction = (value) => {
        setT_type(value);
        console.log(value);
    }



    const Id = JSON.parse(localStorage.getItem("userId"));
    // Add property

    const AddProperty = async (event) => {
        event.preventDefault();
        const body = {
            perpertyType: perpertyType,
            city: city,
            location: location,
            city_id: city_id,
            state_id: state_id,
            option: option,
            p_typeid: p_typeid,
            name: name,
            address: address,
            address2: address2,
            pincode: pincode,
            area: area,
            a_unit: a_unit,
            p_unit: p_unit,
            tot_price: tot_price,
            room: room,
            bath: bath,
            floor: floor,
            p_floor: p_floor,
            faceid: faceid,
            description: description,
            remark: remark,
            location_id: location_id,
            cus_id: Id,
            t_type: t_type,
            deposit: deposit,
            age: age,
            flooring: flooring,
            project_id: project_id,
            pro_name: pro_name,
            other: other,
            // subscription_order_id:subscription_order_id
        };
        // console.log("hhhhh", body)
        const url = config.API_URL + "clint/property/add";
        await axios
            .post(url, body,)
            .then((res) => {
                const msg = res.data.message;
                console.log(res.data)
                console.log(res.data.data.propertysId)
                navigate("/dashboard/projectimg/" + res.data.data.propertysId, { replace: true });
                localStorage.setItem("staticAdded", msg);
                // clear input
                setCity("");
                setState("");
                setLocation_id("");
                setOption("");
                setCity_id("");
                setState_id("");
                setP_typeid("");
                setName("");
                setAddress("");
                setAddress2("");
                setPincode("");
                setArea("");
                setA_unit("");
                setP_unit("");
                setTot_price("");
                setRoom("");
                setBath("");
                setFloor("");
                setP_floor("");
                setFaceid("");
                setDescription("");
                setRemark("");
                setT_type("");
                setDeposit("");
                setPro_name("");
                setOther("")


                // navigate("/admin/city", { replace: true });
                console.log("=>>", res);
            })
            .catch((err) => {
                setTost(true)
                setTostmessage(err.response.data.message)
                // console.log(Tost)

            });
    };

    const viewPropertytypess = async (type) => {
        const api = config.API_URL + "clint/property/viewPropertytype"
        const body = {
            type: type
        }
        await axios.post(api, body)
            .then((res) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
                console.log("=>>", res);
                console.log(res.data.data);
                setPropertyType(res.data.data)

                return null
            }).catch((err) => console.log(err));
    }


    useEffect(() => {
        const multiplicationResult = area * p_unit;
        setTot_price(multiplicationResult);
    }, [area, p_unit]);

    const handleValue1Change = (e) => {
        console.log(e.target.value);
        setArea(Number(e.target.value));
    };

    const handleValue2Change = (e) => {
        console.log(e.target.value);
        setP_unit(Number(e.target.value));
    };



    // number of floor with add functionality

    const handleTotalFloorsChange = (event) => {
        const selectedTotalFloors = event.target.value;
        console.log(event.target.value);
        setFloor(selectedTotalFloors);

        setP_floor('');
    };

    const generateFloorOptions = () => {
        if (!isNaN(floor) && parseInt(floor, 10) > 0) {
            const floorCount = parseInt(floor, 10);
            return [...Array(floorCount + 1)].map((_, index) => (
                <option key={index} value={index}>{index === 0 ? 'Ground floor' : index}</option>
            ));
        }
        return null;
    };





    //view Location 
    const viewLocation = async () => {
        const api = config.API_URL + "clint/location/viewAll"
        await axios.get(api)
            .then((res) => {
                // console.log("=>>", res);
                // console.log(res.data.data);
                setLocation(res.data.data)

            }).catch((err) => console.log(err));
    }

    //view State 
    const viewAllState = async () => {
        const api = config.API_URL + "clint/state/viewAll"
        await axios.get(api)
            .then((res) => {
                // console.log("=>>", res);
                // console.log(res.data.data);
                setState(res.data.data)

            }).catch((err) => console.log(err));
    }

    //view City 
    const viewAllCity = async () => {
        const api = config.API_URL + "clint/city/viewAll"
        await axios.get(api)
            .then((res) => {
                // console.log("=>>", res);
                // console.log(res.data.data);
                setCity(res.data.data)

            }).catch((err) => console.log(err));
    }

    //view City 
    useEffect(() => {
        fetch(faceapi)
            .then((response) => response.json())
            .then((value) => {

                setFace(value.data);
            });

        // view project
        fetch(Projects)
            .then((response) => response.json())
            .then((value) => {
                setProject(value.data);
            });

    }, [fetch]);
    // console.log("value.data", project);

    useEffect(() => {
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
            else {
                setShow(0);
            }
        } else {
            setShow('0');
        }
    }

    const [showoption, setShowOption] = useState("");
    const handleshowoption = (options) => {
        console.log("hyyyyyy", options);
        if (options === 'sell') {
            setShow(options);
            setShowOption('sell');
        } else if (options === 'Rent') {
            setShow(options);
            setShowOption('Rent');
        } else {
            setShow('0');
            setShowOption('');
        }
    };

    const AlertapiUrl = config.API_URL + "clint/property/alertmsg";
    useEffect(() => {
        const Body = {
            user_id: Id
        }
        console.log("Body", Body)
        axios.post(AlertapiUrl, Body)
            .then((res) => {
                setAlert(res.data.data)
            }).catch((err) => {
                // setAlertost(true)
                setAlertmessage(err.response.data.message)
            });
    }, []);
    console.log("Alert", alert)

    // const handleProjectChange = (e) => {
    //     console.log(e.target.value)
    //     setPro_name(e.target.value);
    //     setOther(''); // Clear the value of the "Other Project Name" field
    // };
    const handleProjectChange = (e) => {
        const selectedProName = e.target.value;
        const selectedProjectId = e.target.options[e.target.selectedIndex].getAttribute('data-project-id');
        console.log("selectedProjectId", selectedProjectId)
        console.log("selectedProName", selectedProName)
        setPro_name(selectedProName);
        setProject_id(selectedProjectId);
        setOther(''); // Clear the value of the "Other Project Name" field
    };













    const handleOtherChange = (e) => {
        setOther(e.target.value);
        setPro_name(''); // Clear the value of the "Select Project type" field
    };







    return (
        <div>
            <Header />
            <div className="sell_page">

                <div className="row">
                    <div className="col-lg-2">
                        <Sidepanel />
                    </div>

                    <div className="col-lg-9">
                        {/* <div className="sell_top_part">
                            <h3>Add New Property</h3>
                           
                            <Link to="/dashboard"><i className="fa fa-reply"></i>Back To Dashboard </Link>
                        </div> */}
                        <h5 style={{ color: "red", padding: "10px" }}>  {alertmessage}</h5>
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


                        <div className="row">
                            <div className="col-lg-7">

                                <div className="sell_buttons">
                                    <form onSubmit={AddProperty}>

                                        <p>Do You Want To</p>
                                        <form>
                                            <div className="row justify-content-start m-0">
                                                <div className="radio-button">
                                                    <input type="radio" id="a50" name="check-substitution-2"
                                                        value={"sell"} onClick={(e) => {
                                                            handleOption("sell");
                                                            handleshowoption("sell");
                                                        }
                                                        }
                                                    />
                                                    <label className="btn btn-default" for="a25">Sell</label>
                                                </div>
                                                <div className="radio-button">
                                                    <input type="radio" id="a50" name="check-substitution-2"
                                                        value={"Rent"} onClick={(e) => {
                                                            handleOption("Rent");
                                                            handleshowoption("Rent");

                                                        }}

                                                    />
                                                    <label className="btn btn-default" for="a25">Rent</label>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="sell_second_button">
                                            <p>Property Category</p>

                                            <form>
                                                <div className="res-com resale-booking">
                                                    <div className="radio-button">
                                                        <input type="radio" id="a75" name="check-substitution-2"
                                                            onClick={(e) => viewPropertytypess("R")}
                                                        />
                                                        <label className="btn btn-default" for="a75">Residential</label>
                                                    </div>
                                                    <div className="radio-button">
                                                        <input type="radio" id="a75" name="check-substitution-2"
                                                            onClick={(e) => viewPropertytypess("C")}
                                                        />
                                                        <label className="btn btn-default" for="a75">Commercial</label>
                                                    </div>
                                                </div>
                                            </form>

                                        </div><br /><br />

                                        <div className="sell_select_option">



                                            {/* <label>Select Project type</label>
                                            <select className="select_click"
                                                value={project_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setProject_id(e.target.value);
                                                }}>
                                                <option>--Select Projects--</option>
                                                {project.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>{value.name}</option>
                                                    )
                                                })}

                                            </select>


                                            <label>Other Project Name</label>
                                            <input type="text"
                                                value={other}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setOther(e.target.value);
                                                }}
                                            /> */}
                                            <label style={{ display: other ? 'none' : 'block' }}>Select Project type</label>
                                            <select
                                                className="select_click"
                                                style={{ display: other ? 'none' : 'block' }}
                                                value={pro_name}
                                                // value={JSON.stringify({ pro_name, project_id })}
                                                onChange={handleProjectChange}
                                            >
                                                <option>--Select Projects--</option>
                                                {project.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.name} data-project-id={value.id}>
                                                            {value.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            <label style={{ display: pro_name ? 'none' : 'block' }}>Other Project Name</label>
                                            <input
                                                type="text"
                                                style={{ display: pro_name ? 'none' : 'block' }}
                                                value={other}
                                                onChange={handleOtherChange}
                                            />







                                            <label>Type<sup >*</sup></label>
                                            <select className="select_click" required
                                                value={p_typeid}
                                                onChange={(e) => {
                                                    handleshow(e);
                                                    console.log(e.target.value);
                                                    setP_typeid(e.target.value);
                                                }}>
                                                <option>--Select Type--</option>
                                                {perpertyType.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>{value.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label>State<sup >*</sup></label>
                                            <select className="select_click"
                                                value={state_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setState_id(e.target.value);
                                                }}
                                            >

                                                <option value="99">Rajasthan</option>;


                                                {/* {states.map((value) => {
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
                                        } */}
                                            </select>
                                            <label>City</label>
                                            <select className="select_click"

                                                value={city_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setState(e.target.value);
                                                }}
                                            >


                                                <option value="27">Jaipur</option>;

                                            </select>
                                            <label>Location</label>
                                            <select className="select_click" required


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

                                            </select>
                                            {(show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&
                                                <div className="sell_second_button">
                                                    <p>Transaction type<sup >*</sup>
                                                    </p>

                                                    {/* Redio Button */}


                                                    <form>
                                                        <div className="resale-booking">
                                                            <div className="radio-button">
                                                                <input type="radio" id="a25" name="check-substitution-2"
                                                                    value={"1"} onClick={(e) => handleTransaction("1")}
                                                                />
                                                                <label className="btn btn-default" for="a25">Resale</label>
                                                            </div>
                                                            <div className="radio-button">
                                                                <input type="radio" id="a25" name="check-substitution-2"
                                                                    value={"2"} onClick={(e) => handleTransaction("2")}

                                                                />
                                                                <label className="btn btn-default" for="a25">New Booking</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            }<br /><br />
                                            {(show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&

                                                <div className="input_section_sell">
                                                    <label>Property Title<sup >*</sup></label>
                                                    <input type="text" required
                                                        value={name}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setName(e.target.value);
                                                        }}
                                                    />
                                                    <label>Address<sup >*</sup></label>
                                                    <input type="text" required value={address}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setAddress(e.target.value);
                                                        }}

                                                    />
                                                    <label>Landmark<sup >*</sup></label>
                                                    <input type="text" required value={address2}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setAddress2(e.target.value);
                                                        }}
                                                    />
                                                    <label>Pin Code<sup >*</sup></label>
                                                    <input type="text" maxLength="6" value={pincode} required
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setPincode(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            }
                                            {(show === '321' || show === '327' || show == '0') &&

                                                <div className="hr_line"></div>}

                                            {(show === '321' || show === '356' || show === '357' || show === '327' || show === '319' || show === '322' || show === '342' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&

                                                <div className="sell_area_unit">
                                                    <div className="unit_box">
                                                        <label>Area(Super Built Up / Built Up / Plot & Land Area)<sup
                                                        >*</sup></label>
                                                        {
                                                            /* <input type="text" maxLength="5" value={area}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setArea(e.target.value);
                                                                }}
                                                            /> */
                                                        }
                                                        <input type="text" maxLength="5" value={area}
                                                            onChange={handleValue1Change}
                                                            required
                                                        />


                                                    </div>
                                                    <div className="unit_box">
                                                        <label>Unit<sup >*</sup></label>
                                                        <select name="a_unit" className="select_click" required
                                                            value={a_unit}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setA_unit(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">-Select Unit-</option>
                                                            <option value="Sq Ft">Sq Ft</option>
                                                            <option value="Sq Mtr">Sq Mtr</option>
                                                            <option value="Sq Yard">Sq Yard</option>
                                                            <option value="Bigha">Bigha</option>
                                                            <option value="Hectare">Hectare</option>

                                                        </select>





                                                    </div>
                                                </div>
                                            }
                                            {(show === '321' || show === '327' || show == '0') &&

                                                <div className="hr_line"></div>
                                            }

                                            <div className="sell_area_unit">
                                                {(showoption === "sell" && (show === '321' || show === '356' || show === '357' || show === '327' || show === '319' || show === '322' || show === '342' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0')) &&
                                                    <div className="unit_box">
                                                        <label>Unit Price<sup>*</sup>
                                                        </label>
                                                        <input type="text" maxLength="6" value={p_unit} required
                                                            onChange={handleValue2Change}

                                                        />
                                                    </div>}

                                                {(showoption === "sell" && (show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0')) &&

                                                    <div className="unit_box">
                                                        <label>Property Price</label>
                                                        <input type="text" maxLength="9" required
                                                            value={tot_price}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setTot_price(e.target.value);
                                                            }}

                                                        />
                                                    </div>
                                                }
                                            </div>

                                            <div className="sell_area_unit">
                                                {(showoption === "Rent" && (show === '321' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0')) &&
                                                    <div className="unit_box">
                                                        <label>Total Rent
                                                        </label>
                                                        <input type="text" maxLength="6" required value={rent}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setRent(e.target.value);
                                                            }}
                                                        />
                                                    </div>}

                                                {(showoption === "Rent" && (show === '321' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0')) &&

                                                    <div className="unit_box">
                                                        <label>Security Deposit</label>
                                                        <input type="text" maxLength="9" required
                                                            value={security_deposit}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setsecurity_deposit(e.target.value);
                                                            }}

                                                        />
                                                    </div>
                                                }
                                            </div>


                                            {(showoption === "Rent" || showoption === '0') && (show === '321' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327') &&
                                                <div className="unit_box">
                                                    <label>Deposit Price</label>
                                                    <input
                                                        type="text"
                                                        maxLength="9"
                                                        required
                                                        value={deposit}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setDeposit(e.target.value);
                                                        }}
                                                    />
                                                </div>}








                                            {(show === '321' || show === '327' || show === '322' || show == '0') &&

                                                <div className="hr_line"></div>}

                                            {(show === '321' || show === '356' || show === '324' || show === '357' || show === '322' || show === '342' || show == '0') &&

                                                <div className="sell_area_unit">
                                                    <div className="unit_box half">
                                                        <label>Rooms<sup >*</sup></label>
                                                        <select name="room" className="select_click" required
                                                            value={room}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setRoom(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">-Select Room-</option>
                                                            <option value="1">1 BHK</option>
                                                            <option value="2">2 BHK</option>
                                                            <option value="3">3 BHK</option>
                                                            <option value="4">4 BHK</option>
                                                            <option value="5">5+</option>

                                                        </select>
                                                    </div>
                                                    <div className="unit_box half">
                                                        <label>Bathrooms<sup >*</sup></label>
                                                        <select name="bath" className="select_click" required
                                                            value={bath}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setBath(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">-Select Bathrooms-</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5+</option>

                                                        </select>
                                                    </div>
                                                    <div className="unit_box half">
                                                        <label>Flooring<sup >*</sup></label>
                                                        <select name="bath" className="select_click" required
                                                            value={flooring}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setFlooring(e.target.value);
                                                            }}
                                                        >

                                                            <option value="">-Select Flooring-</option>
                                                            <option value="">-Select Covering-</option>
                                                            <option value="Laminate">Laminate</option>
                                                            <option value="Stones">Stones</option>
                                                            <option value="Ceramic">Ceramic</option>
                                                            <option value="Parquet">Parquet</option>
                                                            <option value="Carpet">Carpet</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            }


                                            <div className="hr_line"></div>

                                            {(show === '321' || show === '356' || show === '357' || show === '327' || show === '322' || show === '342' || show === '325' || show === '326' || show === '327' || show == '0') &&


                                                <div className="sell_area_unit">
                                                    <div className="unit_box half">
                                                        <label>Total Floors*</label>
                                                        <select name="floor" className="select_click" value={floor} onChange={handleTotalFloorsChange}>
                                                            <option value="">-Select Floor-</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="25">25+</option>
                                                        </select>
                                                    </div>
                                                    <div className="unit_box half">
                                                        <label>Property on Floor*</label>
                                                        <select name="p_floor" className="select_click" value={p_floor} onChange={(event) => {
                                                            console.log(event.target.value)
                                                            setP_floor(event.target.value)
                                                        }}>
                                                            <option value="">-Select Floor-</option>
                                                            {generateFloorOptions() || (
                                                                <>
                                                                    <option value="0">Ground floor</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                                    <option value="6">6</option>
                                                                    <option value="7">7</option>
                                                                    <option value="8">8</option>
                                                                    <option value="9">9</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                    <option value="15">15</option>
                                                                    <option value="16">16</option>
                                                                    <option value="17">17</option>
                                                                    <option value="18">18</option>
                                                                    <option value="19">19</option>
                                                                    <option value="20">20</option>
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="unit_box half">

                                                        <label>Age of Property*</label>
                                                        <select name="floor" required className="select_click" value={age}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setAge(e.target.value);
                                                            }}>
                                                            <option value="">Select Age</option>
                                                            <option value="Newly construction">Newly Construction</option>
                                                            <option value="Under Construction">Under Construction</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                            <option value="17">17</option>
                                                            <option value="18">18</option>
                                                            <option value="19">19</option>
                                                            <option value="20">20</option>
                                                            <option value="21">21</option>
                                                            <option value="22">22</option>
                                                            <option value="23">23</option>
                                                            <option value="24">24</option>
                                                            <option value="25">25</option>
                                                            <option value="26">26</option>
                                                            <option value="27">27</option>
                                                            <option value="28">28</option>
                                                            <option value="29">29</option>
                                                            <option value="30">30</option>
                                                            <option value="31">31</option>
                                                            <option value="32">32</option>
                                                            <option value="33">33</option>
                                                            <option value="34">34</option>
                                                            <option value="35">35</option>
                                                            <option value="36">36</option>
                                                            <option value="37">37</option>
                                                            <option value="38">38</option>
                                                            <option value="39">39</option>
                                                            <option value="40">40</option>
                                                            <option value="41">41</option>
                                                            <option value="42">42</option>
                                                            <option value="43">43</option>
                                                            <option value="44">44</option>
                                                            <option value="45">45</option>
                                                            <option value="46">46</option>
                                                            <option value="47">47</option>
                                                            <option value="48">48</option>
                                                            <option value="49">49</option>
                                                            <option value="50">50</option>
                                                            <option value="51">51</option>
                                                            <option value="52">52</option>
                                                            <option value="53">53</option>
                                                            <option value="54">54</option>
                                                            <option value="55">55</option>
                                                            <option value="56">56</option>
                                                            <option value="57">57</option>
                                                            <option value="58">58</option>
                                                            <option value="59">59</option>
                                                            <option value="60">60</option>
                                                        </select>
                                                    </div>
                                                </div>


                                            }
                                            {(show === '321' || show === '356' || show === '324' || show === '357' || show === '327' || show === '319' || show === '322' || show === '342' || show === '324' || show === '326' || show === "325" || show === '327' || show == '0') &&

                                                <div className="unit_box">
                                                    <label>Property Face*</label>
                                                    <select name="faceid" className="select_click" required
                                                        value={faceid}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setFaceid(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">--Select Face--</option>
                                                        {face.map((value) => {
                                                            return <option key={value.id} value={value.id}> {value.name}</option>;

                                                        })}
                                                        {/* <option value="2">South</option>
                                                <option value="3">East</option>
                                                <option value="5">North</option>
                                                <option value="6">West</option>
                                                <option value="7">North-East</option>
                                                <option value="8" >Park Facing</option> */}

                                                    </select>
                                                </div>
                                            }
                                            {(show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&

                                                <div>
                                                    <label>Property Description*</label>
                                                    <textarea
                                                        placeholder="For eg. The flat has 2 bedrooms, drawing/dining, kitchen, 2 toilets, 3 balconies. In a well maintained good society with lift and power back up facility. Parking, and other basic amenities"
                                                        required
                                                        value={description}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setDescription(e.target.value);
                                                        }}

                                                    ></textarea>
                                                    <label>Remark*</label>
                                                    <input type="text"
                                                        required
                                                        value={remark}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setRemark(e.target.value);
                                                        }}

                                                    />
                                                </div>
                                            }
                                            {alert ?
                                                <button className="sell_add_property" href="#">Add Property</button> : ""}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>

            </div>



            <Footer />
        </div>
    )
}