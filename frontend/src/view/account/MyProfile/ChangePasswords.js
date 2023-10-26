import axios from "axios";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import config from "../../../config/config";
import AdminFooter from "../../../element/adminFooter";
import AdminHeader from "../../../element/adminHeader";
import { ToastContainer, toast, Zoom } from 'react-toastify';


export default function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  console.log(id);
  const [password,setPassword]=useState("")
  const [newpassword,setnewPassword]=useState("")
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  
  var message;
  const forgetpassword = async (event) => {
    event.preventDefault();
    const body = {
      password:password
    }
    if (password==newpassword) {

    const apiUrl = config.API_URL + 'auth/changepassword/'+id;
    await axios.put(apiUrl, body,options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/users/current', { replace: true });
        console.log("=>>", res);
      }).catch((err) => console.log(err,"s"));
  }else{
    
      toast.error(message="password invalid", {
        position: "top-right",
        autoClose: 1000,
        type: "error",
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
    
  }
}
  return (       
    <div>
      <AdminHeader />
    
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
          <ToastContainer />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                       onSubmit={forgetpassword}
                        className="form-horizontal needs-validation"
                        
                      >
                        <div className="form-body">
                          <h2 className="form-section">CHANGE PASSWORD</h2>
                        </div>

                        <div className="form-body">
                          <div className="form-group">
                            <label htmlFor="companyName">New Password</label>
                            <input
                            minLength="6" 
                            maxLength="15" 
                              type="password"
                              id="companyName"
                              className="form-control"
                              placeholder="New password"
                              name="title"
                              required
                              value={newpassword}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setnewPassword(e.target.value);
                              }}
                            />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">
                              Please fill out this field.
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Confirm Password </label>
                            <input
                              type="password"
                              id="companyName"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="title"
                              minLength="6" 
                                         maxLength="15" 
                              required
                              value={password}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setPassword(e.target.value);
                              }}
                            />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">
                              Please fill out this field.
                            </div>
                          </div>
                        </div>
                        <div className="form-actions">
                          <button
                            type="submit"
                            onClick={"spinner()"}
                            className="btn btn-primary"
                          >
                            <i className=""></i> Submit
                          </button>
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
