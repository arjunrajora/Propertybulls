import React from 'react'
import { useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const config = require("../config/config");


const Contacturl = config.API_URL + "clint/contactus/viewContactus";


export default function FrontFooter() {

  const currentYear = new Date().getFullYear();

  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch(Contacturl)
      .then((response) => response.json())
      .then((value) => {
        setContact(value.data);

      });

  }, []);

  return (
    <React.Fragment>
      <footer id="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <h4>Link</h4>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-6 ftr_links">
                  <ul className="list-unstyled mb-0">
                    <li><Link to="/about"><i className="fa-solid fa-caret-right"></i> About Us</Link></li>
                    <li><Link to="/term-conditions"><i className="fa-solid fa-caret-right"></i> Terms & Condition</Link></li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-3 col-6 ftr_links">
                  <ul className="list-unstyled mb-0">
                    <li><Link to="/privacy-policy"><i className="fa-solid fa-caret-right"></i> Privacy Policy</Link></li>
                    <li><Link to="/static/help"><i className="fa-solid fa-caret-right"></i> Help</Link></li>
                    <li><Link to="/faq"><i className="fa-solid fa-caret-right"></i> FAQ</Link></li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-3 col-6 ftr_links">
                  <ul className="list-unstyled mb-0">
                    <li><Link to="/property/search/real-estate-buy-rent-residential"><i className="fa-solid fa-caret-right"></i> All Residential</Link></li>
                    <li><Link to="/property/search/residential-plot-land-for-sale-in-Jaipur"><i className="fa-solid fa-caret-right"></i> Residential Plot</Link></li>
                    <li><Link to="/property/search/residential-house-for-sale-in-Jaipur"><i className="fa-solid fa-caret-right"></i> Residential House</Link></li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-3 col-6 ftr_links">
                  <ul className="list-unstyled mb-0">
                    <li><Link to="/property/search/real-estate-buy-rent-commercial"><i className="fa-solid fa-caret-right"></i> All Commercial</Link></li>
                    <li><Link to="/property/search/commercial-land-for-sale-in-Jaipur"><i className="fa-solid fa-caret-right"></i> Commercial Land</Link></li>
                    <li><Link to="/property/search/commercial-shop-for-sale-in-Jaipur"><i className="fa-solid fa-caret-right"></i> Commercial Shop</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h4>CONTACT US</h4>
              {/* {contact.map((value) => {
                return ( */}
              {/* <p>{contact.username}</p> */}
              <p><a href="mailto:contact@propertybull.com">{contact.username}</a></p>

              {/* )
              })} */}
              {/* <p>Email: contact@propertybull.com</p> */}
              <ul className="list-unstyled d-flex align-items-center mb-0">
                <li>
                  <p className="mb-0 me-1">Follow Us On</p>
                </li>
                <li className="me-1"> <a href={contact.fb_url}
                  target="_blank"><img alt="" src="https://www.propertybull.com/app/webroot/images/ff.png" /></a></li>
                <li className="me-1"><a href={contact.tw_url} target="_blank"><img alt=""
                  src="https://www.propertybull.com/app/webroot/images/tt.png" /> </a></li>
                <li className="me-1"><a href={contact.you_url} target="_blank"><img
                  alt="" src="https://www.propertybull.com/app/webroot/images/uu.png" /></a></li>
              </ul>
            </div>
          </div>
          {/* <p className="mt-3 mb-0">©2023 <Link href="#">Propertybull.com,</Link> All Rights Reserved</p> */}
          <p className="mt-3 mb-0">©{currentYear} <Link>Propertybull.com,</Link> All Rights Reserved</p>
        </div>


      </footer>
      <Helmet>


      </Helmet>





    </React.Fragment>

  )
}
