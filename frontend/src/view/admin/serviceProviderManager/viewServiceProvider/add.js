import { useState, useEffect } from "react";
import config from "../../../../config/config";
import axios from "axios";

import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";

import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";



const locationUrl = config.API_URL + "location/viewAll"
const CityUrl = config.API_URL + "location/viewCity";
const StateUrl = config.API_URL + "city/viewState";

export default function ServiceProviderAdd() {

  const navigate = useNavigate();
  const [state, setState] = useState([]);

  // const [lineData, setLineData] = useState("");

  const [name, setName] = useState("");
  const [location, setlocation] = useState([]);
  const [city, setCity] = useState([]);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [company_url, setCompany_url] = useState("");
  const [company_logo, setCompany_logo] = useState("");
  // const[image,setImage] = useState("");
  const [start, setStart] = useState("");
  const [per_name, setPer_name] = useState("");
  const [landline, setLandline] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city_id, setCity_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [location_id, setLocation_id] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);
  };

  const AddViewServiceProvider = async (event) => {
    event.preventDefault();
    const body = {
      name: name,

      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      category: category,
      email: email,
      company_name: company_name,
      company_url: company_url,
      company_logo: company_logo,
      //  image:image,
      start: start,
      per_name: per_name,
      landline: landline,
      mobile: mobile,
      address: address,
      city_id: city_id,
      state_id: state_id,
      location_id: location_id,
    };
    console.log(body);
    const url = config.API_URL + "serviceProvider/add";
    await axios
      .post(url, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);

        navigate("/admin/serviceProvider", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };
  useEffect(() => {
    fetch(locationUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setlocation(value.data);
      });
    fetch(CityUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setCity(value.data);
      });

    fetch(StateUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setState(value.data);
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
                        onSubmit={AddViewServiceProvider}
                      // className="form-horizontal needs-validation"
                      // noValidate
                      // encType="multipart/form-data"
                      >
                        <div className="form-body">
                          <h2 className="form-section">CONSULTANT</h2>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="category">
                                  Consultant Category
                                </label>
                                <select name="category" className="form-control"
                                  value={category}
                                  onChange={(e) => {
                                    console.log(e.target.value);

                                    setCategory(e.target.value);
                                  }} required>
                                  <option value="">
                                    Select Category--
                                  </option>
                                  <option value="Nine Degree Space Consultancy">Nine Degree Space Consultancy</option>
                                  <option value="Home Loan">Home Loan</option>
                                  <option value="ideas Shekhawat & Associates  Architects  Pvt. Ltd.">ideas Shekhawat & Associates  Architects  Pvt. Ltd.</option>
                                  <option value="Architects">Architects</option>

                                </select>


                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control"
                                  name="email"
                                  required
                                  value={email}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setEmail(e.target.value);
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
                            <h2 className="form-section">COMPANY DETAIL'S</h2>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Name</label>
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

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="company_name">Company Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="company_name"
                                  required
                                  value={company_name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCompany_name(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="company_url">Company Url</label>
                                <input
                                  type="text"
                                  id="company_url"
                                  className="form-control"
                                  name="company_url"
                                  required
                                  value={company_url}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCompany_url(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="image">Company Logo</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  required
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCompany_logo(e.target.files[0])
                                  }}

                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>





                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Start From</label>
                                <div className="input select">
                                  <select name="start" className="form-control"
                                    value={start}
                                    onChange={(e) => {
                                      console.log(e.target.value);

                                      setStart(e.target.value);
                                    }}>
                                    <option value="">
                                      Select From--
                                    </option>
                                    <option value="1950">1950</option>
                                    <option value="1951">1951</option>
                                    <option value="1952">1952</option>
                                    <option value="1953">1953</option>
                                    <option value="1954">1954</option>
                                    <option value="1955">1955</option>
                                    <option value="1956">1956</option>
                                    <option value="1957">1957</option>
                                    <option value="1958">1958</option>
                                    <option value="1959">1959</option>
                                    <option value="1960">1960</option>
                                    <option value="1961">1961</option>
                                    <option value="1962">1962</option>
                                    <option value="1963">1963</option>
                                    <option value="1964">1964</option>
                                    <option value="1965">1965</option>
                                    <option value="1966">1966</option>
                                    <option value="1967">1967</option>
                                    <option value="1968">1968</option>
                                    <option value="1969">1969</option>
                                    <option value="1970">1970</option>
                                    <option value="1971">1971</option>
                                    <option value="1972">1972</option>
                                    <option value="1973">1973</option>
                                    <option value="1974">1974</option>
                                    <option value="1975">1975</option>
                                    <option value="1976">1976</option>
                                    <option value="1977">1977</option>
                                    <option value="1978">1978</option>
                                    <option value="1979">1979</option>
                                    <option value="1980">1980</option>
                                    <option value="1981">1981</option>
                                    <option value="1982">1982</option>
                                    <option value="1983">1983</option>
                                    <option value="1984">1984</option>
                                    <option value="1985">1985</option>
                                    <option value="1986">1986</option>
                                    <option value="1987">1987</option>
                                    <option value="1988">1988</option>
                                    <option value="1989">1989</option>
                                    <option value="1990">1990</option>
                                    <option value="1991">1991</option>
                                    <option value="1992">1992</option>
                                    <option value="1993">1993</option>
                                    <option value="1994">1994</option>
                                    <option value="1995">1995</option>
                                    <option value="1996">1996</option>
                                    <option value="1997">1997</option>
                                    <option value="1998">1998</option>
                                    <option value="1999">1999</option>
                                    <option value="2000">2000</option>
                                    <option value="2001">2001</option>
                                    <option value="2002">2002</option>
                                    <option value="2003">2003</option>
                                    <option value="2004">2004</option>
                                    <option value="2005">2005</option>
                                    <option value="2006">2006</option>
                                    <option value="2007">2007</option>
                                    <option value="2008">2008</option>
                                    <option value="2009">2009</option>
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>





                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="per_name">Contact Person Name</label>
                                <input
                                  type="text"
                                  id="per_name"
                                  className="form-control"
                                  name="per_name"
                                  required
                                  value={per_name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPer_name(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="landline">Phone No</label>
                                <input
                                  type="text"
                                  id="landline"
                                  className="form-control"
                                  name="landline"
                                  maxLength="10"
                                  required
                                  value={landline}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLandline(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Mobile No</label>
                                <input
                                  type="text"
                                  id="mobile"
                                  className="form-control"
                                  name="mobile"
                                  maxLength="10"
                                  required
                                  value={mobile}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMobile(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="address">Address</label>
                                <input
                                  className="form-control"
                                  id="floatingTextarea"
                                  required
                                  value={address}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAddress(e.target.value);
                                  }}
                                ></input>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>



                              <div className="col-sm-6 col-md-4 col-5">
                                <label>State*</label>
                                <div className="input select">
                                  <select name="state_id" className="form-control"
                                    value={state_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setState_id(e.target.value);
                                    }} required>
                                    <option value="">--Select State--</option>

                                    {state.map((value) => {
                                      return (
                                        <option key={value.id} value={value.id}>
                                          {value.name}
                                        </option>
                                      );
                                    })}



                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label>City*</label>
                                <div className="input select">
                                  <select name="city_id" className="form-control"
                                    value={city_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setCity_id(e.target.value);
                                    }} required>
                                    <option value="">--Select City--</option>
                                    {city.map((value) => {
                                      return (
                                        <option key={value.id} value={value.id}>
                                          {value.name}
                                        </option>
                                      );
                                    })}


                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label>Location</label>
                                <div className="input select">
                                  <select
                                    name="location_id"
                                    className="form-control"
                                    value={location_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setLocation_id(e.target.value);
                                    }} required
                                  >
                                    <option value="">--Select Locality--</option>
                                    {location.map((value) => {
                                      return <option key={value.id} value={value.id}>{value.name}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>



                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="logo">Consultant's Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="description">*Detail Description:[About Your Business]</label>
                                  <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={updateTextDescription}
                                    wrapperStyle={{
                                      width: 1400,
                                      border: "1px solid black",
                                    }}
                                  />
                                </div>

                              </div>







                            </div>
                          </div>
                          <div className="form-actions">
                            <button
                              type="submit"

                              // onClick={AddViewServiceProvider}
                              className="btn btn-primary pull-right d-flex align-items-center sub-btn"
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
