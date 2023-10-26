import React, { useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config";
import axios from "axios";
import { Add, Category } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";



const faceapi = config.API_URL + "clint/property/viewPropertyface"

const propertyfeatures = config.API_URL + "clint/property/ViewPropertyFeatures";
const api = config.API_URL + "clint/details/propertyType";

export default function Editproperty() {
    const navigate = useNavigate()
    const { id } = useParams()



    const [flooring, setFlooring] = useState("");
    const [age, setAge] = useState("");
    const [rent, setRent] = useState("");
    const [propertydetail, setPropertydetail] = useState([])
    const [features, setFeatures] = useState([]);
    const [face, setFace] = useState([]);
    const [perpertyType, setPropertyType] = useState([])
    const [city, setCity] = useState([])
    const [states, setState] = useState([])
    const [locations, setLocation] = useState([])
    const [city_id, setCity_id] = useState(27)
    const [state_id, setState_id] = useState(99)
    const [p_typeid, setP_typeid] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [pincode, setPincode] = useState("");
    const [area, setArea] = useState("");
    const [a_unit, setA_unit] = useState("");
    const [p_unit, setP_unit] = useState("");
    const [tot_price, setTot_price] = useState("");
    const [room, setRoom] = useState("");
    const [bath, setBath] = useState("");
    const [floor, setFloor] = useState("");
    const [p_floor, setP_floor] = useState("");
    const [faceid, setFaceid] = useState("");
    const [description, setDescription] = useState("");
    const [t_type, setT_type] = useState("");
    const [type, setType] = useState("1")
    const [option, setOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [location_id, setLocation_id] = useState("")
    const [image, setImg] = useState([]);
    const [floor_img, setFloor_img] = useState([]);
    const [featureimage, setFeatureimage] = useState("");
    const [deposit, setDeposit] = useState(null);
    const [check_list, setCheck_list] = useState([])
    const [selectedPropertyFloor, setSelectedPropertyFloor] = useState([]);
    console.log(check_list);



    const handleOption = (value) => {
        setOption(value)
        console.log(value);
    }

    const handleTransaction = (value) => {
        setT_type(value);
        console.log(value);
    }



    const handleImageChange = (e, index) => {
        console.log(e.target.value)
        const file = e.target.files[0];
        const newImages = [...image];
        newImages[index] = file;
        console.log("ggggggggggg", file);
        // setImg((newImages) => [...newImages, file]);
        setImg(newImages);
        setFeatureimage(newImages[0]);
        console.log("#######", newImages)
    };

    const handlefloorImgChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                imagesArray.push(files[i]);
            }
        }
        console.log(imagesArray, "ff");
        setFloor_img(imagesArray);
    };






    const Id = JSON.parse(localStorage.getItem("userId"));

    useEffect(() => {
        const apI = config.API_URL + "clint/property/propertyes/" + id;
        fetch(apI)
            .then((response) => response.json())
            .then((value) => {

                setPropertydetail(value.data);
                setAddress(value.data.address);
                setName(value.data.name);
                setAddress2(value.data.address2);
                setPincode(value.data.pincode);
                setArea(value.data.area);
                setBath(value.data.bath);
                setA_unit(value.data.a_unit);
                setCity_id(value.data.city_id);
                setLocation_id(value.data.location_id);
                setDescription(value.data.description);
                setRoom(value.data.room);
                setFloor(value.data.floor);
                setP_floor(value.data.p_floor);
                setFaceid(value.data.faceid);
                setTot_price(value.data.tot_price);
                setP_unit(value.data.p_unit);
                setT_type(value.data.t_type);
                setP_typeid(value.data.p_typeid);
                setImg(value.data.propertyImages);
                setCheck_list(value.data.Propertyfeatures.map((item) => item.check_list));
                setOption(value.data.option);
                setDeposit(value.data.deposit);
                setFlooring(value.data.flooring);
                setAge(value.data.age);

            });

    }, [])
    console.log("kamal property", propertydetail)

    const UpdateProperty = async (event) => {
        event.preventDefault();
        const selectedLocationsString = check_list.join(',');
        console.log("check_listtttttttt", selectedLocationsString)
        const body = new FormData();
        body.append('type', type);
        body.append('check_list', selectedLocationsString);
        body.append('perpertyType', perpertyType);
        body.append('city', city);
        body.append('city_id', city_id);
        body.append('state_id', state_id);
        body.append('option', option);
        body.append('p_typeid', p_typeid);
        body.append('name', name);
        body.append('address', address);
        body.append('address2', address2);
        body.append('pincode', pincode);
        body.append('area', area);
        body.append('a_unit', a_unit);
        body.append('p_unit', p_unit);
        body.append('tot_price', tot_price);
        body.append('room', room);
        body.append('bath', bath);
        body.append('floor', floor);
        body.append('p_floor', p_floor);
        body.append('faceid', faceid);
        body.append('description', description);
        body.append('location_id', location_id);
        body.append('cus_id', Id);
        body.append('t_type', t_type);
        body.append('age', age);
        body.append('flooring', flooring);
        body.append('featureimage', featureimage);
        image.forEach((images, index) => {
            body.append(`img`, images);
        });
        floor_img.forEach((images, index) => {
            body.append(`floor_img`, images);
        });


        const apiUrl = config.API_URL + "clint/property/" + id;
        await axios
            .put(apiUrl, body)
            .then((res) => {
                const msg = res.data.message;
                localStorage.setItem("staticAdded", msg);
                navigate("/dashboard/myproperties", { replace: true });
                console.log("=>>", res);
            })
            .catch((err) => {
                let message = err.response.data.message
                console.log(message);
            })

    };

    // multiplication Area and P_unit
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


    // Number of floor & property on floor edit finctionality 

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
        viewLocation()
        viewAllCity()
        viewAllState()
    }, [])

    useEffect(() => {
        fetch(propertyfeatures)
            .then((response) => response.json())
            .then((value) => {
                console.log("value", value)
                setFeatures(value.data);
            });


        fetch(api)
            .then((response) => response.json())
            .then((value) => {
                setPropertyType(value.data);
            });

        fetch(faceapi)
            .then((response) => response.json())
            .then((value) => {

                setFace(value.data);
            });








    }, []);


    return (
        <div>
            <Header />
            <div className="sell_page">
                <div className="sell_top_part">
                    <h3>Edit  Property</h3>
                    <Link to="/dashboard"><i className="fa fa-reply"></i> Switch to Site Profile </Link>
                </div>
                <div className="row">
                    <div className="col-lg-7">
                        <div className="sell_buttons">
                            <form >
                                <p>Do You Want To</p>
                                {option === 'sell' && (
                                    <Link to="#" style={{ backgroundColor: '#88ac2e' }} disabled={option === 'sell'}             >
                                        Sell
                                    </Link>

                                )}
                                {option === 'Rent' && (
                                    <Link to="#" style={{ backgroundColor: '#88ac2e' }} disabled={option === 'Rent'}     >
                                        Rent
                                    </Link>
                                )}


                                <div className="sell_second_button">
                                    <p>Property Category</p>

                                    <form>
                                        <div className="res-com resale-booking">
                                            <div className="radio-button">
                                                <input
                                                    type="radio"
                                                    id="residential"
                                                    name="check-substitution-2"
                                                    checked={p_typeid === 322 || p_typeid === 319 || p_typeid === 342 || p_typeid === 321 || p_typeid === 356 || p_typeid === 357}
                                                />
                                                <label className="btn btn-default" htmlFor="residential" style={{ backgroundColor: (p_typeid === 322 || p_typeid === 319 || p_typeid === 342 || p_typeid === 321 || p_typeid === 356 || p_typeid === 357) ? '#88ac2e' : '' }}>Residential</label>
                                            </div>
                                            <div className="radio-button">
                                                <input
                                                    type="radio"
                                                    id="commercial"
                                                    name="check-substitution-2"
                                                    checked={p_typeid === 324 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327}
                                                />
                                                <label className="btn btn-default" htmlFor="commercial" style={{ backgroundColor: (p_typeid === 324 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327) ? '#88ac2e' : '' }}>Commercial</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <br /><br />
                                <div className="sell_select_option">

                                    <label>Type<sup >*</sup></label>
                                    <select className="select_click" required
                                        value={p_typeid}
                                        disabled
                                        onChange={(e) => {

                                            console.log(e.target.value);
                                            setP_typeid(e.target.value);
                                        }}

                                    >
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
                                        {locations.map((value) => {
                                            return (
                                                <option key={value.id} value={value.id}>{value.name}</option>

                                            )
                                        })}

                                    </select>


                                    <div className="sell_second_button">
                                        <p>Transaction type<sup >*</sup>
                                        </p>
                                        <form>
                                            <div className="resale-booking">
                                                <div className="radio-button">
                                                    <input type="radio" id="a25" name="check-substitution-2"
                                                        value={"1"} onClick={(e) => handleTransaction("1")}
                                                        checked={t_type == "1"}
                                                    />
                                                    <label className="btn btn-default" htmlFor="a25">Resale</label>
                                                </div>
                                                <div className="radio-button">
                                                    <input type="radio" id="a25" name="check-substitution-2"
                                                        value={"2"} onClick={(e) => handleTransaction("2")}
                                                        checked={t_type == "2"}

                                                    />
                                                    <label className="btn btn-default" htmlFor="a25">New Booking</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <br />
                                    <br />

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



                                    <div className="hr_line"></div>



                                    <div className="sell_area_unit">
                                        <div className="unit_box">
                                            <label>Built up Area<sup
                                            >*</sup></label>
                                            <input type="text" maxLength="5" value={area}
                                                onChange={handleValue1Change}
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

                                    <div className="hr_line"></div>



                                    <div className="sell_area_unit">

                                        <div className="unit_box">
                                            <label>Unit Price
                                            </label>
                                            <input type="text" maxLength="6" value={p_unit} required
                                                onChange={handleValue2Change}

                                            />
                                        </div>


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
                                    </div>

                                    <div className="unit_box">
                                        {(p_typeid === 321 || p_typeid === 356 || p_typeid === 319 || p_typeid === 322 || p_typeid === 342 || p_typeid === 356 || p_typeid === 357 || p_typeid === 324 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327) && option === 'Rent' && (
                                            <>
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
                                            </>
                                        )}
                                    </div>

                                    <div className="hr_line"></div>

                                    {(p_typeid === 321 || p_typeid === 356 || p_typeid === 357 || p_typeid === 322 || p_typeid === 342 || p_typeid === 0) && (
                                        <div className="sell_area_unit">
                                            <div className="unit_box half">
                                                <label>Rooms</label>
                                                <select
                                                    name="room"
                                                    className="select_click"
                                                    required
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
                                                <label>Bathrooms</label>
                                                <select
                                                    name="bath"
                                                    className="select_click"
                                                    required
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
                                                <label>Flooring</label>
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
                                    )}



                                    {(p_typeid === 321 || p_typeid === 356 || p_typeid === 357 || p_typeid === 327 || p_typeid === 322 || p_typeid === 342 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327 || p_typeid == 0) &&


                                        <div className="sell_area_unit">
                                            <div className="unit_box half">
                                                <label>Total Floors</label>
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
                                                <label>Property on Floor</label>
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

                                        </div>

                                    }
                                    <div className="hr_line"></div>

                                    <div className="sell_area_unit">
                                        {(p_typeid === 321 || p_typeid === 356 || p_typeid === 357 || p_typeid === 319 || p_typeid === 327 || p_typeid === 322 || p_typeid === 342 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327 || p_typeid == 0) &&

                                            <div className="unit_box half">
                                                <label>Property Face</label>
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
                                        {(p_typeid === 321 || p_typeid === 356 || p_typeid === 357 || p_typeid === 319 || p_typeid === 327 || p_typeid === 322 || p_typeid === 342 || p_typeid === 325 || p_typeid === 326 || p_typeid === 327 || p_typeid == 0) &&

                                            <div className="unit_box half">

                                                <label>Age of Property</label>
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
                                        }
                                    </div>

                                    <div>

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
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="property_pichurse">
                <div className="pichurse_tabs">
                    <h6>PROPERTY PICTURES</h6>
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Gallery</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Floor Plan</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <form>
                                <div className="row">

                                    {/* {[...Array(6)].map((_, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="file_inner">
                                                <div className="upload_img">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="img"
                                                        required
                                                        multiple
                                                        onChange={(e) => handleImageChange(e, index)}
                                                    />
                                                    {image[index] ? (
                                                        image[index].type === 1 ? (
                                                            <img
                                                                src={config.Image_URL + image[index].img}
                                                                width="40%"
                                                                className="img-fluid"
                                                                alt={`Image ${index}`}
                                                            />
                                                        ) : null
                                                    ) : (
                                                        <img
                                                            src={
                                                                image[index]
                                                                    ? URL.createObjectURL(image[index])
                                                                    : config.SITE_URL + './images/uplloadimg.jpg'
                                                            }
                                                            className="img-fluid"
                                                            alt={`Image ${index}`}
                                                        />
                                                    )}
                                                </div>
                                                <div className="upload_text">
                                                    <h5>Upload Photo</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))} */}

                                    {[...Array(6)].map((_, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="file_inner">
                                                <div className="upload_img">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="img"
                                                        required
                                                        multiple
                                                        onChange={(e) => handleImageChange(e, index)}
                                                    />
                                                    {image[index] && image[index].img ? (
                                                        <img
                                                            src={config.Image_URL + image[index].img}
                                                            width="40%"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={image[index] ? URL.createObjectURL(image[index]) : config.SITE_URL + './images/uplloadimg.jpg'}
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    )}
                                                </div>
                                                <div className="upload_text">
                                                    <h5>Upload Photo</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <form>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="file_inner">

                                            <div className="upload_img">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="img"
                                                    required
                                                    onChange={(e) => handlefloorImgChange(e, 0)}
                                                />
                                                {image.map(image => {
                                                    if (image.type === 2) {
                                                        console.log("photossssssss", image); // Do something with each image element
                                                        console.log("ph", image.type)
                                                        return (

                                                            <img
                                                                src={config.Image_URL + image.img}
                                                                width="40%"
                                                                className="img-fluid"
                                                                alt={`Image ${image.id}`}
                                                                key={image.id} // Ensure each image has a unique key
                                                            />

                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}


                                                {/* <img
                                                        src={config.Image_URL + image.img}
                                                        width="40%"
                                                        className="img-fluid"
                                                        alt="img"
                                                    /> */}

                                                {/* <img
                                                         src={config.SITE_URL + './images/uplloadimg.jpg'}
                                                         className="img-fluid"
                                                         alt="Not Uploaded"
                                                     /> */}

                                                {/* {image.map(image => {
                                                    if (image.type === 2) {
                                                        console.log("photossssssss", image); // Do something with each image element
                                                        console.log("ph", image.type)
                                                        return (
                                                            <div className="col-sm-6 col-md-3 col-5">
                                                                <img
                                                                    src={config.Image_URL + image.img}
                                                                    width="40%"
                                                                    className="img-fluid"
                                                                    alt={`Image ${image.id}`}
                                                                    key={image.id} // Ensure each image has a unique key
                                                                />
                                                            </div>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })} */}
                                            </div>
                                            <div className="upload_text">
                                                <h5>Upload Photo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="Exterior_Features">
                    {/* <p>
                        Heating System
    
                    </p><br /> <p>
                        Cooling System
                    </p><br /> */}
                    <p>
                        Exterior Features
                    </p>
                    <form>
                        <ul>
                            {features
                                .filter((value) => value.type === 3)
                                .map((value) => {
                                    const isChecked = check_list.includes(value.id); // Check if the current value's ID exists in the check_list array
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                checked={isChecked} // Set the checked attribute based on the isChecked variable
                                                onChange={(e) => {
                                                    const id = parseInt(e.target.value);

                                                    if (isChecked) {
                                                        setCheck_list((prevList) => prevList.filter((item) => item !== id));
                                                    } else {
                                                        setCheck_list((prevList) => [...prevList, id]);
                                                    }
                                                }}
                                            />

                                            <label className="lables" htmlFor={`feature-${value.id}`}>
                                                {value.name}
                                            </label>
                                        </li>
                                    );
                                })}
                        </ul>
                        <p>
                            Interior Features
                        </p>
                        <ul>
                            {features
                                .filter((value) => value.type === 4)
                                .map((value) => {
                                    const isChecked = check_list.includes(value.id); // Check if the current value's ID exists in the check_list array
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                checked={isChecked} // Set the checked attribute based on the isChecked variable
                                                onChange={(e) => {
                                                    const id = parseInt(e.target.value);

                                                    if (isChecked) {
                                                        setCheck_list((prevList) => prevList.filter((item) => item !== id));
                                                    } else {
                                                        setCheck_list((prevList) => [...prevList, id]);
                                                    }
                                                }}
                                            />

                                            <label className="lables" htmlFor={`feature-${value.id}`}>
                                                {value.name}
                                            </label>
                                        </li>
                                    );
                                })}
                        </ul>
                        <p>
                            Outlook View
                        </p>
                        <input className="submit_btn" type="submit" value="submit "
                            onClick={UpdateProperty}

                        />
                    </form>
                </div>


            </div>

            <Footer />
        </div>
    )
}