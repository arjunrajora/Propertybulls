import React, { useEffect, useState } from "react";

import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config"
import { Link } from "react-router-dom";

export default function Addproperty() {
    const [locations, setLocations] = useState([])
    const [city, setCity] = useState([])
    const [State, setState] = useState([])
    const Locationview = config.API_URL + "clint/location/viewAll"
    const stateview = config.API_URL + "clint/state/viewAll"
    const cityview = config.API_URL + "clint/city/viewAll"
    var state;
    let citys;
    useEffect(() => {
        fetch(stateview)
            .then((response) => response.json())
            .then((value) => {
                setState(value.data);
            });
        fetch(cityview)
            .then((response) => response.json())
            .then((value) => {
                setCity(value.data);
            });
        fetch(Locationview)
            .then((response) => response.json())
            .then((value) => {
                setLocations(value.data);
            });
    }, [fetch]);


    return (
        <div>
            <Header />
            <div className="addProperty">
                <div className="innerPageHeading">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Add New Property</h5>
                            <Link to="/dashboard" className="themeButton"><i className="fa-sharp fa-solid fa-reply"></i> Back to Dashboard</Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="addPropertyForm">
                        <form className="row g-3">
                            <div className="col-md-12 radioBtn">
                                <label className="form-label d-block">Do You Want To</label>
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-success" htmlFor="btnradio1">Sale</label>
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                                <label className="btn btn-outline-success" htmlFor="btnradio2">Rent</label>
                            </div>
                            <div className="col-md-12 radioBtn">
                                <label className="form-label d-block">Property Category</label>
                                <input type="radio" className="btn-check" name="btnradio2" id="btnradio3" autoComplete="off"
                                    defaultChecked />
                                <label className="btn btn-outline-success" htmlFor="btnradio3">Residential</label>
                                <input type="radio" className="btn-check" name="btnradio2" id="btnradio4" autoComplete="off" />
                                <label className="btn btn-outline-success" htmlFor="btnradio4">Commercial</label>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label  d-block">Type</label>
                                <select className="form-select">
                                    <option value="">--Select Type--</option>
                                    <option value="319">Residential Plot</option>
                                    <option value="320">Residential House</option>
                                    <option value="321">Residential Flat</option>
                                    <option value="322">Builder Floor Apartment</option>
                                    <option value="324">Commercial Land</option>
                                    <option value="325">Commercial Office Space</option>
                                    <option value="326">Commercial Shop</option>
                                    <option value="327">Commercial Showroom</option>
                                    <option value="342">Residential Villa / Duplex</option>
                                    <option value="352">Industrial Plot</option>
                                    <option value="356">Commercial Warehouse</option>
                                    <option value="357">Affordable Housing Project</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label d-block">State</label>
                                <select className="form-select">
                                    <option value="">Select State</option>
                                    {State.map((value) => {
                                        if (value.id == 99 && value.status == 'Y') {
                                            state = value.name
                                        }
                                        else {
                                            return null
                                        }
                                        return (
                                            <option value={value.id} key={value.id}>{state}</option>

                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label d-block">City</label>
                                <select className="form-select">
                                    <option value="">Select City</option>
                                    {city.map((value) => {
                                        if (value.id == 27 && value.status == 'Y') {
                                            citys = value.name
                                        }
                                        else {
                                            return null
                                        }
                                        return <option key={value.id} value={value.id}>{citys}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label d-block">City</label>
                                <select className="form-select">
                                    <option value="">Select Locality</option>
                                    {locations.map((value) => {
                                        return (
                                            <option value={value.id} key={value.id}>{value.name}</option>

                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="themeButton">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
} 