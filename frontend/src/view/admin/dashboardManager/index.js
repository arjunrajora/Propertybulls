import React,{useState,useEffect} from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

import { Chart } from "react-google-charts";
import Builder from "../builderManager";
const config = require("../../../config/config");

export const data = [
  ["Task", "Hours per Day"],
  ["Agent", 400],
  ["Builder", 300],
  ["Customer", 650],
];

var options = {
  headers: {
    Authorization: localStorage.getItem("accessToken"),
  },
};
// 

export const lineData = [
  ["Months", "Buy", "Rent"],
  ["Jan", 98, 120],
  ["Feb", 55, 46],
  ["Mar", 66, 112],
  ["Apr", 30, 54],
  ["May", 10, 40],
  ["Jun", 38, 68],
  ["Jul", 66, 95],
  ["Aug", 92, 75],
  ["Sep", 50, 110],
  ["Oct", 55, 87],
  ["Nov", 68, 61],
  ["Dec", 78, 58],
];

export const lineOptions = {
  // title: "Company Overview",
  curveType: "function",
  legend: { position: "bottom" },
};



const viewAllbuilder = config.API_URL + "builder/viewAll";
const ViewAllcustomer = config.API_URL + "customer/viewAll";
const viewAllProperty = config.API_URL + "property/viewAll"

export default function Dashboard() {
  const [builder, setBuilder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [property, setProperty] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch(viewAllbuilder, options)
  //     .then((response) => response.json())
  //     .then((value) => {
  //       setBuilder(value.data);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1000);
  //     });
  //     fetch(ViewAllcustomer, options)
  //     .then((response) => response.json())
  //     .then((value) => {
  //       setCustomer(value.data);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1000);
  //     });
  //     fetch(viewAllProperty,options)
  //     .then((response) => response.json())
  //     .then((value) => {
  //       console.log(value.data);
  //       setProperty(value.data);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1000);
  //     });
  // }, []);
  
  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="dashboardContainer">
              {/* <div className="adminTitleBar">
                <h2>Dashboard</h2>
                <p>Welcome to Property Bull</p>
              </div> */}

              <div className="infoTilesContainer">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="infoTile green">
                      <div className="tileLeft">
                        <h4>212</h4>
                        {/* <h4>{property.length}</h4> */}
                        <p>Properties for Sale</p>
                      </div>
                      <div className="tileRight">
                        <img
                          src={config.SITE_URL + "theme-assets/images/ic_property_sale.png"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="infoTile orange">
                      <div className="tileLeft">
                        <h4>3432</h4> 
                        {/* <h4>{property.length}</h4>  */}
                        <p>Properties for Rent</p>
                      </div>
                      <div className="tileRight">
                        <img
                          src={config.SITE_URL + "theme-assets/images/ic_property_rent.png"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="infoTile blue">
                      <div className="tileLeft">
                        {/* <h4>{customer.length}</h4> */}
                        <h4>223</h4>
                        <p>Total Customer</p>
                      </div>
                      <div className="tileRight">
                        <img
                          src={config.SITE_URL + "theme-assets/images/ic_customer.png"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="infoTile purple">
                      <div className="tileLeft">
                        <h4>556</h4>
                        {/* <h4>{builder.length}</h4> */}
                        <p>Total Builders</p>
                      </div>
                      <div className="tileRight">
                        <img
                          src={config.SITE_URL + "theme-assets/images/ic_builder.png"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="graphContainer">
                <div className="row">
                  <div className="col-md-8">
                    <div className="chartTile">
                      <h3>Company Overview</h3>
                      <Chart
                        chartType="LineChart"
                        width={"110%"}
                        height={"400px"}
                        data={lineData}
                        options={lineOptions}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="chartTile">
                      <h3>Daily Activities</h3>
                      <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"110%"}
                        height={"400px"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="adminTableContainer">
                <h3>Recent 5 Customer</h3>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Locality</th>
                      <th>Phone No.</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Ajay Jangid</td>
                      <td>18 Fev 2023</td>
                      <td>Vidhyadhar Nagar</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>Ajay Jangid</td>
                      <td>18 Fev 2023</td>
                      <td>Vidhyadhar Nagar</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>Ajay Jangid</td>
                      <td>18 Fev 2023</td>
                      <td>Vidhyadhar Nagar</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>Ajay Jangid</td>
                      <td>18 Fev 2023</td>
                      <td>Vidhyadhar Nagar</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>05</td>
                      <td>Ajay Jangid</td>
                      <td>18 Fev 2023</td>
                      <td>Vidhyadhar Nagar</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="adminTableContainer">
                <h3>Top 5 Properties</h3>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Property Name</th>
                      <th>Owner Name</th>
                      <th>Property Type</th>
                      <th>Locality</th>
                      <th>Added Date</th>
                      <th>Phone No.</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>98AB Alexander Court, London</td>
                      <td>Ajay Jangid</td>
                      <td>Residential</td>
                      <td>London</td>
                      <td>18 Feb 2023</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>98AB Alexander Court, London</td>
                      <td>Ajay Jangid</td>
                      <td>Residential</td>
                      <td>London</td>
                      <td>18 Feb 2023</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>98AB Alexander Court, London</td>
                      <td>Ajay Jangid</td>
                      <td>Residential</td>
                      <td>London</td>
                      <td>18 Feb 2023</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>98AB Alexander Court, London</td>
                      <td>Ajay Jangid</td>
                      <td>Residential</td>
                      <td>London</td>
                      <td>18 Feb 2023</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>05</td>
                      <td>98AB Alexander Court, London</td>
                      <td>Ajay Jangid</td>
                      <td>Residential</td>
                      <td>London</td>
                      <td>18 Feb 2023</td>
                      <td>9876543210</td>
                      <td>
                        <ul className="list-unstyled d-flex align-items-center ">
                          <li className="me-1">
                            <a href="#" className="trashIcon">
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </li>
                          <li className="me-1">
                            <a href="#" className="penIcon">
                              <i className="fas fa-pen"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
