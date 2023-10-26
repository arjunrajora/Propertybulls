import React, { useState, useEffect, useRef, useContext } from "react";
import Header from "../../element/frontHeader"
import Footer from "../../element/frontFooter"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import config from "../../config/config";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import CartContext from "../../store/cart-context";
export default function Shortlist() {
    const Shortlist = useContext(CartContext);
    const [Cartitems, setCartCartitems] = useState([]);
    const [data, setData] = useState([]);
    const [shortlist, setshortlist] = useState([]);
    const [usr_id, setusr_id] = useState("");
    const [ip_add, setip_add] = useState("");
    const [fname, setfname] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");
    const [pro_id, setPro_id] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const Id = JSON.parse(localStorage.getItem("userId"));
    const [modalOpen, setModalOpen] = useState(false);

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
                console.log(activeItems.indexOf(pro_id));
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


    useEffect(() => {
        fetch('https://geolocation-db.com/json/')
            .then((response) => response.json())
            .then((res) => {
                console.log(res.IPv4, "jhgf");
                setip_add(res.IPv4);
                setusr_id(Id);
                console.log('lokesh')
            });
        const api = config.API_URL + "clint/shortlist/viewAll"
        const body = {
            ip_add: ip_add,
            usr_id: Id
        }
        console.log(body);
        axios.post(api, body)
            .then((res) => {
                setData(res.data.data)
                Shortlist.setItems(res.data.data); // Update this line
            }).catch((err) => console.log(err));

        if (Id != null) {
            const apiUrl = config.API_URL + "auth/";
            fetch(apiUrl + Id)
                .then((response) => response.json())
                .then((value) => {
                    setfname(value.data.name);
                    setemail(value.data.username);
                    setphone(value.data.mobile);
                });

        }
        else {
        }
    }, [fetch]);





    const Contactadd = async (event) => {
        event.preventDefault();
        if (message.trim() === '') {
            alert('Please fill in the message.');
            return;
        }
        const body = {
            fname: fname,
            email: email,
            phone: phone,
            message: message,
            pro_id: pro_id,
            cus_id: Id ? Id : 0
        };
        const url = config.API_URL + "clint/contactenquiry/contactadd";
        await axios.post(url, body)
            .then((res) => {
                closeModal();
                setfname("");
                setemail("");
                setmessage("");
                setphone("")
                setPro_id("")
                var message = "Thank you for send message!";
                toast.success(message, {
                    autoClose: 2000,
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
                if (Id != null) {
                    const apiUrl = config.API_URL + "auth/";
                    fetch(apiUrl + Id)
                        .then((response) => response.json())
                        .then((value) => {
                            setfname(value.data.name);
                            setemail(value.data.username);
                            setphone(value.data.mobile);
                        });

                }
                else {
                }
            }).catch((err) => {

            });


    };
    const handleChange = event => {
        console.log(event.target.value);
        setmessage(event.target.value);
    };
    let images;
    let area;
    let address;
    let types;
    let propertytypes;
    let propertyname;
    let price;
    let urls;
    let Roles;
    let username;
    const closeModal = () => {
        const modal = document.getElementById("exampleModalct");
        const backdrop = document.getElementsByClassName("modal-backdrop")[0];
        modal.classList.remove("show");
        modal.style.display = "none";

        backdrop.parentNode.removeChild(backdrop); // Remove the backdrop element

        // Enable scrolling
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";
    };










    return (
        <div>
            <Header />
            <div className="shortlist_all">
                <div className="shortlist_top">
                    <img src="images/bell-ring.gif" alt="img" />
                    <Link to="#javascript" data-bs-toggle="modal" data-bs-target="#exampleModal">Set Property Alerts for this Search</Link>
                </div>
                <div>

                    <h5> Short Listed Properties</h5>

                    {
                        data.length <= 0 && (
                            <h5 style={{ color: "red" }}> SORRY,NO RESULT FOUND</h5>
                        )
                    }

                    {data.map((item, index) => {
                        if (item.Property != null) {
                            images = item.Property.featureimage;
                            area = item.Property.area;
                            address = item.Property.address;
                            propertyname = item.Property.name;
                            urls = item.Property.url;
                            types = item.Property.type
                        } else {
                            images = "---";
                            area = "---";
                            propertyname = "--";
                            address = "--";
                            urls = "--";
                            types = "--"
                        }
                        if (item.Property.propertyType != null) {
                            propertytypes = item.Property.propertyType.name
                        } else {
                            propertytypes = "---"
                        }
                        if (item.Property.User != null) {
                            Roles = item.Property.User.Role.title
                        } else {
                            Roles = "---"
                        }
                        if (item.Property.User != null) {
                            username = item.Property.User.name
                        } else {
                            username = "---"
                        }
                        if (item.Property.tot_price != "0") {
                            price = item.Property.tot_price

                        } else {
                            price = "Price On Request";
                        }
                        const bathrooms = item.Property.propertydetails.map((e) => e.bathroom);
                        const maxBathroom = Math.max(...bathrooms);
                        const minBathroom = Math.min(...bathrooms);
                        const areass = item.Property.propertydetails.map((e) => e.area);
                        const maxarea = Math.max(...areass);
                        const minareass = Math.min(...areass);
                        const add = maxarea + minareass
                        const prices = item.Property.propertydetails.map((e) => e.tot_price);
                        const minprice = Math.min(...prices);
                        return (
                            <div className="cover_box" key={item.id}>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="totle_area">
                                            <div className="img-overflow">
                                                <Link to={types === 0 ? `/propertyshow/${urls}` : `/projectshow/${urls}`} >
                                                    <img src={config.Image_URL + images} alt="img" />
                                                </Link>
                                            </div>
                                            <div className="Individual">
                                                <h6>{Roles}</h6><span>{username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        types === 0 ?

                                            (<div className="col-lg-8">
                                                <div className="short_contant_main">
                                                    <div className="abc_appartment">

                                                        <Link className="abc_click" to={types === '0' ? `/propertyshow/${urls}` : `/propertyshow/${urls}`} >
                                                            {item.name}</Link>
                                                        <p>
                                                            <Link className="abc_click" to={`/propertyshow/${urls}`}>
                                                                {propertyname} </Link>                                                    <br />
                                                            {propertytypes} <span>Property Id : {item.pro_id}</span> <span>Locality : {address}</span>

                                                            {/* <span> <b className="text-dark">No. of Bedrooms : -</b>:    </span>       */}
                                                            <span> <b className="text-dark">Total Area</b> : {area} sq Ft</span>
                                                        </p>
                                                    </div>
                                                    <div className="short_right">

                                                        {activeItems.includes(item.pro_id) ?

                                                            <div className="short_button" >
                                                                <Link to={"#"} onClick={() => addShortlist(item.pro_id)}>
                                                                    <i className="fa fa-star text-dark  fa-lg grey"></i>   Shortlist
                                                                </Link>
                                                            </div>
                                                            :
                                                            <div className="short_button">
                                                                <Link to={"#"} className='fdsffdsaf' onClick={() => deleteshortlist(item.pro_id)}>
                                                                    <i className="fa fa-star fa-lg black"></i> Shortlisted
                                                                </Link>
                                                            </div>

                                                        }
                                                        <h4>
                                                            {/* {(price / 100000).toFixed(1) + ' Lacs'} */}
                                                            {price ? price >= 10000000 ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lakh'
                                                                    : price.toLocaleString()
                                                                : 'Price On Request'}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="short_more_contact">
                                                    <Link className="abc_click" to={`/propertyshow/${urls}`}>
                                                        More Detail</Link>
                                                    <Link className="now_button" data-bs-toggle="modal" data-bs-target="#exampleModalct"
                                                        to="#" onClick={(e) => setPro_id(item.pro_id)} >Contact Now</Link>
                                                </div>
                                            </div>) :
                                            (<div className="col-lg-8">
                                                <div className="short_contant_main">
                                                    <div className="abc_appartment">
                                                        <Link className="abc_click" to={`/projectshow/${urls}`}>
                                                            {item.name}</Link>
                                                        <p>
                                                            <Link className="abc_click" to={`/projectshow/${urls}`}>
                                                                {propertyname} </Link>                                                    <br />
                                                            {propertytypes} <span>Property Id : {item.pro_id}</span> <span>Locality : {address}</span>

                                                            <span> <b className="text-dark">No. of Bedrooms : -</b>:{minBathroom}-{maxBathroom}</span>
                                                            <span> <b className="text-dark">Total Area</b> : {add !== null ? add : area} sq Ft</span>
                                                        </p>
                                                    </div>
                                                    <div className="short_right">

                                                        {activeItems.includes(item.pro_id) ?

                                                            <div className="short_button" >
                                                                <Link to={"#"} onClick={() => addShortlist(item.pro_id)}>
                                                                    <i className="fa fa-star text-dark  fa-lg grey"></i>   Shortlist
                                                                </Link>
                                                            </div>
                                                            :
                                                            <div className="short_button">
                                                                <Link to={"#"} className='fdsffdsaf' onClick={() => deleteshortlist(item.pro_id)}>
                                                                    <i className="fa fa-star fa-lg black"></i> Shortlisted
                                                                </Link>
                                                            </div>
                                                        }
                                                        <h4>
                                                            {price ? price >= 10000000 ? (price / 10000000).toFixed(1) + ' crore'
                                                                : price >= 100000
                                                                    ? (price / 100000).toFixed(1) + ' lakh'
                                                                    : price.toLocaleString()
                                                                : 'Price On Request'}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="short_more_contact">
                                                    <Link className="abc_click" to={`/projectshow/${urls}`}>
                                                        More Detail</Link>
                                                    <Link className="now_button" data-bs-toggle="modal" data-bs-target="#exampleModalct"
                                                        to="#" onClick={(e) => setPro_id(item.pro_id)}>Contact Now</Link>
                                                </div>
                                            </div>)}
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>
            <ToastContainer />

            <div className="model_short_contact">
                <div className="modal fade" id="exampleModalct" tabIndex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-content">
                            <div className="modal-body">
                                <form onSubmit={Contactadd}>
                                    <div className="center_model">
                                        <p>
                                            KINDLY PROVIDE THE DETAILS BELOW FOR BUILDER TO CONTACT YOU
                                        </p>
                                        <div className="form_sel">

                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input type="text" className="form-control" placeholder="name" required
                                                    aria-label=" name"
                                                    value={fname}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        setfname(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" className="form-control" placeholder="Mobile" minLength="10" maxLength="10"
                                                    required
                                                    aria-label="Mobile"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        const input = e.target.value;
                                                        const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                                        if (regex.test(input)) {
                                                            setphone(input);
                                                        } else {
                                                            alert('Please enter only 10 numeric characters!');
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <input type="Email" className="form-control" placeholder="E-mail Address" required
                                                    aria-label="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        setemail(e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="radios">
                                            <div className="radiochack">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault11"
                                                        value="Im interested, Please get in touch with me"
                                                        checked={message === 'Im interested, Please get in touch with me'}
                                                        onChange={handleChange}

                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1" >
                                                        <h6>I'm interested, Please get in touch with me</h6>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault13" value="I would like to call now"
                                                        checked={message === 'I would like to call now'}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1"

                                                    >
                                                        <h6>I would like to call now</h6>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="radiochack">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault12" value="I would like to plan a site visit"
                                                        checked={message === 'I would like to plan a site visit'}
                                                        onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1"
                                                    >
                                                        <h6>I would like to plan a site visit</h6>
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                        id="flexRadioDefault14" value="View Builder contact details" checked={message === 'View Builder contact details'}
                                                        onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1"
                                                    >
                                                        <h6>View Builder contact details</h6>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-check bottom">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                                        <label className="form-check-label" htmlFor="flexCheckDefault" >
                                            <h6>I accept the Terms and Conditions</h6>
                                        </label>
                                    </div>
                                    <button className="model_but" href="#"  >submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <Footer />
        </div>
    )
}