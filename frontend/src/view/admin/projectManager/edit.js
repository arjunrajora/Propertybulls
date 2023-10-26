import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link, Link as RouterLink, useNavigate,useParams } from 'react-router-dom';

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Project from ".";

const builderUrl = config.API_URL + "builder/viewAll"
const locationUrl = config.API_URL + "location/viewAll";
const typeUrl = config.API_URL + "type/viewAll"
const featureUrl = config.API_URL + "features/viewAll"
const apiUrl = config.API_URL + "property/viewPropertytypes";





function ProjectAdd() {
  const { id} = useParams();
  const navigate = useNavigate();
  const [builder, setBuilder] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [parking, setParking] = useState([]);
  const [type, setType] = useState([]);
  const [feature, setFeature] = useState([]);
  const [img, setImg] = useState([])
  const [PropertyType, setPropertyType] = useState([]);
  const [name, setName] = useState("");
  const [build_id, setBuild_id] = useState("");
  const [city_id, setCity_id] = useState("27");
  const [location_id, setLocation_id] = useState("");
  const [description, setDescription] = useState("");
  const [featureimage, setFeatureimage] = useState("");
  const [tot_price, setTot_price] = useState("");
  const [rera_registration, SetRera_registration] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [pincode, setPincode] = useState("");
  const [url, SetUrl] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [area, setArea] = useState("");
  const [option, setOption] = useState("");
  const [ids, setIds] = useState("");
  const [ship, setShip] = useState("");
  const [bath, setBath] = useState("");
  const [carparking, setCarparking] = useState("");
  const [p_floor, setP_floor] = useState("");
  const [p_unit, setp_unit] = useState("");
  const [room, setroom] = useState("");
  const [project, setProject] = useState([]);
  const [check_list, setCheck_list] = useState([])
  const [formValues, setFormValues] = useState([{ area: "", price: "" }])
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.area] = e.target.value;
    setFormValues(newFormValues);
  }
  let addFormFields = () => {
    setFormValues([...formValues, { area: "", price: "" }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }
  useEffect(() => {
    const multiplicationResult = area * p_unit;
    setTot_price(multiplicationResult);
}, [p_unit, area])
  // const handleRoomChange = (event) => {
  //   const inputValue = event.target.value;
  //   setroom(inputValue)
  //   // setroom((prevSelectedRooms) => [...prevSelectedRooms, inputValue]);
  // };

  const handleValue1Change = (e) => {
    setArea(Number(e.target.value));
};

const handleValue2Change = (e) => {
    setp_unit(Number(e.target.value));
};

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        imagesArray.push(files[i]);
      }
    }
    console.log(imagesArray, "dd");
    setImg(imagesArray);
  };
  console.log(room, "room");
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
  const deleteprjectsimg = config.API_URL + "project/deleteprojectimg/"

  const Deleteprojectimg = async (Id) => {
    const res = await axios.delete(deleteprjectsimg + Id, options);
console.log(res);
        fetch(viewProjectbyid, options)
      .then((response) => response.json())
      .then((value) => {
        console.log(value.data);
        setProject(value.data.propertyImages)
        setBuild_id(value.data.build_id)
        setName(value.data.name)
        setLocation_id(value.data.location_id);
        setOption(value.data.option);
        setCity_id(value.data.city_id);
        setP_typeid(value.data.t_typeid);
        setAddress(value.data.address);
        setAddress2(value.data.address2);
        setPincode(value.data.pincode);
        setArea(value.data.area);
        setp_unit(value.data.p_unit);
        setTot_price(value.data.tot_price);
        setroom(value.data.room);
        SetRera_registration(value.data.rera_registration);
        setP_typeid(value.data.p_typeid)
        setDescription(value.data.description);
        setShip(value.data.ship)
        setCheck_list(value.data.Propertyfeatures.map((item) => item.check_list));
        setBath(value.data.propertydetails.map((item) => item.bathroom));
        setCarparking(value.data.propertydetails.map((item) => item.carparking));
        setFeatureimage(value.data.featureimage)
        setP_floor(value.data.p_floor)
      });
  }

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data'
    },
  };
  console.log(check_list, "fd");
  const EditProject = async (event) => {
    event.preventDefault();
    let selectedLocationsString;

    if (check_list != null && check_list.length > 0) {
      // If check_list is not null and not empty, join its elements into a string
      selectedLocationsString = check_list.join(',');
      console.log(selectedLocationsString, 'jh');
    } else {
      // If check_list is null or empty, show the alert
      alert('Please Enter Project Feature');
    }
    
   const body = new FormData();
    console.log(body, "FormData");
    body.append('type', 1);
    body.append('check_list', selectedLocationsString);
    body.append('rera_registration', rera_registration);
    body.append('city_id', city_id);
    body.append('option', option);
    body.append('p_typeid', p_typeid);
    body.append('name', name);
    body.append('address', address);
    body.append('address2', address2);
    body.append('pincode', pincode);
    body.append('area', area);
    body.append('tot_price', tot_price);
    body.append('room', room);
    body.append('p_floor', p_floor);
    body.append('description', description);
    body.append('location_id', location_id);
    body.append('cus_id', 1);
    body.append('carparking', carparking);
    body.append('build_id', build_id);
    body.append('cus_id', 1);
    body.append('ship', ship);
    body.append('bathroom', bath);
    body.append('p_unit', p_unit);
    body.append('featureimage', featureimage);
    img.forEach((images, index) => {
      body.append(`img`, images);
    });
    const Updateproject = config.API_URL + "project/" + id
    await axios.put(Updateproject, body, {
      headers: { 'Content-Type': 'multipart/form-data', },
    }).then((res) => {
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      navigate('/admin/project', { replace: true });
    })
      .catch((err) => console.log(err));
  };
  console.log(project);
  const viewProjectbyid = config.API_URL + "project/" + id
  useEffect(() => {
    handleshow();

    fetch(viewProjectbyid, options)
      .then((response) => response.json())
      .then((value) => {
        console.log(value.data);
        setProject(value.data.propertyImages)
        setBuild_id(value.data.build_id)
        setName(value.data.name)
        setLocation_id(value.data.location_id);
        setOption(value.data.option);
        setCity_id(value.data.city_id);
        setP_typeid(value.data.t_typeid);
        setAddress(value.data.address);
        setAddress2(value.data.address2);
        setPincode(value.data.pincode);
        setArea(value.data.area);
        setp_unit(value.data.p_unit);
        setTot_price(value.data.tot_price);
        setroom(value.data.room);
        SetRera_registration(value.data.rera_registration);
        setP_typeid(value.data.p_typeid)
        setDescription(value.data.description);
        setShip(value.data.ship)
        setCheck_list(value.data.Propertyfeatures.map((item) => item.check_list));
        setBath(value.data.propertydetails.map((item) => item.bathroom));
        setCarparking(value.data.propertydetails.map((item) => item.carparking));
        setFeatureimage(value.data.featureimage)
        setP_floor(value.data.p_floor)
      });
    fetch(builderUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setBuilder(value.data);
      });
    fetch(locationUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocalities(value.data);
      });
    fetch(typeUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setType(value.data);
      });

    fetch(featureUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setFeature(value.data);
      });

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setPropertyType(value.data);
      });
  }, [fetch]);
  console.log(check_list, "effd");
  var InteriorState, ExteriorState;
  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        className="form-horizontal needs-validation"

                        onSubmit={EditProject}
                      >
                        <div className="form-body"  >
                          <h2 className="form-section"> EDIT PROJECT</h2>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="row">
                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label htmlFor="build_id">Builder*</label>
                                    <div className="input select">

                                      <select
                                      required 
                                        name="build_id"
                                        className="form-control"
                                        value={build_id}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setBuild_id(e.target.value);
                                        }}
                                      >
                                        <option value="">--Select Builder--</option>

                                        {builder.map((value) => {
                                          if(value.status=="Y"){
                                            return <option key={value.id} value={value.id}> {value.name}</option>;

                                          }
                                        })}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label>Category*</label>
                                    <div className="input select">
                                      <select required
                                      name="option"
                                        className="form-control"
                                        value={option}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setOption(e.target.value);
                                        }}>
                                        <option value=""> --Select Category--</option>
                                        <option value="Sell">Sell</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label htmlFor="rera_registration">
                                      Area Registration Number
                                    </label>
                                    <input required
                                      type="text"
                                      id="rera_registration"
                                      className="form-control"
                                      name="rera_registration"
                                      
                                      value={rera_registration}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        SetRera_registration(e.target.value);
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label>Project Type*</label>
                                    <div className="input select">
                                      <select required  name="id" className="form-control"
                                        
                                        value={p_typeid}
                                        onChange={(e) => {
                                          handleshow(e);
                                          setP_typeid(e.target.value);
                                          console.log(e.target.value);
                                        }}>

                                        <option value="">
                                          Select Property Type</option>

                                        {PropertyType.map((value) => {

                                          return <option value={value.id} key={value.id}> {value.name}</option>;
                                        })}

                                      </select>





                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label htmlFor="name">Project Title*</label>
                                    <input
                                      type="text"
                                      id="name"
                                      className="form-control"
                                      name="name"
                                      required
                                      value={name}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setName(e.target.value);
                                      }}

                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label>City*</label>
                                    <div className="input select">

                                      <select name="city_id" className="form-control"
                                        value={city_id}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setCity_id(e.target.value);
                                        }}>

                                        <option value="27">Jaipur</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label>Localities</label>
                                    <div className="input select">
                                      <select required
                                        name="location_id"
                                        className="form-control"
                                        value={location_id}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setLocation_id(e.target.value);
                                        }}
                                      >
                                        <option value="">--Select Localities--</option>

                                        {localities.map((value) => {
                                          return <option key={value.id} value={value.id}>{value.name}</option>;
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-12 col-5">
                                    <label htmlFor="address">Address</label>
                                    <textarea required
                                      className="form-control"
                                      id="floatingTextarea"
                                      value={address}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setAddress(e.target.value);
                                      }}
                                    ></textarea>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>



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

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="address2">Landmark</label>
                                <input
                                  type="text"
                                  id="address2"
                                  className="form-control"
                                  name="address2"
                                  required
                                  value={address2}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAddress2(e.target.value);
                                  }
                                  }
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="pincode">Pin Code</label>
                                <input
                                  type="text"
                                  id="pincode"
                                  maxLength="6"
                                  className="form-control"
                                  name="pincode"
                                  required
                                  value={pincode}
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
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Number Of Floor</label>
                                <div className="input select">
                                  <select  required name="p_floor" className="form-control"
                                    value={p_floor}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setP_floor(e.target.value);
                                    }}>
                                    <option value="">
                                      --Select Floor--
                                    </option>
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
                                    <option value="25">25+</option>




                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY DETAIL'S</h2>
                          </div>

                        
                          {formValues.map((element, index) =>
                            <div className="form-group" key={element.id} >
                              <div className="row">
                                {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label>Rooms</label>
                                    <div className="input select">
                                      <select required  name="bath" className="form-control"
                                        value={room}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setroom(e.target.value);
                                        }}>
                                        <option value="">
                                          --No of rooms--
                                        </option>
                                        <option value="1">1 BHK</option>
                                        <option value="2">2 BHK </option>
                                        <option value="3">3 BHK</option>
                                        <option value="4">4 BHK</option>
                                        <option value="5">5 BHK</option>
                                        <option value="6">6 BHK</option>
                                        <option value="7">7 BHK</option>
                                      </select>
                                    </div>
                                  </div>
                                }
                                {(show === '321' || show === '320' || show === '324' || show === '322' || show === '325' || show === '326' || show === '327' || show === '342' || show === '352' || show === '356' || show === '357' || show === '319' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="area">Total Area</label>
                                    <input
                                      type="text"
                                      id="area"
                                      maxLength="6"
                                      className="form-control"
                                      name="area"
                                      required
                                      value={area}
                                      onChange={handleValue1Change}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>}
                                {(show === '321' || show === '320' || show === '322' || show === '324' || show === '325' || show === '326' || show === '327' || show === '342' || show === '352' || show === '356' || show === '357' || show === '319' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label>Unit</label>
                                    <div className="input select">
                                      <select  required name="ship" className="form-control"
                                        value={ship}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setShip(e.target.value);
                                        }}>
                                        <option value="">--Unit--</option>
                                        <option value="Sq Ft">Sq Ft</option>
                                        <option value="Sq Mtr">Sq Mtr</option>
                                        <option value="Sq Yard">Sq Yard</option>
                                        <option value="Bigha">Bigha</option>
                                        <option value="Hectare">Hectare</option>
                                      </select>
                                    </div>
                                  </div>}
                                {(show === '321' || show === '320' || show === '322' || show === '324' || show === '325' || show === '326' || show === '327' || show === '342' || show === '352' || show === '356' || show === '357' || show === '319' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="per_unit">Unit Price*</label>
                                    <input
                                      type="text"
                                      id="per_unit"
                                      className="form-control"
                                      name="per_unit"
                                      maxLength="5"
                                      required
                                      value={p_unit}
                                      onChange={(e) => {
                                        const input = e.target.value;
                                        const regex = /^[0-9]{0,6}$/; // Regex to match only 6-digit numbers
                                        if (regex.test(input)) {
                                          setp_unit(input);
                                        } else {
                                          alert('Please Enter Only Numeric Characters!!!!');
                                        }
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                }
                                {(show === '321' || show === '320' || show === '322' || show === '324' || show === '325' || show === '326' || show === '342' || show === '327' || show === '352' || show === '356' || show === '357' || show === '319' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="tot_price">Total Price</label>
                                    <input
                                      type="text"
                                      id="tot_price"
                                      className="form-control"
                                      name="tot_price"
                                      required
                                      value={tot_price}
                                      onChange={(e) => {
                                        const input = e.target.value;
                                        const regex = /^[0-7]{0,7}$/; // Regex to match only 6-digit numbers
                                        if (regex.test(input)) {
                                          setTot_price(input);
                                        } else {
                                          alert('Please Enter Only Numeric Characters!!!!');
                                        }
                                      }}
                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                }
                                {(show === '321' || show === '320' || show === '322' || show === '324' || show === '325' || show === '326' || show === '342' || show === '352' || show === '327' || show === '356' || show === '357' || show === '319' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="logo">Floor Plan</label>
                                    <input
                                      type="file"
                                      id="description"
                                      multiple
                                      className="form-control"
                                      name="image"
                                      onChange={(e) => handleImageChange(e)}                                    />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>}
                                {(show == "321" || show == '320' || show === '322'  || show === '325' || show === '326' || show === '327' || show === '342' || show === '352' || show === '356' || show === '357' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label>Car Parking</label>
                                    <div className="input select">
                                      <select  required name="carparking" className="form-control"
                                        value={carparking}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setCarparking(e.target.value);
                                        }}>
                                        <option value="">
                                          --Select Car Parking--
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9+</option>
                                      </select>
                                    </div>
                                  </div>
                                }
                                {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label>Bathrooms</label>
                                    <div className="input select">
                                      <select required  name="bath" className="form-control"
                                        value={bath}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                          setBath(e.target.value);
                                        }}>
                                        <option value="">
                                          --Select Bathrooms--
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9+</option>

                                      </select>
                                    </div>
                                  </div>
                                }
                                {( show === '320' || show === '325' || show === '327' || show === '326'|| show == '0') &&
                                  <div className="col-sm-6 col-md-4 col-5">
                                    <label htmlFor="description">Description*</label>
                                    <textarea
                                      className="form-control"
                                      id="floatingTextarea"


                                    ></textarea>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">
                                      Please fill out this field.
                                    </div>
                                  </div>
                                }
                                {

                                  index ?
                                    <button type="submit" className="btn btn-primary pull-right" onClick={() => removeFormFields(index)}>Remove</button>
                                    : null}
                              </div>
                            </div>
                          )}
                          <div>
                            <button
                              className="btn btn-success pull-right"
                              type="submit"
                              onClick={() => addFormFields()}>
                              Add Flat Type</button>
                            <h2 className="form-section">PROPERTY FEATURE</h2>
                          </div>
                          <div className="form-group">
                            <h3>EXTERIOR FEATURES</h3>
                            <div className="row">
                              {feature.filter((value) => value.type === 3 && value.status === "Y")
                                .map((value) => {
                                  const isChecked = check_list.includes(value.id); // Check if the current value's ID exists in the check_list array
                                  return (
                                    <div className="col-sm-3 col-md-3 col-5">
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
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div className="form-group">
                            <h3>INTERIOR FEATURES</h3>

                            <div className="row">
                              {feature
                                .filter((value) => value.type === 4 && value.status === "Y")
                                .map((value) => {
                                  const isChecked = check_list.includes(value.id); // Check if the current value's ID exists in the check_list array

                                  return (
                                    <div className="col-sm-3 col-md-3 col-5">
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
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          <div>
                            <h2 className="form-section">PROPERTY GALLERY</h2>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="description">Project Description</label>
                                <textarea
                                  className="form-control"
                                  id="floatingTextarea"
                                  value={description}
                                  nChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value)
                                  }}
                                ></textarea>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="featureimage">Featured Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"

                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setFeatureimage(e.target.files[0])
                                  }}
                                />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <img className="img_clossbutton"
                                  alt="Image"
                                  src={config.Image_URL + featureimage}
                                  height="100px"
                                  width="100px"
                                />


                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="image">Other Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  multiple
                                  onChange={handleImageChange}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="form-group">
                            <div className="row">

                              {
                                project && project.map((value) => {
                                  return (
                                    <div className="col-3 mb-2 ">

                                      <img className="img_clossbutton"
                                        alt="Image"
                                        src={config.Image_URL + value.img}
                                        height="100px"
                                        width="100px"
                                      />
                                      <Link><i className="fa fa-window-close" aria-hidden="true" onClick={((e) => {
                                        console.log(value.id);

                                        Deleteprojectimg(value.id);
                                      })}></i></Link>
                                    </div>
                                  )
                                })
                              }







                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              // onClick={AddProject}
                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table head options end  */}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
export default ProjectAdd;