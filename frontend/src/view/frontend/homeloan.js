import React, { useState, useEffect } from 'react'
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from "../../config/config"
import axios from "axios";
import ReactCaptcha from 'modern-react-captcha';
import captchImg from '../../captcha.jpg'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function HomeLoan() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [location, setLocation] = useState("")
  const [loan_type, setLoan_type] = useState("")
  const [user_type, setUser_type] = useState("0")
  const [dob, setDob] = useState("")
  const [gross_salary, setGross_salary] = useState("")
  const [monthly_salary, setMonthly_salary] = useState("")
  const [loantypes, setLoantypes] = useState([])
  const [captchaError, setCaptchaError] = useState('');
  const [captchavalue, setcaptchavalue] = useState("");

  const [captcha, setCaptcha] = useState("");
  const [user, setUser] = useState({
    username: ""
  });



  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const necaDate = new Date('2005-01-01'); // Assuming "NECA" date is January 1, 2005

    if (selectedDate.getFullYear() === 2005 && selectedDate.getTime() === necaDate.getTime()) {
      console.log('Selected date is January 1, 2005 (NECA date)!');
      // Perform actions for the selected date being January 1, 2005
    } else {
      console.log('Selected date is not January 1, 2005 (NECA date).');
      // Perform actions for other selected dates
    }

    setDob(e.target.value);
  };











  const typeloan = async () => {
    var res
    try {
      const url = config.API_URL + "clint/loan/viewloanType"
      res = await axios.get(url)
      console.log(res.data)
      return res.data

    } catch (error) {
      console.log(error.response.data)
      return error.response.data
    }
  }

  useEffect(() => {
    async function viewAll() {
      const res = await typeloan()
      setLoantypes(res.data);
    }
    viewAll()
    generateCaptcha()
  }, [])
  const handleChange = event => {
    console.log(event.target.value);
    setUser_type(event.target.value);
  };
  const HomeLoan = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      email: email,
      mobile: mobile,
      location: location,
      loan_type: loan_type,
      user_type: user_type,
      dob: dob,
      gross_salary: gross_salary,
      monthly_salary: monthly_salary,

    };
    if (captcha === captchavalue) {
      const addhomeloan = config.API_URL + "clint/loan/requrie";
      await axios .post(addhomeloan, body)
        .then((res) => {
       var    message="Thank you for show intrest. We will get back soon."
          toast.success(message, {
            autoClose: 3000,
            type: "success",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "custom-toast",
          });
          setName("")
          setDob("")
          setEmail("")
          setGross_salary("")
          setLoan_type("")
          setLocation("")
          setUser_type("")
          setMonthly_salary("")
          setMobile("")
          setUser("")
          setcaptchavalue("");

        })
        .catch((err) => {
      let    message="Thank you for all ready intrest. We will get back soon."
          toast.success(message, {
            autoClose: 3000,
            type: "success",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "custom-toast",
          });
          setName("")
          setDob("")
          setEmail("")
          setGross_salary("")
          setLoan_type("")
          setLocation("")
          setUser_type("")
          setMonthly_salary("")
          setMobile("")
          setUser("")
          setcaptchavalue("");
         });
      generateCaptcha();
    } else {
      
      setCaptchaError('Invalid captcha!!');
      setTimeout(() => {
        setCaptchaError(" ")
      }, 3000);
    }
  };
  const generateCaptcha = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captcha);
  };


  return (
    <div>
      <Header />
      <div className="home_loan_module">
        <h3>
          Register For Home Loan
        </h3>
        <ToastContainer />
        <form onSubmit={HomeLoan}>
          <div className="row loan_serchbar align-items-center">
            <div className="col-lg-4">
              <div className="lable_area">
                <label>You Are</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <div className="loan_redio">
                  <div className="form-check">
                    <input className="loan_radio_button" type="radio" name="gridRadios" id="gridRadios2"
                      value="0"
                      checked={user_type === '0'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Salaried
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="loan_radio_button" type="radio" name="gridRadios" id="gridRadios2"
                      value="1" checked={user_type ==='1'}
                      onChange={handleChange} />
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Self Employed
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lable_area">
                <label>Name</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <input type="text" className="loan_input" required value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="lable_area">
                <label>Mobile No.</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <input type="mobile" minLength="10" maxLength="10" className="loan_input" required value={mobile} onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                    if (regex.test(input)) {
                      setMobile(input);
                    } else {
                      alert('Please enter only 10 numeric characters!');
                    }
                  
                }} />
              </div>
            </div>


            <div className="col-lg-4">
              <div className="lable_area">
                <label>Email Id</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <input type="email" className="loan_input" required value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="lable_area">
                <label>Where Do You Live Currently?</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <input type="text" className="loan_input" required value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lable_area">
                <label>Types of Loan</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <select required value={loan_type} onChange={(e) => {
                  setLoan_type(e.target.value);
                }}>
                  <option value="">Types of Loan</option>
                  {loantypes.map((value) => {
                    return (
                      <option value={value.id} key={value.id} >{value.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lable_area">
                <label>Date of Birth</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
                <input type="date" className="loan_input" 
                        max="2005-12-31" // Set the minimum allowed date
                required value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }} />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="lable_area">
                <label>Gross Fixed Monthly Income</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
              <input type="text" class="loan_input" minLength="2" maxLength="10"
                 required value={gross_salary} onChange={(e) => {
                  setGross_salary(e.target.value);
                }} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lable_area">
                <label>Monthly Take Home Income</label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="fild_area">
              <input type="text" class="loan_input" minLength="2" maxLength="10"
                  required value={monthly_salary} onChange={(e) => {
                  setMonthly_salary(e.target.value);
                }} />
              </div>
            </div>
            <div className="loan_bottom_chack">
              <input className="loan_chack_box" type="checkbox" value="option2" required />
              <label className="form-check-label" htmlFor="gridRadios2">
                I accept The <Link to="/term-conditions">Terms and Conditions</Link>

              </label>

              
              <div>
                  <h4 style={{
                    color: '#000',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                      backgroundSize: 'cover',
                      padding: '0.2em 0.5em',
                      borderRadius: '0.3em',
                      margin: '0 0.2em',
                      userSelect: 'none' // Prevent text selection
                    }}
                      onCopy={(e) => e.preventDefault()} // Prevent default copy behavior

                    >
                      {captcha}
                    </span><br></br>
                    {captchaError || <div className="error">{captchaError}</div>}
                  </h4>
                </div>

              <input type="text" className="loan_input" placeholder="Enter Security Code" required value={captchavalue}
                onChange={(e) => {
                  setcaptchavalue(e.target.value)
                }}
              />
              <button
                type="submit"
                className="btn register_loan pull-right">
                Register
              </button>
            </div>
            <p><b>Disclaimer:</b>We are not providing any type of home loan. Here we are collecting information of
              the user and share
              it with our authorized loan provider for a better experience of the user. With consent of the user
              we share some general information with third parties service providers but not all information.
              Decision of the loan is the sole right of the loan provider.</p>
          </div>
        </form>
      </div>
      <Footer />
    </div>

  )
}
