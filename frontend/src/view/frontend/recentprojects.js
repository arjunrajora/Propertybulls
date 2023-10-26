import { React, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from '../../config/config'
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

const URL = config.API_URL + "clint/property/Recentproject";
const viewLocation = config.API_URL + "clint/home/viewLocation";
const viewpropertytypes = config.API_URL + "clint/home/viewpropertytypes"



export default function RecentProjects() {
  const navigate = useNavigate();

  const [project, setProject] = useState([]);
  const [location, setLocation] = useState([]);
  const [propertytype, setPropertytype] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const Shortlist = useContext(CartContext);

  const [option, setOption] = useState("Sell");
  const [location_id, setLocation_id] = useState("");
  const [p_typeid, setP_typeid] = useState("");
  const [room, setRoom] = useState("");
  const [tot_price, setTot_price] = useState("");

  useEffect(() => {
    getData()
    viewshortlist();
    fetch(URL)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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



  // Shortlist 
  const { url } = useParams();

  const [ip_add, setip_add] = useState("");
  const [usr_id, setusr_id] = useState("0");
  const Id = JSON.parse(localStorage.getItem("userId"));
  const [pro_id, setPro_id] = useState("");
  const [detail, setdetail] = useState([]);
  const [Open, setOpen] = useState(false);
  const Ref = useRef(null);
  const [data, setData] = useState([]);



  const onClickshow = () => {
    setOpen(!Open);

  }

  const view = async () => {
    const api = config.API_URL + "clint/shortlist/viewAll"
    const body = {
      ip_add: ip_add,
      usr_id: Id
    }
    console.log(body);
    await axios.post(api, body)
      .then((res) => {
        console.log("=>>", res);
        console.log(res.data.data);
        setData(res.data.data)

      }).catch((err) => console.log(err));


  }



  // Shortlist&Shortlisted


  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setip_add(res.data.IPv4)
    console.log(Id)
    setusr_id(Id)
  }

  //add shortlist
  const [activeItems, setActiveItems] = useState([]);
  const addShortlist = async (pro_id) => {
    const apiUrl = config.API_URL + "clint/shortlist/add"
    const body = {
      pro_id: pro_id,
      ip_add: ip_add,
      usr_id: usr_id
    };
    await axios.post(apiUrl, body)
      .then((res) => {
        console.log(res, "res");
        Shortlist.addItem({
          pro_id: pro_id,
          ip_add: ip_add,
          usr_id: usr_id
        });
        const index = activeItems.indexOf(pro_id);
        console.log(index);
        if (index === -1) {
          setActiveItems([...activeItems, pro_id]);
          console.log('firsttime');
        } else {
          console.log('secondtime');
          setActiveItems(activeItems.filter((i) => i !== pro_id));
        }
        console.log(activeItems, "add shortlist");
      })
      .catch((err) => console.log(err))
  };
  const deleteshortlist = async (pro_id) => {
    const api = config.API_URL + "clint/shortlist/delete"
    const body = {
      pro_id: pro_id
    }
    await axios.post(api, body)
      .then((res) => {
        Shortlist.removeItem({
          pro_id: pro_id,
        });
        console.log(">>", res);
        const index = activeItems.indexOf(pro_id);

        if (index === -1) {
          setActiveItems([...activeItems, pro_id]);
        } else {
          setActiveItems(activeItems.filter((i) => i !== pro_id));
        }
      })
      .catch((err) => console.log(err));
  };




  const viewshortlist = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    const api = config.API_URL + "clint/shortlist/viewAll"

    const body = {
      ip_add: res.data.IPv4,
      usr_id: usr_id
    }
    await axios.post(api, body)
      .then((res) => {
        var shortlistData = res.data.data;
        shortlistData.map((value) => {
          var allshortlist = activeItems.push(value.pro_id);
          setActiveItems([...activeItems, allshortlist]);
        })
      }).catch((err) => console.log(err));


  }

  //  Searching property
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









  var LocationState;


  return (
    <div>
      <Header />




      {/* <!-- alert_model --> */}
      {/* <div className="short_model">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="modal-content">
              <div className="modal-body">
                <h6><img src="images/model_bel.jpg" alt="img" /> Get Personalized Email Alerts that
                  match your
                  requirement</h6>
                <form>
                  <div className="center_model">
                    <p>
                      Your Requirement
                    </p>

                    <div className="form_sel">
                      <select className="searchSelect">
                        <option value="">Buy</option>
                        <option value="1">Rent</option>
                      </select>
                      <select className="searchSelect">
                        <option value="">Select Type</option>
                        <option value="321">Residential Flat</option>
                        <option value="320">Residential House</option>
                        <option value="319">Residential Plot</option>
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

                      <select className="searchSelect">
                        <option value="">-Min Price-</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>
                        <option value="100000">1 Lacs</option>
                        <option value="150000">1.5 Lacs</option>
                        <option value="200000">2 Lacs</option>
                        <option value="250000">2.5 Lacs</option>
                        <option value="300000">3 Lacs</option>
                        <option value="350000">3.5 Lacs</option>
                        <option value="500000">5 Lacs</option>
                      </select>
                      <select className="searchSelect">
                        <option value="">-Max Price-</option>
                        <option value="2000">2000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>
                        <option value="100000">1 Lacs</option>
                        <option value="150000">1.5 Lacs</option>
                        <option value="200000">2 Lacs</option>
                        <option value="250000">2.5 Lacs</option>
                        <option value="300000">3 Lacs</option>
                        <option value="350000">3.5 Lacs</option>
                        <option value="500000">5 Lacs</option>
                      </select>
                      <select className="searchSelect">
                        <option value="">Select Location</option>
                        <option value="711">22 Godown Industrial Area</option>
                        <option value="437">Agra Road</option>
                        <option value="424">Ajmer Road</option>
                        <option value="436">Bani Park</option>
                        <option value="458">Bapu Nagar</option>
                        <option value="718">Benad Road Jhotwara</option>
                        <option value="719">Bhanpur Kalan</option>
                        <option value="461">C-Scheme</option>
                        <option value="435">Chitrakoot</option>
                        <option value="441">Civil Lines</option>
                        <option value="698">Delhi Road</option>
                        <option value="452">Durgapura</option>
                        <option value="445">Gopalpura By Pass</option>
                        <option value="427">Jagatpura</option>
                        <option value="713">Jawahar Circle</option>
                        <option value="447">Jawahar Nagar</option>
                        <option value="434">Jhotwara</option>
                        <option value="431">Kalwar Road</option>
                        <option value="429">Malviya Nagar</option>
                        <option value="428">Mansarovar</option>
                        <option value="712">Mansarovar Extension</option>
                        <option value="450">Muralipura</option>
                        <option value="443">New Sanganer Road</option>
                        <option value="716">Nirman Nagar</option>
                        <option value="481">Niwaru Road</option>
                        <option value="444">Patrakar Colony</option>
                        <option value="430">Pratap Nagar</option>
                        <option value="455">Raja Park</option>
                        <option value="501">Sachivalaya Nagar</option>
                        <option value="701">Sahakar Marg</option>
                        <option value="693">Sanganer</option>
                        <option value="717">Shastri Nagar</option>
                        <option value="446">Shyam Nagar</option>
                        <option value="470">Sidharth Nagar</option>
                        <option value="432">Sikar Road</option>
                        <option value="433">Sirsi Road</option>
                        <option value="438">Sodala</option>
                        <option value="462">Tilak Nagar</option>
                        <option value="425">Tonk Road</option>
                        <option value="426">Vaishali Nagar</option>
                        <option value="454">Vatika</option>
                        <option value="440">Vidhyadhar Nagar</option>
                      </select>
                    </div>
                    <div className="rp"></div>
                    <p>Contact Details</p>
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="name"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Email"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Country Code"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Phone"
                          aria-label="First name" />
                      </div>
                      <div className="col-lg-6">
                        <img src="images/form_img.jpg" className="img-fluid" alt="img" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Enter Security Code"
                          aria-label="First name" />
                      </div>

                    </div>

                  </div>
                  <a className="model_but" href="#">submit</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- alert_model --> */}


      <div className="recent_modul">
        <div className="recent_top_form_part">
          <form>
            <div className="top_select first_select">
              <select
                value={option}
                onChange={(e) => {
                  console.log(e.target.value);
                  setOption(e.target.value);
                }}

              >
                <option value="Sell">Buy</option>
                <option value="Rent">Rent</option>
              </select>
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
            <button className="search_recent" onClick={HandleSearch}>Search</button>
          </form>
        </div>
        {isLoading ? (
          <div className="loader inner-loader" colSpan={8}>
            <ClipLoader
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="row">
            {project.map((value) => {
              if (value.Location != null) {
                LocationState = value.Location.name;
              } else {
                LocationState = "---";
              }
              return (
                <div className="col-lg-6" key={value.id}>
                  <div className="recent_inner">
                    <div className="recent_img">
                      <Link to={`/projectshow/${value.url}`}>
                        <img alt="Image" src={value.featureimage ? config.Image_URL + value.featureimage : "https://www.propertybull.com/pro_images/570ff61067e2d9d9b40517cf2052b592265093555.png"} />
                      </Link>
                    </div>
                    <div className="recent_text_deta">
                      <span>  <Link to={`/projectshow/${value.url}`}>
                        {value.name}
                      </Link>
                        jaipur</span>

                      <div className="re_details">
                        <ul>
                          <li>Location</li>
                          <li>Price</li>
                          <li>No of Room</li>
                          <li>Flat Area</li>
                        </ul>
                        <ul className="re_location">
                          <li>{LocationState}</li>
                          {/* <li>33.5 Lacs - 36.5 Lacs</li> */}
                          <li>{value.tot_price
                            ? value.tot_price >= 10000000
                              ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                              : value.tot_price >= 100000
                                ? (value.tot_price / 100000).toFixed(1) + ' lakh'
                                : value.tot_price.toLocaleString()
                            : 'Price Not Disclosed'}</li>

                          <li>{value.room} Rooms</li>
                          <li>{value.area_in_sqft}Sq Ft</li>
                        </ul>
                      </div>
                      <div className="recentf_more_info">
                        <Link to={`/projectshow/${value.url}`}>
                          More Info</Link>




                        {activeItems.includes(value.id) ?
                          <div className="short_button">
                            <Link to="#" className='fdsffdsaf' onClick={() => deleteshortlist(value.id)}>
                              <i className="fa fa-star fa-lg black"></i> Shortlisted

                            </Link>
                          </div>
                          :
                          <div className="short_button" >
                            <Link to="#" onClick={() => addShortlist(value.id)}>
                              <i className="fa fa-star fa-lg black"></i>   Shortlist
                            </Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}


          </div>


        )}

      </div>
      <Footer />

    </div>
  )
}
