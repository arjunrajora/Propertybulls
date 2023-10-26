import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import config from "../../../config/config";
import Moment from "react-moment";



export default function AddedProperty() {

    const { id } = useParams()
    console.log(">>", id);
    const [detail, setDetail] = useState([]);

    var options = {
        headers: {
            'Authorization': localStorage.getItem('accessToken')
        }
    }
    useEffect(() => {
        const apI = config.API_URL + "customer/" + id;
        fetch(apI, options)
            .then((response) => response.json())
            .then((value) => {
                console.log(value.data.Properties, ">>>>");
                setDetail(value.data.Properties);
            });
    }, [])
    let locationName, ResponseCount, PropertyTypeName, PropertyRoom, PropertyBath, PropertyFloor, PropertyFace;



    return (
        <div>
            <AdminHeader />
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="heading-elements">
                    </div>
                    <div className="content-body card p-2">
                        <div className="row">
                            <div className="col-12">


                                <div>
                                    <div className="card-header p-0">

                                        <h4 className="card-title">ALL DETAILS </h4>


                                        <a className="heading-elements-toggle">
                                            <i className="la la-ellipsis-v font-medium-3"></i>
                                        </a>
                                        <div className="heading-elements">
                                            <ul className="list-inline mb-0">
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card-content collapse show">
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover">
                                                <thead className="thead-default table-dark">
                                                    <tr>
                                                        <th scope="col">S.No</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Address</th>
                                                        <th scope="col">Features</th>
                                                        <th scope="col">Area</th>
                                                        <th scope="col">Total Price</th>
                                                        <th scope="col">Descriptive</th>
                                                        <th scope="col">Response</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {detail.map((value, index) => {
                                                        if (value.Responses != null) {
                                                            ResponseCount = value.Responses.length
                                                        }
                                                        else {
                                                            ResponseCount = "0"
                                                        } if (value.propertyType != null) {
                                                            PropertyTypeName = value.propertyType.name;
                                                        } else {
                                                            PropertyTypeName = "---"
                                                        } if (value.room != null) {
                                                            PropertyRoom = value.room;
                                                        } else {
                                                            PropertyRoom = "---"
                                                        } if (value.bath != null) {
                                                            PropertyBath = value.bath;
                                                        } else {
                                                            PropertyBath = "---"
                                                        } if (value.floor != null) {
                                                            PropertyFloor = value.floor;
                                                        } else {
                                                            PropertyFloor = "---"
                                                        } if (value.Facing != null) {
                                                            PropertyFace = value.Facing.name;
                                                        } else {
                                                            PropertyFace = "---"
                                                        }
                                                        return (
                                                            <tr>
                                                                {/* <td scope="col">S.No</td> */}
                                                                <td>{index + 1}</td>
                                                                <td scope="col">ID:{value.id}<br />{value.name}<br />{PropertyTypeName}<br />{<Moment format="DD-MM-YYYY">
                                                                    {value.createdAt}
                                                                </Moment>}</td>
                                                                <td scope="col">{value.address}<br />Jaipur<br />Rajasthan</td>
                                                                <td scope="col">Face:{PropertyFace}<br />Option:{value.option}<br />Room:{PropertyRoom}<br />Bath:{PropertyBath}<br />Floor:{PropertyFloor}</td>
                                                                <td scope="col">Area:{value.area}Sq Ft</td>
                                                                <td>{(value.tot_price / 100000).toFixed(1) + ' Lacs'}</td>

                                                                <td scope="col">Show Map</td>
                                                                <td scope="col">Total Response:({ResponseCount})</td>

                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


















            <AdminFooter />
        </div>
    );
}
