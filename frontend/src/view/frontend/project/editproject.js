import React, { useState, useEffect } from 'react'
import Header from '../../../element/frontHeader'
import Footer from '../../../element/frontFooter'
import config from "../../../config/config"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

export default function Myrequirement() {
    const handleshow = (typid) => {
        console.log(typid, "typid");
        if (typid) {

            if (typid == '321') {
                setShow(typid);
            } else if (typid == '320') {
                setShow(typid);
            } else if (typid == '319') {
                setShow(typid);
            } else if (typid == '322') {
                setShow(typid);
            } else if (typid == '324') {
                setShow(typid);
            } else if (typid == '325') {
                setShow(typid);
            } else if (typid == '326') {
                setShow(typid);
            } else if (typid == '327') {
                setShow(typid);
            } else if (typid == '342') {
                setShow(typid);
            } else if (typid == '352') {
                setShow(typid);
            } else if (typid == '356') {
                setShow(typid);
            } else if (typid == '357') {
                setShow(typid);
            }
            else {
                setShow(0);
            }



        } else {
            setShow('0');
        }
    }
    const { id } = useParams();
    const navigate = useNavigate()
    const [project, setProject] = useState([])
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
    const [propertyurl, seturl] = useState(""); 
    const [area, setarea] = useState("");
    const [a_unit, setA_unit] = useState("");
    const [p_unit, setP_unit] = useState("");
    const [tot_price, setTot_price] = useState("");
    const [room, setRoom] = useState("1");
    const [bath, setBath] = useState("");
    const [floor, setFloor] = useState("");
    const [flat, setflat] = useState("1");
    const [p_floor, setP_floor] = useState("");
    const [faceid, setFaceid] = useState("");
    const [description, setDescription] = useState("");
    const [remark, setRemark] = useState("");
    const [bathroom, setbathroom] = useState("");
    const [carparking, setcarparking] = useState("");
    const [rera_registration, setrera_registration] = useState("");
    const [ship, setship] = useState("");
    const [type, setType] = useState("")
    const [option, setOption] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [perpertyType, setPropertyType] = useState([])
    const [location_id, setLocation_id] = useState("")
    const [features, seFeatures] = useState([]);
    const [imges, setImg] = useState([]);
    const [floor_img, setfloor_img] = useState([]);
    const [floorimg, setfloorimg] = useState([]);
    const [check_list, setCheck_list] = useState([])
    const [featureimage, setFeatureimage] = useState("");
    const handleFileUpload = (e, index) => {
        console.log(e.target.value)
        const file = e.target.files[0];
        const newImages = [...imges];
        newImages[index] = file;
        console.log("ggggggggggg", file);
        setImg(newImages);
        setFeatureimage(newImages[0]);
        console.log("#######", newImages)
    };
    console.log(id, "sda");
    var projectimages;
    var options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const handleValue1Change = (e) => {
        setarea(Number(e.target.value));
    };
    const handleValue2Change = (e) => {
        setP_unit(Number(e.target.value));
    };
    const propertyfeatures = config.API_URL + "clint/property/ViewPropertyFeatures";
    const productdetail = config.API_URL + "clint/project/" + id;

    useEffect(() => {
        const multiplicationResult = area * p_unit;
        setTot_price(multiplicationResult);
    }, [p_unit, area]);

    const [show, setShow] = useState("");
  
    useEffect(() => {

        viewLocation()
        viewAllCity()
        viewAllState()
        const api = config.API_URL + "clint/details/propertyType"
        fetch(api)
            .then((response) => response.json())
            .then((value) => {
                setPropertyType(value.data)
            });
        fetch(propertyfeatures)
            .then((response) => response.json())
            .then((value) => {
                seFeatures(value.data);
            });
        fetch(productdetail)
            .then((response) => response.json())
            .then((value) => {
                console.log(value.data, "jhgfd");
                setProject(value.data);
                setName(value.data.name)
                setLocation_id(value.data.location_id);
                setOption(value.data.option);
                setCity_id(value.data.city_id);
                setState_id(value.data.state_id);
                setP_typeid(value.data.p_typeid);
                seturl(value.data.url)    
                            handleshow(value.data.p_typeid);
                setAddress(value.data.address);
                setAddress2(value.data.address2);
                setPincode(value.data.pincode);
                setarea(value.data.area);
                setA_unit(value.data.a_unit);
                setP_unit(value.data.p_unit);
                setTot_price(value.data.tot_price);
                setRoom(value.data.room);
                setP_floor(value.data.p_floor);
                setrera_registration(value.data.rera_registration);
                setP_typeid(value.data.p_typeid);
                setDescription(value.data.description);
                setship(value.data.ship)
                setCheck_list(value.data.Propertyfeatures.map((item) => item.check_list));
                setflat(value.data.flat);
                setBath(value.data.bath);
                setfloorimg(value.data.propertyImages)
                setType(value.data.propertyType.type)
                setImg(value.data.propertyImages);
                setbathroom(value.data.propertydetails.map((item) => item.bathroom));
                setcarparking(value.data.propertydetails.map((item) => item.carparking));
            })
    }, []);
    const handleOption = (value) => {
        console.log(value);
        setOption(value)
    }
    const Id = JSON.parse(localStorage.getItem("userId"));
    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                imagesArray.push(files[i]);
            }
        } 
        setfloor_img(imagesArray);
    };
    const edit_project = async (event) => {
        event.preventDefault();
        if (name === '' || address === '' || address2 === '' || pincode === '' || p_typeid === '' || rera_registration === ''||area===''||p_unit===''||tot_price===''||ship==='') {
            alert('Please fill in all the required fields.');
            return;
          }
          if (check_list.length === 0 ) {
            alert('Please select Project   features.');
          }
        const selectedLocationsString = check_list.join(',');
        const body = new FormData();
        body.append('type', 1);
        body.append('rera_registration', rera_registration);
        body.append('check_list', selectedLocationsString);
        body.append('city_id', city_id);
        body.append('state_id', state_id);
        body.append('option', option);
        body.append('p_typeid', p_typeid);
        body.append('name', name);
        body.append('address', address);
        body.append('address2', address2);
        body.append('pincode', pincode);
        body.append('area', area);
        body.append('a_unit', ship);
        body.append('p_unit', p_unit);
        body.append('tot_price', tot_price);
        body.append('room', room);
        body.append('floor', floor);
        body.append('p_floor', p_floor);
        body.append('faceid', faceid);
        body.append('description', description);
        body.append('location_id', location_id);
        body.append('cus_id', Id);
        body.append('build_id', Id);
        body.append('cus_id', Id);
        body.append('ship', ship);
        body.append('bathroom', bathroom);
        body.append('bath', bath);
        body.append('featureimage', featureimage);
        body.append('flat', flat);
        body.append('url',propertyurl);
        body.append('carparking', carparking);
        imges.forEach((images, index) => {
            body.append(`img`, images);
        });

        floor_img.forEach((floorImges, index) => {
            body.append(`floor_img`, floorImges);
        });
        const url = config.API_URL + "clint/project/" + id;
        await axios.put(url, body, {
            headers: { 'Content-Type': 'multipart/form-data', },
        }).then((res) => {
            const msg = res.data.message;
            localStorage.setItem(
                "staticAdded",
                msg
            );
            navigate("/dashboard/myproperties", { s: true });
            localStorage.setItem("staticAdded", msg);
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
            setarea("");
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
        }).catch((err) => console.log(err));
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

    const deletefloorimg = config.API_URL + "clint/project/deleteFloorimg/"

    const DeleteFloorimg = async (id) => {
        const res = await axios.delete(deletefloorimg + id, options);
        console.log(res);
        fetch(productdetail)
            .then((response) => response.json())
            .then((value) => {
                setfloorimg(value.data.propertyImages)

            })
    }
    return (
        <div>
            <Header />
            <div className="sell_page">
                <div className="sell_top_part">
                    <h3>Edit Poject</h3>
                    <Link to="/dashboard/myproperties"><i className="fa fa-reply"></i> Switch to Site Profile </Link>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="sell_buttons">
                            <form onSubmit={edit_project} encType="multipart/form-data">
                                <p>Do You Want To</p>
                                <div className="radio-button">
                                    <input
                                        type="radio"
                                        id="a25"
                                        name="check-substitution-2"
                                        value={'sell'}
                                        checked={option === "sell"}
                                        onClick={(e) => handleOption(e.target.value)}
                                    />
                                    <label className="btn btn-default" for="a25">Sell</label>
                                </div>
                                <br />
                                <br />
                                <div className="sell_second_button">
                                    <p>Poject Category</p>
                                    <form>
                                        <div className="res-com resale-booking">
                                            <div className="radio-button">
                                                <input
                                                    type="radio"
                                                    id="a75"
                                                    name="check-substitution-2"
                                                    value={'R'}
                                                    checked={type === 'R'}
                                                    onChange={(e) => {
                                                        viewPropertytypess(e.target.value);
                                                        setType(e.target.value)
                                                    }}
                                                />
                                                <label className="btn btn-default" htmlFor="a75">Residential</label>
                                            </div>
                                            <div className="radio-button">
                                                <input
                                                    type="radio"
                                                    id="a76"
                                                    name="check-substitution-2"
                                                    value={'C'}
                                                    checked={type === 'C'}
                                                    onChange={(e) => {
                                                        viewPropertytypess(e.target.value);
                                                        setType(e.target.value)
                                                    }}
                                                />
                                                <label className="btn btn-default" htmlFor="a76">Commercial</label>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <br />
                                <br />

                                <div className="sell_select_option">

                                    <label>Type<sup >*</sup></label>
                                    <select className="select_click" required
                                        value={p_typeid}
                                        onChange={(e) => {
                                            handleshow(e.target.value);
                                            console.log(e.target.value);
                                            setP_typeid(e.target.value);
                                        }}>
                                        <option value=''>--Select Type--</option>
                                        {perpertyType.map((value) => {
                                            if (value.status == "Y") {
                                                return (
                                                    <option key={value.id} value={value.id}  >{value.name}</option>
                                                )
                                            }

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
                                        <input type="text" maxLength="6" value={pincode} required
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
                                                        setflat(e.target.value);
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

                                                <select className="select_click" required


                                                    value={p_floor}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                        setP_floor(e.target.value);
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
                                            </div>
                                        }






                                        <label>Total Area<sup >*</sup></label>
                                        <input type="text" maxLength="5" value={area}
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
                                        <input type="text" value={p_unit} required
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
                                    <div>
                                        <label>Floor Plan</label>
                                        <input
                                            type="file"
                                            id="description"
                                            className="form-control"
                                            name="image"
                                            required
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                        {floorimg.map((e) => {
                                            if (e.type == "2") {
                                                return (
                                                    <div>
                                                        <a className='img_clossbutton'>
                                                            <img alt="Image" src={e.img ? config.Image_URL + e.img : "https://www.propertybull.com/images/no-image.jpg"} />
                                                            <i class="fa-solid fa-circle-xmark close-btn" onClick={((value) => {
                                                                DeleteFloorimg(e.id)
                                                            })}></i>
                                                        </a>
                                                    </div>
                                                )
                                            }

                                        })}
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
                    <div className="col-lg-6">
                        <div className="add_project_map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56904.02189652055!2d75.7457565672076!3d26.951017844112883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db418a06f8561%3A0xd0f299d7610399c0!2sdaac!5e0!3m2!1sen!2sin!4v1677239848000!5m2!1sen!2sin"
                                width="100%" height="354" allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="property_pichurse">

                <div className="pichurse_tabs">
                    <h6>POJECT PICTURES</h6>
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
                            <form method="post"
                                className="form-horizontal needs-validation"
                                noValidate >
                                <div className="row">
                                    <div className="row">
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
                                                            onChange={(e) => handleFileUpload(e, index)}
                                                        />
                                                        {imges[index] && imges[index].img ? (
                                                            <img
                                                                src={config.Image_URL + imges[index].img}
                                                                width="40%"
                                                                className="img-fluid"
                                                                alt="img"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={imges[index] ? URL.createObjectURL(imges[index]) : config.SITE_URL + './images/uplloadimg.jpg'}
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
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <form>
                                <div className="row">
                                    {[...Array(1)].map((_, index) => (
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
                                                    {imges[index] && imges[index].img ? (
                                                        imges[index].type == 2 ?
                                                            <img
                                                                src={config.Image_URL + imges[index].img}
                                                                width="40%"
                                                                className="img-fluid"
                                                                alt="img"
                                                            /> : <img src={config.SITE_URL + './images/uplloadimg.jpg'}></img>
                                                    ) : (
                                                        <img
                                                            src={floor_img[index] ? URL.createObjectURL(floor_img[index]) : config.SITE_URL + './images/uplloadimg.jpg'}
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
                    </div>
                </div>
                <div className="Exterior_Features">
                    <br />
                    <p>
                        Exterior Features
                    </p>
                    <form>
                        <ul>
                            {features
                                .filter((value) => value.type === 3)
                                .map((value) => {
                                    const isChecked = check_list.includes(value.id);
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                checked={isChecked}
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
                                    const isChecked = check_list.includes(value.id);
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                checked={isChecked}
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
                            onClick={edit_project}
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
