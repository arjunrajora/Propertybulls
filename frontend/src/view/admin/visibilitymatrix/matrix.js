import React, { useState, useEffect } from 'react';
import AdminHeader from '../../../element/adminHeader';
import AdminFooter from '../../../element/adminFooter';
import config from "../../../config/config";
import axios from "axios";
import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
function Advertisement() {
  const [formData, setFormData] = useState([{}]);
  const [profilepack_id, setprofilepack_id] = useState([]);
  const [customer_id, setcustomer_id] = useState([]);
  const [visibilitymatrix, setvisibilitymatrix] = useState([]);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [openAlert, setOpenAlert] = useState(false);
  const [staticAdded, setStaticAdded] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = config.API_URL + "subscription/viewAll";
  const visibilitymatrixUrl = config.API_URL + "visibilitymatrix/viewAll";
  const roles = [{ "id": "2", "name": 'Owner' }, { "id": "3", "name": 'Agent' }, { "id": "4", "name": 'Builder' }];
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const [subscription, setSubscription] = useState([]);
  useEffect(() => {
    if (StaticMessage != null && StaticMessage !== "") {
      setOpenAlert(true);
      setStaticAdded(StaticMessage);
      setTimeout(() => {
        localStorage.setItem("staticAdded", "");
        setOpenAlert(false);
      }, 3000);
    } else {
      setOpenAlert(false);
      setStaticAdded("");
    }
  }, [StaticMessage]);
  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setSubscription(value.data);
      });
    fetch(visibilitymatrixUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setvisibilitymatrix(value.data);
        const initialFormData = {};
        value.data.forEach((item) => {
          const inputName = `${item.role_id}-${item.profilepack_id}`;
          initialFormData[inputName] = item.ordernumber.toString();
          setFormData(initialFormData)
        });


      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataArray = []
    const orderNumbers = new Set(); // Use a Set to store unique order numbers

    for (const key in formData) {
      const [roleId, packageId] = key.split('-');
      const ordernumber = formData[key];
      const dataObject = {
        role_id: roleId,
        package_id: packageId,
        ordernumber: ordernumber,
      };

      dataArray.push(dataObject);
      if (orderNumbers.has(ordernumber)) {
        alert('Duplicate number not allwed');
        return;
      }
      orderNumbers.add(ordernumber);
    }
   
    const apiUrl = config.API_URL + "visibilitymatrix/add";
    console.log(dataArray, "dataArray");
      await axios.post(apiUrl, dataArray, options)
      .then((res) => {
        console.log("🚀 ~ file: visibilitymatrix.js:80 ~ .then ~ res:", res.data.message)
        localStorage.setItem("staticAdded", res.data.message);
        
      })
      fetch(visibilitymatrixUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setvisibilitymatrix(value.data);
        const initialFormData = {};
        value.data.forEach((item) => {
          const inputName = `${item.role_id}-${item.profilepack_id}`;
          initialFormData[inputName] = item.ordernumber.toString();
          setFormData(initialFormData)
        });


      })
      .catch((err) => {console.log(err) })
  };
  const uniquePackages = [...new Set(subscription.map((e) => e.package_name))];
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const [roleId, packageId] = name.split('-');
  //   const selectedItem = subscription.find((value) => value.role_id === roleId && value.package_name === packageId);
  //   setprofilepack_id((prevArray) => [...prevArray, selectedItem ? selectedItem.id : ""]);
  //   console.log({ roleId, packageId, [selectedItem ? selectedItem.id : ""]: value });
  //   const updatedValue = value === "" ? "" : value;
  //   setFormData({ ...formData, [name]: updatedValue });
  //   setcustomer_id((prevArray) => [...prevArray, selectedItem ? selectedItem.role_id : ""]);
  // };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the entered value is a valid integer
    if (/^[0-9]*$/.test(value)) {
      const [roleId, packageId] = name.split('-');
    const selectedItem = subscription.find((value) => value.role_id === roleId && value.package_name === packageId);
    setprofilepack_id((prevArray) => [...prevArray, selectedItem ? selectedItem.id : ""]);
    console.log({ roleId, packageId, [selectedItem ? selectedItem.id : ""]: value });
    const updatedValue = value === "" ? "" : value;
    setFormData({ ...formData, [name]: updatedValue });
    setcustomer_id((prevArray) => [...prevArray, selectedItem ? selectedItem.role_id : ""]);
    } else {
 
      alert(" Please enter an integer value.");
    }
  };
  


  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
          {staticAdded != null && openAlert === true && (
                  <Collapse in={openAlert}>
                    <Alert aria-hidden={true} severity="success">
                      {staticAdded}
                    </Alert>
                  </Collapse>
                )}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header p-0">
                    <h4 className="card-title">Visibility Matrix</h4>
                    <br />
                  </div>

                  <div className="card-content collapse show">
                    <form onSubmit={handleSubmit}>
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">Profile package -{">"}</th>
                            {uniquePackages.map((packageInfo, index) => (
                              <th key={index} className="">
                                {packageInfo}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {roles.map((roleName) => (
                            <tr key={roleName.id}>
                              <th>{roleName.name}</th>
                              {uniquePackages.map((packageName) => {
                                const packageItem = subscription.find((item) => item.package_name === packageName);
                                const inputName = `${roleName.id}-${packageItem ? packageItem.id : ''}`;

                                return (
                                  <td key={`${roleName.id}-${packageName}`}>
                                    <input
                                      type="text"
                                      name={inputName}
                                      value={formData[inputName] || ''}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}

                        </tbody>
                      </table>
                      <div className="form-actions text-center mt-2">
                        <button type="submit" className="btn btn-primary pull-right">
                          <i className="la la-check-square-o"></i> Submit
                        </button>
                      </div>
                    </form>
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

export default Advertisement;
