import React, { useEffect, useState } from "react";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import config from "../../../../config/config";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate, useLocation, useParams } from "react-router-dom";
export default function EditProperty() {
  const Feature = config.API_URL + "Features/viewAll";
  const apiUrl = config.API_URL + "propertyTypes/viewAll";
  const apI = config.API_URL + "state/viewAll"
  const url = config.API_URL + "city/viewAll"
  const Location = config.API_URL + "location/viewAll"
  const facingurl = config.API_URL + "Facing/viewAll";
  const navigate = useNavigate()
  // const location = useLocation();

  // const { id } = location.state;
  const [PropertyType, setPropertyType] = useState([]);
  const [features, setFeatures] = useState([]);

  const [p_typeid, setP_typeid] = useState("");
  const [name, setName] = useState("");
  const [ship, setShip] = useState("");
  const [address2, setAddress2] = useState("");
  const [address, setAddress] = useState("");
  const [room, setRoom] = useState("");
  const [option, setOption] = useState("");
  const [description, setDescription] = useState("");
  const [tot_price, setTot_price] = useState("");
  const [faceid, setFaceid] = useState("");
  const [pincode, setPincode] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [city_id, setCity_id] = useState("27");
  const [state_id, setState_id] = useState("99");
  const [area, setArea] = useState("");
  const [flooring, setFlooring] = useState("");
  const [p_floor, setP_floor] = useState("");
  const [bath, setBath] = useState("");
  const [floor, setFloor] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState([]);
  const [type, setType] = useState("0");
  const [a_unit, seta_unit] = useState("");
  const [p_unit, setP_unit] = useState("");
  const [locat, setLocation] = useState([])
  const [facing, setFacing] = useState([]);
  const [check_list, setCheck_list] = useState([])
  const [floor_img, setFloor_img] = useState([]);


  console.log("Check_list", check_list)
  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };

  // const handleImageChange = (e, index) => {
  //   console.log(e.target.value)
  //   const file = e.target.files[0];
  //   const newImages = [...img];
  //   newImages[index] = file;
  //   // setImg((newImages) => [...newImages, file]);
  //   setImg(newImages);
  //   console.log("#######", newImages)
  // };
  const handleImageChange = (e, index) => {
    const files = e.target.files;
    const newImages = [...img];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newImages[index + i] = file;
    }

    setImg(newImages);
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

  const deleteprjectsimg = config.API_URL + "project/deleteprojectimg/"

  const Deleteprojectimg = async (Id) => {
    const res = await axios.delete(deleteprjectsimg + Id, options);
    console.log(res);
    const body = {
      pro_id: id
    }
    console.log(id, "id");
    const apI = config.API_URL + "property/details/" + id;

    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        console.log("kamal", value.data);
        setDetail(value.data);
        setImg(value.data.propertyImages);
      }).catch((err) => console.log(err));
  }









  useEffect(() => {
    const apI = config.API_URL + "property/details/" + id;
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        console.log("kamal", value.data);
        setDetail(value.data);
        setOption(value.data.option)
        setP_typeid(value.data.p_typeid);
        setName(value.data.name);
        setState_id(value.data.state_id);
        setCity_id(value.data.city_id);
        setLocation_id(value.data.location_id);
        setAddress(value.data.address);
        setAddress2(value.data.address2);
        setPincode(value.data.pincode);
        setArea(value.data.area);
        setP_unit(value.data.p_unit);
        setP_floor(value.data.p_floor);
        setShip(value.data.ship);
        setTot_price(value.data.tot_price);
        setRoom(value.data.room);
        setBath(value.data.bath);
        setFloor(value.data.floor);
        setFlooring(value.data.flooring);
        setFaceid(value.data.faceid);
        setAge(value.data.age);
        setP_unit(value.data.p_unit);
        setDescription(value.data.description);
        setCheck_list(value.data.Propertyfeatures.map((item) => item.check_list));
        setImg(value.data.propertyImages);





      });
  }, [])











  useEffect(() => {
    handleshow();
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setPropertyType(value.data);
      });
    fetch(Location, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);

      });
    fetch(Feature, options)
      .then((response) => response.json())
      .then((value) => {
        setFeatures(value.data);
      });
    fetch(facingurl, options)
      .then((response) => response.json())
      .then((value) => {
        setFacing(value.data);
      });

  }, [fetch]);
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

  const UpdateProperty = async (event) => {
    event.preventDefault();
    const selectedLocationsString = check_list.join(',');
    console.log("check_listtttttttt", selectedLocationsString)
    const body = new FormData();
    body.append('type', type);
    body.append('check_list', selectedLocationsString);
    body.append('name', name);
    body.append('faceid', faceid);
    body.append('area', area);
    body.append('address', address);
    body.append('address2', address2);
    body.append('state_id', state_id);
    body.append('city_id', city_id);
    body.append('location_id', location_id);
    body.append('room', room);
    body.append('ship', ship);
    body.append('a_unit', a_unit);
    body.append('age', age);
    body.append('bath', bath);
    body.append('floor', floor);
    body.append('p_floor', p_floor);
    body.append('description', description);
    body.append('option', option);
    body.append('p_typeid', p_typeid);
    body.append('tot_price', tot_price);
    body.append('p_unit', p_unit);
    body.append('pincode', pincode);
    body.append('flooring', flooring);
    body.append('img', img);

    img.forEach((images, index) => {
      body.append(`img`, images);
    });
    floor_img.forEach((images, index) => {
      body.append(`floor_img`, images);
    });

    const apiUrl = config.API_URL + "property/" + id;
    await axios
      .put(apiUrl, body)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate('/admin/property', { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => {
        let message = err.response.data.message
        console.log(message);
      })

  };
  var EXTERIOR
  var states

  var totprice = (area, p_unit) =>
    area * p_unit;

  console.log(totprice(area, p_unit));

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
                        onSubmit={UpdateProperty}
                        className="form-horizontal needs-validation"
                      >
                        <div className="form-body">
                          <h2 className="form-section"> EDIT PROPERTY </h2>
                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Select Category</label>
                                <div className="input select">
                                  <select name="id" className="form-control"

                                    value={option}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setOption(e.target.value);
                                    }}
                                  >
                                    <option value="">Select Category</option>
                                    <option value="Sell">Sell</option>
                                    <option value="Rent">Rent</option>


                                  </select>
                                </div>

                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Select Property Type</label>
                                <div className="input select">
                                  <select name="id" className="form-control"

                                    value={p_typeid}
                                    onChange={(e) => {
                                      handleshow(e);
                                      setP_typeid(e.target.value);
                                      console.log(e.target.value);
                                    }}>

                                    <option value="">
                                      Select Property Type</option>
                                    {PropertyType.map((value) => {
                                      return <option key={value.id} value={value.id}> {value.name}</option>;

                                    })}

                                  </select>
                                </div>

                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Title">Title</label>
                                <input
                                  type="text"
                                  id="Title"
                                  className="form-control"
                                  name="Title"

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

                              <div className="col-sm-6 col-md-4 col-5">
                                <label> State</label>
                                <div className="input select">
                                  <select name="id" className="form-control"
                                    value={state_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setState_id(e.target.value);
                                    }}>
                                    <option value="99">Rajasthan</option>

                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label> City</label>
                                <div className="input select">
                                  <select name="id" className="form-control"
                                    value={city_id}
                                    onChange={(e) => {
                                      setCity_id(e.target.value);
                                    }}>
                                    <option value="27">Jaipur</option>

                                  </select>
                                </div>
                              </div>




                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Select Locality</label>
                                <div className="input select">
                                  <select name="id" className="form-control"
                                    value={location_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setLocation_id(e.target.value);
                                    }}>
                                    <option value="">Select Locality</option>
                                    {locat.map((value) => {
                                      return <option key={value.id} value={value.id}> {value.name}</option>;

                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Address">Address</label>
                                <input
                                  type="text"
                                  id="Address"
                                  className="form-control"
                                  name="Address"


                                  value={address}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAddress(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Landmark">Landmark</label>
                                <input
                                  type="text"
                                  id="Landmark"
                                  className="form-control"
                                  name="Landmark"

                                  value={address2}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAddress2(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Pin code">Pin code</label>
                                <input
                                  type="text"
                                  id="Pin code"
                                  className="form-control"
                                  name="Pin code"

                                  value={pincode}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPincode(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY DETAIL'S</h2>
                          </div>
                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="area">Total Area</label>
                                <input
                                  type="text"
                                  id="area"
                                  className="form-control"
                                  name="area"

                                  value={area}
                                  onChange={handleValue1Change}

                                // onChange={(e) => {
                                //   console.log(e.target.value);
                                //   setArea(e.target.value);
                                // }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label> Unit</label>
                                <div className="input select"

                                  value={ship}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setShip(e.target.value);
                                  }}

                                >
                                  <select name="id" className="form-control">
                                    <option value="">Unit</option>
                                    <option value="sq ft">Sq Ft</option>
                                    <option value="Sq Mtr ">Sq Mtr </option>
                                    <option value="Square Yards">Square Yards </option>
                                    <option value="Bigha ">Bigha </option>
                                    <option value="hectares">hectares </option>


                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Unit Price">Unit Price</label>
                                <input
                                  type="text"
                                  id="Unit Price"
                                  className="form-control"
                                  name="Unit Price"

                                  value={p_unit}
                                  onChange={handleValue2Change}

                                // onChange={(e) => {
                                //   console.log(e.target.value);
                                //   setP_unit(e.target.value);
                                // }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Total Price">Total Price</label>
                                <input
                                  type="text"
                                  id="Total Price"
                                  className="form-control"

                                  value={tot_price}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setTot_price(e.target.value);
                                  }}
                                />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Rooms</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"

                                      value={room}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setRoom(e.target.value);
                                      }}
                                    >
                                      <option value="">Select Rooms</option>
                                      <option value="1">1 BHK</option>
                                      <option value="2">2  BHK</option>
                                      <option value="3">3  BHK</option>
                                      <option value="4">4  BHK</option>
                                      <option value="5">5  BHK</option>
                                      <option value="6">6  BHK</option>
                                      <option value="7">7  BHK</option>
                                      <option value="7+">7+</option>


                                    </select>
                                  </div>

                                </div>
                              }
                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Bathrooms</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"


                                      value={bath}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setBath(e.target.value);
                                      }}

                                    >
                                      <option value="">
                                        Select Bathrooms
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="5+">5+</option>

                                    </select>
                                  </div>
                                </div>
                              }


                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Flooring</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"


                                      value={flooring}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setFlooring(e.target.value);
                                      }}

                                    >
                                      <option value="">
                                        Select Flooring
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="3">4</option>
                                    </select>
                                  </div>
                                </div>
                              }
                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Total Number of Floor</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"


                                      value={floor}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setFloor(e.target.value);
                                      }}

                                    >
                                      <option value="">
                                        Select Total Number of Floor
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
                                      <option value="25">25</option>
                                      <option value="25+">25+</option>



                                    </select>
                                  </div>
                                </div>
                              }

                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Property on Floor</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"

                                      value={p_floor}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setP_floor(e.target.value);
                                      }}
                                    >
                                      <option value="">
                                        Property on Floor
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="2">3</option>
                                      <option value="2">4</option>
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
                                    </select>
                                  </div>
                                </div>
                              }
                              {(show === '321' || show === '320' || show === '322' || show === '327' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>     Unit per Floor</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"

                                    >
                                      <option value="">
                                        Unit per Floor
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </div>
                                </div>
                              }

                              {(show === '321' || show === '320' || show === '322' || show === '327' || show === '319' || show === '324' || show === '325' || show === '357' || show === '326' || show === '356' || show === '352' || show === '342' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Facing</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"


                                      value={faceid}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setFaceid(e.target.value);
                                      }}

                                    >
                                      <option value="">
                                        Select Facing
                                      </option>
                                      {facing.map((value) => {
                                        return <option key={value.id} value={value.id}> {value.name}</option>;

                                      })}
                                    </select>
                                  </div>
                                </div>
                              }

                              {(show === '321' || show === '320' || show === '322' || show === '327' || show === '319' || show === '324' || show === '356' || show === '357' || show === '326' || show === '325' || show === '342' || show === '352' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label>Property Age</label>
                                  <div className="input select">
                                    <select name="id" className="form-control"


                                      value={age}
                                      onChange={(e) => {
                                        console.log(e.target.value);
                                        setAge(e.target.value);
                                      }}

                                    >
                                      <option value="">
                                        Property Age
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
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
                                    </select>
                                  </div>
                                </div>
                              }
                              {(show === '321' || show === '320' || show === '322' || show === '327' || show === '356' || show === '357' || show === '319' || show === '324' || show === '342' || show === '352' || show === '326' || show === '325' || show == '0') &&
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="description">Description*</label>
                                  <textarea
                                    className="form-control"
                                    id="floatingTextarea"

                                    value={description}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setDescription(e.target.value);
                                    }}

                                  ></textarea>
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>
                              }
                            </div>
                            <h2 className="form-section">PROPERTY FEATURES</h2>
                            <div className="form-group">
                              <h3>EXTERIOR FEATURES</h3>
                              <div className="row">
                                {features
                                  .filter((value) => value.type === 3 && value.status === "Y")
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

                                          <label className="lables" htmlFor={`feature-${value.id}`}><br />

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
                                {features
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

                                          <label className="lables" htmlFor={`feature-${value.id}`}><br />

                                            {value.name}
                                          </label>
                                        </li>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>

                            <h2 className="form-section">PROPERTY GALLERY </h2>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="logo">Gallery </label>
                                  <input
                                    type="file"
                                    id="description"
                                    className="form-control"
                                    name="image"
                                    multiple
                                    onChange={(e) => handleImageChange(e, 0)}
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                  {img && img.map((e) => {
                                    return (
                                      <div>
                                        <img
                                          src={config.Image_URL + e.img} height="100px"
                                          width="100px" />

                                        <Link><i className="fa fa-window-close" aria-hidden="true" onClick={((value) => {
                                          console.log(e.id);

                                          Deleteprojectimg(e.id);
                                        })}></i></Link>
                                      </div>
                                    )
                                  })}
                                </div>
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="logo">Floor Plan </label>
                                  <input
                                    type="file"
                                    id="description"
                                    className="form-control"
                                    name="image"

                                    onChange={(e) => handlefloorImgChange(e, 1)}
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>

                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="logo">Rooms Gallery </label>
                                  <input
                                    type="file"
                                    id="description"
                                    className="form-control"
                                    name="image"

                                  // value={img}
                                  // onChange={(e)=>{
                                  //   console.log(e.target.value);
                                  //   setimg(e.target.value);
                                  // }}  
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="logo">Location Map </label>
                                  <input
                                    type="file"
                                    id="description"
                                    className="form-control"
                                    name="image"

                                  // value={img}
                                  // onChange={(e)=>{
                                  //   console.log(e.target.value);
                                  //   setimg(e.target.value);
                                  // }}  
                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-actions">
                            <button
                              type="submit"
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
          </div>
        </div>
      </div >

      <AdminFooter />
    </div >
  );
}
