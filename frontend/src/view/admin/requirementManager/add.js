import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const Location = config.API_URL + "location/viewAll";
const CustomerView = config.API_URL + "customer/viewAll";


export default function RequirementAdd() {

  const navigate = useNavigate();
  const [requirement, setRequirement] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  // const [lineData, setLineData] = useState("");
  const [customer, setCustomer] = useState([]);
  const [location, setLocation] = useState([]);

  const [category, setCategory] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [state_id, setState_id] = useState("99");
  const [city_id, setCity_id] = useState("27");
  const [location_id, setLocation_id] = useState("");
  const [cus_id, setCus_id] = useState("");
  const [min_budget, setMin_budget] = useState("");
  const [max_budget, setMax_budget] = useState("");
  const [min_area, setMin_area] = useState("");
  const [max_area, setMax_area] = useState("");
  const [creater, setCreater] = useState("");
  const propertyTypes = config.API_URL + "clint/home/viewpropertytypes";
  const [PropertyType, setPropertyType] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const convertToHtml = (contentState) => {
    const raw = convertToRaw(contentState);
    const html = draftToHtml(raw);
    return html.replace(/<p><\/p>/g, '<p></p>');
  }

  const updateTextDescription = async (state) => {
    await setEditorState(state)
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = rawContentState.blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    console.log(html);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value)
    setCategory(e.target.value);
  };



  const handleCreaterChange = (e) => {
    console.log(e.target.value);
    setCreater(e.target.value);
  }



  const AddRequirement = async (event) => {
    event.preventDefault();
    const body = {
      category: category,
      p_typeid: p_typeid,
      state_id: state_id,
      city_id: city_id,
      location_id: location_id,
      cus_id: cus_id,
      min_budget: min_budget,
      max_budget: max_budget,
      min_area: min_area,
      max_area: max_area,
      creater: creater,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };
    console.log(body);
    const url = config.API_URL + "requirement/add";
    await axios
      .post(url, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);

        navigate("/admin/requirement", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    fetch(Location, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });


    fetch(CustomerView, options)
      .then((response) => response.json())
      .then((value) => {
        setCustomer(value.data);
      });

    fetch(propertyTypes, options)
      .then((response) => response.json())
      .then((value) => {
        setPropertyType(value.data);
      });



  }, [fetch]);



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

                        // action="/add"
                        // method="post"
                        // className="form-horizontal needs-validation"
                        // noValidate
                        // onSubmit={AddRequirement}
                        action="/addcompanyuser"
                        method="post"
                        className="form-horizontal needs-validation"
                        onSubmit={AddRequirement}
                      >
                        <div className="form-body">
                          {/* <h2 className="form-section">PROPERTY TYPE</h2> */}
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="category">Category*</label><br />
                                <input type="radio" name="category" value="Buy" checked={category === 'Buy'} onChange={handleCategoryChange} /> Buy
                                <input type="radio" name="category" value="Rent" checked={category === 'Rent'} onChange={handleCategoryChange} /> Rent
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                              </div>

                              <div className="col-sm-4 col-xs-6">
                                <label>Property Type</label>
                                <div className="input select">
                                  {/* <select name="p_typeid" className="form-control"
                                    value={p_typeid}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setP_typeid(e.target.value);
                                    }} required>
                                    <option value="">
                                      --Select project type--
                                    </option>
                                    <option value="319">Residential plot</option>
                                    <option value="320">Residential House</option>
                                    <option value="321">Residential Flat</option>
                                    <option value="322">Builder Floor Apartment</option>
                                    <option value="324">Commercial Land</option>
                                    <option value="325">Commercial office space</option>
                                    <option value="326">Commercial Shop</option>
                                    <option value="327">Commercial Showroom</option>
                                    <option value="342">Residential vila/Duplex</option>
                                    <option value="352">Indestrial Plot</option>
                                    <option value="356">Commercial Warehouse</option>
                                    <option value="357">Affordable Housing Project</option>
                                  </select> */}
                                  <select name="role_id" className="form-control"
                                    value={p_typeid}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setP_typeid(e.target.value);
                                    }} required
                                  >
                                    <option value="">--select Type--</option>
                                    {PropertyType.map((value) => {
                                      return <option key={value.id} value={value.id}> {value.name}</option>;

                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY ADDRESS</h2>
                          </div>
                          <div className="row">

                            <div className="col-sm-4 col-xs-6">
                              <label>State</label>
                              <div className="input select">
                                <select name="p_typeid" className="form-control"
                                  value={state_id}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setState_id(e.target.value);
                                  }}>

                                  <option value="99">Rajasthan</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>City</label>
                              <div className="input select">
                                <select name="p_typeid" className="form-control"
                                  value={city_id}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCity_id(e.target.value);
                                  }}>
                                  <option value="27">Jaipur</option>
                                  <option value="27">test</option>

                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Locality</label>
                              <div className="input select">
                                <select
                                  name="role_id"
                                  className="form-control"
                                  value={location_id}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLocation_id(e.target.value);
                                  }} required
                                >
                                  <option>Select Location</option>
                                  {location.map((value) => {
                                    return <option key={value.id} value={value.id}>{value.name}</option>;
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY DETAIL</h2>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-6">
                              <label>Customer</label>
                              <div className="input select">
                                <select
                                  name="role_id"
                                  className="form-control"
                                  value={cus_id}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCus_id(e.target.value);
                                  }}
                                >
                                  <option>Select Customer</option>
                                  {customer.map((value) => {
                                    return <option key={value.id} value={value.id}>{value.name}</option>;
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Min Budget</label>
                              <div className="input select">
                                <select name="min_budget" className="form-control"
                                  value={min_budget}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMin_budget(e.target.value);
                                  }}>
                                  <option value="">
                                    --Select Min--
                                  </option>
                                  <option value="1000000">10 Lacs</option>
                                  <option value="2000000">20 Lacs</option>
                                  <option value="3000000">30 Lacs</option>
                                  <option value="4000000">40 Lacs</option>
                                  <option value="5000000">50 Lacs</option>
                                  <option value="6000000">60 Lacs</option>
                                  <option value="7000000">70 Lacs</option>
                                  <option value="8000000">80 Lacs</option>
                                  <option value="9000000">90 Lacs</option>
                                  <option value="10000000">1  Crore</option>
                                  <option value="50000000">5  Crore</option>
                                  <option value="100000000">10  Crore</option>


                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Max Budget</label>
                              <div className="input select">
                                <select name="max_budget" className="form-control"
                                  value={max_budget}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMax_budget(e.target.value);
                                  }}>
                                  <option value="">
                                    --Select Min--
                                  </option>
                                  <option value="1000000">10 Lacs</option>
                                  <option value="2000000">20 Lacs</option>
                                  <option value="3000000">30 Lacs</option>
                                  <option value="4000000">40 Lacs</option>
                                  <option value="5000000">50 Lacs</option>
                                  <option value="6000000">60 Lacs</option>
                                  <option value="7000000">70 Lacs</option>
                                  <option value="8000000">80 Lacs</option>
                                  <option value="9000000">90 Lacs</option>
                                  <option value="10000000">1  Crore</option>
                                  <option value="50000000">5  Crore</option>
                                  <option value="100000000">10  Crore</option>


                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-1 col-md-4 col-5">
                                <label htmlFor="companyemail">Min Area</label>
                                <input
                                  type="text"
                                  id="companyemail"
                                  className="form-control email"
                                  name="useremail"
                                  required
                                  value={min_area}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMin_area(e.target.value);
                                  }}


                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <div
                                  className="emailalert"
                                  style={{ color: "red" }}
                                ></div>
                              </div>

                              <div className="col-sm-2 col-xs-6">
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                  >
                                    <option value="">-Unit-</option>
                                    <option value="">Sq-Ft</option>
                                    <option value="">Sq-Mtr</option>
                                    <option value="">Sq-yard</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-1 col-md-4 col-5">
                                  <label htmlFor="companyemail">Max Area</label>
                                  <input
                                    type="text"
                                    id="companyemail"
                                    className="form-control email"
                                    name="max+area"
                                    required
                                    value={max_area}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setMax_area(e.target.value);
                                    }}


                                  />
                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                  <div
                                    className="emailalert"
                                    style={{ color: "red" }}
                                  ></div>
                                </div>

                                <div className="col-sm-2 col-xs-6">
                                  <div className="input select">
                                    <select
                                      name="role_id"
                                      className="form-control"
                                    >
                                      <option value="">-Unit-</option>
                                      <option value="">Sq-Ft</option>
                                      <option value="">Sq-Mtr</option>
                                      <option value="">Sq-yard</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="row">

                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="description">Description</label>
                                  <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={updateTextDescription}
                                    wrapperStyle={{
                                      width: 1000,
                                      border: "1px solid black",
                                    }}

                                  />

                                  <div className="valid-feedback">Valid.</div>
                                  <div className="invalid-feedback">
                                    Please fill out this field.
                                  </div>
                                </div>

                              </div><br />



                              <label htmlFor="category">Property Added by*</label>
                              <input type="radio" name="category" value="Customer" checked={creater === 'Customer'} onChange={handleCreaterChange} /> Customer
                              <input type="radio" name="category" value="Builder" checked={creater === 'Builder'} onChange={handleCreaterChange} /> Builder
                              <input type="radio" name="category" value="Agent" checked={creater === 'Agent'} onChange={handleCreaterChange} /> Agent













                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"

                              className="btn btn-primary pull-right"
                            >
                              <i className=""></i> Submit
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
