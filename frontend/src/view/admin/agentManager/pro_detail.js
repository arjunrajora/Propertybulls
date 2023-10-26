import React, { useState, useEffect } from "react";
import {Link, useParams } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import axios from "axios";

import Moment from "react-moment";

import { CSVLink } from "react-csv";
export default function Agent() {
  const{id}=useParams()
console.log(">>",id);
  const [detail, setDetail] = useState([]);

  var options = {  
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  useEffect(() => {
    const apI = config.API_URL + "agent//Property/"+id;
    fetch(apI,options)
      .then((response) => response.json())
      .then((value) => {
        console.log(value.data.properties,">>>>");
        setDetail(value.data.properties  );
      });
  },[])
  let locationName;
  let propertytypename
  let facingName;
  let response;
  return (
      <div>
         <AdminHeader />
        
         <div className="app-content content">
           <div className="content-wrapper">
           <div className="heading-elements">
                         <ul className="list-inline mb-0 d-flex align-items-center">
                           <li>
                             <Link
                               to="/admin/dashboard"
                               type="button"
                               className="btn btn-min-width btn-glow customerAddBtn send-btn sendMessageButton"
                             >
                                <span>Dashboard</span>
                             </Link>
                           </li>
                         </ul>
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
                               <th scope="col">	Area</th>
                               <th scope="col">	Total Price</th>
                               <th scope="col">	Descriptive</th>
                               <th scope="col">	Response</th>
                             </tr>
                           </thead>
   
                           <tbody>
                            {detail.map((value,index)=>{
                                if(value.Location !=null ){
                                    locationName= value.Location.name
                                }else{
                                    locationName="---"
                                }
                                 if(value.propertyType !=null){
                                    propertytypename= value.propertyType.name
                                 }
                                 else{
                                    propertytypename="--"
                                 }

                                 if(value.Facing!=null){
                                    facingName= value.Facing.name

                                 }
                                 else{
                                    facingName="--"
                                 }
                            if(value.Responses!=null){
                              response=value.Responses.length
                            }
                           else{
                            response="0"
                           }





                                return(
                                    
                             <tr>
                               <td >{index+1}</td>
                               <td>ID:{value.id}<br/>
                               {propertytypename}<br/>
                               {value.name}<br/>
                                    {" "}
                                    <Moment format="DD-MM-YYYY">
                                      {value.createdAt}
                                    </Moment>
                               </td>
                               <td >{locationName}<br/>
                               {value.address2}<br/>
                               Jaipur<br/>
                               Rajasthan
                               </td>
                               <td>Face:{facingName}<br/>
                               Option:{value.option    }<br/>
                               Rooms:{value.room}<br/>
                               Bath:{value.bath}<br/>
                               Floor:{value.floor}<br/>
                               </td> 
                                  <td >{value.area_in_sqft}-Sq Ft</td>
                               <td>   {(value.tot_price / 100000).toFixed(1) + ' Lacs'}</td>
                               <td >	Show Map</td>
                               <td>Total Response: ({response})</td>
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
