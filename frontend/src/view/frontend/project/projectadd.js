import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import config from "../../../config/config";
import axios from "axios";
import { Add, Category } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidepanel from "../myaccount/sidepanel";



export default function Myrequirement() {
    const navigate = useNavigate()
    const [Tost, SetTost] = useState(false);
    const [Tostmessage, SetTostmessage] = useState(null);
    const [perpertyType, setPropertyType] = useState([])
    const [city, setCity] = useState([])
    const [states, setState] = useState([])
    const [location, setLocation] = useState([])
    const [city_id, setCity_id] = useState(27)
    const [state_id, setState_id] = useState(99)
    const [p_typeid, setP_typeid] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [pincode, setPincode] = useState("");
    const [area, setarea] = useState("");
    const [a_unit, setA_unit] = useState("");
    const [p_unit, setP_unit] = useState("");
    const [tot_price, setTot_price] = useState("");
    const [room, setRoom] = useState('1');
    const [pakagedetail, setpakagedetail] = useState("");
    const [floor, setFloor] = useState("");
    const [flat, setFlat] = useState('1');
    const [p_floor, setP_floor] = useState("");
    const [faceid, setFaceid] = useState("");
    const [description, setDescription] = useState("");
    const [remark, setRemark] = useState("");
    const [bathroom, setbathroom] = useState("");
    const [carparking, setcarparking] = useState("");
    const [t_type, setT_type] = useState("");
    const [rera_registration, setrera_registration] = useState("");
    const [build_id, setbuild_id] = useState("");
    const [cus_id, setcus_id] = useState("");
    const [ship, setship] = useState("");
    const [type, setType] = useState("2")
    const [option, setOption] = useState("");
    const [img, setimg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [location_id, setLocation_id] = useState("")
    let EXTERIOR;
    let statees;
    useEffect(() => {
        handlecheckuserpakage()
        viewLocation()
        viewAllCity()
        viewAllState()
        const multiplicationResult = area * p_unit;
        setTot_price(multiplicationResult);
    }, [p_unit, area])


    const handleOption = (value) => {
        setOption(value)
        console.log(value);
    }
    const handleTransaction = (value) => {
        setT_type(value);
        console.log(value);
    }

    const handleValue1Change = (e) => {
        setarea(Number(e.target.value));
    };

    const handleValue2Change = (e) => {
        setP_unit(Number(e.target.value));
    };


    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                imagesArray.push(files[i]);
            }
        }
        console.log(imagesArray, "ff");
        // Replace the existing images with the new ones
        setimg(imagesArray);
    };
    const Id = JSON.parse(localStorage.getItem("userId"));
    var message;
    const AddProject = async (event) => {
        event.preventDefault();
        const body = new FormData();
        body.append('type', 2);
        body.append('rera_registration', rera_registration);
        body.append('city_id', city_id);
        body.append('option', option);
        body.append('p_typeid', p_typeid);
        body.append('name', name);
        body.append('cus_id', Id);
        body.append('address', address);
        body.append('address2', address2);
        body.append('pincode', pincode);
        body.append('area', area);
        body.append('tot_price', tot_price);
        body.append('room', room);
        body.append('p_floor', p_floor);
        body.append('floor', floor);
        body.append('description', description);
        body.append('location_id', location_id);
        body.append('carparking', carparking);
        body.append('ship', ship);
        body.append('p_unit', p_unit);
        body.append('state_id', state_id);
        body.append('bathroom', bathroom);
        body.append('bath', bathroom);
        body.append('a_unit', ship);
        body.append('build_id', Id);
        body.append('flat', flat);
        img.forEach((images, index) => {
            body.append(`floor_img`, images);
        });
        const url = config.API_URL + "clint/project/featurespropertyAdd";
        await axios.post(url, body, {
            headers: { 'Content-Type': 'multipart/form-data', },
        }).then((res) => {
            console.log(res)
            console.log(res.data.data)
            navigate("/dashboard/projectimg/" + res.data.data, { s: true });
        })

            .catch((err) => {
                SetTost(true);
                SetTostmessage(err.response.data.message)
            });

    };





    // const showModal = () => {
    //     const modal = document.getElementById("staticBackdrop");
    //     const backdrop = document.querySelector(".modal-content");

    //     if (modal && backdrop) {
    //         modal.style.display = "block"; // Show the modal
    //         backdrop.style.display = "block"; // Show the backdrop
    //         modal.classList.add("show");
    //         backdrop.classList.add("show");
    //         document.body.classList.add("modal-open");
    //         document.body.style.overflow = "hidden";
    //     }
    // };



    // chack pakage by user 
    const handlecheckuserpakage = async () => {
        const api = config.API_URL + "clint/project/pakage/pakage"
        const body = {
            user_id: Id
        }
        await axios.post(api, body)
            .then((res) => {
                setpakagedetail(res.data.data)
            }).catch((err) => {
                SetTostmessage(err.response.data.message)
            });
    }


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
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-lg-2">
                    <Sidepanel />
                </div>
                <div className="col-lg-10">
                    <div className="sell_page">
                        <div className="sell_top_part">
                            <h3>Add New Project</h3>
                            <Link to="/dashboard/myproperties"><i className="fa fa-reply"></i>Back To Dashboard </Link>

                        </div>
                        <h3 style={{ color: "red" }}>{Tostmessage}</h3>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="sell_buttons">
                                    <form onSubmit={AddProject}>
                                        <p>Do You Want To</p>
                                        {/* <Link to="#" value={"sell"} onClick={(e) => handleOption("sell")}>Sell</Link> */}
                                        <div className="radio-button">
                                            <input type="radio" id="a25" name="check-substitution-2" value={option}
                                                onClick={(e) => handleOption("sell")}
                                            />
                                            <label className="btn btn-default" htmlFor="a25">Sell</label>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="sell_second_button">
                                            <p>Property Category</p>
                                            <form>
                                                <div className="res-com resale-booking">
                                                    <div className="radio-button">
                                                        <input type="radio" id="a75" name="check-substitution-2" onClick={(e) => viewPropertytypess("R")} />
                                                        <label className="btn btn-default" for="a75">Residential</label>
                                                    </div>
                                                    <div className="radio-button">
                                                        <input type="radio" id="a75" name="check-substitution-2" onClick={(e) => viewPropertytypess("C")} />
                                                        <label className="btn btn-default" for="a75">Commercial</label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="sell_select_option">
                                            <label>Type<sup >*</sup></label>
                                            {/* <select className="select_click" required
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
                                    </select> */}
                                            <select name="data[Property][p_typeid]" className="select_click" onchange="get_field(this);" required="required" id="prop_cat" value={p_typeid}
                                                onChange={(e) => {
                                                    handleshow(e);
                                                    console.log(e.target.value);
                                                    setP_typeid(e.target.value);
                                                }}>
                                                <option value="">-Select Type-</option>
                                                {perpertyType.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>{value.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <div className="input_section_sell">
                                                <label>Rera Registration No<sup >*</sup></label>
                                                <input type="text" required
                                                    value={rera_registration}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        setrera_registration(e.target.value);
                                                    }}
                                                />

                                            </div>

                                            <label>State<sup >*</sup></label>
                                            <select className="select_click"
                                                required
                                                value={state_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setState_id(e.target.value);
                                                }}
                                            >

                                                <option value="99">Rajasthan</option>;
                                            </select>
                                            <label>City</label>
                                            <select className="select_click"
                                                required
                                                value={city_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setCity_id(e.target.value);
                                                }}
                                            >
                                                <option value="27">Jaipur</option>;
                                            </select>
                                            <label>Location</label>
                                            {/* <select name="data[Property][location_id]" className="select_click" required="required" id="prop_cat" 

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
                                            <select className="select_click" required
                                                value={location_id}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setLocation_id(e.target.value);
                                                }}>
                                                <option value="">--Select Locality--</option>
                                                {location.map((value) => {
                                                    return (
                                                        <option key={value.id} value={value.id}>{value.name}</option>

                                                    )
                                                })}

                                            </select>
                                            {(show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&


                                                <div className="input_section_sell">
                                                    <label>Project Title<sup >*</sup></label>
                                                    <input type="text" required
                                                        value={name}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setName(e.target.value);
                                                        }}
                                                    />
                                                    <label>Address<sup >*</sup></label>
                                                    <textarea type="text" required value={address}
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
                                                    <input type="text" maxLength="6" required value={pincode}
                                                        onChange={(e) => {
                                                            const input = e.target.value;
                                                            const regex = /^[0-9]{0,6}$/; // Regex to match only 6-digit numbers
                                                            if (regex.test(input)) {
                                                                setPincode(input);
                                                            } else {
                                                                alert('Please Enter Only Numeric Characters!!!!');
                                                            }
                                                        }}
                                                    />

                                                    {(show === '321' || show === '321' || show === '327' || show === '322' || show == '0') &&

                                                        <div>
                                                            <label>Total No of Flats<sup >*</sup></label>
                                                            <select className="select_click" required

                                                                value={flat}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setFlat(e.target.value);
                                                                }}>
                                                                <option value="1">1 Flats</option>
                                                                <option value="2">2 Flats</option>
                                                                <option value="3">3 Flats</option>
                                                                <option value="4">4 Flats</option>
                                                                <option value="5">5 Flats</option>
                                                                <option value="6">6 Flats</option>
                                                                <option value="7">7 Flats</option>
                                                                <option value="8">8 Flats</option>
                                                                <option value="9">9 Flats</option>
                                                                <option value="10">10 Flats</option>
                                                                <option value="50+">50+</option>


                                                            </select>
                                                            <label>No of Floor<sup >*</sup></label>

                                                            {/* <select className="select_click" required


                                                        value={floor}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setFloor(e.target.value);
                                                        }}>
                                                        <option>-Select Floor-</option>
                                                        <option value="1">1 </option>
                                                        <option value="2">2 </option>
                                                        <option value="3">3 </option>
                                                        <option value="4">4 </option>
                                                        <option value="5">5 </option>
                                                        <option value="6">6 </option>
                                                        <option value="7">7 </option>
                                                        <option value="8">8 </option>
                                                        <option value="9">9 </option>
                                                        <option value="10">10 </option>
                                                        <option value="11">11 </option>
                                                        <option value="12">12 </option>
                                                        <option value="13">13 </option>
                                                        <option value="14">14</option>
                                                        <option value="15">15 </option>
                                                        <option value="16">16 </option>
                                                        <option value="17">17 </option>
                                                        <option value="18">18 </option>
                                                        <option value="19">19 </option>
                                                        <option value="20">20 </option>
                                                        <option value="21">21 </option>
                                                        <option value="22">22 </option>
                                                        <option value="23">23 </option>
                                                        <option value="24">24 </option>
                                                        <option value="25+">25+</option>



                                                    </select> */}
                                                            <select className="select_click" required
                                                                value={p_floor}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setP_floor(e.target.value);
                                                                }}>
                                                                <option value="">--Select Floor--</option>
                                                                <option value="1">1 </option>
                                                                <option value="2">2 </option>
                                                                <option value="3">3 </option>
                                                                <option value="4">4 </option>
                                                                <option value="5">5 </option>
                                                                <option value="6">6 </option>
                                                                <option value="7">7 </option>
                                                                <option value="8">8 </option>
                                                                <option value="9">9 </option>
                                                                <option value="10">10 </option>
                                                                <option value="11">11 </option>
                                                                <option value="12">12 </option>
                                                                <option value="13">13 </option>
                                                                <option value="14">14</option>
                                                                <option value="15">15 </option>
                                                                <option value="16">16 </option>
                                                                <option value="17">17 </option>
                                                                <option value="18">18 </option>
                                                                <option value="19">19 </option>
                                                                <option value="20">20 </option>
                                                                <option value="21">21 </option>
                                                                <option value="22">22 </option>
                                                                <option value="23">23 </option>
                                                                <option value="24">24 </option>
                                                                <option value="25+">25+</option>
                                                            </select>
                                                            <label>Rooms<sup >*</sup></label>
                                                            <select className="select_click" required

                                                                value={room}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setRoom(e.target.value);
                                                                }}>
                                                                <option value="1">1 BHK </option>
                                                                <option value="2">2 BHK</option>
                                                                <option value="3">3 BHK </option>
                                                                <option value="4">4 BHK</option>
                                                                <option value="5">5 BHK </option>
                                                            </select>
                                                            {/* <select className="select_click" required


                                                        value={room}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setRoom(e.target.value);
                                                        }}>
                                                        <option value="1">1 BHK </option>
                                                        <option value="2">2 BHK</option>
                                                        <option value="3">3 BHK </option>
                                                        <option value="4">4 BHK</option>
                                                        <option value="5">5 BHK </option>


                                                    </select> */}
                                                        </div>
                                                    }


                                                    <label>Total Area<sup >*</sup></label>
                                                    <input type="text" maxLength="5" value={area} required
                                                        onChange={handleValue1Change} />
                                                    <select className="select_click" required
                                                        value={ship}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setship(e.target.value);
                                                        }}>
                                                        <option value="">--units--</option>
                                                        <option value="Sq Ft">Sq Ft</option>
                                                        <option value="Sq Mtr">Sq Mtr</option>
                                                        <option value="Sq Yard">Sq Yard</option>
                                                        <option value="Bigha">Bigha</option>
                                                        <option value="hec">Hectare</option>
                                                    </select>
                                                    <label>Unit Price<sup >*</sup></label>
                                                    <input type="text" maxLength="6" value={p_unit} required
                                                        onChange={handleValue2Change}
                                                    />

                                                    <label>Total Price<sup >*</sup></label>
                                                    <input type="Number" maxLength="6" value={tot_price} required
                                                    />

                                                    {(show === '321' || show === '327' || show === '320' || show === '322' || show == '0') &&

                                                        <div>
                                                            <label>Bathroom</label>
                                                            <select className="select_click" required


                                                                value={bathroom}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setbathroom(e.target.value);
                                                                }}>
                                                                <option value="">-Select Bathrooms-</option>
                                                                <option value="1">1  </option>
                                                                <option value="2">2 </option>
                                                                <option value="3">3  </option>
                                                                <option value="4">4 </option>
                                                                <option value="5">5+ </option>


                                                            </select>


                                                            <label>carparking</label>
                                                            <select className="select_click" required


                                                                value={carparking}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                    setcarparking(e.target.value);
                                                                }}>
                                                                <option value="">-Select carparking-</option>
                                                                <option value="1">1  </option>
                                                                <option value="2">2 </option>
                                                                <option value="3">3  </option>
                                                                <option value="4">4 </option>
                                                                <option value="5">5+ </option>


                                                            </select>


                                                        </div>
                                                    }










                                                </div>


                                            }

                                            {(show === '321' || show === '327' || show === '319' || show === '322' || show === '342' || show === '356' || show === '357' || show === '324' || show === '325' || show === '326' || show === '327' || show == '0') &&

                                                <div>


                                                    <label>Floor Plan</label>
                                                    <input
                                                        type="file"
                                                        id="description"
                                                        multiple
                                                        className="form-control"
                                                        name="image"
                                                        required
                                                        onChange={handleImageChange}
                                                    />
                                                    <label>Property Description</label>
                                                    <textarea
                                                        placeholder="For eg. The flat has 2 bedrooms, drawing/dining, kitchen, 2 toilets, 3 balconies. In a well maintained good society with lift and power back up facility. Parking, and other basic amenities"
                                                        required
                                                        value={description}
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setDescription(e.target.value);
                                                        }}

                                                    ></textarea>
                                                </div>
                                            }

                                            {pakagedetail ?
                                                <button className="sell_add_property" href="#">Add New Project</button>
                                                : ""}

                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="add_project_map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56904.02189652055!2d75.7457565672076!3d26.951017844112883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db418a06f8561%3A0xd0f299d7610399c0!2sdaac!5e0!3m2!1sen!2sin!4v1677239848000!5m2!1sen!2sin"
                                        width="100%" height="354" allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div></div></div>
            <Footer />
        </div>
    )
}