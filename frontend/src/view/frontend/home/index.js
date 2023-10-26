import { React, useState, useEffect } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import { Link } from "react-router-dom";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../../../../src/config/config";
export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [captchavalue, setcaptchavalue] = useState("");

  const slideroptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };
  const projectGalleryoptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    margin: 0,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  };

  const options = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  };

  const [usernameError, setUsernameError] = useState('');
  const [success, setSuccess] = useState(false);
  const [slider, SetSlider] = useState([]);
  const [project, setProject] = useState([]);
  const [builder, setBuilder] = useState([]);
  const [article, setArticle] = useState([]);
  const [location, setLocation] = useState([]);
  const [propertytype, setPropertytype] = useState([]);
  const [projectgallery, setProjectgallery] = useState([]);
  const [advertisementsubscription, setadvertisementsubscription] = useState([]);
  const [f_name, setF_name] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [option, setOption] = useState("Sell");
  const [location_id, setLocation_id] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [room, setRoom] = useState("");
  const [tot_price, setTot_price] = useState("");
  const HomeData = config.API_URL + "clint/home/viewAlldata";
  const viewLocation = config.API_URL + "clint/home/viewLocation";
  const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"
  const [captchaError, setCaptchaError] = useState('');
  const [captcha, setCaptcha] = useState("");
  const generateCaptcha = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(captcha);
  };

  const AddEnquiry = async (event) => {
    event.preventDefault();
    if (phone.length < 10) {
      alert('Mobile number must be at least 10 digits');
      return;
    }
    const body = {
      f_name: f_name,
      email: email,
      message: message,
      phone: phone,

    };
    console.log(body);
    if (captcha === captchavalue) {
      const url = config.API_URL + "clint/enquiry/add";
      await axios
        .post(url, body)
        .then((res) => {
          console.log("response", res)
          setF_name("");
          setEmail("");
          setMessage("");
          setPhone("");
          setcaptchavalue("");


          var message = "Thank you for send message!";
          toast.success(message, {
            autoClose: 5000,
            type: "success",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "custom-toast",

          });

          handleenqiry(); // Call handleenqiry function after successful form submission
        })
        .catch((err) => console.log(err));
      generateCaptcha();

    } else {
      console.log('Invalid Captcha !!')
      setCaptchaError('Please Enter Valid Security Code!!');
      setTimeout(() => {
        setCaptchaError(" ")
      }, 3000);
    }
  };
  const Subscribe = async (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError('Username cannot be empty');
      return;
    }
    const body = {
      username: username
    };
    const url = config.API_URL + "clint/subscribe/add";
    await axios
      .post(url, body)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        // clear input
        setUsername("");
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setUsernameError('This username already exists');
        } else {
          navigate('/', { replace: true });
          setUsernameError(err.response.data.message);
        }
        let message = '';
        navigate('/', { replace: true });
        message = err.response.data.message
      })
    setTimeout(() => {
      setUsernameError("");
    }, 3000);
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  }
  useEffect(() => {
    generateCaptcha();
    fetch(HomeData)
      .then((response) => response.json())
      .then((value) => {
        setIsLoading(false);
        console.log("🚀 ~ file: index.js:265 ~ .then ~ value:", value[0]);
        SetSlider(value[0].SliderData);
        setProject(value[0].ProjectofMonth);
        setProjectgallery(value[0].ProjectofGallery);
        setBuilder(value[0].builder);
        setArticle(value[0].Articles);
        // Remove the setTimeout or reduce its delay
      });

    fetch(viewLocation)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });

    fetch(viewpropertytypes)
      .then((response) => response.json())
      .then((value) => {
        setPropertytype(value.data);
      });
  }, []);
  const [isActive, setIsActive] = useState(false);
  const handleenqiry = event => {
    setIsActive(current => !current);
  };

  const HandleSearch = async (event) => {
    event.preventDefault();
    const body = {
      option: option,
      location_id: location_id,
      p_typeid: p_typeid,
      room: room,
      tot_price: tot_price,
    };

    localStorage.setItem("searchResults", JSON.stringify(body));
    console.log("option", option);
    navigate(option.toLowerCase() === 'rent' ? '/property/search/rent-property-in-Jaipur' : '/property/search/buy-property-in-Jaipur', { replace: true })
  };
  const [section1Data, setSection1Data] = useState('');
  const [section2Data, setSection2Data] = useState('');
  const [section3Data, setSection3Data] = useState('');
  const [section4Data, setSection4Data] = useState('');
  useEffect(() => {
    const viewbanerlocation = config.API_URL + "clint/advertisementsubscription/bannerposition"
    const body = {
      page: "Home page",
      banner_location: "Project Gallery Section"
    }
    axios.post(viewbanerlocation, body)
      .then((response) => {
        console.log("🚀 ~ file: index.js:262 ~ .then ~ response:", response.data.data)
        setSection1Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 1 data:', error);
      });
    const body2 = {
      page: "Home page",
      banner_location: "fooder section"
    }
    axios.post(viewbanerlocation, body2)
      .then((response) => {
        setSection2Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 2 data:', error);
      });

    const body3 = {
      page: "Home page",
      banner_location: "Project of month"
    }
    axios.post(viewbanerlocation, body3)
      .then((response) => {
        setSection3Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 2 data:', error);
      });
    const body4 = {
      page: "Home page",
      banner_location: "Accociate Builders Section"
    }
    axios.post(viewbanerlocation, body4)
      .then((response) => {
        setSection4Data(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Section 2 data:', error);
      });
  }, []);
  const handleReset = () => {
    setF_name('');
    setPhone('');
    setEmail('');
    setMessage('');
    setcaptchavalue('');



  };
  return (
    <div>
      <Header />
      <section id="slider">
        {isLoading ? (
          <div >

          </div>
        ) : (
          <div className="row g-0">
            <div className="slider_main">
              <OwlCarousel className="owl-theme slider-items owl-carousel owl-loaded" {...slideroptions}>
                <div className="owl-stage-outer"
                //  key={index}
                >
                  <div className="owl-stage">
                    {slider && slider.map((value, index) => {
                      return (
                        <div className="owl-item" key={index}>
                          <img className="img-fluid slider-img" src={config.Image_URL + value.name}
                            alt="slider-img" /></div>
                      )
                    })}
                  </div>
                </div>
              </OwlCarousel>
              <div className="overlay_box">
                <div className="slider_innnr">
                  <h2>
                    BUY, SELL, RENT PROPERTY EASILY WITH US
                  </h2>
                  <div className="recent_top_form_part">
                    <form>
                      <div className="top_select first_select">
                        <select name="category"
                          value={option}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setOption(e.target.value);
                          }}>
                          <option value="sell">Buy</option>
                          <option value="Rent">Rent</option> </select>
                      </div>
                      <div className="top_select not_allow">
                        JAIPUR, RAJASTHAN
                      </div>

                      <div className="top_select">

                        <select name="role_id"

                          value={location_id}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setLocation_id(e.target.value);
                          }}
                        >
                          <option value="">Locality</option>
                          {location.map((value) => {
                            return <option key={value.id} value={value.id}> {value.name}</option>;

                          })}
                        </select>
                      </div>
                      <div className="top_select">

                        <select name="role_id"

                          value={p_typeid}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setP_typeid(e.target.value);
                          }}
                        >
                          <option value="">Property type</option>

                          {propertytype.map((value) => {
                            return <option key={value.id} value={value.id}> {value.name}</option>;

                          })}
                        </select>
                      </div>
                      <div className="top_select">
                        <select name="room" className="select_click"
                          value={tot_price}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setTot_price(e.target.value);
                          }}
                        >
                          <option value="">Budget</option>
                          <option value="500000">5 Lacs </option>
                          <option value="1000000">10 Lacs </option>
                          <option value="2000000">20 Lacs </option>
                          <option value="3000000">30 Lacs </option>
                          <option value="4000000">40 Lacs</option>
                          <option value="5000000">50 Lacs</option>
                          <option value="6000000">60 Lacs</option>
                          <option value="7000000">70 Lacs</option>
                          <option value="8000000">80 Lacs</option>
                          <option value="9000000">90 Lacs</option>
                          <option value="10000000">1 Crore</option>
                          <option value="50000000">5 Crore</option>
                          <option value="100000000">10 Crore</option>

                        </select>
                      </div>
                      <div className="top_select">
                        <select name="room" className="select_click"
                          value={room}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setRoom(e.target.value);
                          }}
                        >
                          <option value=""> bedRooms</option>
                          <option value="1">1 </option>
                          <option value="2">2 </option>
                          <option value="3">3 </option>
                          <option value="4">4 </option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9+</option>
                        </select>
                      </div>
                      <button
                        type="submit"

                        onClick={HandleSearch}
                        className="search_recent"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div>
                <div className={isActive ? 'side_box showForm' : 'side_box'}>
                  <Link className="side_button" to="#" onClick={handleenqiry}>Send Enquiry
                    <marquee direction="right" scrolldelay="200" className="mark_arrow">
                      <i className="fa-solid fa-caret-right"></i>
                    </marquee>
                  </Link>
                  <div className="leftBoxPopup">
                    <Link to="#" className="closeLPop text-white" onClick={handleenqiry}><i className="fa-regular fa-circle-xmark"></i></Link>

                    <div className="head_formscrolldiv">
                      <form onSubmit={AddEnquiry} >
                        <div className="input_grp">
                          <label className="form-label">Your Name*</label>
                          <input type="text" className="form-control" maxLength="30" required
                            value={f_name}
                            onChange={(e) => {
                              console.log(e.target.value)
                              setF_name(e.target.value)
                            }} />
                        </div>
                        <div className="input_grp">
                          <label className="form-label">Mobile Number*</label>
                          <input type="text" className="form-control" maxLength="10" required
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value)
                            }}
                          />
                        </div>

                        <div className="input_grp">
                          <label className="form-label">Email Id*</label>
                          <input type="email" name="email" className="form-control" required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)

                            }}

                          />
                        </div>

                        <div className="input_grp">
                          <label className="form-label">Your Message*</label>
                          <input name="message" className="form-control" maxLength="150" required
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          ></input>
                        </div>

                        <div>
                          <h4 style={{
                            color: '#000',
                          }}>
                            <span style={{
                              display: 'inline-block',
                              backgroundImage: 'url(https://img.freepik.com/free-photo/grey-felt-texture_1298-489.jpg)',
                              backgroundSize: 'cover',
                              padding: '0.2em 0.5em',
                              borderRadius: '0.1em',
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




                        <div className="input_grp">
                          <label className="form-label">Enter Captcha</label>
                          <input type="text" name="captchavalue" className="form-control" required
                            value={captchavalue}
                            onChange={(e) => {
                              setcaptchavalue(e.target.value)

                            }}

                          />
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <div className="frm_rst"><input type="reset" value="Reset" onClick={handleReset}/></div>
                          <div className="frm_sbt">
                            {/* <input type="submit" value="Submit"
                              onClick={AddEnquiry} /></div> */}
                            <button className="frm_sbt">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>



              </div>
            </div>

          </div>
        )}
      </section>

      <section id="boxes">
        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Project Of The Month</h3>
          </hgroup>
          <div className="row">
            {project && project.map((value, index) => {
              return (

                <div className="  col-md-3 col-sm-6 col-12" key={index}>
                  <Link to={`/projectshow/${value.url}`} className="img_box">
                    <div className="owl-item">
                      <img alt="Image" src={config.Image_URL + value.featureimage} />

                      <div className="box">
                        <h6>{value.name}</h6>
                        <h5>Jaipur</h5>
                      </div>

                    </div>
                  </Link>
                </div>

              )
            })}
          </div>
        </div>
      </section>
      <div className="pt-5">
      {section3Data == null ? (
        ""
      ) : (
        section3Data.status == "Y" ?
          <img
            alt="Image"
            src={config.Image_URL + section3Data.banner}
            style={{
              width: section3Data.Advertisement ? section3Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
              height: section3Data.Advertisement ? section3Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
            }}
          /> : ""
      )}
</div>

      <section id="boxes_crousel">
        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Project Gallery</h3>
          </hgroup>
          {isLoading ? (
            <div >

            </div>
          ) : (
            <OwlCarousel className="boxes-carousel owl-theme owl-carousel" {...projectGalleryoptions}>
              {projectgallery && projectgallery.map((value, index) => {
                return (
                  <div className="" key={index}>

                    <Link to={`/projectshow/${value.url}`} className="img_box">
                      <img alt="Image" src={config.Image_URL + value.featureimage}
                      />

                      <div className="box">
                        <h6>{value.name}</h6>
                        <h5>Jaipur</h5>
                      </div>
                    </Link>

                  </div>
                )
              })}
            </OwlCarousel>
          )}
        </div>
      </section>
      <div className="pt-5">
      {section1Data == null ? (
        ""
      ) : (
        section1Data.status=="Y"?

        <img
          alt="Image"
          src={config.Image_URL + section1Data.banner}
          style={{
            width: section1Data.Advertisement ? section1Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
            height: section1Data.Advertisement ? section1Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
          }}
        />:""
      )}

</div>

      <section id="associat_crousel">
        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Associate Builders</h3>
          </hgroup>
          {isLoading ? (
            <div >

            </div>
          ) : (
            <OwlCarousel className="associat-carousel owl-theme slider-items owl-carousel" {...options}>
              {builder && builder.map((value, index) => {
                return (

                  <div className="img_box" key={index}>
                    <img alt="Image" src={value.image ? config.Image_URL + value.image : "https://www.propertybull.com/images/no-image.jpg"} />
                  </div>

                )
              })}
            </OwlCarousel>
          )}

        </div>
      </section>
      <div>

      {section4Data == null ? (
        ""
      ) : (
        section4Data.status=="Y"?

        <img
          alt="Image"
          src={config.Image_URL + section4Data.banner}
          style={{
            width: section4Data.Advertisement ? section4Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
            height: section4Data.Advertisement ? section4Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
          }}
        />:""
      )}
</div>

      <section id="articles">


        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Articles</h3>
          </hgroup>
          <div className="articlesContainers">
            <div className="overlayBg">
              <div className="container-fluid">
                <div className="row">
                  {article && article.map((value, index) => {
                    return (
                      <div className="col-md-3 col-sm-6 col-12" key={index}>

                        <Link to={`/article/index/${value.url}`} className="articlesTile">
                          <div className="iconContainer">
                            <img alt="Image" src={config.Image_URL + value.image} />

                          </div>
                          <h5>{value.title}</h5>

                        </Link>
                      </div>

                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <ToastContainer />
      <section id="newsLetter">
        <div className="container-fluid">
          <hgroup className="headings">
            <h3>Our Newsletter</h3>
          </hgroup>
          <div className="container">
            <div className="newsLetterContainer">


              <form onSubmit={Subscribe} >
                <input type="email" placeholder="Enter Your Email Address" required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button >Subscribe Now</button>
              </form>
              {usernameError && <div style={{ color: 'red', textAlign: "center" }}>{usernameError}</div>}
              {success && (
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <p>Thankyou for subscribe OUR NEWSLETTER!</p></div>
                </div>
              )}

            </div>
          </div>
        </div>

      </section>
      <div className="pt-5">

      {section2Data == null ? (
        ""
      ) : (
        section2Data.status=="Y"?

        <img
          alt="Image"
          src={config.Image_URL + section2Data.banner}
          style={{
            width: section2Data.Advertisement ? section2Data.Advertisement.BannerPosition.banner_size.split("x")[0] + "px" : "",
            height: section2Data.Advertisement ? section2Data.Advertisement.BannerPosition.banner_size.split("x")[1] + "px" : "",
          }}
        />:""
      )}


</div>

      <Footer />

    </div>

  );
}
