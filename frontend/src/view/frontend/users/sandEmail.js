import React, { useState } from 'react'
import axios from 'axios';
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    const [username, setusername] = useState("")
    const api = config.API_URL + "auth/forget/password"
    const navigate = useNavigate()
    var message;

    const sandemail = async (event) => {
        event.preventDefault();
        const body = {
            email: username
        }
        await axios
            .post(api, body)
            .then(async (res) => {
                console.log(res);
                const { data, statusCode } = res.data;
                
                if (statusCode === '200') {
                    
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    navigate("/users/login", { replace: true })
                    const msg = "Reset link for Change Password has been successfully sent to your email"
                    localStorage.setItem("staticAdded", msg);
                }
            })
            .catch((err) => {
                navigate("/users/forget", { replace: true })
                const message = err.response.data.message
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    transition: Zoom,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            });
    }
    
    return (
        <div>
            <Header />
            <ToastContainer />

            <div className="forget_main">
                <div className="forget_box">
                    <h3>
                        FORGOT PASSWORD
                    </h3>
                    <div className="bor_box">
                        <h6>
                            Can't sign in? Forgot Password?
                        </h6>
                        <p>
                            Enter your email address below and we'll send you password on your mail
                            Enter Your Email ID
                        </p>
                        <form className="row g-3" onSubmit={sandemail}>
                            <div className="col-md-12 mt-0 mb-3">
                                <input type="email" className="form-control" placeholder="Email" required value={username}
                                    onChange={(e) => {
                                        setusername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-12 mt-0 mb-3">
                                <button className="forgetmodel_but" href="#">submit</button>
                            </div>
                        </form>
                        <p className="note">note
                            <span>If you don't get an email from us within a few minutes please be sure to check your spam
                                filter.
                                The email will be coming from contact@propertybull.com </span>
                        </p>

                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
